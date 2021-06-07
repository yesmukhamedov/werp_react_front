import React, { Component } from 'react';
import { Modal, Form, Input, TextArea, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { doPost } from '../../../../utils/apiActions';
import { toggleDemoCreateModal } from '../actions/demoAction';
import { connect } from 'react-redux';
import {
  DEMO_RESULT_CANCELLED,
  DEMO_RESULT_DONE,
  DEMO_RESULT_MOVED,
  getReasonsByResultId,
  //LOCATION_OPTIONS,
  getLocationOptionsByLanguage,
} from '../../../crmUtil';
import { injectIntl } from 'react-intl';

require('moment/locale/ru');

class DemoCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demo: {
        parentId: props.parentId,
        recoId: props.recoId,
        visitId: props.visitId,
        callId: null,
        clientName: null,
        contractNumber: null,
        dateTime: null,
        dealerId: props.dealerId,
        location: null,
        result: 'UNKNOWN',
        reasonId: null,
        saleDate: null,
      },
      errors: {
        dealerId: false,
        result: false,
        reasonId: false,
        dateTime: false,
        clientName: false,
        address: false,
        location: false,
      },
    };

    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.renderUpdateForm = this.renderUpdateForm.bind(this);
    this.saveDemo = this.saveDemo.bind(this);
  }

  componentWillMount() {}

  renderReasonRow(messages) {
    let result = this.state.demo.result;
    if (
      result === DEMO_RESULT_CANCELLED ||
      result === DEMO_RESULT_DONE ||
      result === DEMO_RESULT_MOVED
    ) {
      return (
        <Form.Select
          error={this.state.errors.reasonId}
          value={this.state.demo.reasonId}
          required
          fluid
          selection
          label={messages['Crm.Reason']}
          options={getReasonsByResultId(result, this.props.reasons)}
          onChange={(e, v) => this.handleChange('reasonId', v)}
        />
      );
    }

    return <Form.Field />;
  }

  renderUpdateForm(messages, locale) {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            error={this.state.errors.clientName}
            onChange={(e, o) => this.handleChange('clientName', o)}
            value={this.state.demo.clientName}
            control={Input}
            required
            label={messages['Form.ClientFullName']}
            placeholder={messages['Form.ClientFullName']}
          />
          <Form.Field error={this.state.errors.dateTime} required>
            <label>{messages['Crm.DemoDateTime']}</label>
            <DatePicker
              locale={locale}
              label=""
              autoComplete="off"
              placeholderText={messages['Crm.DemoDateTime']}
              showMonthDropdown
              showYearDropdown
              showTimeSelect
              dropdownMode="select"
              dateFormat="DD.MM.YYYY HH:mm"
              selected={
                this.state.demo.dateTime
                  ? moment(this.state.demo.dateTime)
                  : null
              }
              onChange={v => this.handleChange('dateTime', v)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            error={this.state.errors.result}
            value={this.state.demo.result}
            required
            fluid
            selection
            label={messages['Form.Result']}
            options={this.resultsOptions()}
            onChange={(e, v) => this.handleChange('result', v)}
          />
          {this.renderReasonRow(messages)}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            error={this.state.errors.address}
            required
            control={TextArea}
            onChange={(e, o) => this.handleChange('address', o)}
            label={messages['Table.Address']}
            placeholder={messages['Table.Address']}
            value={this.state.demo.address}
          />
          <Form.Select
            error={this.state.errors.location}
            value={this.state.demo.location}
            required
            fluid
            selection
            label={messages['Crm.Location']}
            options={getLocationOptionsByLanguage(locale)}
            onChange={(e, v) => this.handleChange('location', v)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            error={this.state.errors.dealerId}
            value={this.state.demo.dealerId}
            required
            fluid
            selection
            label={messages.dealer}
            options={this.props.dealers}
            onChange={(e, v) => this.handleChange('dealerId', v)}
          />

          <Form.Field
            control={TextArea}
            onChange={(e, o) => this.handleChange('note', o)}
            label={messages['Crm.NoteForDemo']}
            placeholder={messages['Crm.NoteForDemo']}
            value={this.state.demo.note || ''}
          />
        </Form.Group>
      </Form>
    );
  }

  handleChange(fieldName, o) {
    const demo = Object.assign({}, this.state.demo);

    switch (fieldName) {
      case 'dateTime':
        if (o) {
          demo[fieldName] = o;
        } else {
          demo[fieldName] = null;
        }

        break;
      case 'location':
      case 'clientName':
      case 'address':
      case 'result':
      case 'reasonId':
      case 'dealerId':
      case 'note':
        demo[fieldName] = o.value;
        if (fieldName === 'result') {
          demo.reasonId = null;
        }
        break;
      default: {
      }
    }

    this.setState({
      ...this.state,
      demo,
    });
  }

  validateForm() {
    const { demo, errors } = this.state;
    for (const k in errors) {
      if (errors.hasOwnProperty(k)) {
        errors[k] = false;
      }
    }

    if (
      demo.result === DEMO_RESULT_MOVED ||
      demo.result === DEMO_RESULT_CANCELLED ||
      demo.result === DEMO_RESULT_DONE
    ) {
      if (!demo.reasonId) {
        errors.reasonId = true;
      }
    }

    if (!demo.dealerId) {
      errors.dealerId = true;
    }

    if (!demo.clientName || demo.clientName.length === 0) {
      errors.clientName = true;
    }

    if (!demo.dateTime || demo.dateTime.length === 0) {
      errors.dateTime = true;
    }

    if (!demo.address || demo.address.length === 0) {
      errors.address = true;
    }

    if (!demo.location) {
      errors.location = true;
    }

    this.setState({
      ...this.state,
      errors,
    });
  }

  componentWillReceiveProps(props) {
    const { parentId, recoId, visitId, dealerId } = props;
    const { demo } = this.state;
    demo.parentId = parentId;
    demo.visitId = visitId;
    demo.recoId = recoId;
    demo.dealerId = dealerId;
    this.setState({
      ...this.state,
      demo,
    });
  }

  saveDemo() {
    this.validateForm();
    let isValid = true;
    for (const k in this.state.errors) {
      if (this.state.errors[k]) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      return;
    }
    doPost(`crm2/demo`, { ...this.state.demo })
      .then(response => {
        this.close();
      })
      .catch(error => {
        console.log(error);
      });
  }

  close() {
    this.props.toggleDemoCreateModal(false);
  }

  resultsOptions() {
    if (!this.props.demoResults) {
      return [];
    }
    const out = Object.keys(this.props.demoResults).map(k => ({
      key: k,
      text: this.props.demoResults[k],
      value: k,
    }));

    return out;
  }

  render() {
    const { openDemoCreateModal } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <Modal size="small" open={openDemoCreateModal}>
        <Modal.Header>{messages['Crm.AdditionDemoFromDemo']}</Modal.Header>
        <Modal.Content>{this.renderUpdateForm(messages, locale)}</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.close}>
            {messages.cancel}
          </Button>
          <Button
            positive
            icon="checkmark"
            onClick={this.saveDemo}
            labelPosition="right"
            content={messages.save}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    dealers: state.crmDemo.dealers,
    loader: state.loader,
    demoResults: state.crmDemo.demoResults,
    reasons: state.crmDemo.reasons,
    openDemoCreateModal: state.crmDemo.openDemoCreateModal,
  };
}

export default connect(mapStateToProps, { toggleDemoCreateModal })(
  injectIntl(DemoCreateModal),
);

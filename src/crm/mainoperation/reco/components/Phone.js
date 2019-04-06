import React, { Component } from 'react';
import {
  Label,
  Icon,
  Modal,
  Tab,
  Table,
  Button,
  Form,
  Input,
  TextArea,
  Divider,
  Header,
} from 'semantic-ui-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ROOT_URL } from '../../../../utils/constants';
import moment from 'moment';
import {
  getLocationOptionsByLanguage,
  CALL_RESULT_DEMO,
  CALL_RESULT_REFUSE,
  CALL_RESULT_RECALL,
} from '../../../crmUtil';
import { connect } from 'react-redux';
import {
  fetchPhoneNumberHistory,
  fetchCallResults,
  fetchSingleReco,
} from '../actions/recoAction';
import { injectIntl } from 'react-intl';

require('moment/locale/ru');

class Phone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      callModalOpen: false,
      recommender: {},
      opened: false,
      buttonLoading: false,
      call: {},
      errors: {
        callResultId: false,
        callReasonId: false,
        callDate: false,
        callRecallDate: false,
        demoClientName: false,
        demoDate: false,
        demoAddress: false,
        demoLocationId: false,
      },
    };
    this.handlePhoneClick = this.handlePhoneClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    // this.onCloseCallModal = this.onCloseCallModal.bind(this);
    this.renderNumberHistory = this.renderNumberHistory.bind(this);
    this.renderCallForm = this.renderCallForm.bind(this);
    this.saveCall = this.saveCall.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderRecommenderInfo = this.renderRecommenderInfo.bind(this);
  }

  componentWillMount() {
    // this.props.fetchCallResults()
  }

  handlePhoneClick() {
    this.setState({
      ...this.state,
      buttonLoading: true,
      opened: true,
    });

    this.props.fetchPhoneNumberHistory(this.props.phoneId);

    axios
      .get(`${ROOT_URL}/api/crm/call/create/${this.props.phoneId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(res => {
        res.data.call.callDate = moment();
        this.setState({
          ...this.state,
          call: res.data.call,
          recommender: res.data.recommender,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleModalClose() {
    this.setState({
      ...this.state,
      opened: false,
      buttonLoading: false,
    });
  }

  renderCallModal(messages) {
    const panes = [
      {
        menuItem: messages['Crm.HistoryOfNumber'],
        render: this.renderNumberHistory,
      },
      { menuItem: messages['Crm.AddingCall'], render: this.renderCallForm },
      {
        menuItem: messages['Form.RecommenderAddData'],
        render: this.renderRecommenderInfo,
      },
    ];
    return (
      <Modal
        size="large"
        open={this.state.opened}
        onClose={this.handleModalClose}
      >
        <Modal.Header>
          {messages['Form.PhoneNumber']}: {this.props.phoneNumber} /{' '}
          {messages['Table.ClientFullName']}: {this.props.clientName}
        </Modal.Header>
        <Modal.Content>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Modal.Content>
      </Modal>
    );
  }

  renderDemoForm(messages, locale) {
    const callResultId = parseInt(this.state.call.callResultId, 10);
    if (!this.state.call.callResultId || callResultId !== CALL_RESULT_DEMO) {
      return null;
    }
    return (
      <div>
        <Form.Group widths="equal">
          <Form.Field
            error={this.state.errors.demoClientName}
            onChange={(e, o) => this.handleChange('demoClientName', o)}
            value={this.state.call.demoClientName || ''}
            control={Input}
            required
            label={messages.fioClient}
            placeholder={messages.fioClient}
          />
          <Form.Field error={this.state.errors.demoDate} required>
            <label>{messages['Crm.DemoDateTime']}</label>
            <DatePicker
              autoComplete="off"
              locale={locale}
              label=""
              placeholderText={messages['Crm.DemoDateTime']}
              showMonthDropdown
              showYearDropdown
              showTimeSelect
              dropdownMode="select"
              dateFormat="DD.MM.YYYY HH:mm"
              selected={this.state.call.demoDate}
              onChange={v => this.handleChange('demoDate', v)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            error={this.state.errors.demoAddress}
            required
            control={TextArea}
            onChange={(e, o) => this.handleChange('demoAddress', o)}
            label={messages['Table.Address']}
            placeholder={messages['Table.Address']}
          />
          <Form.Select
            error={this.state.errors.demoLocationId}
            required
            fluid
            selection
            label={messages['Crm.Location']}
            options={getLocationOptionsByLanguage(locale)}
            onChange={(e, v) => this.handleChange('demoLocationId', v)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={TextArea}
            onChange={(e, o) => this.handleChange('demoNote', o)}
            label={messages['Crm.NoteForDemo']}
            placeholder={messages['Crm.NoteForDemo']}
          />

          <Form.Select
            error={this.state.errors.priceDistrictId}
            required
            fluid
            selection
            label={'Район'}
            options={this.props.demoPriceOptions}
            onChange={(e, v) => this.handleChange('priceDistrictId', v)}
          />
        </Form.Group>
      </div>
    );
  }

  renderRecommenderInfo() {
    const { recommender } = this.state;
    const { messages } = this.props.intl;
    return (
      <Table celled striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">{messages.fioClient}</Header>
            </Table.Cell>
            <Table.Cell>{recommender.clientName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">{messages['Form.Reco.Relative']}</Header>
            </Table.Cell>
            <Table.Cell>{recommender.relationName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">{messages['Form.Reco.PhoneNumber']}</Header>
            </Table.Cell>
            <Table.Cell>
              {recommender.phoneNumbers.map(item => `${item}, `)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  renderCallForm() {
    const { messages, locale } = this.props.intl;
    const call = Object.assign({}, this.state.call);
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label={messages['Form.PhoneNumber']}
            placeholder={this.state.call.phoneNumber}
            readOnly
          />
          <Form.Field required error={this.state.errors.callDate}>
            <label>{messages['Crm.CallDateTime']}</label>
            <DatePicker
              locale={locale}
              autoComplete="off"
              label=""
              placeholderText={messages['Crm.CallDateTime']}
              showMonthDropdown
              showYearDropdown
              showTimeSelect
              dropdownMode="select"
              dateFormat="DD.MM.YYYY HH:mm"
              selected={this.state.call.callDate}
              onChange={v => this.handleChange('callDate', v)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            error={this.state.errors.callResultId}
            required
            name="resultId"
            fluid
            selection
            label={messages['Crm.ResultOfCall']}
            options={this.props.callResultOptions}
            onChange={(e, v) => this.handleChange('callResultId', v)}
          />

          {this.renderCallResultDependentField()}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={TextArea}
            onChange={(e, o) => this.handleChange('callNote', o)}
            label={messages['Crm.NoteForCall']}
            placeholder={messages['Crm.NoteForCall']}
          />
          <Form.Field />
        </Form.Group>
        <Divider />
        {this.renderDemoForm(messages, locale)}
        <Form.Field
          control={Button}
          content={messages.save}
          onClick={this.saveCall}
        />
      </Form>
    );
  }

  validateForm() {
    const { call, errors } = this.state;
    for (const k in errors) {
      if (errors.hasOwnProperty(k)) {
        errors[k] = false;
      }
    }

    if (!call.callDate || call.callDate.length === 0) {
      errors.callDate = true;
    }

    if (!call.callResultId || call.callResultId === 0) {
      errors.callResultId = true;
    } else if (call.callResultId === CALL_RESULT_REFUSE) {
      if (!call.callReasonId || call.callReasonId === 0) {
        errors.callReasonId = true;
      }
    } else if (call.callResultId === CALL_RESULT_RECALL) {
      if (!call.callRecallDate || call.callRecallDate.length === 0) {
        errors.callRecallDate = true;
      }
    } else if (call.callResultId === CALL_RESULT_DEMO) {
      if (!call.demoAddress || call.demoAddress.length === 0) {
        errors.demoAddress = true;
      }

      if (!call.demoLocationId || call.demoLocationId === 0) {
        errors.demoLocationId = true;
      }

      if (!call.demoClientName || call.demoClientName.length === 0) {
        errors.demoClientName = true;
      }

      if (!call.demoDate || call.demoDate.length === 0) {
        errors.demoDate = true;
      }
    }

    this.setState({
      ...this.state,
      errors,
    });
  }

  saveCall() {
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
    axios
      .post(
        `${ROOT_URL}/api/crm/call/${this.props.phoneId}`,
        { ...this.state.call },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(response => {
        if (this.props.recoId) {
          this.props.fetchSingleReco(this.props.recoId);
        }
        this.closeModal();
      })
      .catch(error => {
        console.log(error);
      });
  }

  closeModal() {
    this.setState({
      ...this.state,
      opened: false,
      buttonLoading: false,
    });

    if (this.props.onCloseModal) {
      this.props.onCloseModal();
    }
  }

  renderNumberHistory() {
    const { messages } = this.props.intl;
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>{messages.bukrs}</Table.HeaderCell>
            <Table.HeaderCell>{messages.brnch}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Crm.CallDateTime']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Crm.Called']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Result']}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.historyItems.map((item, idx) => (
            <Table.Row key={item.id}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{item.bukrsName}</Table.Cell>
              <Table.Cell>{item.branchName}</Table.Cell>
              <Table.Cell>{item.dateTimeStr}</Table.Cell>
              <Table.Cell>{item.callerName}</Table.Cell>
              <Table.Cell>{item.note}</Table.Cell>
              <Table.Cell>{item.resultName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  handleChange(fieldName, o) {
    let { call, showDemoForm, errors } = this.state;

    switch (fieldName) {
      case 'callDate':
      case 'callRecallDate':
      case 'demoDate':
        call[fieldName] = o;
        break;
      case 'demoLocationId':
      case 'demoClientName':
      case 'demoAddress':

      case 'callNote':
      case 'demoNote':
        call[fieldName] = o.value;
        break;

      case 'callReasonId':
        call[fieldName] = parseInt(o.value, 10);
        break;

      case 'priceDistrictId':
        call[fieldName] = o.value;
        break;

      case 'callResultId':
        call[fieldName] = parseInt(o.value, 10);
        if (call[fieldName] > 0) {
          errors[fieldName] = false;
        }
        if (call[fieldName] === CALL_RESULT_DEMO) {
          showDemoForm = true;
        } else {
          showDemoForm = false;
        }
        break;

      default: {
      }
    }

    this.setState({
      ...this.state,
      call,
      showDemoForm,
      errors,
    });
  }

  renderCallResultDependentField() {
    const { messages, locale } = this.props.intl;
    if (this.state.call.callResultId === CALL_RESULT_REFUSE) {
      const reasonOptions = [];
      if (this.props.reasons) {
        for (const k in this.props.reasons) {
          if (this.props.reasons[k].typeId === 1) {
            reasonOptions.push({
              key: this.props.reasons[k].id,
              text: this.props.reasons[k].name,
              value: this.props.reasons[k].id,
            });
          }
        }
      }

      // Otkaz
      return (
        <Form.Select
          error={this.state.errors.callReasonId}
          required
          fluid
          label={messages['Crm.RejectionReason']}
          options={reasonOptions}
          onChange={(e, v) => this.handleChange('callReasonId', v)}
        />
      );
    } else if (this.state.call.callResultId === CALL_RESULT_RECALL) {
      // Perzvonit'
      return (
        <Form.Field error={this.state.errors.callRecallDate} required>
          <label>{messages['Crm.RecallDateTime']}</label>
          <DatePicker
            locale={locale}
            autoComplete="off"
            label=""
            placeholderText={messages['Crm.RecallDateTime']}
            showMonthDropdown
            showYearDropdown
            showTimeSelect
            dropdownMode="select"
            dateFormat="DD.MM.YYYY HH:mm"
            selected={this.state.call.callRecallDate}
            onChange={v => this.handleChange('callRecallDate', v)}
          />
        </Form.Field>
      );
    }

    return <Form.Field />;
  }

  render() {
    const { phoneNumber } = this.props;
    const { messages } = this.props.intl;
    return (
      <p>
        {this.state.buttonLoading ? (
          <Button loading>Loading</Button>
        ) : (
          <Label as="button" horizontal onClick={this.handlePhoneClick}>
            <Icon disabled name="phone" />
            {phoneNumber}
          </Label>
        )}

        {this.renderCallModal(messages)}
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    historyItems: state.crmReco.phoneNumberHistory,
    callResultOptions: state.crmReco.callResultOptions,
    reasons: state.crmDemo.reasons,
  };
}

export default connect(
  mapStateToProps,
  { fetchPhoneNumberHistory, fetchCallResults, fetchSingleReco },
)(injectIntl(Phone));

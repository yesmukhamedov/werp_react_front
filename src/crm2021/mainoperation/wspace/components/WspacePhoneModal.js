import React, { Component } from 'react';
import _ from 'lodash';
import {
  Modal,
  Button,
  Table,
  Grid,
  Form,
  Input,
  TextArea,
  Divider,
  Tab,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { togglePhoneModal, saveCall } from '../actions/wspaceAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  CALL_RESULT_REFUSE,
  CALL_RESULT_RECALL,
  CALL_RESULT_DEMO,
  CALL_RESULT_NOT_AVAILABLE,
  CALL_RESULT_NO_ANSWER,
  getLocationOptionsByLanguage,
} from '../../../crmUtil';
import { renderCallResultLabel } from '../../../CrmHelper';
import { injectIntl } from 'react-intl';
import { blankCall } from '../../call/actions/callAction';
require('moment/locale/ru');

class WspacePhoneModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      callForm: {
        callDate: new Date(),
        demoForm: {
          result: 'UNKNOWN',
        },
      },
    };
  }

  componentDidMount() {}

  handleDemoForm = (name, data) => {
    let callForm = Object.assign({}, this.state.callForm);
    let form = Object.assign({}, callForm.demoForm);
    if (name === 'dateTime') {
      form[name] = data;
    } else {
      form[name] = data.value;
    }

    callForm['demoForm'] = form;

    this.setState({
      ...this.state,
      callForm: callForm,
    });
  };

  handleChange = (name, data) => {
    console.log('DATA: ', data);
    console.log('DATA2: ', data.options);
    let callForm = Object.assign({}, this.state.callForm);
    let value = '';
    if (name === 'callDate' || name === 'calRecallDate') {
      callForm[name] = data;
    } else if (name === 'callReasonId') {
      callForm[name] = data.value;
    } else {
      callForm[name] = data.value;
    }

    this.setState({
      ...this.state,
      callForm: callForm,
    });
  };

  renderNumberHistory = () => {
    let { historyItems } = this.props;
    if (!historyItems) {
      historyItems = [];
    }

    const { messages } = this.props.intl;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>{messages['bukrs']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['brnch']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Crm.CallDateTime']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Crm.Called']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Result']}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {historyItems.map((item, idx) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{item.bukrsName}</Table.Cell>
                <Table.Cell>{item.branchName}</Table.Cell>
                <Table.Cell>{item.dateTime}</Table.Cell>
                <Table.Cell>{item.callerName}</Table.Cell>
                <Table.Cell>{item.note}</Table.Cell>
                <Table.Cell>
                  {renderCallResultLabel(item.resultId, item.resultName)}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  renderCallResultDependentField = messages => {
    const { callForm } = this.state;
    const { locale } = this.props.intl;
    const { formErrors } = this.props;
    if (callForm.callResult === CALL_RESULT_REFUSE) {
      let reasonOptions = [];
      if (this.props.reasons) {
        for (let k in this.props.reasons) {
          if (this.props.reasons[k]['type'] === 'DEMO_REFUSE') {
            reasonOptions.push({
              key: this.props.reasons[k]['id'],
              text: this.props.reasons[k]['name'],
              value: this.props.reasons[k]['id'],
              type: this.props.reasons[k]['type'],
            });
          }
        }
      }

      // Otkaz
      return (
        <Form.Select
          error={formErrors['callReasonId'] ? true : false}
          required
          name="callReasonId"
          fluid
          label={messages['Crm.RejectionReason']}
          options={reasonOptions}
          onChange={(e, v) => this.handleChange('callReasonId', v)}
        />
      );
    } else if (
      callForm.callResult === CALL_RESULT_RECALL ||
      callForm.callResult === CALL_RESULT_NOT_AVAILABLE ||
      callForm.callResult === CALL_RESULT_NO_ANSWER
    ) {
      // Perzvonit'
      return (
        <Form.Field
          required
          error={formErrors['callRecallDate'] ? true : false}
        >
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
            selected={callForm.callRecallDate}
            onChange={v => this.handleChange('callRecallDate', v)}
          />
        </Form.Field>
      );
    }

    return <Form.Field />;
  };

  renderDemoForm = () => {
    let callForm = Object.assign({}, this.state.callForm);
    const { messages, locale } = this.props.intl;
    const { formErrors } = this.props;
    console.log('callRes', callForm);
    if (!callForm.callResult || callForm.callResult != CALL_RESULT_DEMO) {
      return null;
    }

    let demoForm = callForm['demoForm'] || {};

    return (
      <div>
        <Form.Group widths="equal">
          <Form.Field
            readOnly
            control={Input}
            value={this.props.reco.clientName || ''}
            required
            label={messages['fioClient']}
            placeholder={messages['fioClient']}
          />

          <Form.Field
            required
            error={formErrors['demoForm.dateTime'] ? true : false}
          >
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
              selected={demoForm.dateTime ? moment(demoForm.dateTime) : null}
              onChange={v => this.handleDemoForm('dateTime', v)}
            />
          </Form.Field>

          <Form.Select
            error={formErrors['demoForm.location'] ? true : false}
            required
            fluid
            selection
            label={messages['Crm.Location']}
            options={getLocationOptionsByLanguage(locale)}
            onChange={(e, v) => this.handleDemoForm('location', v)}
          />

          <Form.Select
            error={formErrors['demoForm.dealerId'] ? true : false}
            value={demoForm.dealerId}
            required
            fluid
            selection
            label={messages['dealer']}
            options={this.props.dealers}
            onChange={(e, v) => this.handleDemoForm('dealerId', v)}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            error={formErrors['demoForm.address'] ? true : false}
            required
            control={TextArea}
            onChange={(e, o) => this.handleDemoForm('address', o)}
            label={messages['Table.Address']}
            placeholder={messages['Table.Address']}
          />
          <Form.Field
            control={TextArea}
            onChange={(e, o) => this.handleDemoForm('note', o)}
            label={messages['Crm.NoteForDemo']}
            placeholder={messages['Crm.NoteForDemo']}
          />
        </Form.Group>
      </div>
    );
  };

  renderCallForm = () => {
    let callForm = Object.assign({}, this.state.callForm);
    const errors = this.props.formErrors;
    console.log(this.props.reco);
    const { messages, locale } = this.props.intl;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            value={this.props.currentPhone.phoneNumber}
            readOnly
            control={Input}
            label={messages['Table.PhoneNumber']}
            placeholder={messages['Table.PhoneNumber']}
          />

          <Form.Field required error={errors['callDate'] ? true : false}>
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
              selected={callForm.callDate ? moment(callForm.callDate) : null}
              onChange={v => this.handleChange('callDate', v)}
            />
          </Form.Field>

          <Form.Select
            required
            name="callResult"
            error={errors['callResult'] ? true : false}
            fluid
            selection
            label={messages['Crm.ResultOfCall']}
            options={this.props.callResultOptions || []}
            onChange={(e, v) => this.handleChange('callResult', v)}
          />

          {this.renderCallResultDependentField(messages)}
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
        {this.renderDemoForm()}
        <Form.Field
          control={Button}
          color="blue"
          content={messages['save']}
          onClick={this.saveCall}
        />
      </Form>
    );
  };

  saveCall = () => {
    let callForm = Object.assign({}, this.state.callForm);
    const { currentPhone, reco } = this.props;
    if (callForm.callResult === CALL_RESULT_DEMO) {
      callForm['demoForm']['clientName'] = reco.clientName;
    }
    callForm['phoneNumber'] = currentPhone.phoneNumber;
    callForm['context'] = 'RECO';
    callForm['contextId'] = reco.id;
    this.props.saveCall(currentPhone.id, callForm);
  };

  handleOpen = () => {
    console.log('onOpen');
  };

  onMount() {
    console.log('onMount');
  }

  onUnmount() {
    console.log('onUnmount');
  }

  handleClose = () => {
    console.log('CLLLLOOO');
    this.props.togglePhoneModal(false);
    this.setState({
      callForm: {},
    });
  };

  render() {
    const { messages } = this.props.intl;
    const { reco, currentPhone, recommender } = this.props;
    const panes = [
      {
        menuItem: messages['Crm.HistoryOfNumber'],
        render: this.renderNumberHistory,
      },
      { menuItem: messages['Crm.AddingCall'], render: this.renderCallForm },
    ];
    return (
      <Modal
        onOpen={this.handleOpen}
        size={'fullscreen'}
        open={this.props.opened}
        closeOnDimmerClick={false}
        onClose={this.handleClose}
      >
        <Modal.Header>
          <Grid centered columns={2}>
            <Grid.Column style={{ fontSize: '12px' }}>
              <Segment>
                {messages['Form.RecommenderFullName']}:{' '}
                <i style={{ fontWeight: 'normal' }}>{recommender.clientName}</i>
                <br />
                {messages['Table.PhoneNumber']}:{' '}
                {recommender.phones
                  ? recommender.phones.map(p => (
                      <span key={p.id} style={{ marginRight: '5px' }}>
                        {p.phoneNumber}
                      </span>
                    ))
                  : ''}
                <br />
                {messages['Table.Address']}:{' '}
                <i style={{ fontWeight: 'normal' }}>{recommender.address}</i>
                <br />
                {messages['Table.Result']}:{' '}
                <i style={{ fontWeight: 'normal' }}>
                  {recommender.demoResultName}
                </i>
                <br />
                {messages['Crm.AddInfo']}:{' '}
                <i style={{ fontWeight: 'normal' }}>{recommender.addInfo}</i>
                <br />
              </Segment>
            </Grid.Column>
            <Grid.Column style={{ fontSize: '12px' }}>
              <Segment>
                {messages['fioClient']}:{' '}
                <i style={{ fontWeight: 'normal' }}>{reco.clientName}</i>
                <br />
                {messages['Table.PhoneNumber']}:{' '}
                <i style={{ fontWeight: 'normal' }}>
                  {currentPhone.phoneNumber}
                </i>
                <br />
                Prof: <i style={{ fontWeight: 'normal' }}>
                  {reco.profession}
                </i>; {messages['Form.Reco.Relative']}:{' '}
                <i style={{ fontWeight: 'normal' }}>{reco.relativeName}</i>
              </Segment>
            </Grid.Column>
          </Grid>
        </Modal.Header>
        <Modal.Content>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose} negative>
            {messages['close']}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    opened: state.crmWspaceReducer2021.phoneModalOpened,
    historyItems: state.crmWspaceReducer2021.phoneNumberHistory,
    reco: state.crmWspaceReducer2021.phoneNumberReco,
    currentPhone: state.crmWspaceReducer2021.currentPhone,
    recommender: state.crmWspaceReducer2021.currentRecommender,
    callResultOptions: state.crmReco2021.callResultOptions,
    reasons: state.crmDemo2021.reasons,
    dealers: state.crmDemo2021.dealers,
    callForm: state.crmWspaceReducer2021.callForm,
    formErrors: state.crmWspaceReducer2021.callFormErrors,
  };
}

export default connect(mapStateToProps, {
  togglePhoneModal,
  saveCall,
  getLocationOptionsByLanguage,
  blankCall,
})(injectIntl(WspacePhoneModal));

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Form,
  Dropdown,
  Table,
  Input,
  Button,
  TextArea,
  Checkbox,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/tr';
import { injectIntl } from 'react-intl';

import {
  fetchServCrmCallStatus,
  postSmregcCreateCall,
} from '../../serviceAction';

import OutputErrors from '../../../general/error/outputErrors';

import 'react-datepicker/dist/react-datepicker.css';
import './smregc.css';

function Smregc(props) {
  const emptyCall = {
    description: '',
    callDirection: '',
    description2: '',
    callStatusId: '',
  };

  const [call, setCall] = useState({ ...emptyCall });
  const [callDate, setCallDate] = useState(moment(new Date()));
  const [appointDate, setAppointDate] = useState(moment(new Date()));
  const [scheduleCall, setScheduleCall] = useState(false);
  const [error, setError] = useState([]);

  const url = window.location.search;
  const contractNumber = url.slice(url.indexOf('=') + 1);
  const userName = localStorage.getItem('username');
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const callD = localStorage.getItem('callDirection');

  useEffect(() => {
    setCall({ ...call, callDirection: Number.parseInt(callD, 10) });
  }, []);

  const {
    servCrmCallStatus,
    language,
    intl: { messages },
  } = props;

  useEffect(() => {
    props.fetchServCrmCallStatus();
  }, []);

  const onInputChange = (e, fieldname) => {
    setCall(prev => {
      const newCall = { ...prev };
      switch (fieldname) {
        case 'description':
          newCall.description = e.value;
          break;
        case 'callDirection':
          newCall.callDirection = Number.parseInt(e.value, 10);
          localStorage.setItem(fieldname, e.value);
          break;
        case 'description2':
          newCall.description2 = e.value;
          break;
        case 'callStatusId':
          newCall.callStatusId = e.value;
          break;
      }
      return newCall;
    });
  };

  const handleSubmit = () => {
    validate();
    const crmHistoryDate = callDate.format('DD.MM.YYYY hh:mm:ss');
    const crmScheduleDate = appointDate.format('DD.MM.YYYY hh:mm:ss');

    const { tovarSn, branchId, bukrs } = props.location.state;
    const { callDirection, callStatusId, description, description2 } = call;
    if (callDirection !== '' && callStatusId !== '' && description !== '') {
      props.postSmregcCreateCall(
        {
          scheduleCall,
          servCrmHistoryDto: {
            callDirection,
            callStatusId,
            contractId: Number.parseInt(contractNumber, 10),
            crmHistoryDate,
            info: description,
            tovarSn,
          },
          servCrmScheduleDto: {
            branchId,
            bukrs,
            contractId: Number.parseInt(contractNumber, 10),
            crmScheduleDate,
            info: description2,
            tovarSn,
          },
        },
        () => {
          props.history.push(`smcuspor?contractNumber=${contractNumber}`);
        },
      );
    }
  };

  const validate = () => {
    const errors = [];
    if (call.callDireaction === '') {
      errors.push(errorTable['hi there']);
    }
    if (call.callStatusId === '') {
      errors.push(errorTable['hi there']);
    }
    if (call.description === '') {
      errors.push(errorTable['hi there']);
    }
    if (scheduleCall && call.description2 === '') {
      errors.push(errorTable['hi there']);
    }
    setError(() => errors);
  };

  const servCrmCallOpt = servCrmCallStatus.map(item => {
    return {
      key: item.id,
      value: item.id,
      text: item[language],
    };
  });

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={7}>
          <Segment>
            <h1>{messages['call_register']}</h1>
            <Table striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={5}>{messages['Operator']}</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid value={userName} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['Form.Date']}</Table.Cell>
                  <Table.Cell>
                    <Input>
                      <DatePicker
                        autoComplete="off"
                        dateFormat="DD/MM/YYYY"
                        selected={callDate}
                        dropdownMode="select"
                        locale={language}
                        showMonthDropDown
                        showYearDropDown
                        maxDate={moment(new Date())}
                        onChange={date => setCallDate(date)}
                      />
                    </Input>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['call_status']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['call_status']}
                      fluid
                      selection
                      search
                      options={servCrmCallOpt}
                      onChange={(e, o) => onInputChange(o, 'callStatusId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['call']}</Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Checkbox
                              radio
                              label={messages['incoming']}
                              name="changeTerm"
                              value="1"
                              checked={Number.parseInt(callD, 10) === 1}
                              onChange={(e, o) =>
                                onInputChange(o, 'callDirection')
                              }
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              radio
                              label={messages['outgoing']}
                              name="changeTerm"
                              value="2"
                              checked={Number.parseInt(callD, 10) === 2}
                              onChange={(e, o) =>
                                onInputChange(o, 'callDirection')
                              }
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['Table.Note']}</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea
                        placeholder={messages['Table.Note']}
                        onChange={(e, o) => onInputChange(o, 'description')}
                      />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={5}>{messages['schedule_call']}</Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell collapsing>
                            <Checkbox
                              onChange={(e, o) => setScheduleCall(o.checked)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input>
                              <DatePicker
                                autoComplete="off"
                                dateFormat="DD/MM/YYYY"
                                selected={appointDate}
                                dropdownMode="select"
                                locale={language}
                                showMonthDropDown
                                showYearDropDown
                                onChange={date => setAppointDate(date)}
                                disabled={!scheduleCall}
                              />
                            </Input>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['Table.Note']}</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea
                        placeholder={messages['Table.Note']}
                        onChange={(e, o) => onInputChange(o, 'description2')}
                        disabled={!scheduleCall}
                      />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button
              fluid
              color="blue"
              size="small"
              onClick={() => handleSubmit()}
            >
              {messages['save']}
            </Button>
          </Segment>
          <OutputErrors errors={error} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    servCrmCallStatus: state.serviceReducer.servCrmCallStatus,
  };
}

export default connect(mapStateToProps, {
  fetchServCrmCallStatus,
  postSmregcCreateCall,
})(injectIntl(Smregc));

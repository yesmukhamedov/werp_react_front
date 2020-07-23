import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Dropdown,
  Table,
  Input,
  Button,
  Checkbox,
  Form,
  TextArea,
} from 'semantic-ui-react';

import { fetchServAppType } from '../../reference/srefAction';
import {
  fetchServCrmCallStatus,
  postSmccaCreateApp,
} from '../../serviceAction';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/tr';
import { injectIntl } from 'react-intl';

import 'react-datepicker/dist/react-datepicker.css';
import './smcca.css';

function Smcca(props) {
  const emptyRequest = {
    servAppType: '',
    callDirectionId: '',
    description: '',
    description2: '',
    callStatusId: '',
  };

  const serviceApplicationDto = {
    addressId: null,
    addressName: null,
    applicantName: null,
    applicationDate: null,
    applicationNumber: null,
    applicationStatusId: null,
    applicationStatusName: null,
    applicationTypeId: null,
    applicationTypeName: null,
    branchId: null,
    branchName: null,
    bukrsId: null,
    bukrsName: null,
    contractNumber: null,
    countryId: null,
    countryName: null,
    createdBy: null,
    customerFIO: null,
    customerId: null,
    f1MtLeft: null,
    f2MtLeft: null,
    f3MtLeft: null,
    f4MtLeft: null,
    f5MtLeft: null,
    fitterFIO: null,
    fitterId: null,
    fullPhone: null,
    id: null,
    inPhoneNum: null,
    info: null,
    installmentDate: null,
    masterFIO: null,
    masterId: null,
    matnrId: null,
    matnrName: null,
    operatorFIO: null,
    operatorId: null,
    rescheduledDate: null,
    serviceDate: null,
    serviceFilterPlanId: null,
    serviceFilterVCPlanId: null,
    serviceId: null,
    tovarCategoryId: null,
    tovarCategoryName: null,
    tovarSn: null,
    updatedBy: null,
    updatedDate: null,
    urgencyLevel: null,
  };
  const serviceCrmHistoryDto = {
    actionId: null,
    actionName: null,
    applicationId: null,
    applicationStatusId: null,
    applicationStatusName: null,
    applicationTypeId: null,
    applicationTypeName: null,
    callDirectionId: null,
    callDirectionName: null,
    callStatusId: null,
    callStatusName: null,
    contractNumber: null,
    crmHistoryDate: null,
    id: null,
    info: null,
    masterFIO: null,
    masterId: null,
    operatorFIO: null,
    operatorId: null,
    serviceCurrencyId: null,
    serviceCurrencyName: null,
    serviceId: null,
    servicePrice: null,
    serviceTypeName: null,
    serviceWaers: null,
    tovarSn: null,
  };
  const [request, setRequest] = useState({ ...emptyRequest });
  const [scheduleCall, setScheduleCall] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState(false);
  const [callDate, setCallDate] = useState(moment(new Date()));
  const [callAppData, setCallAppDate] = useState(moment(new Date()));
  const [error, setError] = useState([]);

  const url = window.location.search;
  const contractNumber = url.slice(url.indexOf('=') + 1);
  const lang = localStorage.getItem('language');
  const callD = localStorage.getItem('callDirectionId');
  const scheduleCallToggle = localStorage.getItem('scheduleCall');
  const bool = scheduleCallToggle === 'true';

  useEffect(() => {
    setRequest({ ...request, callDirectionId: Number.parseInt(callD, 10) });
    setScheduleCall(bool);
  }, []);
  useEffect(() => {
    props.fetchServAppType();
    props.fetchServCrmCallStatus();
  }, []);

  const {
    servAppType,
    servCrmCallStatus,
    intl: { messages },
    location: {
      state: {
        clientContract = {},
        serviceFilterPlanId,
        serviceFilterVCPlanId,
        operatorId,
        operatorFIO,
      },
    },
  } = props;

  const {
    bukrsId = '',
    bukrsName = '',
    branchId = '',
    serviceBranchName = '',
    customerId = '',
    serviceBranchId,
    customerFIO,
    serviceAddressName,
    fullPhone,
    tovarSn,
    matnrName,
    installmentDate,
    fitterFIO,
    f1MtLeft,
    f2MtLeft,
    f3MtLeft,
    f4MtLeft,
    f5MtLeft,
  } = clientContract;

  const onInputChange = (o, fieldName) => {
    setRequest(prev => {
      const varRequest = { ...prev };
      switch (fieldName) {
        case 'servAppType':
          varRequest.servAppType = o.value;
          break;
        case 'callDirectionId':
          varRequest.callDirectionId = Number.parseInt(o.value, 10);
          localStorage.setItem(fieldName, o.value);
          break;
        case 'description':
          varRequest.description = o.value;
          break;
        case 'description2':
          varRequest.description2 = o.value;
          break;
        case 'callStatusId':
          varRequest.callStatusId = o.value;
          o.options.map(item => {
            if (item.key === o.value) {
              varRequest.description2 = item.text;
            }
          });
          break;
        default:
          varRequest[fieldName] = o.value;
      }
      return varRequest;
    });
  };

  const handleSubmit = () => {
    validate();
    const crmHistoryDate = callDate.format('YYYY-MM-DD HH:mm:ss');

    const {
      servAppType,
      callDirectionId,
      description,
      description2,
      callStatusId,
    } = request;

    if (
      servAppType !== '' &&
      branchId !== '' &&
      bukrsId !== '' &&
      customerId !== '' &&
      description !== ''
    ) {
      props.postSmccaCreateApp(
        {
          callRegister: scheduleCall,
          application: {
            ...serviceApplicationDto,
            applicationTypeId: servAppType,
            branchId: serviceBranchId,
            bukrsId,
            contractNumber: Number.parseInt(contractNumber, 10),
            info: description,
            customerId,
            tovarSn,
            applicationDate:
              callAppData === null
                ? null
                : callAppData.format('YYYY-MM-DD HH:mm:ss'),
            urgencyLevel,
            serviceFilterPlanId,
            serviceFilterVCPlanId,
            operatorId,
          },
          crmHistory: {
            ...serviceCrmHistoryDto,
            callDirectionId,
            info: description2,
            callStatusId,
            contractNumber: Number.parseInt(contractNumber, 10),
            crmHistoryDate,
            tovarSn,
            operatorId,
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
    if (request.servAppType === '') {
      errors.push(errorTableText(166));
    }
    if (request.description === '') {
      errors.push(errorTableText(169));
    }
    if (scheduleCall && request.callStatusId === '') {
      errors.push(errorTableText(170));
    }
    if (
      (scheduleCall && request.callDirectionId === '') ||
      (scheduleCall && Number.isNaN(request.callDirectionId))
    ) {
      errors.push(errorTableText(171));
    }
    if (scheduleCall && request.description2 === '') {
      errors.push(errorTableText(169));
    }
    setError(() => errors);
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={16} computer={7}>
          <h1>{messages['create_request']}</h1>
          <Segment>
            <Form>
              <h3>{messages['L__CLIENT_INFO']}</h3>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{messages['bukrs']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={bukrsName ? bukrsName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['brnch']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={serviceBranchName ? serviceBranchName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['Product']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={matnrName ? matnrName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field required>
                        <label>{messages['type_of_application']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={messages['type_of_application']}
                        fluid
                        selection
                        search
                        options={servAppOpts(servAppType, lang)}
                        onChange={(e, o) => onInputChange(o, 'servAppType')}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field>
                        <label>{messages['Application_Date']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <DatePicker
                                autoComplete="off"
                                dateFormat="DD/MM/YYYY HH:mm"
                                selected={callAppData}
                                dropdownMode="select"
                                locale={lang}
                                timeFormat="HH:mm"
                                showTimeSelect
                                injectTimes={[
                                  moment()
                                    .hours(23)
                                    .minutes(59),
                                ]}
                                onChange={date => setCallAppDate(date)}
                              />
                            </Table.Cell>
                            <Table.Cell collapsing>
                              <Checkbox
                                onChange={(e, o) => {
                                  setUrgencyLevel(o.checked);
                                }}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Form.Field>
                                <label>{messages['urgent']}</label>
                              </Form.Field>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell verticalAlign="top">
                      {messages['Operator']}
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={operatorFIO ? operatorFIO : ''}
                      />
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Input
                                size="mini"
                                label="F1"
                                className="input__filter_terms"
                                value={f1MtLeft ? f1MtLeft : ''}
                              />
                              <Input
                                size="mini"
                                label="F2"
                                className="input__filter_terms"
                                value={f2MtLeft ? f2MtLeft : ''}
                              />
                              <Input
                                size="mini"
                                label="F3"
                                className="input__filter_terms"
                                value={f3MtLeft ? f3MtLeft : ''}
                              />
                              <Input
                                size="mini"
                                label="F4"
                                className="input__filter_terms"
                                value={f4MtLeft ? f4MtLeft : ''}
                              />
                              <Input
                                size="mini"
                                label="F5"
                                className="input__filter_terms"
                                value={f5MtLeft ? f5MtLeft : ''}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['full_name_of_client']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={customerFIO ? customerFIO : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['address']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={serviceAddressName ? serviceAddressName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['contacts']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={fullPhone ? fullPhone : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={tovarSn ? tovarSn : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['installation_date']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={
                          installmentDate
                            ? moment(installmentDate).format('DD-MM-YYYY')
                            : ''
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={fitterFIO ? fitterFIO : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field required>
                        <label>{messages['bktxt']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <TextArea
                          placeholder={messages['bktxt']}
                          onChange={(e, o) => onInputChange(o, 'description')}
                        />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['plan_number']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={serviceFilterPlanId ? serviceFilterPlanId : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['plan_number_vc']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        disabled
                        value={
                          serviceFilterVCPlanId ? serviceFilterVCPlanId : ''
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Form.Field>
                <h4>{messages['call_register']}</h4>
              </Form.Field>
              <Form.Field>
                <Checkbox
                  toggle
                  checked={scheduleCall}
                  onChange={(e, o) => {
                    setScheduleCall(o.checked);
                    localStorage.setItem('scheduleCall', !scheduleCall);
                  }}
                />
              </Form.Field>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <label>{messages['date']}</label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input>
                        <DatePicker
                          autoComplete="off"
                          dateFormat="DD/MM/YYYY HH:mm"
                          selected={callDate}
                          dropdownMode="select"
                          locale={lang}
                          timeFormat="HH:mm"
                          showTimeSelect
                          injectTimes={[
                            moment()
                              .hours(23)
                              .minutes(59),
                          ]}
                          maxDate={moment(new Date())}
                          onChange={date => setCallDate(date)}
                          disabled
                        />
                      </Input>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field required={scheduleCall ? true : false}>
                        <label>{messages['call_status']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={messages['call_status']}
                        fluid
                        selection
                        search
                        options={servCrmCallOpt(servCrmCallStatus, lang)}
                        onChange={(e, o) => onInputChange(o, 'callStatusId')}
                        disabled={!scheduleCall}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field required={scheduleCall ? true : false}>
                        <label>{messages['incoming']}</label>
                      </Form.Field>
                    </Table.Cell>
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
                                  onInputChange(o, 'callDirectionId')
                                }
                                disabled={!scheduleCall}
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
                                  onInputChange(o, 'callDirectionId')
                                }
                                disabled={!scheduleCall}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field required={scheduleCall ? true : false}>
                        <label>{messages['bktxt']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <TextArea
                          placeholder={messages['bktxt']}
                          onChange={(e, o) => onInputChange(o, 'description2')}
                          disabled={!scheduleCall}
                          value={request.description2}
                        />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <OutputErrors errors={error} />
              <Form.Field>
                <Button color="blue" fluid onClick={() => handleSubmit()}>
                  {messages['save']}
                </Button>
              </Form.Field>
              <Form.Field>
                <Button color="red" fluid onClick={() => window.history.back()}>
                  {messages['cancel']}
                </Button>
              </Form.Field>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const servAppOpts = (servAppType, lang) => {
  if (!servAppType) {
    return [];
  }
  let out = servAppType.map(item => {
    return {
      key: item.id,
      value: item.id,
      text: item[lang],
    };
  });
  return out;
};

const servCrmCallOpt = (servCrmCallStatus, lang) => {
  if (!servCrmCallStatus) {
    return [];
  }
  let out = servCrmCallStatus.map(item => {
    return {
      key: item.id,
      value: item.id,
      text: item[lang],
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    servAppType: state.srefReducer.servAppType,
    servCrmCallStatus: state.serviceReducer.servCrmCallStatus,
  };
}

export default connect(mapStateToProps, {
  fetchServAppType,
  fetchServCrmCallStatus,
  postSmccaCreateApp,
})(injectIntl(Smcca));

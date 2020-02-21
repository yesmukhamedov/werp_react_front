import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Dropdown,
  Table,
  Input,
  Button,
  Message,
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
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { injectIntl } from 'react-intl';

import 'react-datepicker/dist/react-datepicker.css';
import './smcca.css';

function Smcca(props) {
  const emptyRequest = {
    servAppType: '',
    callDirection: '',
    description: '',
    description2: '',
    callStatusId: '',
  };
  const [request, setRequest] = useState({ ...emptyRequest });
  const [scheduleCall, setScheduleCall] = useState(false);
  const [callDate, setCallDate] = useState(moment(new Date()));
  const [error, setError] = useState([]);

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const url = window.location.search;
  const contractNumber = url.slice(url.indexOf('=') + 1);
  const userName = localStorage.getItem('username');
  const lang = localStorage.getItem('language');
  const callD = localStorage.getItem('callDirection');
  const scheduleCallToggle = localStorage.getItem('scheduleCall');
  const bool = scheduleCallToggle === 'true';

  useEffect(() => {
    setRequest({ ...request, callDirection: Number.parseInt(callD, 10) });
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
    location: { state = {} },
  } = props;

  const {
    bukrs = '',
    bukrsName = '',
    branchId = '',
    servBranchName = '',
    customerId = '',
    customerName,
    addrServ,
    fullPhone,
    tovarSn,
    matnrName,
    installmentDate,
    fitterName,
    f1MtLeft,
    f2MtLeft,
    f3MtLeft,
    f4MtLeft,
    f5MtLeft,
  } = state;

  const onInputChange = (o, fieldName) => {
    setRequest(prev => {
      const varRequest = { ...prev };
      switch (fieldName) {
        case 'servAppType':
          varRequest.servAppType = o.value;
          break;
        case 'callDirection':
          varRequest.callDirection = Number.parseInt(o.value, 10);
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
          break;
        default:
          varRequest[fieldName] = o.value;
      }
      return varRequest;
    });
  };

  const handleSubmit = () => {
    validate();
    const crmHistoryDate = callDate.format('DD.MM.YYYY hh:mm:ss');

    const {
      servAppType,
      callDirection,
      description,
      description2,
      callStatusId,
    } = request;

    if (
      servAppType !== '' &&
      branchId !== '' &&
      bukrs !== '' &&
      customerId !== '' &&
      description !== ''
    ) {
      props.postSmccaCreateApp(
        {
          callRegister: scheduleCall,
          servCrmHistoryDto: {
            callDirection,
            info: description2,
            callStatusId,
            crmHistoryDate,
            tovarSn,
            contractId: Number.parseInt(contractNumber, 10),
          },
          serviceApplicationSingleRowDto: {
            appType: servAppType,
            branchId,
            bukrs,
            contractNumber: Number.parseInt(contractNumber, 10),
            info: description,
            customerId,
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
    if (request.servAppType === '') {
      errors.push(errorTable['hi there']);
    }
    if (branchId === '') {
      errors.push(errorTable['hi there']);
    }
    if (bukrs === '') {
      errors.push(errorTable['hi there']);
    }
    if (customerId === '') {
      errors.push(errorTable['hi there']);
    }
    if (request.description === '') {
      errors.push(errorTable['hi there']);
    }
    setError(() => errors);
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={16} computer={7}>
          <h1>Создание заявки</h1>
          <Segment>
            <h3>Данные клиента</h3>
            <Table compact striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{messages['bukrs']}</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
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
                      value={servBranchName ? servBranchName : ''}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Товар</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
                      value={matnrName ? matnrName : ''}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Вид заявки</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder="Вид заявки"
                      fluid
                      selection
                      search
                      options={servAppOpts(servAppType, lang)}
                      onChange={(e, o) => onInputChange(o, 'servAppType')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell verticalAlign="top">Оператор</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
                      value={userName ? userName : ''}
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
                  <Table.Cell>ФИО клиента</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
                      value={customerName ? customerName : ''}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Адрес</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
                      value={addrServ ? addrServ : ''}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Kонтакты</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
                      value={fullPhone ? fullPhone : ''}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Заводской номер</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid value={tovarSn ? tovarSn : ''} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата установки</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
                      value={installmentDate ? installmentDate : ''}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Установщик</Table.Cell>
                  <Table.Cell>
                    <Input
                      size="small"
                      fluid
                      value={fitterName ? fitterName : ''}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Примечание</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea
                        placeholder="Примечание"
                        onChange={(e, o) => onInputChange(o, 'description')}
                      />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Checkbox
              toggle
              checked={scheduleCall}
              onChange={(e, o) => {
                setScheduleCall(o.checked);
                localStorage.setItem('scheduleCall', !scheduleCall);
              }}
            />
            <Table compact striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Дата</Table.Cell>
                  <Table.Cell>
                    <Input>
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={callDate}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                        maxDate={moment(new Date())}
                        onChange={date => setCallDate(date)}
                        disabled={!scheduleCall}
                      />
                    </Input>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Статус звонка</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder="Статус звонка"
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
                  <Table.Cell>Звонок</Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Checkbox
                              radio
                              label="Входящий"
                              name="changeTerm"
                              value="1"
                              checked={Number.parseInt(callD, 10) === 1}
                              onChange={(e, o) =>
                                onInputChange(o, 'callDirection')
                              }
                              disabled={!scheduleCall}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              radio
                              label="Исходящий"
                              name="changeTerm"
                              value="2"
                              checked={Number.parseInt(callD, 10) === 2}
                              onChange={(e, o) =>
                                onInputChange(o, 'callDirection')
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
                  <Table.Cell>Примечание</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea
                        placeholder="Примечание"
                        onChange={(e, o) => onInputChange(o, 'description2')}
                        disabled={!scheduleCall}
                      />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button color="blue" fluid onClick={() => handleSubmit()}>
              Сохранить
            </Button>
          </Segment>
          <OutputErrors errors={error} />
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

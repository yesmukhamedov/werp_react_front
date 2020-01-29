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
} from 'semantic-ui-react';
import {
  f4ClearAnyObject,
  f4FetchConTypeList,
} from '../../../reference/f4/f4_action';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { injectIntl } from 'react-intl';

import 'react-datepicker/dist/react-datepicker.css';
import './smccald.css';

function Smccald(props) {
  const emptyRequest = {
    bukrs: '',
    branchId: '',
    requestTypeId: '',
  };
  const [request, setRequest] = useState({ ...emptyRequest });
  const [requestTypeOpts, setRequestTypeOpts] = useState([]);

  const {
    companyOptions = [],
    branchOptions = [],
    contractTypeList,
    intl: { messages },
  } = props;

  useEffect(() => {
    props.f4FetchConTypeList();
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_CONTYPE_LIST');
    };
  }, []);

  const onInputChange = (o, fieldName) => {
    setRequest(prev => {
      const varRequest = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varRequest.bukrs = o.value;
          break;
        case 'branchId':
          let waSelectedBranch = {};
          branchOptions[request.bukrs]
            .filter(item => item.key === o.value)
            .forEach(item => {
              waSelectedBranch = item;
            });

          varRequest.branchId = o.value;

          let wa = { ...emptyRequest };
          wa.bukrs = prev.bukrs;
          wa.branchId = o;

          let waConOptions = contractTypeList
            .filter(
              item =>
                (item.bukrs == wa.bukrs &&
                  item.business_area_id == waSelectedBranch.businessareaid) ||
                (item.bukrs == wa.bukrs &&
                  item.businessareaid == 4 &&
                  waSelectedBranch.branchId == 210),
            )
            .map(item => {
              return {
                key: item.contract_type_id,
                value: item.contract_type_id,
                text: item.name,
              };
            });
          setRequestTypeOpts(waConOptions);
          break;
        case 'requestTypeId':
          varRequest.requestTypeId = o.value;
          break;
        case 'requestDate':
          varRequest.requestDate = o.format('YYYY-MM-DD');
          break;

        default:
          varRequest[fieldName] = o.value;
      }
      return varRequest;
    });
  };
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={16} computer={7}>
          <h1>Создать заявку без данных</h1>
          <Segment>
            <Table compact striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{messages['bukrs']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['bukrs']}
                      fluid
                      selection
                      search
                      options={getCompanyOptions(companyOptions)}
                      value={request.bukrs}
                      onChange={(e, o) => onInputChange(o, 'bukrs')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['brnch']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['brnch']}
                      fluid
                      selection
                      search
                      options={
                        request.bukrs ? branchOptions[request.bukrs] : []
                      }
                      value={request.branchId}
                      onChange={(e, o) => onInputChange(o, 'branchId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Товар</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['service']}
                      fluid
                      selection
                      search
                      options={requestTypeOpts ? requestTypeOpts : []}
                      value={request.requestTypeId}
                      onChange={(e, o) => onInputChange(o, 'requestTypeId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Вид заявки</Table.Cell>
                  <Table.Cell>
                    <Dropdown placeholder="Вид заявки" fluid selection search />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell verticalAlign="top">Оператор</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Input
                              size="mini"
                              label="F1"
                              className="input__filter_terms"
                            />
                            <Input
                              size="mini"
                              label="F2"
                              className="input__filter_terms"
                            />
                            <Input
                              size="mini"
                              label="F3"
                              className="input__filter_terms"
                            />
                            <Input
                              size="mini"
                              label="F4"
                              className="input__filter_terms"
                            />
                            <Input
                              size="mini"
                              label="F5"
                              className="input__filter_terms"
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
                    <Input size="small" fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Адрес</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Kонтакты</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Заводской номер</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата установки</Table.Cell>
                  <Table.Cell>
                    <Input>
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={moment(new Date())}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                      />
                    </Input>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Установщик</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Примечание</Table.Cell>
                  <Table.Cell>
                    <Message content="Звонок создается автоматом, и примечание заявки копируется в примечание звонка" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата приема в сервисе</Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell collapsing>
                            <Input>
                              <DatePicker
                                autoComplete="off"
                                deteFormat="DD/MM/YYYY"
                                selected={moment(new Date())}
                                dropdownMode="select"
                                showMonthDropDown
                                showYearDropDown
                              />
                            </Input>
                          </Table.Cell>
                          <Table.Cell collapsing>Время сервиса</Table.Cell>
                          <Table.Cell>
                            <Input size="small" fluid />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button
              color="blue"
              fluid
              // onClick={() => props.history.push('smcuspor')}
            >
              Сохранить
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const getCompanyOptions = compOptions => {
  const companyOptions = compOptions;
  if (!companyOptions) {
    return [];
  }
  let out = compOptions.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    contractTypeList: state.f4.contractTypeList,
  };
}

export default connect(mapStateToProps, {
  f4ClearAnyObject,
  f4FetchConTypeList,
})(injectIntl(Smccald));

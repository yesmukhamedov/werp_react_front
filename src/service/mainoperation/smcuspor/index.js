import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Form,
  Grid,
  Table,
  Label,
  Input,
  Checkbox,
  Button,
} from 'semantic-ui-react';
import {
  fetchSmcusporClientHistory,
  fetchServCrmHistoryAll,
} from '../../serviceAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import HistoryReactTable from './historyReactTable';

import 'react-datepicker/dist/react-datepicker.css';
import './smcuspor.css';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';

function Smcuspor(props) {
  const url = window.location.search;
  const contractNumber = url.slice(url.indexOf('=') + 1);

  const emptyHistory = {
    activeButton: true,
    reactColumns: 'all',
    startDate,
  };

  const [history, setHistory] = useState({ ...emptyHistory });
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));

  const {
    intl: { messages },
    clientHistory = {
      contractInfo: {},
    },
    crmHistoryAll,
  } = props;

  const {
    countryName,
    bukrsName,
    bukrs,
    branchName,
    branchId,
    servBranchName,
    tovarSerial,
    customerName,
    customerId,
    contactPersonName,
    addrServ,
    fullPhone,
    servCrmCategory,
    contractDate,
    matnrName,
    installmentDate,
    dealerName,
    fitterName,
    warrantyEndDate,
    warranty,
    warrantyEndedMonths,
    manual,
    f1MtLeft,
    f2MtLeft,
    f3MtLeft,
    f4MtLeft,
    f5MtLeft,
  } = clientHistory.contractInfo;

  useEffect(() => {
    if (contractNumber) {
      props.fetchSmcusporClientHistory({ contractNumber });
    }
  }, [contractNumber]);

  const crmHistoryDateFrom = startDate.format('YYYY-MM-DD');
  const crmHistoryDateTo = endDate.format('YYYY-MM-DD');

  const dateRange = () => {
    props.fetchServCrmHistoryAll(
      {
        contractNumber,
        crmHistoryDateFrom,
        crmHistoryDateTo,
      },
      history.reactColumns,
    );
  };

  const handleClick = (data, fieldname) => {
    setHistory(prev => {
      const varHistory = { ...prev };
      switch (fieldname) {
        case 'all':
          varHistory.reactColumns = fieldname;
          break;
        case 'services':
          varHistory.reactColumns = fieldname;
          varHistory.activeButton = false;
          break;
        case 'calls':
          varHistory.reactColumns = fieldname;
          varHistory.activeButton = false;
          break;
        case 'requests':
          varHistory.reactColumns = fieldname;
          varHistory.activeButton = false;
          break;
      }
      return varHistory;
    });
  };

  const labelColor = () => {
    if (servCrmCategory === 'ЗЕЛЕНЫЙ' || servCrmCategory === 'GREEN') {
      return 'green';
    } else if (servCrmCategory === 'ЖЕЛТЫЙ' || servCrmCategory === 'YELLOW') {
      return 'yellow';
    } else if (servCrmCategory === 'КРАСНЫЙ' || servCrmCategory === 'RED') {
      return 'red';
    } else if (servCrmCategory === 'ЧЕРНЫЙ' || servCrmCategory === 'BLACK') {
      return 'black';
    }
  };

  return (
    <Segment>
      <Form>
        <Grid>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <h1>История клиента</h1>
                </Table.Cell>
                <Table.Cell width="3">
                  <Button
                    floated="right"
                    fluid
                    color="blue"
                    onClick={() =>
                      props.history.push(
                        `smregc?contractNumber=${contractNumber}`,
                        {
                          tovarSn: tovarSerial,
                          branchId: branchId,
                          bukrs: bukrs,
                        },
                      )
                    }
                  >
                    Зарегистрировать звонок
                  </Button>
                </Table.Cell>
                <Table.Cell width="3">
                  <Button
                    floated="right"
                    fluid
                    color="blue"
                    onClick={() =>
                      props.history.push(
                        `smcca?contractNumber=${contractNumber}`,
                        {
                          bukrs: bukrs,
                          bukrsName: bukrsName,
                          branchId: branchId,
                          servBranchName: servBranchName,
                          customerId: customerId,
                          customerName: customerName,
                          addrServ: addrServ,
                          fullPhone: fullPhone,
                          tovarSn: tovarSerial,
                          matnrName: matnrName,
                          installmentDate: installmentDate,
                          fitterName: fitterName,
                          f1MtLeft: f1MtLeft,
                          f2MtLeft: f2MtLeft,
                          f3MtLeft: f3MtLeft,
                          f4MtLeft: f4MtLeft,
                          f5MtLeft: f5MtLeft,
                        },
                      )
                    }
                  >
                    Создать заявку
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Grid.Row>
            <Grid.Column mobile={16} table={16} computer={6}>
              <Segment>
                <h3>Данные клиента</h3>
              </Segment>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Страна
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={countryName ? countryName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Компания
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={bukrsName ? bukrsName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Филиал
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={branchName ? branchName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Сервис Филиал
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={servBranchName ? servBranchName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        CN
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={contractNumber ? contractNumber : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Заводской №
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={tovarSerial ? tovarSerial : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        ФИО клиента
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={customerName ? customerName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Контактное лицо
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={contactPersonName ? contactPersonName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Адрес для сервиса
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={addrServ ? addrServ : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Label size="large" basic>
                        Основные контакты
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={fullPhone ? fullPhone : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label ribbon color={labelColor()}>
                        Категория
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={servCrmCategory ? servCrmCategory : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Дата покупки
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={contractDate ? contractDate : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Дата установки
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={installmentDate ? installmentDate : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Диллер
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={dealerName ? dealerName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Установщик
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={fitterName ? fitterName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Срок гарантии
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Input
                                size="small"
                                fluid
                                value={warrantyEndDate ? warrantyEndDate : ''}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                size="small"
                                fluid
                                value={`${warranty ? warranty : ''} / ${
                                  warrantyEndedMonths ? warrantyEndedMonths : ''
                                }`}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Срок замены{' '}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label="Автоматом"
                                name="changeTerm"
                                value="auto"
                                checked={manual === 0}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label="В ручную"
                                name="changeTerm"
                                value="manual"
                                checked={manual === 1}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Segment>
                <h3>Срок замены фильтров</h3>
                <Input
                  size="mini"
                  label="F1"
                  className="input__filter_terms"
                  value={f1MtLeft ? f1MtLeft : '0'}
                />
                <Input
                  size="mini"
                  label="F2"
                  className="input__filter_terms"
                  value={f2MtLeft ? f2MtLeft : '0'}
                />
                <Input
                  size="mini"
                  label="F3"
                  className="input__filter_terms"
                  value={f3MtLeft ? f3MtLeft : '0'}
                />
                <Input
                  size="mini"
                  label="F4"
                  className="input__filter_terms"
                  value={f4MtLeft ? f4MtLeft : '0'}
                />
                <Input
                  size="mini"
                  label="F5"
                  className="input__filter_terms"
                  value={f5MtLeft ? f5MtLeft : '0'}
                />
              </Segment>
              <Button
                color="blue"
                fluid
                onClick={() =>
                  props.history.push(`smeci?contractNumber=${contractNumber}`)
                }
              >
                Редактировать
              </Button>
            </Grid.Column>
            <Grid.Column mobile={16} table={16} computer={10}>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        active={history.activeButton}
                        onClick={(e, o) => handleClick(o, 'all')}
                      >
                        Все
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'services')}
                      >
                        Сервисы
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'calls')}
                      >
                        Звонки
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'requests')}
                      >
                        Заявки
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="2" verticalAlign="bottom">
                      Дата заявки с
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={startDate}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                        maxDate={moment(new Date())}
                        onChange={date => setStartDate(date)}
                      />
                    </Table.Cell>
                    <Table.Cell width="2" verticalAlign="bottom">
                      Дата заявки по
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={endDate}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                        maxDate={moment(new Date())}
                        onChange={date => setEndDate(date)}
                      />
                    </Table.Cell>
                    <Table.Cell width="2" verticalAlign="bottom">
                      <Button fluid color="teal" onClick={dateRange}>
                        Применить
                      </Button>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <HistoryReactTable
                columns={history.reactColumns}
                data={crmHistoryAll}
                initValue={clientHistory.servCrmHistoryAll}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <h2>История редактирований договора</h2>
                <ReactTableWrapper
                  data={clientHistory.contractHistory}
                  columns={[
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Дата</div>
                      ),
                      accessor: 'recDate',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Изменения</div>
                      ),
                      accessor: 'operOnName',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Операция</div>
                      ),
                      accessor: 'operTypeName',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Старый</div>
                      ),
                      accessor: 'oldText',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Новый</div>
                      ),
                      accessor: 'newText',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Примечание</div>
                      ),
                      accessor: 'info',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          Изменен сотрудником
                        </div>
                      ),
                      accessor: 'userName',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                  ]}
                  defaultPageSize={15}
                  pages={2}
                  previousText={messages['Table.Previous']}
                  nextText={messages['Table.Next']}
                  className="-striped -highlight"
                  pageSizeOptions={[20, 30, 40]}
                  loadingText={messages['Table.Next']}
                  noDataText={messages['Table.NoData']}
                  rowsText={messages['Table.Rows']}
                  pageText={messages['Table.Page']}
                  ofText={messages['Table.Of']}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
}
function mapStateToProps(state) {
  return {
    clientHistory: state.serviceReducer.clientHistory.data,
    crmHistoryAll: state.serviceReducer.crmHistoryAll.data,
  };
}

export default connect(mapStateToProps, {
  fetchSmcusporClientHistory,
  fetchServCrmHistoryAll,
})(injectIntl(Smcuspor));

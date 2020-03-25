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
import 'moment/locale/ru';
import 'moment/locale/tr';
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
    startDate: '',
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
    language,
  } = props;

  const {
    countryName,
    bukrsName,
    bukrs,
    branchName,
    servBranchId,
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
                  <h1>{messages['client_history']}</h1>
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
                          branchId: servBranchId,
                          bukrs: bukrs,
                        },
                      )
                    }
                  >
                    {messages['call_register']}
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
                          branchId: servBranchId,
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
                    {messages['create_request']}
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Grid.Row>
            <Grid.Column mobile={16} table={16} computer={6}>
              <Segment>
                <h3>{messages['L__CLIENT_INFO']}</h3>
              </Segment>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {messages['country']}
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
                        {messages['bukrs']}
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
                        {messages['Task.Branch']}
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
                        {messages['service_branch']}
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
                        {messages['Contract.Number']}
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
                        {messages['productSerialNumber']}
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
                        {messages['fioClient']}
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
                        {messages['contactDetails']}
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
                        {messages['addressService']}
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
                        {messages['contacts']}
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
                        {messages['category']}
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
                        {messages['buying_date']}
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
                        {messages['installation_date']}
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
                        {messages['dealer']}
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
                        {messages['goodsInstaller']}
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
                        {messages['guarantee_period']}
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
                                value={`${
                                  warrantyEndedMonths ? warrantyEndedMonths : ''
                                } / ${warranty ? warranty : ''}`}
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
                        {messages['replacement_period']}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label={messages['automate']}
                                name="changeTerm"
                                value="auto"
                                checked={manual === 0}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label={messages['manual']}
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
                <h3>{messages['filter_replacement_period']}</h3>
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
                {messages['Button.Edit']}
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
                        {messages['all']}
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'services')}
                      >
                        {messages['services']}
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'calls')}
                      >
                        {messages['Crm.Calls']}
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'requests')}
                      >
                        {messages['Applications']}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="3" verticalAlign="bottom">
                      {messages['application_date_from']}
                      <DatePicker
                        autoComplete="off"
                        dateFormat="DD/MM/YYYY"
                        selected={startDate}
                        dropdownMode="select"
                        locale={language}
                        onChange={date => setStartDate(date)}
                        showMonthDropDown
                        showYearDropDown
                        maxDate={moment(new Date())}
                      />
                    </Table.Cell>
                    <Table.Cell width="3" verticalAlign="bottom">
                      {messages['application_date_to']}
                      <DatePicker
                        autoComplete="off"
                        dateFormat="DD/MM/YYYY"
                        selected={endDate}
                        dropdownMode="select"
                        locale={language}
                        onChange={date => setEndDate(date)}
                        showMonthDropDown
                        showYearDropDown
                      />
                    </Table.Cell>
                    <Table.Cell width="2" verticalAlign="bottom">
                      <Button fluid color="teal" onClick={dateRange}>
                        {messages['apply']}
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
                <h2>{messages['contract_editing_history']}</h2>
                <ReactTableWrapper
                  data={clientHistory.contractHistory}
                  columns={[
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          {messages['date']}
                        </div>
                      ),
                      accessor: 'recDate',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          {messages['changes']}
                        </div>
                      ),
                      accessor: 'operOnName',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          {messages['operation']}
                        </div>
                      ),
                      accessor: 'operTypeName',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          {messages['old']}
                        </div>
                      ),
                      accessor: 'oldText',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          {messages['new']}
                        </div>
                      ),
                      accessor: 'newText',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          {messages['bktxt']}
                        </div>
                      ),
                      accessor: 'info',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          {messages['changed_by_employee']}
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
                  showPagination={true}
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
    language: state.locales.lang,
    clientHistory: state.serviceReducer.clientHistory.data,
    crmHistoryAll: state.serviceReducer.crmHistoryAll.data,
  };
}

export default connect(mapStateToProps, {
  fetchSmcusporClientHistory,
  fetchServCrmHistoryAll,
})(injectIntl(Smcuspor));

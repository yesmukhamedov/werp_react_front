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
  fetchSmcusporContract,
  fetchServCrmHistoryAll,
  fetchSmcusporContractHistory,
} from '../../serviceAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/tr';
import { injectIntl } from 'react-intl';
import HistoryReactTable from './historyReactTable';
import { stringYYYYMMDDToMoment } from '../../../utils/helpers';

import 'react-datepicker/dist/react-datepicker.css';
import './smcuspor.css';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';

function Smcuspor(props) {
  const url = window.location.search;
  const contractNumber = url.slice(url.indexOf('=') + 1);

  const emptyHistory = {
    activeButton: true,
    reactColumns: 'all',
    dateAt: '',
  };

  const [history, setHistory] = useState({ ...emptyHistory });
  const [dateAt, setDateAt] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const {
    intl: { messages },
    clientHistory = {
      contractInfo: {},
    },
    clientContract = {},
    contractHistory = [],
    crmHistoryAll = [],
    crmHistoryApp = [],
    crmHistoryCall = [],
    crmHistoryServ = [],
    language,
  } = props;

  const {
    countryName,
    bukrsName,
    bukrsId,
    branchName,
    serviceBranchId,
    serviceBranchName,
    tovarSn,
    customerFIO,
    customerId,
    contactPersonName,
    serviceAddressName,
    fullPhone,
    serviceCrmCategoryName,
    contractDate,
    matnrName,
    installmentDate,
    dealerFIO,
    fitterFIO,
    warrantyEndDate,
    warranty,
    warrantyEndedMonths,
    manual,
    f1MtLeft,
    f2MtLeft,
    f3MtLeft,
    f4MtLeft,
    f5MtLeft,
  } = clientContract;
  console.log('props SMCUSPOR', props);

  useEffect(() => {
    if (contractNumber) {
      props.fetchSmcusporContract({ contractNumber });
      props.fetchSmcusporContractHistory({ contractNumber });
      props.fetchServCrmHistoryAll({ contractNumber }, history.reactColumns);
    }
  }, [contractNumber]);

  const dateRange = () => {
    props.fetchServCrmHistoryAll(
      {
        contractNumber,
        dateAt: dateAt === null ? null : dateAt.format('YYYY-MM-DD'),
        dateTo: dateTo === null ? null : dateTo.format('YYYY-MM-DD'),
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
    if (
      serviceCrmCategoryName === 'ЗЕЛЕНЫЙ' ||
      serviceCrmCategoryName === 'GREEN' ||
      serviceCrmCategoryName === 'YEŞİL'
    ) {
      return 'green';
    } else if (
      serviceCrmCategoryName === 'ЖЕЛТЫЙ' ||
      serviceCrmCategoryName === 'YELLOW' ||
      serviceCrmCategoryName === 'SARI'
    ) {
      return 'yellow';
    } else if (
      serviceCrmCategoryName === 'КРАСНЫЙ' ||
      serviceCrmCategoryName === 'RED' ||
      serviceCrmCategoryName === 'KIRMIZI'
    ) {
      return 'red';
    } else if (
      serviceCrmCategoryName === 'ЧЕРНЫЙ' ||
      serviceCrmCategoryName === 'BLACK' ||
      serviceCrmCategoryName === 'SIYAH'
    ) {
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
                          tovarSn: tovarSn,
                          branchId: serviceBranchId,
                          bukrsId: bukrsId,
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
                          bukrs: bukrsId,
                          bukrsName: bukrsName,
                          branchId: serviceBranchId,
                          serviceBranchName: serviceBranchName,
                          customerId: customerId,
                          customerFIO: customerFIO,
                          serviceAddressName: serviceAddressName,
                          fullPhone: fullPhone,
                          tovarSn: tovarSn,
                          matnrName: matnrName,
                          installmentDate: installmentDate,
                          fitterFIO: fitterFIO,
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
                        value={serviceBranchName ? serviceBranchName : ''}
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
                        value={tovarSn ? tovarSn : ''}
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
                        value={customerFIO ? customerFIO : ''}
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
                        value={serviceAddressName ? serviceAddressName : ''}
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
                        value={
                          serviceCrmCategoryName ? serviceCrmCategoryName : ''
                        }
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
                        value={dealerFIO ? dealerFIO : ''}
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
                        value={fitterFIO ? fitterFIO : ''}
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
                        placeholderText={messages['application_date_from']}
                        selected={
                          dateAt === null ? '' : stringYYYYMMDDToMoment(dateAt)
                        }
                        dropdownMode="select"
                        locale={language}
                        onChange={date => setDateAt(date)}
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
                        placeholderText={messages['application_date_to']}
                        selected={
                          dateTo === null ? '' : stringYYYYMMDDToMoment(dateTo)
                        }
                        dropdownMode="select"
                        locale={language}
                        onChange={date => setDateTo(date)}
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
                crmHistoryApp={crmHistoryApp}
                crmHistoryCall={crmHistoryCall}
                crmHistoryServ={crmHistoryServ}
                initValue={crmHistoryAll}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <h2>{messages['contract_editing_history']}</h2>
                <ReactTableWrapper
                  data={contractHistory}
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

export const smcusporId = id => {
  console.log(id);
  return id;
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    clientContract: state.serviceReducer.clientContract,
    crmHistoryAll: state.serviceReducer.crmHistoryAll,
    crmHistoryApp: state.serviceReducer.crmHistoryApp,
    crmHistoryCall: state.serviceReducer.crmHistoryCall,
    crmHistoryServ: state.serviceReducer.crmHistoryServ,
    contractHistory: state.serviceReducer.smcusporContractHistory,
  };
}

export default connect(mapStateToProps, {
  fetchSmcusporContract,
  fetchServCrmHistoryAll,
  fetchSmcusporContractHistory,
})(injectIntl(Smcuspor));

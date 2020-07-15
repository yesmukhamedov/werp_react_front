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
  TextArea,
} from 'semantic-ui-react';
import {
  fetchSmcusporContract,
  fetchServCrmHistoryAll,
  fetchSmcusporContractHistory,
  fetchSmcusporle,
} from '../../serviceAction';
import { f4FetchCurrentStaff } from '../../../reference/f4/f4_action';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/tr';
import { injectIntl } from 'react-intl';
import HistoryReactTable from './historyReactTable';
import ExportExcel from './ExportExcel';
import { stringYYYYMMDDToMoment } from '../../../utils/helpers';

import 'react-datepicker/dist/react-datepicker.css';
import './smcuspor.css';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';

function Smcuspor(props) {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const contractNumber = url.searchParams.get('contractNumber');
  const planId =
    url.searchParams.get('filterPlanId') !== 'null'
      ? url.searchParams.get('filterPlanId')
      : null;
  const vcId =
    url.searchParams.get('filterVCId') !== 'null'
      ? url.searchParams.get('filterVCId')
      : null;

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
    clientContract = {},
    contractHistory = [],
    crmHistoryAll = [],
    crmHistoryApp = [],
    crmHistoryCall = [],
    crmHistoryServ = [],
    language,
    exportRole,
    staffInfo,
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
    contactPersonName,
    serviceAddressName,
    fullPhone,
    serviceCrmCategoryName,
    serviceCrmCategoryId,
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
    lastStateName,
  } = clientContract;

  useEffect(() => {
    props.fetchSmcusporle();
    props.f4FetchCurrentStaff();
    if (contractNumber) {
      props.fetchSmcusporContract({ contractNumber });
      props.fetchSmcusporContractHistory({ contractNumber });
      props.fetchServCrmHistoryAll({ contractNumber }, 'all');
      props.fetchServCrmHistoryAll({ contractNumber }, 'services');
      props.fetchServCrmHistoryAll({ contractNumber }, 'calls');
      props.fetchServCrmHistoryAll({ contractNumber }, 'requests');
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

        default:
          varHistory.reactColumns = fieldname;
          break;
      }
      return varHistory;
    });
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
                          serviceFilterPlanId: planId,
                          serviceFilterVCPlanId: vcId,
                          operatorId: staffInfo.staffId,
                          operatorFIO: staffInfo.fullName,
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
                          clientContract,
                          serviceFilterPlanId: planId,
                          serviceFilterVCPlanId: vcId,
                          operatorId: staffInfo.staffId,
                          operatorFIO: staffInfo.fullName,
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
                        {messages['Product']}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={matnrName ? matnrName : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {messages['phys_status']}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={lastStateName ? lastStateName : ''}
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
                      <TextArea
                        size="small"
                        value={fullPhone ? fullPhone : ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label ribbon color={labelColor(serviceCrmCategoryId)}>
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
                        value={
                          contractDate
                            ? moment(contractDate).format('DD-MM-YYYY')
                            : ''
                        }
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
                        value={
                          installmentDate
                            ? moment(installmentDate).format('DD-MM-YYYY')
                            : ''
                        }
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
                                value={
                                  warrantyEndDate
                                    ? moment(warrantyEndDate).format(
                                        'DD-MM-YYYY',
                                      )
                                    : ''
                                }
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
                      {messages['Form.DateFrom']}
                      <DatePicker
                        autoComplete="off"
                        dateFormat="DD/MM/YYYY"
                        placeholderText={messages['Form.DateFrom']}
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
                      {messages['Form.DateTo']}
                      <DatePicker
                        autoComplete="off"
                        dateFormat="DD/MM/YYYY"
                        placeholderText={messages['Form.DateTo']}
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
                    <Table.Cell width="3" verticalAlign="bottom">
                      {exportRole.data ? (
                        <ExportExcel
                          crmHistoryAll={crmHistoryAll}
                          crmHistoryApp={crmHistoryApp}
                          crmHistoryCall={crmHistoryCall}
                          crmHistoryServ={crmHistoryServ}
                          tabs={history.reactColumns}
                          initValue={crmHistoryAll}
                        />
                      ) : null}
                    </Table.Cell>
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

const labelColor = crmCategoryId => {
  if (crmCategoryId === 1) {
    return 'green';
  } else if (crmCategoryId === 2) {
    return 'yellow';
  } else if (crmCategoryId === 3) {
    return 'red';
  } else if (crmCategoryId === 4) {
    return 'black';
  }
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
    exportRole: state.serviceReducer.smcusporle,
    staffInfo: state.f4.staffInfo,
  };
}

export default connect(mapStateToProps, {
  fetchSmcusporContract,
  fetchServCrmHistoryAll,
  fetchSmcusporContractHistory,
  fetchSmcusporle,
  f4FetchCurrentStaff,
})(injectIntl(Smcuspor));

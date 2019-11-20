import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Dropdown,
  Icon,
  Container,
  Header,
  Grid,
  Divider,
  Menu,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import moment from 'moment';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';

import {} from '../../../reference/f4/f4_action';
import {
  fetchDynamicFAGM,
  clearDynObj,
  fetchCashBankHkontsByBranch,
  clearAnyObject,
} from '../../fa_action';
import { moneyFormat } from '../../../utils/helpers';
import matchSorter, { rankings } from 'match-sorter';
import { injectIntl } from 'react-intl';
import CashBankBalance from '../../../reference/f4/cashBankBalance/cashBankBalance';
import { LinkToDmsc03, LinkToCustomerHrc03 } from '../../../utils/outlink';
import { excelDownload } from '../../../utils/helpers';
import { BigNumber } from 'bignumber.js';
require('moment/locale/ru');
require('moment/locale/tr');

class Rfcoj extends Component {
  constructor(props) {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderSearchTab = this.renderSearchTab.bind(this);
    this.searchRfcoj = this.searchRfcoj.bind(this);
    this.validate = this.validate.bind(this);
    this.onFilterChangeReactTable = this.onFilterChangeReactTable.bind(this);
    this.exportExcel = this.exportExcel.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        branchId: '',
        hkont: '',
        bldatFrom: moment(firstDay),
        bldatTo: moment(lastDay),
        shkzg: '0',
        service: '2',
      },
      errors: [],
      totalOut: 0,
      totalIn: 0,
      net: 0,
      outputTableState: [],
    };
  }

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.outputTable !== this.props.outputTable) {
      const { messages } = this.props.intl;

      let totalIn = 0,
        totalOut = 0,
        net = 0;

      let tempOutputTable = nextProps.outputTable
        ? nextProps.outputTable.map(wa => {
            let obj = JSON.parse(JSON.stringify(wa));
            if (wa.shkzg === 'S') totalIn = totalIn + wa.summa;
            else totalOut = totalOut + wa.summa;

            obj.shkzgName =
              wa.shkzg === 'S' ? messages['incoming'] : messages['outgoing'];
            return obj;
          })
        : [];

      if (totalIn > totalOut) net = totalIn - totalOut;
      else if (totalOut > totalIn) net = totalOut - totalIn;

      this.setState({
        outputTableState: tempOutputTable,
        totalIn,
        totalOut,
        net,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearDynObj();
    this.props.clearAnyObject('CLEAR_CASHBANKHKONTS_BY_BRANCH');
  }
  onInputChange(value, stateFieldName) {
    this.props.clearDynObj();

    if (stateFieldName === 'bukrs') {
      this.props.clearAnyObject('CLEAR_CASHBANKHKONTS_BY_BRANCH');
      this.setState({
        searchTerm: {
          ...this.state.searchTerm,
          [stateFieldName]: value,
          branchId: '',
          hkont: '',
        },
      });
    } else if (stateFieldName === 'branchId') {
      this.props.fetchCashBankHkontsByBranch(
        this.state.searchTerm.bukrs,
        value,
      );
      this.setState({
        searchTerm: {
          ...this.state.searchTerm,
          [stateFieldName]: value,
          hkont: '',
        },
      });
    } else {
      this.setState({
        searchTerm: { ...this.state.searchTerm, [stateFieldName]: value },
      });
    }
  }

  renderSearchTab() {
    const language = localStorage.getItem('language');
    const { branchOptions, companyOptions, hkontOptions } = this.props;
    const { messages } = this.props.intl;
    const {
      bukrs,
      branchId,
      bldatFrom,
      bldatTo,
      service,
      hkont,
      shkzg,
    } = this.state.searchTerm;

    const shkzgOptions = [
      { key: 0, text: messages['all'], value: '0' },
      { key: 1, text: messages['incoming'], value: 'S' },
      { key: 2, text: messages['outgoing'], value: 'H' },
    ];
    const serviceOptions = [
      { key: 0, text: messages['all'], value: '2' },
      { key: 1, text: messages['rfcojJustServices'], value: '1' },
      {
        key: 2,
        text: messages['rfcojExcludeServices'],
        value: '0',
      },
    ];
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="folder" />
                    {messages['bukrs']}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      fluid
                      placeholder={messages['bukrs']}
                      selection
                      options={companyOptions || []}
                      value={bukrs}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'bukrs')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['brnch']}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      placeholder={messages['brnch']}
                      fluid
                      search
                      selection
                      options={bukrs ? branchOptions[bukrs] : []}
                      value={branchId}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'branchId')
                      }
                      noResultsMessage={null}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['cashBank']}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      placeholder={messages['cashBank']}
                      selection
                      options={hkontOptions || []}
                      value={hkont}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'hkont')
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>{messages['type']}</Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      fluid
                      search
                      selection
                      options={shkzgOptions || []}
                      value={shkzg}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'shkzg')
                      }
                      noResultsMessage={null}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['service']}</Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      fluid
                      search
                      selection
                      options={serviceOptions || []}
                      value={service}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'service')
                      }
                      noResultsMessage={null}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span>
                      <Icon name="calendar" />
                      {messages['bldat']}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    {messages['from']}
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={bldatFrom}
                      locale={language}
                      onChange={event => this.onInputChange(event, 'bldatFrom')}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {messages['to']}
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={bldatTo}
                      locale={language}
                      onChange={event => this.onInputChange(event, 'bldatTo')}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell>
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      onClick={() => this.searchRfcoj()}
                    >
                      <Icon name="search" size="large" />
                      {messages['search']}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  searchRfcoj() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.fetchDynamicFAGM('finance/reports/rfcoj/search', {
        ...this.state.searchTerm,
        bldatFrom: this.state.searchTerm.bldatFrom.format('YYYY-MM-DD'),
        bldatTo: this.state.searchTerm.bldatTo.format('YYYY-MM-DD'),
      });
    } else {
      this.props.modifyLoader(false);
    }

    this.setState({ errors });
  }
  onFilterChangeReactTable() {
    if (
      this.reactTable &&
      this.reactTable.getResolvedState() &&
      this.reactTable.getResolvedState().sortedData &&
      this.reactTable.getResolvedState().sortedData.length > 0
    ) {
      let temp = [...this.reactTable.getResolvedState().sortedData];

      let totalIn = 0,
        totalOut = 0,
        net = 0;
      for (let i = 0; i < temp.length; i++) {
        let wa = temp[i];

        if (wa._original.shkzg === 'S') totalIn = totalIn + wa.summa;
        else totalOut = totalOut + wa.summa;
      }
      if (totalIn > totalOut) net = totalIn - totalOut;
      else if (totalOut > totalIn) net = totalOut - totalIn;

      this.setState({ totalIn, totalOut, net });

      // console.log(this.reactTable.getResolvedState().sortedData,'this.reactTable.getResolvedState()')
    }
  }
  validate() {
    // getter
    // console.log(localStorage.getItem('language'),'error');

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const errors = [];
    const {
      bukrs,
      branchId,
      hkont,
      bldatFrom,
      bldatTo,
    } = this.state.searchTerm;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (branchId === null || branchId === undefined || !branchId) {
      errors.push(errorTable[`7${language}`]);
    }
    if (hkont === null || hkont === undefined || !hkont || hkont.length === 0) {
      errors.push(errorTable[`3${language}`]);
    }
    if (bldatFrom === null || bldatFrom === undefined || !bldatFrom) {
      errors.push(errorTable[`13${language}`]);
    }
    if (bldatTo === null || bldatTo === undefined || !bldatTo) {
      errors.push(errorTable[`14${language}`]);
    }
    return errors;
  }

  exportExcel() {
    const { messages } = this.props.intl;
    const { outputTableState } = this.state;
    let excelHeaders = [];

    excelHeaders.push(messages['belnr']);
    excelHeaders.push(messages['gjahr']);
    excelHeaders.push(messages['blart']);
    excelHeaders.push(messages['bldat']);
    excelHeaders.push(messages['shkzg']);
    excelHeaders.push(messages['amount']);
    excelHeaders.push(messages['waers']);
    excelHeaders.push(messages['customer']);
    excelHeaders.push(messages['snNum']);
    excelHeaders.push(messages['bktxt']);
    excelHeaders.push(messages['usnam']);

    excelDownload(
      'finance/reports/rfcoj/downloadExcel',
      'Rfcoj.xls',
      'outputTable',
      outputTableState,
      excelHeaders,
    );
  }

  render() {
    const { messages } = this.props.intl;
    const { bukrs, branchId } = this.state.searchTerm;
    const { totalIn, totalOut, net, outputTableState } = this.state;

    let t1columns = [];

    let t1r1c1 = {
      Header: ({ value }) => <b>{messages['belnr']}</b>,
      accessor: 'belnr',
      Cell: obj => (
        <span>
          <Link
            target="_blank"
            to={
              `/finance/mainoperation/fa03?belnr=` +
              obj.original.belnr +
              `&bukrs=` +
              obj.original.bukrs +
              `&gjahr=` +
              obj.original.gjahr
            }
          >
            {obj.original.belnr}
          </Link>
        </span>
      ),
      width: 100,
      minResizeWidth: 140,
    };
    let t1r1c2 = {
      Header: ({ value }) => <b>{messages['gjahr']}</b>,
      accessor: 'gjahr',
      Cell: ({ value }) => <span>{value}</span>,
      width: 60,
    };
    let t1r1c3 = {
      Header: ({ value }) => <b>{messages['blart']}</b>,
      accessor: 'blartName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'blartName' }],
        }),
      filterAll: true,
      width: 170,
      minResizeWidth: 140,
    };
    let t1r1c4 = {
      Header: ({ value }) => <b>{messages['bldat']}</b>,
      accessor: 'bldat', //Cell: obj => <span>{obj.original.budat}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['_original.bldat'] }),
      filterAll: true,
      width: 140,
      minResizeWidth: 140,
    };

    t1r1c4.Footer = (
      <span>
        <strong>
          <font color={'green'}>
            {totalIn ? moneyFormat(new BigNumber(totalIn).toFixed(2)) : ''}
          </font>
        </strong>
      </span>
    );
    let t1r1c5 = {
      Header: ({ value }) => <b>{messages['shkzg']}</b>,
      accessor: 'shkzgName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'shkzgName' }],
        }),
      filterAll: true,
      width: 140,
      minResizeWidth: 140,
    };

    t1r1c5.Footer = (
      <span>
        <strong>
          <font color={'red'}>
            {totalOut > 0 ? '-' : ''}
            {totalOut ? moneyFormat(new BigNumber(totalOut).toFixed(2)) : ''}
          </font>
        </strong>
      </span>
    );

    let t1r1c6 = {
      Header: ({ value }) => <b>{messages['amount']}</b>,
      accessor: 'summa',
      Cell: obj => (
        <span>
          <font color={obj.original.shkzg === 'H' ? 'red' : 'green'}>
            {obj.original.shkzg === 'H' ? '-' : ''}
            {moneyFormat(obj.original.summa)}
          </font>
        </span>
      ),
      width: 140,
      minResizeWidth: 140,
    };

    t1r1c6.Footer = (
      <span>
        <strong>
          <font color={totalIn > totalOut ? 'green' : 'red'}>
            {totalIn < totalOut ? '-' : ''}
            {net ? moneyFormat(new BigNumber(net).toFixed(2)) : ''}
          </font>
        </strong>
      </span>
    );

    let t1r1c7 = {
      Header: ({ value }) => <b>{messages['waers']}</b>,
      accessor: 'waers',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'waers' }],
        }),
      filterAll: true,
      width: 70,
      minResizeWidth: 70,
    };

    let t1r1c8 = {
      Header: ({ value }) => <b>{messages['customer']}</b>,
      accessor: 'customerName',

      Cell: obj => (
        <span>
          {obj.original.customerName && (
            <LinkToCustomerHrc03
              customerId={obj.original.customerId}
              customerName={obj.original.customerName}
            />
          )}
        </span>
      ),

      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'customerName' }],
        }),
      filterAll: true,
      minResizeWidth: 140,
    };

    let t1r1c9 = {
      Header: ({ value }) => <b>{messages['snNum']}</b>,
      accessor: 'snNum',
      Cell: obj => (
        <span>
          {obj.original.snNum && <LinkToDmsc03 snNum={obj.original.snNum} />}
        </span>
      ),
      width: 90,
      minResizeWidth: 90,
    };

    let t1r1c10 = {
      Header: ({ value }) => <b>{messages['bktxt']}</b>,
      accessor: 'bktxt',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'bktxt' }],
        }),
      filterAll: true,
      minResizeWidth: 140,
    };

    let t1r1c11 = {
      Header: ({ value }) => <b>{messages['usnam']}</b>,
      accessor: 'userFio',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'userFio' }],
        }),
      filterAll: true,
      width: 180,
      minResizeWidth: 180,
    };

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);
    t1columns.push(t1r1c3);
    t1columns.push(t1r1c4);
    t1columns.push(t1r1c5);
    t1columns.push(t1r1c6);
    t1columns.push(t1r1c7);
    t1columns.push(t1r1c8);
    t1columns.push(t1r1c9);
    t1columns.push(t1r1c10);
    t1columns.push(t1r1c11);
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Header as="h2" block>
          {messages['transNameRfcoj']}
        </Header>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="search" />
            {messages['searchParameters']}
          </Header>
        </Divider>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={5}>
              {this.renderSearchTab()}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={11}>
              <CashBankBalance bukrs={bukrs} brnch={branchId} show={true} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <OutputErrors errors={this.state.errors} />

        <br />
        <br />
        <br />

        <Divider horizontal>
          <Header as="h4">
            <Icon name="bar chart" />
            {messages['result']}
          </Header>
        </Divider>
        {outputTableState && outputTableState.length > 0 && (
          <Menu stackable size="small">
            <Menu.Item>
              <img
                className="clickableItem"
                src="/assets/img/xlsx_export_icon.png"
                onClick={() => this.exportExcel()}
              />
            </Menu.Item>
          </Menu>
        )}

        <ReactTable
          filterable
          ref={r => (this.reactTable = r)}
          data={outputTableState ? outputTableState : []}
          columns={t1columns}
          pageSize={20}
          showPagination={true}
          className="-striped -highlight"
          loadingText={messages['loadingText']}
          noDataText={messages['noDataText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          // filtered={this.state.filtered}
          onFilteredChange={filtered => this.onFilterChangeReactTable()}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    currencyOptions: state.f4.currencyOptions,

    //cleared by dynamic clear function
    outputTable: state.fa.dynamicObject.outputTable,
    net: state.fa.dynamicObject.net,
    totalin: state.fa.dynamicObject.totalin,
    totalout: state.fa.dynamicObject.totalout,

    //cleared by clear any object function
    hkontOptions: state.fa.faForm.hkontOptions,
  };
}

export default connect(mapStateToProps, {
  modifyLoader,

  //cleared by dynamic clear function
  clearDynObj,
  fetchDynamicFAGM,

  //cleared by clear any object function
  clearAnyObject,
  fetchCashBankHkontsByBranch,
})(injectIntl(Rfcoj));

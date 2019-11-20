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
  Segment,
  Menu,
} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import { fetchDynamicFAGM, clearDynObj } from '../../fa_action';
import { moneyFormat } from '../../../utils/helpers';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import { Link } from 'react-router-dom';
import matchSorter, { rankings } from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { LinkToDmsc03 } from '../../../utils/outlink';
import { BigNumber } from 'bignumber.js';
import { excelDownload } from '../../../utils/helpers';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

class Frep5 extends Component {
  constructor(props) {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderSearchTab = this.renderSearchTab.bind(this);
    this.searchFrep5 = this.searchFrep5.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.onFilterChangeReactTable = this.onFilterChangeReactTable.bind(this);
    this.validate = this.validate.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.exportExcel = this.exportExcel.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        branchList: [],
        ctTypeList: ['0'],
        conDateFrom: moment(firstDay),
        conDateTo: moment(lastDay),
      },
      activeIndex: 0,
      errors: [],
    };
  }

  componentDidMount() {
    this.props.clearDynObj();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.outputTableDetail !== this.props.outputTableDetail) {
      if (
        nextProps.outputTableDetail === null ||
        nextProps.outputTableDetail === undefined ||
        nextProps.outputTableDetail === []
      ) {
        this.setState({ totalDmbtr: 0, totalWrbtr: 0 });
      } else {
        let temp = [...nextProps.outputTableDetail];

        let totalDmbtr = 0,
          totalWrbtr = 0;
        for (let i = 0; i < temp.length; i++) {
          let wa = temp[i];
          totalDmbtr = totalDmbtr + wa.dmbtr;
          totalWrbtr = totalWrbtr + wa.wrbtr;
        }

        totalDmbtr = new BigNumber(totalDmbtr).toFixed(2);
        totalWrbtr = new BigNumber(totalWrbtr).toFixed(2);
        this.setState({ totalDmbtr, totalWrbtr });
      }
    }
  }
  componentWillUnmount() {
    this.props.clearDynObj();
  }
  onInputChange(value, stateFieldName) {
    this.props.clearDynObj();
    if (stateFieldName === 'bukrs') {
      this.setState({
        searchTerm: {
          ...this.state.searchTerm,
          [stateFieldName]: value,
          branchList: [],
          ctTypeList: ['0'],
        },
        totalDmbtr: 0,
        totalWrbtr: 0,
      });
    } else {
      this.setState({
        searchTerm: { ...this.state.searchTerm, [stateFieldName]: value },
        totalDmbtr: 0,
        totalWrbtr: 0,
      });
    }
  }
  exportExcel() {
    const { formatMessage } = this.props.intl;
    let excelHeaders = [];
    excelHeaders.push(formatMessage(messages.brnch));
    excelHeaders.push(formatMessage(messages.waers));
    excelHeaders.push(formatMessage(messages.in1Month));
    excelHeaders.push(formatMessage(messages.installments));
    excelHeaders.push(formatMessage(messages.overallSum));
    excelHeaders.push(formatMessage(messages.menge));
    excelHeaders.push(formatMessage(messages.amount) + ' USD');
    excelHeaders.push(
      formatMessage(messages.amount) +
        ' ' +
        formatMessage(messages.inDocumentCurrency),
    );
    excelDownload(
      'finance/reports/frep5/downloadExcel',
      'frep5Total.xls',
      'outputTable',
      this.props.outputTable,
      excelHeaders,
    );
  }
  renderSearchTab() {
    const language = localStorage.getItem('language');
    const { formatMessage } = this.props.intl;
    const { branchOptions, companyOptions } = this.props;
    const {
      bukrs,
      branchList,
      ctTypeList,
      conDateFrom,
      conDateTo,
    } = this.state.searchTerm;

    const ctOptions = [
      { key: 0, text: formatMessage(messages.frep5CtStandard), value: '0' },
      { key: 1, text: formatMessage(messages.frep5CtBu), value: '1' },
      { key: 2, text: formatMessage(messages.frep5CtPresent), value: '2' },
      { key: 3, text: formatMessage(messages.frep5CtService), value: '3' },
    ];

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Table compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="folder" />
                    {formatMessage(messages.bukrs)}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      fluid
                      placeholder={formatMessage(messages.bukrs)}
                      selection
                      options={companyOptions}
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
                    {formatMessage(messages.brnch)}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      placeholder={formatMessage(messages.all)}
                      fluid
                      multiple
                      search
                      selection
                      options={bukrs ? branchOptions[bukrs] : []}
                      value={branchList}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'branchList')
                      }
                      noResultsMessage={null}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" />
                    {formatMessage(messages.type)}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      selection
                      multiple
                      options={ctOptions || []}
                      value={ctTypeList}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'ctTypeList')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span>
                      <Icon name="calendar" />
                      {formatMessage(messages.contractDate)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    {formatMessage(messages.from)}
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={conDateFrom}
                      locale={language}
                      onChange={event =>
                        this.onInputChange(event, 'conDateFrom')
                      }
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {formatMessage(messages.to)}
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={conDateTo}
                      locale={language}
                      onChange={event => this.onInputChange(event, 'conDateTo')}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell colSpan="2">
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      onClick={() => this.searchFrep5()}
                    >
                      <Icon name="search" size="large" />
                      {formatMessage(messages.search)}
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
  validate() {
    // getter
    // console.log(localStorage.getItem('language'),'error');

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const errors = [];
    const { bukrs, conDateFrom, conDateTo, ctTypeList } = this.state.searchTerm;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (
      ctTypeList === null ||
      ctTypeList === undefined ||
      ctTypeList.length === 0
    ) {
      errors.push(errorTable[`27${language}`]);
    }
    if (conDateFrom === null || conDateFrom === undefined || !conDateFrom) {
      errors.push(errorTable[`13${language}`]);
    }
    if (conDateTo === null || conDateTo === undefined || !conDateTo) {
      errors.push(errorTable[`14${language}`]);
    }

    return errors;
  }
  searchFrep5() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.fetchDynamicFAGM('finance/reports/frep5/search', {
        ...this.state.searchTerm,
        branchList: this.state.searchTerm.branchList.join(),
        ctTypeList: this.state.searchTerm.ctTypeList.join(),
        conDateFrom: this.state.searchTerm.conDateFrom.format('YYYY-MM-DD'),
        conDateTo: this.state.searchTerm.conDateTo.format('YYYY-MM-DD'),
      });

      this.setState({
        activeIndex: 1,
      });
    } else {
      this.props.modifyLoader(false);
    }

    this.setState({ errors });
  }
  renderTotal() {
    const { formatMessage } = this.props.intl;
    const { outputTable } = this.props;
    if (!outputTable) return '';

    return (
      <Table compact celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell rowSpan="2">
              {formatMessage(messages.brnch)}
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">
              {formatMessage(messages.waers)}
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="3">
              {formatMessage(messages.in1Month)}
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="3">
              {formatMessage(messages.installments)}
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="3">
              {formatMessage(messages.overallSum)}
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row textAlign="center">
            <Table.HeaderCell>{formatMessage(messages.menge)}</Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)} USD
            </Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)}{' '}
              {formatMessage(messages.inDocumentCurrency)}
            </Table.HeaderCell>
            <Table.HeaderCell>{formatMessage(messages.menge)}</Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)} USD
            </Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)}{' '}
              {formatMessage(messages.inDocumentCurrency)}
            </Table.HeaderCell>
            <Table.HeaderCell>{formatMessage(messages.menge)}</Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)} USD
            </Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)}{' '}
              {formatMessage(messages.inDocumentCurrency)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {outputTable &&
            outputTable.map((wa, idx) => {
              return (
                <Table.Row
                  key={idx}
                  className={wa.branchName ? '' : 'subtotalRow'}
                >
                  <Table.Cell>{wa.branchName}</Table.Cell>
                  <Table.Cell>{wa.waers}</Table.Cell>
                  <Table.Cell>
                    {wa.branchName && wa.nalKol > 0 && (
                      <a
                        className="clickableIcon underlinedText"
                        onClick={() => this.getDetail(wa.branchId, wa.waers, 1)}
                      >
                        {wa.nalKol}
                      </a>
                    )}
                    {(!wa.branchName || wa.nalKol === 0) && wa.nalKol}
                  </Table.Cell>
                  <Table.Cell>{moneyFormat(wa.nalDmbtr)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.nalWrbtr)}</Table.Cell>
                  <Table.Cell>
                    {wa.branchName && wa.rasKol > 0 && (
                      <a
                        className="clickableIcon underlinedText"
                        onClick={() => this.getDetail(wa.branchId, wa.waers, 2)}
                      >
                        {wa.rasKol}
                      </a>
                    )}
                    {(!wa.branchName || wa.rasKol === 0) && wa.rasKol}
                  </Table.Cell>
                  <Table.Cell>{moneyFormat(wa.rasDmbtr)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.rasWrbtr)}</Table.Cell>
                  <Table.Cell>{wa.totKol}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.totDmbtr)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.totWrbtr)}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    );
  }
  getDetail(branchId, waers, ps) {
    this.props.modifyLoader(true);
    this.props.fetchDynamicFAGM('finance/reports/frep5/searchDetail', {
      bukrs: this.state.searchTerm.bukrs,
      brnch: branchId,
      waers: waers,
      ps: ps,
      ctTypeList: this.state.searchTerm.ctTypeList.join(),
      conDateFrom: this.state.searchTerm.conDateFrom.format('YYYY-MM-DD'),
      conDateTo: this.state.searchTerm.conDateTo.format('YYYY-MM-DD'),
    });

    this.setState({
      activeIndex: 2,
    });
  }
  renderDetail() {
    const { formatMessage } = this.props.intl;
    const { totalDmbtr, totalWrbtr } = this.state;
    const { outputTableDetail } = this.props;

    if (!outputTableDetail) return '';

    let t1columns = [];
    let t1r1c1 = {
      Header: ({ value }) => <b>{formatMessage(messages.brnch)}</b>,
      accessor: 'branchName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'branchName' }],
        }),
      filterAll: true,
      width: 170,
    };
    let t1r1c2 = {
      Header: ({ value }) => <b>{formatMessage(messages.belnr)}</b>,
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
    };
    let t1r1c3 = {
      Header: ({ value }) => <b>{formatMessage(messages.gjahr)}</b>,
      accessor: 'gjahr',
      Cell: ({ value }) => <span>{value}</span>,
      width: 140,
    };

    let t1r1c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'waers' }],
        }),
      filterAll: true,
      width: 70,
    };

    let t1r1c5 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)} USD</b>,
      accessor: 'dmbtr',
      Cell: obj => <span>{moneyFormat(obj.original.dmbtr)}</span>,
      width: 140,
    };

    t1r1c5.Footer = (
      <span>
        <strong>
          <font>
            {totalDmbtr
              ? // new Intl.NumberFormat('ru').format(totalDmbtr)
                moneyFormat(totalDmbtr)
              : ''}
          </font>
        </strong>
      </span>
    );

    let t1r1c6 = {
      Header: ({ value }) => (
        <b>
          {formatMessage(messages.amount)}{' '}
          {formatMessage(messages.inDocumentCurrency)}
        </b>
      ),
      accessor: 'wrbtr',
      Cell: obj => <span>{moneyFormat(obj.original.wrbtr)}</span>,
      width: 140,
    };

    t1r1c6.Footer = (
      <span>
        <strong>
          <font>{totalWrbtr ? moneyFormat(totalWrbtr) : ''}</font>
        </strong>
      </span>
    );

    let t1r1c7 = {
      Header: ({ value }) => <b>{formatMessage(messages.contractDate)}</b>,
      accessor: 'conDate', //Cell: obj => <span>{obj.original.budat}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['_original.conDate'] }),
      filterAll: true,
      width: 100,
    };

    let t1r1c8 = {
      Header: ({ value }) => <b>{formatMessage(messages.snNum)}</b>,
      accessor: 'contractNumber',
      Cell: obj => (
        <span>
          {obj.original.contractNumber && (
            <LinkToDmsc03 snNum={obj.original.contractNumber} />
          )}
        </span>
      ),
      width: 90,
    };

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);
    t1columns.push(t1r1c3);
    t1columns.push(t1r1c4);
    t1columns.push(t1r1c5);
    t1columns.push(t1r1c6);
    t1columns.push(t1r1c7);
    t1columns.push(t1r1c8);

    return (
      <ReactTable
        filterable
        ref={r => (this.reactTable = r)}
        data={outputTableDetail ? outputTableDetail : []}
        columns={t1columns}
        pageSize={20}
        showPagination={true}
        className="-striped -highlight"
        loadingText={formatMessage(messages.loadingText)}
        noDataText={formatMessage(messages.noDataText)}
        previousText={formatMessage(messages.previousText)}
        nextText={formatMessage(messages.nextText)}
        rowsText={formatMessage(messages.rowsText)}
        pageText={formatMessage(messages.pageText)}
        ofText={formatMessage(messages.ofText)}
        // filtered={this.state.filtered}
        onFilteredChange={filtered => this.onFilterChangeReactTable()}
      />
    );
  }
  onFilterChangeReactTable() {
    if (
      this.reactTable &&
      this.reactTable.getResolvedState() &&
      this.reactTable.getResolvedState().sortedData &&
      this.reactTable.getResolvedState().sortedData.length > 0
    ) {
      let temp = [...this.reactTable.getResolvedState().sortedData];

      let totalDmbtr = 0,
        totalWrbtr = 0;
      for (let i = 0; i < temp.length; i++) {
        let wa = temp[i];
        totalDmbtr = totalDmbtr + wa.dmbtr;
        totalWrbtr = totalWrbtr + wa.wrbtr;
      }

      totalDmbtr = new BigNumber(totalDmbtr).toFixed(2);
      totalWrbtr = new BigNumber(totalWrbtr).toFixed(2);
      this.setState({ totalDmbtr, totalWrbtr });
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { activeIndex } = this.state;
    const { outputTable } = this.props;

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
          {formatMessage(messages.transNameFrep5)}
        </Header>

        <Menu pointing stackable>
          <Menu.Item
            name={formatMessage(messages.searchParameters)}
            active={activeIndex === 0}
            onClick={() => {
              this.setState({ activeIndex: 0 });
            }}
            icon="search"
          />
          <Menu.Item
            name={formatMessage(messages.result)}
            active={activeIndex === 1}
            onClick={() => {
              this.setState({ activeIndex: 1 });
            }}
            icon="bar chart"
          />
          <Menu.Item
            name={formatMessage(messages.details)}
            active={activeIndex === 2}
            onClick={() => {
              this.setState({ activeIndex: 2 });
            }}
            icon="list layout"
          />
        </Menu>

        <Segment className={activeIndex === 0 ? 'show' : 'hide'}>
          <OutputErrors errors={this.state.errors} />
          {this.renderSearchTab()}
        </Segment>
        <Segment className={activeIndex === 1 ? 'show' : 'hide'}>
          {outputTable && outputTable.length > 0 && (
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
          {this.renderTotal()}
        </Segment>
        <Segment className={activeIndex === 2 ? 'show' : 'hide'}>
          {this.renderDetail()}
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    outputTable: state.fa.dynamicObject.outputTable,
    outputTableDetail: state.fa.dynamicObject.outputTableDetail,
  };
}

export default connect(mapStateToProps, {
  modifyLoader,

  //cleared by dynamic clear function
  clearDynObj,
  fetchDynamicFAGM,
})(injectIntl(Frep5));

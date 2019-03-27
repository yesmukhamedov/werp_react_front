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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import moment from 'moment';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import 'react-table/react-table.css';
import { excelDownload } from '../../../utils/helpers';

import {
  f4FetchCurrencyList,
  f4FetchHkontList,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';
import { fetchDynamicFAGM, clearDynObj } from '../../fa_action';
import { moneyFormat } from '../../../utils/helpers';
import matchSorter, { rankings } from 'match-sorter';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
require('moment/locale/ru');
require('moment/locale/tr');

class Frep1 extends Component {
  constructor(props) {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderSearchTab = this.renderSearchTab.bind(this);
    this.searchFrep1 = this.searchFrep1.bind(this);
    this.validate = this.validate.bind(this);
    this.exportExcel = this.exportExcel.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        branchList: [],
        hkontList: [],
        waers: '',
        bldatFrom: moment(firstDay),
        bldatTo: moment(lastDay),
      },
      activeIndex: 0,
      errors: [],
    };
  }

  componentDidMount() {
    this.props.f4FetchCurrencyList('frep1');
  }

  componentWillUnmount() {
    this.props.clearDynObj();
    this.props.f4ClearAnyObject('F4_CLEAR_HKONT_LIST');
  }
  onInputChange(value, stateFieldName) {
    if (stateFieldName === 'activeIndex') {
      this.setState({ [stateFieldName]: value });
    } else if (stateFieldName === 'bukrs') {
      this.props.clearDynObj();
      this.props.f4FetchHkontList(value, 'FREP1', 0);
      this.setState({
        searchTerm: {
          ...this.state.searchTerm,
          [stateFieldName]: value,
          branchList: [],
          hkontList: [],
        },
      });
    } else {
      this.props.clearDynObj();
      this.setState({
        searchTerm: { ...this.state.searchTerm, [stateFieldName]: value },
      });
    }
  }

  exportExcel() {
    const { formatMessage } = this.props.intl;
    let excelHeaders = [];
    excelHeaders.push(formatMessage(messages.brnch));
    excelHeaders.push(formatMessage(messages.belnr));
    excelHeaders.push(formatMessage(messages.gjahr));
    excelHeaders.push(formatMessage(messages.hkont));
    excelHeaders.push(formatMessage(messages.cashBank));
    excelHeaders.push(formatMessage(messages.bldat));
    excelHeaders.push(formatMessage(messages.amount));
    excelHeaders.push(formatMessage(messages.waers));
    excelHeaders.push(formatMessage(messages.bktxt));
    excelDownload(
      '/api/finance/reports/frep1/downloadExcel',
      'frep1.xls',
      'outputTable',
      this.props.outputTable,
      excelHeaders,
    );
  }
  renderSearchTab() {
    const language = localStorage.getItem('language');
    const { formatMessage } = this.props.intl;
    const {
      branchOptions,
      companyOptions,
      currencyOptions,
      hkontOptions,
    } = this.props;
    const {
      bukrs,
      branchList,
      bldatFrom,
      bldatTo,
      waers,
      hkontList,
    } = this.state.searchTerm;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={5}>
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
                    {formatMessage(messages.hkont)}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      placeholder={formatMessage(messages.hkont)}
                      selection
                      multiple
                      options={hkontOptions || []}
                      value={hkontList}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'hkontList')
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="dollar" />
                    {formatMessage(messages.waers)}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      placeholder={formatMessage(messages.waers)}
                      fluid
                      search
                      selection
                      options={currencyOptions || []}
                      value={waers}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'waers')
                      }
                      noResultsMessage={null}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span>
                      <Icon name="calendar" />
                      {formatMessage(messages.bldat)}
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
                      selected={bldatFrom}
                      locale={language}
                      onChange={event => this.onInputChange(event, 'bldatFrom')}
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
                      onClick={() => this.searchFrep1()}
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

  searchFrep1() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.fetchDynamicFAGM('/api/finance/reports/frep1/search', {
        ...this.state.searchTerm,
        branchList: this.state.searchTerm.branchList.join(),
        bldatFrom: this.state.searchTerm.bldatFrom.format('YYYY-MM-DD'),
        bldatTo: this.state.searchTerm.bldatTo.format('YYYY-MM-DD'),
        hkontList: this.state.searchTerm.hkontList.join(),
      });

      this.setState({
        activeIndex: 1,
      });
    } else {
      this.props.modifyLoader(false);
    }

    this.setState({ errors });
  }
  validate() {
    // getter
    // console.log(localStorage.getItem('language'),'error');

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const errors = [];
    const {
      bukrs,
      branchList,
      hkontList,
      waers,
      bldatFrom,
      bldatTo,
    } = this.state.searchTerm;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (branchList === null || branchList === undefined || !branchList) {
      errors.push(errorTable[`7${language}`]);
    }
    if (
      hkontList === null ||
      hkontList === undefined ||
      !hkontList ||
      hkontList.length === 0
    ) {
      errors.push(errorTable[`12${language}`]);
    }
    if (waers === null || waers === undefined || !waers) {
      errors.push(errorTable[`1${language}`]);
    }
    if (bldatFrom === null || bldatFrom === undefined || !bldatFrom) {
      errors.push(errorTable[`13${language}`]);
    }
    if (bldatTo === null || bldatTo === undefined || !bldatTo) {
      errors.push(errorTable[`14${language}`]);
    }
    return errors;
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { activeIndex } = this.state;
    const { net, outputTable, totalin, totalout } = this.props;

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
      Header: ({ value }) => <b>{formatMessage(messages.hkont)}</b>,
      accessor: 'hkont1020Name',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'hkont1020Name' }],
        }),
      filterAll: true,
      width: 100,
    };

    let t1r1c5 = {
      Header: ({ value }) => <b>{formatMessage(messages.cashBank)}</b>,
      accessor: 'hkontName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'hkontName' }],
        }),
      filterAll: true,
      width: 300,
    };

    t1r1c5.Footer = (
      <span>
        <strong>
          <font color={'green'}>{totalin ? moneyFormat(totalin) : ''}</font>
        </strong>
      </span>
    );

    let t1r1c6 = {
      Header: ({ value }) => <b>{formatMessage(messages.bldat)}</b>,
      accessor: 'bldat', //Cell: obj => <span>{obj.original.bldat}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['_original.bldat'] }),
      filterAll: true,
      width: 100,
    };

    t1r1c6.Footer = (
      <span>
        <strong>
          <font color={'red'}>{totalout ? moneyFormat(totalout) : ''}</font>
        </strong>
      </span>
    );
    let t1r1c7 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)}</b>,
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
    };
    t1r1c7.Footer = (
      <span>
        <strong>
          <font color={totalin > totalout ? 'green' : 'red'}>
            {net ? moneyFormat(net) : ''}
          </font>
        </strong>
      </span>
    );
    let t1r1c8 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
      width: 70,
    };

    let t1r1c9 = {
      Header: ({ value }) => <b>{formatMessage(messages.bktxt)}</b>,
      accessor: 'bktxt',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'bktxt' }],
        }),
      filterAll: true,
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
          {formatMessage(messages.transNameFrep1)}
        </Header>

        <Menu pointing stackable>
          <Menu.Item
            name={formatMessage(messages.searchParameters)}
            active={activeIndex === 0}
            onClick={() => {
              this.onInputChange(0, 'activeIndex');
            }}
          />
          <Menu.Item
            name={formatMessage(messages.result)}
            active={activeIndex === 1}
            onClick={() => {
              this.onInputChange(1, 'activeIndex');
            }}
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
          <ReactTable
            filterable
            data={outputTable ? outputTable : []}
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
          />
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
    currencyOptions: state.f4.currencyOptions,
    outputTable: state.fa.dynamicObject.outputTable,
    net: state.fa.dynamicObject.net,
    totalin: state.fa.dynamicObject.totalin,
    totalout: state.fa.dynamicObject.totalout,
    hkontOptions: state.f4.hkontList,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchHkontList,
    f4FetchCurrencyList,
    fetchDynamicFAGM,
    clearDynObj,
    f4ClearAnyObject,
    modifyLoader,
  },
)(injectIntl(Frep1));

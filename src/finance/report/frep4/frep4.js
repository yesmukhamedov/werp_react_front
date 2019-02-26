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

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

class Frep4 extends Component {
  constructor(props) {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderSearchTab = this.renderSearchTab.bind(this);
    this.searchFrep4 = this.searchFrep4.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.onFilterChangeReactTable = this.onFilterChangeReactTable.bind(this);
    this.validate = this.validate.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        branchList: [],
        blart: '0',
        bldatFrom: moment(firstDay),
        bldatTo: moment(lastDay),
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

  renderSearchTab() {
    const language = localStorage.getItem('language');
    const { formatMessage } = this.props.intl;
    const { branchOptions, companyOptions } = this.props;
    const {
      bukrs,
      branchList,
      blart,
      bldatFrom,
      bldatTo,
    } = this.state.searchTerm;

    const blartOptions = [
      { key: 0, text: formatMessage(messages.all), value: '0' },
      { key: 1, text: formatMessage(messages.blartCF), value: 'CF' },
      { key: 2, text: formatMessage(messages.blartCP), value: 'CP' },
      { key: 3, text: formatMessage(messages.blartDP), value: 'DP' },
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
                    {formatMessage(messages.blart)}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      selection
                      options={blartOptions || []}
                      value={blart}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'blart')
                      }
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
                  <Table.Cell colSpan="2">
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      onClick={() => this.searchFrep4()}
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
    const { bukrs, bldatFrom, bldatTo } = this.state.searchTerm;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (bldatFrom === null || bldatFrom === undefined || !bldatFrom) {
      errors.push(errorTable[`13${language}`]);
    }
    if (bldatTo === null || bldatTo === undefined || !bldatTo) {
      errors.push(errorTable[`14${language}`]);
    }

    return errors;
  }
  searchFrep4() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.fetchDynamicFAGM('/api/finance/reports/frep4/search', {
        ...this.state.searchTerm,
        branchList: this.state.searchTerm.branchList.join(),
        bldatFrom: this.state.searchTerm.bldatFrom.format('YYYY-MM-DD'),
        bldatTo: this.state.searchTerm.bldatTo.format('YYYY-MM-DD'),
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
      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{formatMessage(messages.brnch)}</Table.HeaderCell>
            <Table.HeaderCell>{formatMessage(messages.name)}</Table.HeaderCell>
            <Table.HeaderCell>{formatMessage(messages.hkont)}</Table.HeaderCell>
            <Table.HeaderCell>{formatMessage(messages.waers)}</Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)} USD
            </Table.HeaderCell>
            <Table.HeaderCell>
              {formatMessage(messages.amount)}{' '}
              {formatMessage(messages.inDocumentCurrency)}
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {outputTable &&
            outputTable.map((wa, idx) => {
              return (
                <Table.Row key={idx} className={wa.hkont ? '' : 'subtotalRow'}>
                  <Table.Cell>{wa.branchName}</Table.Cell>
                  <Table.Cell>{wa.hkontName}</Table.Cell>
                  <Table.Cell>{wa.hkont}</Table.Cell>
                  <Table.Cell>{wa.waers}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.dmbtr)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.wrbtr)}</Table.Cell>
                  <Table.Cell>
                    {wa.hkont !== null && (
                      <Icon
                        name="search"
                        className="clickableIcon"
                        size="large"
                        onClick={() =>
                          this.getDetail(wa.branchId, wa.hkont, wa.waers)
                        }
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    );
  }
  getDetail(branchId, hkont, waers) {
    this.props.modifyLoader(true);
    this.props.fetchDynamicFAGM('/api/finance/reports/frep4/searchDetail', {
      bukrs: this.state.searchTerm.bukrs,
      brnch: branchId,
      waers: waers,
      hkont: hkont,
      blart: this.state.searchTerm.blart,
      bldatFrom: this.state.searchTerm.bldatFrom.format('YYYY-MM-DD'),
      bldatTo: this.state.searchTerm.bldatTo.format('YYYY-MM-DD'),
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
      Header: ({ value }) => <b>{formatMessage(messages.hkont)}</b>,
      accessor: 'hkont',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'hkont' }],
        }),
      filterAll: true,
      width: 100,
    };

    let t1r1c5 = {
      Header: ({ value }) => <b>{formatMessage(messages.name)}</b>,
      accessor: 'hkontName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'hkontName' }],
        }),
      filterAll: true,
      width: 300,
    };

    let t1r1c6 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'waers' }],
        }),
      filterAll: true,
      width: 70,
    };

    let t1r1c7 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)} USD</b>,
      accessor: 'dmbtr',
      Cell: obj => <span>{moneyFormat(obj.original.dmbtr)}</span>,
      width: 140,
    };

    t1r1c7.Footer = (
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

    let t1r1c8 = {
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

    t1r1c8.Footer = (
      <span>
        <strong>
          <font>{totalWrbtr ? moneyFormat(totalWrbtr) : ''}</font>
        </strong>
      </span>
    );

    let t1r1c9 = {
      Header: ({ value }) => <b>{formatMessage(messages.bldat)}</b>,
      accessor: 'bldat', //Cell: obj => <span>{obj.original.budat}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['_original.bldat'] }),
      filterAll: true,
      width: 100,
    };

    let t1r1c10 = {
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
    t1columns.push(t1r1c9);
    t1columns.push(t1r1c10);

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
          {formatMessage(messages.transNameFrep4)}
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

export default connect(
  mapStateToProps,
  {
    modifyLoader,

    //cleared by dynamic clear function
    clearDynObj,
    fetchDynamicFAGM,
  },
)(injectIntl(Frep4));

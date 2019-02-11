import axios from 'axios';
import { ROOT_URL } from '../../../utils/constants';
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
  Checkbox,
  Radio,
  List,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import 'react-table/react-table.css';
import {
  fetchArep1Total,
  fetchArep1Detail,
  clearDynObjAcc,
} from '../../accounting_action';
import { moneyFormat } from '../../../utils/helpers';
import { BigNumber } from 'bignumber.js';
import matchSorter, { rankings } from 'match-sorter';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
require('moment/locale/ru');

class Arep1 extends Component {
  constructor(props) {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.renderSearchTab = this.renderSearchTab.bind(this);
    this.fetchHkontOptions = this.fetchHkontOptions.bind(this);
    this.renderOutputTable = this.renderOutputTable.bind(this);
    this.renderOutputTableBody = this.renderOutputTableBody.bind(this);
    this.excelDownload = this.excelDownload.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        branchList: [],
        budatFrom: moment(firstDay),
        budatTo: moment(lastDay),
        bldatFrom: moment(firstDay),
        bldatTo: moment(lastDay),
        hkontRadio: 'include',
        hkontOptions: [],
        hkontList: [],
        hkontFrom: '',
        hkontTo: '',
        hkontLoading: false,
        enableBldat: true,
        enableBudat: false,
        disableStorno: true,
      },
      activeIndex: 0,
    };
  }

  componentWillUnmount() {
    this.props.clearDynObjAcc();
  }
  onInputChange(value, stateFieldName) {
    if (stateFieldName === 'activeIndex') {
      this.setState({ [stateFieldName]: value });
    } else {
      this.props.clearDynObjAcc();
    }

    if (
      stateFieldName === 'enableBudat' ||
      stateFieldName === 'enableBldat' ||
      stateFieldName === 'disableStorno'
    ) {
      this.setState({
        searchTerm: {
          ...this.state.searchTerm,
          [stateFieldName]: !this.state.searchTerm[stateFieldName],
        },
      });
    } else if (stateFieldName === 'bukrs' || stateFieldName === 'branchList') {
      let searchTerm = { ...this.state.searchTerm };
      searchTerm[stateFieldName] = value;
      searchTerm.hkontLoading = true;
      searchTerm.hkontOptions = [];
      searchTerm.hkontList = [];
      searchTerm.hkontFrom = '';
      searchTerm.hkontTo = '';

      if (stateFieldName === 'bukrs') {
        searchTerm.branchList = [];
      }
      this.setState({ searchTerm });
      this.fetchHkontOptions(searchTerm.bukrs, searchTerm.branchList);
    } else {
      this.setState({
        searchTerm: { ...this.state.searchTerm, [stateFieldName]: value },
      });
    }
  }

  fetchHkontOptions(bukrs, branchList) {
    return axios
      .get(`${ROOT_URL}/api/accounting/reports/arep1/hkonts`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          bukrs,
          branchList: branchList.join(),
        },
      })
      .then(({ data }) => {
        let searchTerm = { ...this.state.searchTerm };
        searchTerm.hkontOptions = data.hkontOptions;
        searchTerm.hkontLoading = false;
        this.setState({ searchTerm });
      });
  }

  excelDownload(a_type) {
    let url = '';
    let filename = '';
    let tablename = '';
    if (a_type === 'total') {
      url = `${ROOT_URL}/api/accounting/reports/downloadTotal`;
      filename = 'Arep1Total.xls';
      tablename = 'outputTable';
    } else if (a_type === 'detail') {
      url = `${ROOT_URL}/api/accounting/reports/downloadDetail`;
      filename = 'Arep1Detail.xls';
      tablename = 'outputTableDetail';
    }
    return axios
      .post(
        url,
        {
          [tablename]: this.props[tablename],
        },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
          responseType: 'blob',
        },
      )
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

  getTotal() {
    const {
      bukrs,
      branchList,
      budatFrom,
      budatTo,
      bldatFrom,
      bldatTo,
      hkontRadio,
      hkontList,
      hkontFrom,
      hkontTo,
      enableBldat,
      enableBudat,
      disableStorno,
    } = this.state.searchTerm;
    this.props.fetchArep1Total(
      bukrs,
      branchList,
      budatFrom.format('YYYY-MM-DD'),
      budatTo.format('YYYY-MM-DD'),
      bldatFrom.format('YYYY-MM-DD'),
      bldatTo.format('YYYY-MM-DD'),
      hkontRadio,
      hkontList,
      hkontFrom,
      hkontTo,
      enableBldat,
      enableBudat,
      disableStorno,
    );
    this.setState({ activeIndex: 1 });
  }
  getDetail(branchId, hkont, waers) {
    const {
      bukrs,
      bldatFrom,
      bldatTo,
      enableBldat,
      enableBudat,
      budatFrom,
      budatTo,
      disableStorno,
    } = this.state.searchTerm;
    this.props.fetchArep1Detail(
      bukrs,
      branchId,
      hkont,
      bldatFrom.format('YYYY-MM-DD'),
      bldatTo.format('YYYY-MM-DD'),
      enableBldat,
      enableBudat,
      budatFrom.format('YYYY-MM-DD'),
      budatTo.format('YYYY-MM-DD'),
      disableStorno,
      waers,
    );
    this.setState({ activeIndex: 2 });
  }

  renderSearchTab() {
    const language = localStorage.getItem('language');
    const { formatMessage } = this.props.intl;
    const { branchOptions, companyOptions } = this.props;
    const {
      bukrs,
      branchList,
      budatFrom,
      budatTo,
      bldatFrom,
      bldatTo,
      hkontRadio,
      hkontOptions,
      hkontList,
      hkontFrom,
      hkontTo,
      enableBldat,
      enableBudat,
      disableStorno,
      hkontLoading,
    } = this.state.searchTerm;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Table compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing />
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
                  <Table.Cell />
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
                  <Table.Cell />
                  <Table.Cell>
                    <List>
                      <List.Item>
                        <Radio
                          label={formatMessage(messages.include)}
                          name="hkontRadioGroup"
                          value="include"
                          checked={hkontRadio === 'include'}
                          onChange={(e, { value }) =>
                            this.onInputChange(value, 'hkontRadio')
                          }
                        />
                      </List.Item>
                      <List.Item>
                        <Radio
                          label={formatMessage(messages.between)}
                          name="hkontRadioGroup"
                          value="between"
                          checked={hkontRadio === 'between'}
                          onChange={(e, { value }) =>
                            this.onInputChange(value, 'hkontRadio')
                          }
                        />
                      </List.Item>
                      <List.Item>
                        <Radio
                          label={formatMessage(messages.all)}
                          name="hkontRadioGroup"
                          value="all"
                          checked={hkontRadio === 'all'}
                          onChange={(e, { value }) =>
                            this.onInputChange(value, 'hkontRadio')
                          }
                        />
                      </List.Item>
                    </List>
                  </Table.Cell>
                  <Table.Cell>
                    {hkontRadio === 'include' && (
                      <Dropdown
                        fluid
                        multiple
                        search
                        selection
                        options={hkontOptions}
                        loading={hkontLoading}
                        value={hkontList}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'hkontList')
                        }
                        noResultsMessage={null}
                      />
                    )}
                    {hkontRadio === 'between' && (
                      <Dropdown
                        fluid
                        search
                        selection
                        options={hkontOptions}
                        loading={hkontLoading}
                        value={hkontFrom}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'hkontFrom')
                        }
                        noResultsMessage={null}
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {hkontRadio === 'between' && (
                      <Dropdown
                        fluid
                        search
                        selection
                        options={hkontOptions}
                        loading={hkontLoading}
                        value={hkontTo}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'hkontTo')
                        }
                        noResultsMessage={null}
                      />
                    )}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      checked={enableBldat}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'enableBldat')
                      }
                    />
                  </Table.Cell>
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
                      disabled={!enableBldat}
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
                      disabled={!enableBldat}
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
                  <Table.Cell>
                    <Checkbox
                      checked={enableBudat}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'enableBudat')
                      }
                    />{' '}
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name="calendar" />
                    {formatMessage(messages.budat)}
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    {formatMessage(messages.from)}
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      disabled={!enableBudat}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={budatFrom}
                      locale={language}
                      onChange={event => this.onInputChange(event, 'budatFrom')}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {formatMessage(messages.to)}
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      disabled={!enableBudat}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={budatTo}
                      locale={language}
                      onChange={event => this.onInputChange(event, 'budatTo')}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      checked={disableStorno}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'disableStorno')
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {formatMessage(messages.withoutStorno)}
                  </Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
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
                      onClick={() => this.getTotal()}
                    >
                      <Icon name="search" size="large" />
                      {formatMessage(messages.search)}
                    </Button>
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderOutputTableBody() {
    const { outputTable } = this.props;
    if (!outputTable)
      return (
        <Table.Row>
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
        </Table.Row>
      );

    return outputTable.map((wa, idx) => {
      return (
        <Table.Row key={idx}>
          <Table.Cell active={wa.hkont === ''}>
            {wa.hkont === '' && <strong>{wa.branchName} </strong>}
            {wa.hkont !== '' && wa.branchName}
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            {wa.hkont === '' && <strong>{wa.hkontName} </strong>}
            {wa.hkont !== '' && wa.hkontName}
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            {wa.hkont === '' && <strong>{wa.hkont} </strong>}
            {wa.hkont !== '' && wa.hkont}
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            {wa.hkont === '' && <strong>{wa.waers} </strong>}
            {wa.hkont !== '' && wa.waers}
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            <font color="green">
              {wa.hkont === '' && <strong>{moneyFormat(wa.wrbtr_s)} </strong>}
              {wa.hkont !== '' && moneyFormat(wa.wrbtr_s)}
            </font>
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            <font color="red">
              {wa.hkont === '' && <strong>{moneyFormat(wa.wrbtr_h)} </strong>}
              {wa.hkont !== '' && moneyFormat(wa.wrbtr_h)}
            </font>
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            <font color="green">
              {wa.hkont === '' && <strong>{moneyFormat(wa.dmbtr_s)} </strong>}
              {wa.hkont !== '' && moneyFormat(wa.dmbtr_s)}
            </font>
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            <font color="red">
              {wa.hkont === '' && <strong>{moneyFormat(wa.dmbtr_h)} </strong>}
              {wa.hkont !== '' && moneyFormat(wa.dmbtr_h)}
            </font>
          </Table.Cell>
          <Table.Cell active={wa.hkont === ''}>
            {wa.hkont !== '' && (
              <Icon
                name="search"
                className="clickableIcon"
                size="large"
                onClick={() => this.getDetail(wa.branchId, wa.hkont, wa.waers)}
              />
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderOutputTable() {
    const { formatMessage } = this.props.intl;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Table striped compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    {formatMessage(messages.brnch)}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {formatMessage(messages.name)}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {formatMessage(messages.hkont)}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {formatMessage(messages.waers)}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {formatMessage(messages.amount)}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {formatMessage(messages.amount)}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {formatMessage(messages.amount)} USD
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {formatMessage(messages.amount)} USD
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>{this.renderOutputTableBody()}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { activeIndex } = this.state;

    let t1columns = [];
    let t1r1c1 = {
      Header: ({ value }) => <b>{formatMessage(messages.brnch)}</b>,
      accessor: 'branchName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'branchName' }],
        }),
      filterAll: true,
      width: 100,
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
      Header: ({ value }) => <b>{formatMessage(messages.budat)}</b>,
      accessor: 'budatYYYYMMDD',
      Cell: obj => <span>{obj.original.budat}</span>,

      filterMethod: (
        filter,
        rows, //(console.log(rows,'rows',filter)),
      ) => matchSorter(rows, filter.value, { keys: ['_original.budat'] }),
      filterAll: true,
      width: 100,
    };

    let t1r1c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.bldat)}</b>,
      accessor: 'bldat', //Cell: obj => <span>{obj.original.bldat}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['_original.bldat'] }),
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
    };
    let t1r1c6 = {
      Header: ({ value }) => <b>{formatMessage(messages.hkont)}</b>,
      accessor: 'hkont',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'hkont' }],
        }),
      filterAll: true,
      width: 100,
    };
    let t1r1c7 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
      width: 70,
    };

    let t1r1c9 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)}</b>,
      accessor: 'wrbtr_s',
      Cell: ({ value }) => (
        <span>
          <font color="green">{moneyFormat(value)}</font>
        </span>
      ),
      width: 140,
    };
    t1r1c9.Footer = (
      <span>
        <strong>
          <font color="green">
            {moneyFormat(
              new BigNumber(
                _.sum(
                  _.map(this.props.outputTableDetail, d => d.wrbtr_s),
                ).toFixed(2),
              ),
            )}
          </font>
        </strong>
      </span>
    );
    let t1r1c11 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)}</b>,
      accessor: 'wrbtr_h',
      Cell: ({ value }) => (
        <span>
          <font color="red">{moneyFormat(value)}</font>
        </span>
      ),
      width: 140,
    };
    t1r1c11.Footer = (
      <span>
        <strong>
          <font color="red">
            {moneyFormat(
              new BigNumber(
                _.sum(
                  _.map(this.props.outputTableDetail, d => d.wrbtr_h),
                ).toFixed(2),
              ),
            )}
          </font>
        </strong>
      </span>
    );
    let t1r1c8 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)} USD</b>,
      accessor: 'dmbtr_s',
      Cell: ({ value }) => (
        <span>
          <font color="green">{moneyFormat(value)}</font>
        </span>
      ),
      width: 140,
    };
    t1r1c8.Footer = (
      <span>
        <strong>
          <font color="green">
            {moneyFormat(
              new BigNumber(
                _.sum(
                  _.map(this.props.outputTableDetail, d => d.dmbtr_s),
                ).toFixed(2),
              ),
            )}
          </font>
        </strong>
      </span>
    );
    let t1r1c10 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)} USD</b>,
      accessor: 'dmbtr_h',
      Cell: ({ value }) => (
        <span>
          <font color="red">{moneyFormat(value)}</font>
        </span>
      ),
      width: 140,
    };
    t1r1c10.Footer = (
      <span>
        <strong>
          <font color="red">
            {moneyFormat(
              new BigNumber(
                _.sum(
                  _.map(this.props.outputTableDetail, d => d.dmbtr_h),
                ).toFixed(2),
              ),
            )}
          </font>
        </strong>
      </span>
    );
    let t1r1c12 = {
      Header: ({ value }) => <b>{formatMessage(messages.customer)}</b>,
      accessor: 'customerName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'customerName' }],
        }),
      filterAll: true,
    };
    let t1r1c13 = {
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
    t1columns.push(t1r1c9);
    t1columns.push(t1r1c11);
    t1columns.push(t1r1c8);
    t1columns.push(t1r1c10);
    t1columns.push(t1r1c12);
    t1columns.push(t1r1c13);

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
          {formatMessage(messages.transNameArep1)}
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
          <Menu.Item
            name={formatMessage(messages.details)}
            active={activeIndex === 2}
            onClick={() => {
              this.onInputChange(2, 'activeIndex');
            }}
          />
        </Menu>

        <Segment className={activeIndex === 0 ? 'show' : 'hide'}>
          {this.renderSearchTab()}
        </Segment>
        <Segment className={activeIndex === 1 ? 'show' : 'hide'}>
          {this.props.outputTable && this.props.outputTable.length > 0 && (
            <Menu stackable size="small">
              <Menu.Item>
                <img
                  className="clickableItem"
                  src="/assets/img/xlsx_export_icon.png"
                  onClick={() => this.excelDownload('total')}
                />
              </Menu.Item>
            </Menu>
          )}
          {this.renderOutputTable()}
        </Segment>
        <Segment className={activeIndex === 2 ? 'show' : 'hide'}>
          {this.props.outputTableDetail &&
            this.props.outputTableDetail.length > 0 && (
              <Menu stackable size="small">
                <Menu.Item>
                  <img
                    className="clickableItem"
                    src="/assets/img/xlsx_export_icon.png"
                    onClick={() => this.excelDownload('detail')}
                  />
                </Menu.Item>
              </Menu>
            )}

          <ReactTable
            filterable
            data={
              this.props.outputTableDetail ? this.props.outputTableDetail : []
            }
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
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    outputTable: state.accounting.dynamicObject.outputTable,
    outputTableDetail: state.accounting.dynamicObject.outputTableDetail,
  };
}

export default connect(
  mapStateToProps,
  { fetchArep1Total, fetchArep1Detail, clearDynObjAcc },
)(injectIntl(Arep1));

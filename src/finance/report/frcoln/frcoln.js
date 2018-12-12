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
  Segment,
  Menu,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { notify } from '../../../general/notification/notification_action';
import ReactTable from 'react-table';
import _ from 'lodash';
import '../frcoln/frcoln.css';
import 'react-table/react-table.css';
import {
  frcolnSearchData,
  frcolnFetchBranchData,
  changeTab,
  frcolnFetchCollectorData,
  clearState,
  frcolnSaveData,
} from './frcoln_action';
import { LEGACY_URL } from '../../../utils/constants';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { messages } from '../../../locales/defineMessages';

require('moment/locale/ru');

class Frcoln extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.searchBranchInfo = this.searchBranchInfo.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.searchCollectorInfo = this.searchCollectorInfo.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        branchList: [],
        date: moment(),
        status: 0,
        period: 'END',
      },
      companyOptions: [],
      branchOptions: [],
    };

    // ,tab2TableParams : {table:[], headers:headerObjectArray,columns:columnObjectArray,
    //     pagination:true//,footers:footers//, paginationSize:5//,totalPages:undefined, currentPage:undefined//
    //   }
  }

  componentWillUnmount() {
    this.props.clearState();
  }
  // .filter((item) =>
  //         {item.businessAreaId==1})
  onInputChange(value, stateFieldName) {
    // console.log(formatMoney(324234234.55));
    const waSearchTerm = Object.assign({}, this.state.searchTerm);

    this.props.clearState();
    if (stateFieldName === 'bukrs') {
      waSearchTerm.bukrs = value;
      const branchOptions = this.props.branchOptions[value];
      this.setState({
        searchTerm: waSearchTerm,
        branchOptions: branchOptions || [],
      });
      // if (branchOptions!==undefined && branchOptions.length>0){
      //     this.setState({searchTerm:waSearchTerm,branchOptions});
      // }
      // else
      // {
      //     this.setState({searchTerm:waSearchTerm,branchOptions:branchOptions?branchOptions:[]});
      // }
    } else if (stateFieldName === 'branch') {
      waSearchTerm.branchList = value;
      this.setState({ searchTerm: waSearchTerm });
    } else if (stateFieldName === 'date') {
      waSearchTerm.date = value;
      this.setState({ searchTerm: waSearchTerm });
    } else if (stateFieldName === 'status') {
      waSearchTerm.status = value;
      this.setState({ searchTerm: waSearchTerm });
    } else if (stateFieldName === 'period') {
      waSearchTerm.period = value;
      this.setState({ searchTerm: waSearchTerm });
    }

    // console.log(this.state);
  }

  onSearchClick() {
    this.props.frcolnSearchData(
      this.state.searchTerm.bukrs,
      this.state.searchTerm.branchList,
      this.state.searchTerm.status,
      this.state.searchTerm.date,
      this.state.searchTerm.period,
    );
  }

  searchBranchInfo(branch_id, waers) {
    this.props.frcolnFetchBranchData(
      this.state.searchTerm.bukrs,
      branch_id,
      this.state.searchTerm.status,
      this.state.searchTerm.date,
      waers,
      this.state.searchTerm.period,
    );
  }

  searchCollectorInfo(bukrs, branch_id, waers, staff_id, ps) {
    this.props.frcolnFetchCollectorData(
      bukrs,
      branch_id,
      this.state.searchTerm.status,
      this.state.searchTerm.date,
      waers,
      staff_id,
      ps,
      this.state.searchTerm.period,
    );
  }

  onSaveClick() {
    if (
      this.props.tab2OutputTable !== null &&
      this.props.tab2OutputTable.length > 0 &&
      this.state.searchTerm.period === 'END'
    ) {
      this.props.frcolnSaveData(
        this.state.searchTerm.bukrs,
        this.state.searchTerm.date,
        this.state.searchTerm.period,
      );
    } else if (
      this.props.tab2OutputTable === null ||
      this.props.tab2OutputTable.length > 0 ||
      this.state.searchTerm.period === 'BEG'
    ) {
      this.props.frcolnSaveData(
        this.state.searchTerm.bukrs,
        this.state.searchTerm.date,
        this.state.searchTerm.period,
      );
    } else {
      this.props.notify('error', 'Нажмите на поиск.', 'Ошибка');
    }
  }

  renderTab1() {
    const { formatMessage } = this.props.intl;
    const statusOptions = [
      { key: 0, text: formatMessage(messages.standard), value: 0 },
      { key: 1, text: formatMessage(messages.problem), value: 1 },
    ];

    const periodOptions = [
      { key: 0, text: formatMessage(messages.onBegOfMonth), value: 'BEG' },
      { key: 1, text: formatMessage(messages.onEndOfMonth), value: 'END' },
    ];
    return (
      // <Tab.Pane>

      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Table compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="folder" /> {formatMessage(messages.bukrs)}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      fluid
                      placeholder={formatMessage(messages.bukrs)}
                      selection
                      options={this.props.companyOptions}
                      value={this.state.searchTerm.bukrs}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'bukrs')
                      }
                    />
                    {/* <BukrsF4n handleChange={(value, fieldname)=> this.onInputChange(value,fieldname)} fluid={true}/>                                         */}
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" />
                    {formatMessage(messages.brnch)}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={formatMessage(messages.all)}
                      fluid
                      multiple
                      search
                      selection
                      options={this.state.branchOptions}
                      value={this.state.searchTerm.branchList}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'branch')
                      }
                    />
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="calendar" />
                    {formatMessage(messages.date)}
                  </Table.Cell>
                  <Table.Cell>
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={this.state.searchTerm.date}
                      locale="ru"
                      onChange={event => this.onInputChange(event, 'date')}
                      dateFormat="MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="options" />
                    {formatMessage(messages.state1)}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      item
                      options={statusOptions}
                      value={this.state.searchTerm.status}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'status')
                      }
                    />
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="calendar" />
                    {formatMessage(messages.period)}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      item
                      options={periodOptions}
                      value={this.state.searchTerm.period}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'period')
                      }
                    />
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell>
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      onClick={this.onSearchClick.bind(this)}
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

  handleTabChange(activeIndex) {
    this.props.changeTab(activeIndex);
  }

  render() {
    // initialize columns
    // table 1 branches

    const { formatMessage, locale } = this.props.intl;
    const numFormLocale = `${locale}-RU`;
    // t2r2c3.className=('clickableItem');
    const t1columns = [];
    const t1r2c1 = {
      Header: ({ value }) => <b>{formatMessage(messages.brnch)}</b>,
      accessor: 'branch_name',
      className: 'clickableItem',
    };
    const t1r2c2 = {
      Header: ({ value }) => (
        <b>{formatMessage(messages.numOfSalesContracts)}</b>
      ),
      accessor: 'contract_amount',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c3 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
      className: 'clickableItem',
    };
    const t1r2c4 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_plan',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c5 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_poluchen',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c6 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_plan',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c7 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_poluchen',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c8 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_usd_plan',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c9 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_usd_poluchen',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c10 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_usd_plan',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t1r2c11 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_usd_poluchen',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };

    const t1r2c12 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'total_usd_plan',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    t1r2c12.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(_.map(this.props.tab2OutputTable, d => d.total_usd_plan)),
          )}
        </strong>
      </span>
    );
    const t1r2c13 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'total_usd_poluchen',
      className: 'clickableItem',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    t1r2c13.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(_.map(this.props.tab2OutputTable, d => d.total_usd_poluchen)),
          )}
        </strong>
      </span>
    );
    const t1r2c14 = {
      Header: <b>{formatMessage(messages.percent)}</b>,
      accessor: 'total_usd_percentage',
      className: 'clickableItem',
      Cell: ({ value }) => (
        <span>
          {new Intl.NumberFormat(numFormLocale).format(value)} {'%'}
        </span>
      ),
    };
    t1r2c14.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            (_.sum(
              _.map(this.props.tab2OutputTable, d => d.total_usd_poluchen),
            ) *
              100) /
              _.sum(_.map(this.props.tab2OutputTable, d => d.total_usd_plan)),
          )}{' '}
          {'%'}
        </strong>
      </span>
    );
    const t1r2c15 = {
      Header: <b>{formatMessage(messages.city)}</b>,
      accessor: 'city_name',
      className: 'clickableItem',
    };

    const t1r1c2 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)}</b>,
      columns: [],
    };
    const t1r1c3 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)}</b>,
      columns: [],
    };
    const t1r1c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)} USD</b>,
      columns: [],
    };
    const t1r1c5 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)} USD</b>,
      columns: [],
    };
    const t1r1c6 = {
      Header: ({ value }) => <b>{formatMessage(messages.overallSum)}</b>,
      columns: [],
    };

    t1r1c2.columns.push(t1r2c4);
    t1r1c2.columns.push(t1r2c5);
    t1r1c3.columns.push(t1r2c6);
    t1r1c3.columns.push(t1r2c7);
    t1r1c4.columns.push(t1r2c8);
    t1r1c4.columns.push(t1r2c9);
    t1r1c5.columns.push(t1r2c10);
    t1r1c5.columns.push(t1r2c11);
    t1r1c6.columns.push(t1r2c12);
    t1r1c6.columns.push(t1r2c13);
    t1r1c6.columns.push(t1r2c14);
    t1r1c6.columns.push(t1r2c15);

    t1columns.push(t1r2c1);
    t1columns.push(t1r2c2);
    t1columns.push(t1r2c3);
    t1columns.push(t1r1c2);
    t1columns.push(t1r1c3);
    t1columns.push(t1r1c4);
    t1columns.push(t1r1c5);
    t1columns.push(t1r1c6);

    // table 2 Branches Overall Amount
    const t2columns = [];
    const t2r2c1 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
    };
    const t2r2c2 = {
      Header: ({ value }) => (
        <b>{formatMessage(messages.numOfSalesContracts)}</b>
      ),
      accessor: 'contract_amount',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c3 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c4 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c5 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c6 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c7 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_usd_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c8 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_usd_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c9 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_usd_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t2r2c10 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_usd_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };

    const t2r2c11 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      id: 'total_usd_plan',
      accessor: row => (
        <span>
          {new Intl.NumberFormat(numFormLocale).format(
            row.ras_usd_plan + row.one_month_usd_plan,
          )}
        </span>
      ),
    };
    t2r2c11.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(
              _.map(
                this.props.tab2TotalTable,
                d => d.ras_usd_plan + d.one_month_usd_plan,
              ),
            ),
          )}
        </strong>
      </span>
    );
    const t2r2c12 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      id: 'total_usd_poluchen',
      accessor: row => (
        <span>
          {new Intl.NumberFormat(numFormLocale).format(
            row.ras_usd_poluchen + row.one_month_usd_poluchen,
          )}
        </span>
      ),
    };
    t2r2c12.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(
              _.map(
                this.props.tab2TotalTable,
                d => d.ras_usd_poluchen + d.one_month_usd_poluchen,
              ),
            ),
          )}
        </strong>
      </span>
    );

    const t2r1c2 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)}</b>,
      columns: [],
    };
    const t2r1c3 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)}</b>,
      columns: [],
    };
    const t2r1c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)} USD</b>,
      columns: [],
    };
    const t2r1c5 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)} USD</b>,
      columns: [],
    };
    const t2r1c6 = {
      Header: ({ value }) => <b>{formatMessage(messages.overallSum)}</b>,
      columns: [],
    };

    t2r1c2.columns.push(t2r2c3);
    t2r1c2.columns.push(t2r2c4);
    t2r1c3.columns.push(t2r2c5);
    t2r1c3.columns.push(t2r2c6);
    t2r1c4.columns.push(t2r2c7);
    t2r1c4.columns.push(t2r2c8);
    t2r1c5.columns.push(t2r2c9);
    t2r1c5.columns.push(t2r2c10);
    t2r1c6.columns.push(t2r2c11);
    t2r1c6.columns.push(t2r2c12);

    t2columns.push(t2r2c1);
    t2columns.push(t2r2c2);
    t2columns.push(t2r1c2);
    t2columns.push(t2r1c3);
    t2columns.push(t2r1c4);
    t2columns.push(t2r1c5);
    t2columns.push(t2r1c6);

    // table 3 Fin Agent
    const t3columns = [];
    const t3r2c1 = {
      Header: ({ value }) => <b>{formatMessage(messages.brnch)}</b>,
      accessor: 'branch_name',
    };
    const t3r2c2 = {
      Header: ({ value }) => <b>{formatMessage(messages.fio)}</b>,
      accessor: 'collector_name',
    };
    const t3r2c3 = {
      Header: ({ value }) => (
        <b>{formatMessage(messages.numOfSalesContracts)}</b>
      ),
      accessor: 'contract_amount',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
    };
    const t3r2c5 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c6 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c7 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c8 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c9 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_usd_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c10 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_usd_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c11 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_usd_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c12 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_usd_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t3r2c13 = {
      Header: <b>{formatMessage(messages.details)}</b>,
      id: 'rasPer',
      accessor: row => (
        <Button
          primary
          size="small"
          onClick={() =>
            this.searchCollectorInfo(
              row.bukrs,
              row.branch_id,
              row.waers,
              row.staff_id,
              2,
            )
          }
        >
          {formatMessage(messages.toShow)}
        </Button>
      ),
    };
    const t3r2c14 = {
      Header: <b>{formatMessage(messages.percent)}</b>,
      accessor: 'ras_percentage',
      Cell: ({ value }) => (
        <span>
          {new Intl.NumberFormat(numFormLocale).format(value)} {'%'}
        </span>
      ),
    };
    const t3r2c15 = {
      Header: <b>{formatMessage(messages.details)}</b>,
      id: 'onePer',
      accessor: row => (
        <Button
          primary
          size="small"
          onClick={() =>
            this.searchCollectorInfo(
              row.bukrs,
              row.branch_id,
              row.waers,
              row.staff_id,
              1,
            )
          }
        >
          {formatMessage(messages.toShow)}
        </Button>
      ),
    };
    const t3r2c16 = {
      Header: <b>{formatMessage(messages.percent)}</b>,
      accessor: 'one_month_percentage',
      Cell: ({ value }) => (
        <span>
          {new Intl.NumberFormat(numFormLocale).format(value)} {'%'}
        </span>
      ),
    };

    const t3r1c2 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)}</b>,
      columns: [],
    };
    const t3r1c3 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)}</b>,
      columns: [],
    };
    const t3r1c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)} USD</b>,
      columns: [],
    };
    const t3r1c5 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)} USD</b>,
      columns: [],
    };

    t3r1c2.columns.push(t3r2c13);
    t3r1c2.columns.push(t3r2c5);
    t3r1c2.columns.push(t3r2c6);
    t3r1c2.columns.push(t3r2c14);
    // t3r1c3.columns.push(t3r2c13);
    t3r1c3.columns.push(t3r2c15);
    t3r1c3.columns.push(t3r2c7);
    t3r1c3.columns.push(t3r2c8);
    t3r1c3.columns.push(t3r2c16);

    t3r1c4.columns.push(t3r2c9);
    t3r1c4.columns.push(t3r2c10);
    t3r1c5.columns.push(t3r2c11);
    t3r1c5.columns.push(t3r2c12);

    t3columns.push(t3r2c1);
    t3columns.push(t3r2c2);
    t3columns.push(t3r2c3);
    t3columns.push(t3r2c4);
    t3columns.push(t3r1c2);
    t3columns.push(t3r1c3);
    t3columns.push(t3r1c4);
    t3columns.push(t3r1c5);

    // table 4  Fin Agent Overall Amount
    const t4columns = [];
    const t4r2c1 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
    };
    const t4r2c2 = {
      Header: ({ value }) => (
        <b>{formatMessage(messages.numOfSalesContracts)}</b>
      ),
      accessor: 'contract_amount',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c3 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c4 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c5 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c6 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c7 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'ras_usd_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c8 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'ras_usd_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c9 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'one_month_usd_plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    const t4r2c10 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'one_month_usd_poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };

    const t4r2c11 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      id: 'total_usd_plan',
      accessor: row => (
        <span>
          {new Intl.NumberFormat(numFormLocale).format(
            row.ras_usd_plan + row.one_month_usd_plan,
          )}
        </span>
      ),
    };
    t4r2c11.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(
              _.map(
                this.props.tab2TotalTable,
                d => d.ras_usd_plan + d.one_month_usd_plan,
              ),
            ),
          )}
        </strong>
      </span>
    );
    const t4r2c12 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      id: 'total_usd_poluchen',
      accessor: row => (
        <span>
          {new Intl.NumberFormat(numFormLocale).format(
            row.ras_usd_poluchen + row.one_month_usd_poluchen,
          )}
        </span>
      ),
    };
    t4r2c12.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(
              _.map(
                this.props.tab2TotalTable,
                d => d.ras_usd_poluchen + d.one_month_usd_poluchen,
              ),
            ),
          )}
        </strong>
      </span>
    );

    const t4r1c2 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)}</b>,
      columns: [],
    };
    const t4r1c3 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)}</b>,
      columns: [],
    };
    const t4r1c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.installments)} USD</b>,
      columns: [],
    };
    const t4r1c5 = {
      Header: ({ value }) => <b>{formatMessage(messages.in1Month)} USD</b>,
      columns: [],
    };
    const t4r1c6 = {
      Header: ({ value }) => <b>{formatMessage(messages.overallSum)}</b>,
      columns: [],
    };

    t4r1c2.columns.push(t4r2c3);
    t4r1c2.columns.push(t4r2c4);
    t4r1c3.columns.push(t4r2c5);
    t4r1c3.columns.push(t4r2c6);
    t4r1c4.columns.push(t4r2c7);
    t4r1c4.columns.push(t4r2c8);
    t4r1c5.columns.push(t4r2c9);
    t4r1c5.columns.push(t4r2c10);
    t4r1c6.columns.push(t4r2c11);
    t4r1c6.columns.push(t4r2c12);

    t4columns.push(t4r2c1);
    t4columns.push(t4r2c2);
    t4columns.push(t4r1c2);
    t4columns.push(t4r1c3);
    t4columns.push(t4r1c4);
    t4columns.push(t4r1c5);
    t4columns.push(t4r1c6);

    // table 5
    const t5columns = [];
    const t5r1c1 = {
      Header: ({ value }) => <b>{formatMessage(messages.snNum)}</b>,
      accessor: 'contract_number',
      Cell: obj => (
        <span>
          {obj.original.contract_number && (
            <a
              target="_blank"
              href={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${
                obj.original.contract_number
              }`}
            >
              <Button>{obj.original.contract_number}</Button>
            </a>
          )}
          {obj.original.belnr && (
            <span>
              <Link
                target="_blank"
                className="ui icon button primary"
                to={`/finance/mainoperation/fa03?belnr=${
                  obj.original.belnr
                }&bukrs=${obj.original.bukrs}&gjahr=${obj.original.gjahr}`}
              >
                {obj.original.belnr}
              </Link>
              {obj.original.zreg}
            </span>
          )}
        </span>
      ),
    };
    t5r1c1.Footer = (
      <span>
        <strong>
          {formatMessage(messages.count)}:{' '}
          {new Intl.NumberFormat(numFormLocale).format(
            this.props.tab4OutputTable.length,
          )}
        </strong>
      </span>
    );
    const t5r1c2 = {
      Header: ({ value }) => <b>{formatMessage(messages.contractDate)}</b>,
      accessor: 'contract_date',
      Cell: ({ value }) => {
        if (value) {
          return moment(value).format('DD.MM.YYYY');
        }
        return '';
      },
      sortMethod: (a, b) => {
        if (a === b) {
          return a > b ? 1 : -1;
        }
        return a > b ? 1 : -1;
      },
    };
    const t5r1c3 = {
      Header: ({ value }) => <b>{formatMessage(messages.fio)}</b>,
      accessor: 'fio',
    };
    const t5r1c4 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
    };
    const t5r1c5 = {
      Header: <b>{formatMessage(messages.plan)}</b>,
      accessor: 'plan',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    t5r1c5.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(_.map(this.props.tab4OutputTable, d => d.plan)),
          )}
        </strong>
      </span>
    );

    const t5r1c6 = {
      Header: <b>{formatMessage(messages.collected)}</b>,
      accessor: 'poluchen',
      Cell: ({ value }) => new Intl.NumberFormat(numFormLocale).format(value),
    };
    t5r1c6.Footer = (
      <span>
        <strong>
          {new Intl.NumberFormat(numFormLocale).format(
            _.sum(_.map(this.props.tab4OutputTable, d => d.poluchen)),
          )}
        </strong>
      </span>
    );

    t5columns.push(t5r1c1);
    t5columns.push(t5r1c2);
    t5columns.push(t5r1c3);
    t5columns.push(t5r1c4);
    t5columns.push(t5r1c5);
    t5columns.push(t5r1c6);

    return (
      // <ExcelFile>
      //     <ExcelSheet data={dataSet1} name="Employees">
      //         <ExcelColumn label="Name" value="name" />
      //         <ExcelColumn label="Wallet Money" value="amount" />
      //         <ExcelColumn label="Gender" value="sex" />
      //         <ExcelColumn label="Marital Status"
      //                     value={(col) => col.is_married ? "Married" : "Single"} />
      //     </ExcelSheet>
      // </ExcelFile>

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
          {formatMessage(messages.transNameFrcoln)}
        </Header>

        <Menu pointing stackable>
          <Menu.Item
            name={formatMessage(messages.searchParameters)}
            active={this.props.activeIndex === 0}
            onClick={() => {
              this.handleTabChange(0);
            }}
          />
          <Menu.Item
            name={formatMessage(messages.branches)}
            active={this.props.activeIndex === 1}
            onClick={() => {
              this.handleTabChange(1);
            }}
          />
          <Menu.Item
            name={formatMessage(messages.finAgents)}
            active={this.props.activeIndex === 2}
            onClick={() => {
              this.handleTabChange(2);
            }}
          />
          <Menu.Item
            name={formatMessage(messages.salesContracts)}
            active={this.props.activeIndex === 3}
            onClick={() => {
              this.handleTabChange(3);
            }}
          />
        </Menu>

        <Segment className={this.props.activeIndex === 0 ? 'show' : 'hide'}>
          {this.renderTab1()}
        </Segment>
        <Segment.Group
          className={this.props.activeIndex === 1 ? 'show' : 'hide'}
        >
          <Segment>
            <Button
              icon
              labelPosition="left"
              primary
              size="small"
              onClick={() => this.onSaveClick()}
            >
              <Icon name="save" size="large" />
              {formatMessage(messages.save)}
            </Button>
          </Segment>
          <Segment>
            <ReactTable
              getTrProps={(state, rowInfo, column, instance) => ({
                onClick: e => {
                  this.searchBranchInfo(
                    rowInfo.original.branch_id,
                    rowInfo.original.waers,
                  );
                  // console.log(searchBranchInfo,"test2")
                  // if (searchBranchInfo) {

                  //     this.searchBranchInfo(rowInfo.original.branch_id,rowInfo.original.waers);
                  // }
                },
              })}
              data={this.props.tab2OutputTable}
              columns={t1columns}
              pageSize={
                this.props.tab2OutputTable.length === 0
                  ? 5
                  : this.props.tab2OutputTable.length
              }
              showPagination={false}
              loadingText={formatMessage(messages.loadingText)}
              noDataText={formatMessage(messages.noDataText)}
              className="-striped -highlight"
            />
            <Divider horizontal>
              {formatMessage(messages.overallAmount)}
            </Divider>
            <ReactTable
              data={this.props.tab2TotalTable}
              columns={t2columns}
              pageSize={
                this.props.tab2TotalTable.length === 0
                  ? 5
                  : this.props.tab2TotalTable.length
              }
              showPagination={false}
              loadingText={formatMessage(messages.loadingText)}
              noDataText={formatMessage(messages.noDataText)}
              className="-striped -highlight"
            />
          </Segment>
        </Segment.Group>

        <Segment className={this.props.activeIndex === 2 ? 'show' : 'hide'}>
          <ReactTable
            data={this.props.tab3OutputTable}
            columns={t3columns}
            pageSize={
              this.props.tab3OutputTable.length === 0
                ? 5
                : this.props.tab3OutputTable.length
            }
            showPagination={false}
            loadingText={formatMessage(messages.loadingText)}
            noDataText={formatMessage(messages.noDataText)}
            className="-striped -highlight"
          />
          <Divider horizontal>{formatMessage(messages.overallAmount)}</Divider>
          <ReactTable
            data={this.props.tab3TotalTable}
            columns={t4columns}
            pageSize={
              this.props.tab3TotalTable.length === 0
                ? 5
                : this.props.tab3TotalTable.length
            }
            showPagination={false}
            loadingText={formatMessage(messages.loadingText)}
            noDataText={formatMessage(messages.noDataText)}
            className="-striped -highlight"
          />
        </Segment>

        <Segment className={this.props.activeIndex === 3 ? 'show' : 'hide'}>
          <ReactTable
            data={this.props.tab4OutputTable}
            columns={t5columns}
            defaultPageSize={20}
            showPagination
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

  // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,

    tab2OutputTable: state.frcoln.tab2OutputTable,
    tab3OutputTable: state.frcoln.tab3OutputTable,
    tab4OutputTable: state.frcoln.tab4OutputTable,
    tab2TotalTable: state.frcoln.tab2TotalTable,
    tab3TotalTable: state.frcoln.tab3TotalTable,
    activeIndex: state.frcoln.activeIndex,
  };
}

export default connect(
  mapStateToProps,
  {
    notify,
    frcolnSearchData,
    frcolnFetchBranchData,
    changeTab,
    frcolnFetchCollectorData,
    frcolnSaveData,
    clearState,
  },
)(injectIntl(Frcoln));

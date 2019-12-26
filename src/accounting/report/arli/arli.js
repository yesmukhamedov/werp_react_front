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
  Popup,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import 'react-table/react-table.css';
import { fetchARLI, clearDynObjAcc } from '../../accounting_action';
import { moneyFormat } from '../../../utils/helpers';
import { LEGACY_URL } from '../../../utils/constants';
import { BigNumber } from 'bignumber.js';
import matchSorter from 'match-sorter';
import '../../../finance/report/frcoln/frcoln.css';

require('moment/locale/ru');

const PopupInfo = (
  belnr,
  gjahr,
  dmbtr,
  wrbtr,
  dmbtr_paid,
  wrbtr_paid,
  iinBin,
  lifnrName,
  lifnr,
  waers,
) => (
  <Popup
    trigger={
      <span>
        <Icon name="info" />
      </span>
    }
    flowing
    hoverable
  >
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Номер и год документа</Table.HeaderCell>
          <Table.HeaderCell colSpan="2">Полная сумма</Table.HeaderCell>
          <Table.HeaderCell colSpan="2">Оплаченная сумма</Table.HeaderCell>
          <Table.HeaderCell>ID контр</Table.HeaderCell>
          <Table.HeaderCell>ИИН-БИН</Table.HeaderCell>
          <Table.HeaderCell>ФИО</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <p>{belnr}</p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>{gjahr}</p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>{moneyFormat(dmbtr)} USD</p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>
              {moneyFormat(wrbtr)} {waers}
            </p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>{moneyFormat(dmbtr_paid)} USD</p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>
              {moneyFormat(wrbtr_paid)} {waers}
            </p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${LEGACY_URL}/accounting/other/fcus01.xhtml?customerId=${lifnr}`}
              >
                <Button>{lifnr}</Button>
              </a>
            </p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>{iinBin}</p>
          </Table.Cell>
          <Table.Cell collapsing>
            <p>{lifnrName}</p>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Popup>
);

class Arli extends Component {
  constructor(props) {
    const date = new Date();

    const y = date.getFullYear();

    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.searchResult = this.searchResult.bind(this);
    this.renderSearchTab = this.renderSearchTab.bind(this);
    this.state = {
      searchTerm: {
        bukrs: '',
        branchList: [],
        dateFrom: moment(firstDay),
        dateTo: moment(lastDay),
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
      this.setState({
        searchTerm: { ...this.state.searchTerm, [stateFieldName]: value },
      });
    }
  }

  searchResult() {
    const { bukrs, branchList, dateFrom, dateTo } = this.state.searchTerm;
    this.props.fetchARLI(
      bukrs,
      branchList,
      moment(dateFrom).format('YYYY-MM-DD'),
      moment(dateTo).format('YYYY-MM-DD'),
      val => {
        this.setState({ activeIndex: val });
      },
    );
  }

  renderSearchTab() {
    const { branchOptions, companyOptions } = this.props;
    const { bukrs, branchList, dateFrom, dateTo } = this.state.searchTerm;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Table compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="folder" />
                    Компания
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      fluid
                      placeholder="Компания"
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
                    Филиал
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      placeholder="Все"
                      fluid
                      multiple
                      search
                      selection
                      options={bukrs ? branchOptions[bukrs] : []}
                      value={branchList}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'branchList')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="calendar" />
                    Дата
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    с
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={dateFrom}
                      locale="ru"
                      onChange={event => this.onInputChange(event, 'dateFrom')}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    по
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={dateTo}
                      locale="ru"
                      onChange={event => this.onInputChange(event, 'dateTo')}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell>
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      onClick={() => this.searchResult()}
                    >
                      <Icon name="search" size="large" />
                      Поиск
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

  render() {
    const { activeIndex } = this.state;

    const t1columns = [];
    const t1r1c1 = {
      Header: ({ value }) => <b>Филиал</b>,
      accessor: 'branchName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['branchName'] }),
      filterAll: true,
      width: 100,
    };
    const t1r1c2 = {
      Header: ({ value }) => <b>Фин. док и Рег. номер</b>,
      accessor: 'zreg',
      Cell: obj => (
        <span>
          <Link
            target="_blank"
            className="ui icon button primary"
            to={`/finance/mainoperation/fa03?belnr=${obj.original.belnr}&bukrs=${obj.original.bukrs}&gjahr=${obj.original.gjahr}`}
          >
            {obj.original.belnr}
          </Link>

          {obj.original.zreg}
          {PopupInfo(
            obj.original.belnr,
            obj.original.gjahr,
            obj.original.dmbtr,
            obj.original.wrbtr,
            obj.original.dmbtr_paid,
            obj.original.wrbtr_paid,
            obj.original.iinBin,
            obj.original.lifnrName,
            obj.original.lifnr,
            obj.original.waers,
          )}
        </span>
      ),
      width: 220,
    };

    t1r1c2.Footer = (
      <span>
        <strong>Кол. Счет Фактур: {this.props.numinv}</strong>
      </span>
    );
    const t1r1c3 = {
      Header: ({ value }) => <b>ФИО</b>,
      accessor: 'lifnrName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['lifnrName'] }),
      filterAll: true,
    };
    const t1r1c4 = {
      Header: ({ value }) => <b>Дата проводки</b>,
      accessor: 'budatYYYYMMDD',
      Cell: obj => <span>{obj.original.budat}</span>,

      filterMethod: (
        filter,
        rows, // (console.log(rows,'rows',filter)),
      ) => matchSorter(rows, filter.value, { keys: ['_original.budat'] }),
      filterAll: true,
      width: 100,
    };

    const t1r1c5 = {
      Header: ({ value }) => <b>Дата документа</b>,
      accessor: 'bldat', // Cell: obj => <span>{obj.original.bldat}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['_original.bldat'] }),
      filterAll: true,
      width: 100,
    };

    const t1r1c6 = {
      Header: ({ value }) => <b>Название</b>,
      accessor: 'matnrName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['matnrName'] }),
      filterAll: true,
    };
    const t1r1c7 = {
      Header: ({ value }) => <b>Кол.</b>,
      accessor: 'menge',
      width: 80,
    };
    t1r1c7.Footer = (
      <span>
        <strong>
          {moneyFormat(_.sum(_.map(this.props.table, d => d.menge)))}
        </strong>
      </span>
    );

    const t1r1c8 = {
      Header: ({ value }) => <b>Сумма ВВ</b>,
      accessor: 'dmbtr_p',
      Cell: ({ value }) => <span>{moneyFormat(value)} USD</span>,
      width: 150,
    };
    t1r1c8.Footer = (
      <span>
        <strong>
          {moneyFormat(
            new BigNumber(
              _.sum(_.map(this.props.table, d => d.dmbtr_p)).toFixed(2),
            ),
          )}
        </strong>
      </span>
    );

    const t1r1c9 = {
      Header: ({ value }) => <b>Сумма В</b>,
      accessor: 'wrbtr_p',
      Cell: obj => (
        <span>
          {' '}
          {moneyFormat(obj.value)} {obj.original.waers}
        </span>
      ),
      width: 150,
    };
    t1r1c9.Footer = (
      <span>
        <strong>
          {moneyFormat(_.sum(_.map(this.props.table, d => d.wrbtr_p)))}
        </strong>
      </span>
    );

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
          Список счетов-фактур продажи
        </Header>

        <Menu pointing stackable>
          <Menu.Item
            name="Параметры поиска"
            active={activeIndex === 0}
            onClick={() => {
              this.onInputChange(0, 'activeIndex');
            }}
          />
          <Menu.Item
            name="Результат"
            active={activeIndex === 1}
            onClick={() => {
              this.onInputChange(1, 'activeIndex');
            }}
          />
        </Menu>

        <Segment className={activeIndex === 0 ? 'show' : 'hide'}>
          {this.renderSearchTab()}
        </Segment>
        <Segment.Group className={activeIndex === 1 ? 'show' : 'hide'}>
          <Segment>
            <ReactTable
              filterable
              data={this.props.table ? this.props.table : []}
              columns={t1columns}
              defaultPageSize={20}
              showPagination
              loadingText="Loading..."
              noDataText="Нет записей"
              className="-striped -highlight"
              previousText="Пред."
              nextText="След."
              rowsText="строк"
              pageText="Страница"
              ofText="из"
            />
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    table: state.accounting.dynamicObject.table,
    numinv: state.accounting.dynamicObject.numinv,
  };
}

export default connect(mapStateToProps, { fetchARLI, clearDynObjAcc })(Arli);

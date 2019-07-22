//Marketing report contract status change history
import React, { useState, useEffect } from 'react';
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
import OutputErrors from '../../../general/error/outputErrors';
import {
  moneyFormat,
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
  excelDownload,
} from '../../../utils/helpers';
import { injectIntl } from 'react-intl';
import matchSorter, { rankings } from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { LinkToMmcvNewTab } from '../../../utils/outlink';
import {
  fetchDynObjMarketing,
  clearDynObjMarketing,
} from '../../marketingAction';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const Mrcsch = props => {
  const {
    outputTable = [],
    branchOptions = [],
    companyOptions = [],
    tcode = 'MRCSCH',
    language,
    intl: { messages },
  } = props;

  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  const [isLoadingOutputTable, setIsLoadingOutputTable] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [errors, setErrors] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    bukrs: '',
    branchList: [],
    operDateFrom: moment(firstDay).format('YYYY-MM-DD'),
    operDateTo: moment(lastDay).format('YYYY-MM-DD'),
  });

  //componentWillRecieveProps
  useEffect(() => {}, []);

  const onInputChange = (value, fieldName) => {
    //   console.log(value,'value')
    if (fieldName === 'bukrs') {
      setSearchTerm(prev => {
        return { ...prev, bukrs: value, branchList: [] };
      });
    } else if (fieldName === 'branchList') {
      setSearchTerm(prev => {
        return { ...prev, branchList: value };
      });
    } else if (fieldName === 'operDateFrom') {
      setSearchTerm(prev => {
        return { ...prev, operDateFrom: value };
      });
    } else if (fieldName === 'operDateTo') {
      setSearchTerm(prev => {
        return { ...prev, operDateTo: value };
      });
    }
    props.clearDynObjMarketing();
  };

  const onValidate = () => {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const errors = [];
    const { bukrs, operDateFrom, operDateTo } = searchTerm;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (operDateFrom === null || operDateFrom === undefined || !operDateFrom) {
      errors.push(errorTable[`13${language}`]);
    }
    if (operDateTo === null || operDateTo === undefined || !operDateTo) {
      errors.push(errorTable[`14${language}`]);
    }

    return errors;
  };
  const onSearch = () => {
    setIsLoadingOutputTable(true);
    let errors = [];
    errors = onValidate();
    if (errors === null || errors === undefined || errors.length === 0) {
      props.fetchDynObjMarketing(
        'marketing/report/mrcsch/search',
        {
          bukrs: searchTerm.bukrs,
          tcode,
          operDateFrom: searchTerm.operDateFrom,
          operDateTo: searchTerm.operDateTo,
          branchIds: searchTerm.branchList.join(),
        },
        bool => {
          setIsLoadingOutputTable(bool);
        },
      );
      setActiveIndex(1);
    } else {
      setIsLoadingOutputTable(false);
    }
    setErrors(errors);
  };

  const onExportExcel = () => {
    let excelHeaders = [];

    excelHeaders.push(messages['brnch']);
    excelHeaders.push(messages['snNum']);
    excelHeaders.push(messages['oldStatus']);
    excelHeaders.push(messages['newStatus']);
    excelHeaders.push(messages['currentStatus']);
    excelHeaders.push(messages['operationDate']);
    excelHeaders.push(messages['price']);
    excelHeaders.push(messages['paid']);
    excelHeaders.push(messages['remainder']);
    excelHeaders.push(messages['waers']);

    excelDownload(
      '/api/marketing/report/mrcsch/downloadExcel',
      'Mrcsch.xls',
      'outputTable',
      outputTable,
      excelHeaders,
    );
  };

  const onRenderSearchTab = () => {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Table compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="folder" />
                    {messages['bukrs']}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      fluid
                      placeholder={messages['bukrs']}
                      selection
                      options={companyOptions}
                      value={searchTerm.bukrs}
                      onChange={(e, { value }) => onInputChange(value, 'bukrs')}
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
                      placeholder={messages['all']}
                      fluid
                      multiple
                      search
                      selection
                      options={
                        searchTerm.bukrs ? branchOptions[searchTerm.bukrs] : []
                      }
                      value={searchTerm.branchList}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'branchList')
                      }
                      noResultsMessage={null}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span>
                      <Icon name="calendar" />
                      {messages['operationDate']}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    {messages['from']}
                    <DatePicker
                      className="date-auto-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={stringYYYYMMDDToMoment(searchTerm.operDateFrom)}
                      locale={language}
                      onChange={event =>
                        onInputChange(
                          momentToStringYYYYMMDD(event),
                          'operDateFrom',
                        )
                      }
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {messages['to']}
                    <DatePicker
                      className="date-auto-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={stringYYYYMMDDToMoment(searchTerm.operDateTo)}
                      locale={language}
                      onChange={event =>
                        onInputChange(
                          momentToStringYYYYMMDD(event),
                          'operDateTo',
                        )
                      }
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
                      onClick={() => onSearch()}
                      loading={isLoadingOutputTable}
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
  };

  const onRenderOutputTable = () => {
    if (!outputTable) return '';

    let t1columns = [];
    let t1r1c1 = {
      Header: ({ value }) => <b>{messages['brnch']}</b>,
      accessor: 'branchName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'branchName' }],
        }),
      filterAll: true,
      width: 170,
    };

    let t1r1c2 = {
      Header: ({ value }) => <b>{messages['snNum']}</b>,
      accessor: 'contractNumber',
      Cell: obj => (
        <span>
          {obj.original.contractNumber && (
            <LinkToMmcvNewTab contractNumber={obj.original.contractNumber} />
          )}
        </span>
      ),
      width: 90,
    };
    let t1r1c3 = {
      Header: ({ value }) => <b>{messages['oldStatus']}</b>,
      accessor: 'oldStatus',
      Cell: ({ value }) => <span>{value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'oldStatus' }],
        }),
      filterAll: true,
      width: 240,
    };
    let t1r1c4 = {
      Header: ({ value }) => <b>{messages['newStatus']}</b>,
      accessor: 'newStatus',
      Cell: ({ value }) => <span>{value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'newStatus' }],
        }),
      filterAll: true,
      width: 240,
    };
    let t1r1c5 = {
      Header: ({ value }) => <b>{messages['currentStatus']}</b>,
      accessor: 'currentStatus',
      Cell: ({ value }) => <span>{value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'currentStatus' }],
        }),
      filterAll: true,
      width: 240,
    };

    let t1r1c6 = {
      Header: ({ value }) => <b>{messages['operationDate']}</b>,
      accessor: 'operationDateYYYYMMDD', //Cell: obj => <span>{obj.original.budat}</span>,

      Cell: obj => <span>{obj.original.operationDate}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['_original.operationDate'] }),
      filterAll: true,
      width: 140,
      minResizeWidth: 140,
    };

    let t1r1c7 = {
      Header: ({ value }) => <b>{messages['price']}</b>,
      accessor: 'price',
      Cell: obj => <span>{moneyFormat(obj.original.price)}</span>,
      width: 140,
    };

    let t1r1c8 = {
      Header: ({ value }) => <b>{messages['paid']}</b>,
      accessor: 'paid',
      Cell: obj => <span>{moneyFormat(obj.original.paid)}</span>,
      width: 140,
    };

    let t1r1c9 = {
      Header: ({ value }) => <b>{messages['remainder']}</b>,
      accessor: 'remainder',
      Cell: obj => <span>{moneyFormat(obj.original.remainder)}</span>,
      width: 140,
    };
    let t1r1c10 = {
      Header: ({ value }) => <b>{messages['waers']}</b>,
      accessor: 'waers',
      Cell: ({ value }) => <span>{value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'waers' }],
        }),
      filterAll: true,
      width: 140,
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
        // ref={r => (this.reactTable = r)}
        data={outputTable}
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
      />
    );
  };
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
        {messages['transNameMrcsch']}
      </Header>

      <Menu pointing stackable>
        <Menu.Item
          name={messages['searchParameters']}
          active={activeIndex === 0}
          onClick={() => setActiveIndex(0)}
          icon="search"
        />
        <Menu.Item
          name={messages['result']}
          active={activeIndex === 1}
          onClick={() => setActiveIndex(1)}
          icon="bar chart"
        />
      </Menu>

      <Segment
        className={activeIndex === 0 ? 'show' : 'hide'}
        loading={isLoadingOutputTable}
      >
        <OutputErrors errors={errors} />
        {onRenderSearchTab()}
      </Segment>
      <Segment
        className={activeIndex === 1 ? 'show' : 'hide'}
        loading={isLoadingOutputTable}
      >
        {outputTable && outputTable.length > 0 && (
          <Menu stackable size="small">
            <Menu.Item>
              <img
                className="clickableItem"
                src="/assets/img/xlsx_export_icon.png"
                onClick={() => onExportExcel()}
              />
            </Menu.Item>
          </Menu>
        )}
        {onRenderOutputTable()}
      </Segment>
    </Container>
  );
};

function mapStateToProps(state) {
  //   console.log(state,'state')
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    language: state.locales.lang,
    outputTable: state.marketing.dynamicObject.outputTable,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjMarketing,
    clearDynObjMarketing,
  },
)(injectIntl(Mrcsch));

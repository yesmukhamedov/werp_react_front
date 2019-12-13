//Finance report 8
//frep8
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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
  Label,
} from 'semantic-ui-react';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import { fetchDynamicFAGM, clearDynObj } from '../../fa_action';
import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import { Link } from 'react-router-dom';
import { LinkToDmsc03 } from '../../../utils/outlink';
import { moneyFormat } from '../../../utils/helpers';
import { excelDownload } from '../../../utils/helpers';

import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const Frep8 = props => {
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  const {
    companyOptions = [],
    branchOptions = [],
    intl: { messages },
    language,
    outputTable = [],
    totalSumma = 0,
    totalRemain = 0,
  } = props;
  const [bukrs, setBukrs] = useState('');
  const [budatFrom, setBudatFrom] = useState(
    moment(firstDay).format('YYYY-MM-DD'),
  );
  const [budatTo, setBudatTo] = useState(moment(lastDay).format('YYYY-MM-DD'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [errors, setErrors] = useState([]);

  const validate = () => {
    // getter
    // console.log(localStorage.getItem('language'),'error');

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const errors = [];
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (budatFrom === null || budatFrom === undefined || !budatFrom) {
      errors.push(errorTable[`13${language}`]);
    }
    if (budatTo === null || budatTo === undefined || !budatTo) {
      errors.push(errorTable[`14${language}`]);
    }

    return errors;
  };

  const searchFrep8 = () => {
    props.modifyLoader(true);
    let errors = [];
    errors = validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      let branchList = [];
      for (let wa of selectedBranches) {
        branchList.push(wa.value);
      }

      props.fetchDynamicFAGM('finance/reports/frep8/search', {
        bukrs,
        branchList: branchList.join(),
        budatFrom,
        budatTo,
      });

      setActiveIndex(1);
    } else {
      props.modifyLoader(false);
    }

    setErrors(errors);
  };

  const exportExcel = () => {
    let excelHeaders = [];
    excelHeaders.push(messages['brnch']);
    excelHeaders.push(messages['snNum']);
    excelHeaders.push(messages['oldSn']);
    excelHeaders.push(messages['customer']);
    excelHeaders.push(messages['budat']);
    excelHeaders.push(messages['waers']);
    excelHeaders.push(messages['amount']);
    excelHeaders.push(messages['remainder']);
    excelHeaders.push(messages['registeredTo']);

    excelDownload(
      'finance/reports/frep8/downloadExcel',
      'frep8Result.xls',
      'outputTable',
      outputTable,
      excelHeaders,
    );
  };

  let t1columns = [];
  let t1r1c1 = {
    Header: ({ value }) => <b>{messages['brnch']}</b>,
    accessor: 'branchName',
    width: 170,
  };

  let t1r1c2 = {
    Header: ({ value }) => <b>{messages['snNum']}</b>,
    accessor: 'sn',
    Cell: obj => (
      <span>{obj.original.sn && <LinkToDmsc03 snNum={obj.original.sn} />}</span>
    ),
    width: 90,
  };
  let t1r1c3 = {
    Header: ({ value }) => <b>{messages['oldSn']}</b>,
    accessor: 'oldSn',
    Cell: obj => (
      <span>
        {obj.original.oldSn && <LinkToDmsc03 snNum={obj.original.oldSn} />}
      </span>
    ),
    width: 90,
  };

  let t1r1c4 = {
    Header: ({ value }) => <b>{messages['customer']}</b>,
    accessor: 'fio',
    width: 270,
  };

  let t1r1c5 = {
    Header: ({ value }) => <b>{messages['budat']}</b>,
    accessor: 'budat',
    width: 130,
  };

  let t1r1c6 = {
    Header: ({ value }) => <b>{messages['waers']}</b>,
    accessor: 'waers',
    width: 70,
  };

  let t1r1c7 = {
    Header: ({ value }) => <b>{messages['amount']} </b>,
    accessor: 'summa',
    Cell: obj => <span>{moneyFormat(obj.original.summa)}</span>,
    width: 140,
  };

  t1r1c7.Footer = (
    <span>
      <strong>
        <font>{totalSumma ? moneyFormat(totalSumma) : ''}</font>
      </strong>
    </span>
  );

  let t1r1c8 = {
    Header: ({ value }) => <b>{messages['remainder']}</b>,
    accessor: 'remain',
    Cell: obj => <span>{moneyFormat(obj.original.remain)}</span>,
    width: 140,
  };

  t1r1c8.Footer = (
    <span>
      <strong>
        <font>{totalRemain ? moneyFormat(totalRemain) : ''}</font>
      </strong>
    </span>
  );

  let t1r1c9 = {
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
    width: 150,
  };

  let t1r1c10 = {
    Header: ({ value }) => <b>{messages['registeredTo']}</b>,
    accessor: 'legalEntityName',
    width: 160,
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
        {messages['transNameFrep8']}
      </Header>

      <Menu pointing stackable>
        <Menu.Item
          name={messages['searchParameters']}
          active={activeIndex === 0}
          onClick={() => {
            setActiveIndex(0);
          }}
          icon="search"
        />
        <Menu.Item
          name={messages['result']}
          active={activeIndex === 1}
          onClick={() => {
            setActiveIndex(1);
          }}
          icon="bar chart"
        />
      </Menu>

      <Segment className={activeIndex === 0 ? 'show' : 'hide'}>
        <OutputErrors errors={errors} />
        {/* {this.renderSearchTab()} */}
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
                        options={companyOptions || []}
                        value={bukrs}
                        onChange={(e, { value }) => {
                          setBukrs(value);
                          setSelectedBranches([]);
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Icon name="browser" />
                      {messages['brnch']}
                    </Table.Cell>
                    <Table.Cell colSpan="2">
                      <Label>
                        <Icon name="file" />
                        {messages['selectedBranches']} #
                        {selectedBranches.length}
                      </Label>
                      <Icon
                        link
                        name="clone"
                        onClick={() => setF4BranchIsOpen(true)}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{messages['budat']}</Table.Cell>
                    <Table.Cell>
                      {messages['from']}
                      <DatePicker
                        className="date-auto-width"
                        autoComplete="off"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" // timezone="UTC"
                        selected={stringYYYYMMDDToMoment(budatFrom)}
                        locale={language}
                        onChange={event =>
                          setBudatFrom(momentToStringYYYYMMDD(event))
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
                        selected={stringYYYYMMDDToMoment(budatTo)}
                        locale={language}
                        onChange={event =>
                          setBudatTo(momentToStringYYYYMMDD(event))
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
                        onClick={searchFrep8}
                      >
                        <Icon name="search" size="large" />
                        {messages['search']}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <BranchF4Advanced
                branches={bukrs ? branchOptions[bukrs] : []}
                isOpen={f4BranchIsOpen}
                onClose={selectedBranches => {
                  setF4BranchIsOpen(false);
                  setSelectedBranches(selectedBranches);
                }}
                selection={'multiple'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className={activeIndex === 1 ? 'show' : 'hide'}>
        {outputTable && outputTable.length > 0 && (
          <Menu stackable size="small">
            <Menu.Item>
              <img
                className="clickableItem"
                src="/assets/img/xlsx_export_icon.png"
                onClick={exportExcel}
              />
            </Menu.Item>
          </Menu>
        )}
        <ReactTableWrapper
          data={outputTable}
          columns={t1columns}
          pageSize={outputTable.length > 0 ? outputTable.length : 5}
        />
      </Segment>
    </Container>
  );
};

function mapStateToProps(state) {
  // console.log(state, 'state.userInfo.branchOptionsMarketing');

  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    outputTable: state.fa.dynamicObject.outputTable,
    totalSumma: state.fa.dynamicObject.totalSumma,
    totalRemain: state.fa.dynamicObject.totalRemain,
  };
}

export default connect(mapStateToProps, {
  modifyLoader,
  //cleared by dynamic clear function
  clearDynObj,
  fetchDynamicFAGM,
})(injectIntl(Frep8));

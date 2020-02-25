import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { fetchServiceList } from '../serviceReportAction';
import { injectIntl } from 'react-intl';
import matchSorter from 'match-sorter';
import format from 'string-format';
import {
  Button,
  Dropdown,
  Icon,
  Container,
  Header,
  Segment,
  Form,
  Grid,
  Divider,
  Image,
  Table,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
require('moment/locale/ru');
require('moment/locale/tr');

const Srls = props => {
  const {
    intl: { messages },
    language,
    companyOptions = [],
    branchOptions = [],
    dynamicObject,
    fetchServiceList,
    search,
  } = props;

  let queryString = 'bukrs=={0.bukrs};id=={0.id};branch=={0.branch}';

  const emptySrls = {
    id: 1,
    bukrs: 1000,
    branch: 'servisebranch',
  };

  const date = moment().format(`YYYY-MM-DDThh:mm:ss.SSSZZ`);
  const [srls, setSrls] = useState({ ...emptySrls });
  const [startDate, setStartDate] = useState(moment(date));
  const [endDate, setEndDate] = useState(moment(date));

  useEffect(() => {
    fetchServiceList();
    //unmount
  }, []);

  //Категория продукта
  const productCategoryOptions = [
    { key: '1', text: 'Aura', value: '1' },
    { key: '2', text: 'Greenlight', value: '2' },
    { key: '3', text: 'S', value: '3' },
  ];

  //Вид сервиса
  const typeOfServiceOptions = [
    { key: '1', text: 'Сервис карта заполнена', value: '1' },
    { key: '2', text: 'Новый', value: '2' },
    { key: '3', text: 'S', value: '3' },
  ];

  //Статус сервиса
  const serviceStatusOptions = [
    { key: '1', text: 'Выполнено', value: '1' },
    { key: '2', text: 'Отмена', value: '2' },
  ];

  const onInputChange = (o, fieldName) => {
    setSrls(prev => {
      const varSrls = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varSrls.bukrs = o.value;
          break;
        case 'branchId':
          varSrls.branchId = o.value;
          break;
        case 'productCategory':
          varSrls.productCategory = o.value;
          break;
        case 'typeOfService':
          varSrls.typeOfService = o.value;
          break;
        case 'statusService':
          varSrls.statusService = o.value;
          break;
        default:
          varSrls[fieldName] = o.value;
      }
      return varSrls;
    });
  };

  //Колоны ReactTable
  const columns = [
    {
      Header: 'Филиал',
      accessor: 'branchId',
      filterAll: true,
      width: 180,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Дата',
      accessor: 'dateOpen',
      filterAll: true,
      width: 300,
      maxWidth: 300,
      minWidth: 100,
    },
    {
      Header: 'CN',
      accessor: 'contractId',
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'ФИО клиента',
      accessor: '',
      filterAll: true,
      width: 300,
      maxWidth: 300,
      minWidth: 100,
    },

    {
      Header: 'Статус сервиса',
      accessor: 'servStatus',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Мастер',
      accessor: 'masterId',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Оператор',
      accessor: 'operId',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Вид сервиса',
      accessor: '',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Сумма',
      accessor: 'summTotal',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Оплачено',
      accessor: 'paid',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Остаток',
      accessor: '',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Сервис №',
      accessor: '',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'История клиента',
      accessor: '',
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
  ];

  let query = {
    search: format(queryString, srls),
  };

  const handleClickSearch = () => {
    console.log('HANDLE CLICK SEARCH');
    props.fetchServiceList(query);
  };

  return (
    <Container fluid>
      <Segment>
        <h3>Список сервисов</h3>
      </Segment>
      <Segment>
        <Form>
          <Grid columns={8}>
            <Grid.Column>
              <label>{messages['bukrs']} </label>
              <Dropdown
                fluid
                search
                selection
                options={companyOptions ? companyOptions : []}
                value={srls.bukrs}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['brnch']}</label>
              <Dropdown
                fluid
                search
                selection
                value={srls.branchId}
                onChange={(e, o) => onInputChange(o, 'branchId')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>Категория товара</label>
              <Dropdown
                fluid
                search
                selection
                options={productCategoryOptions}
                value={srls.productCategory}
                //  onChange={(e, o) => onInputChange(o, 'productCategory')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>Вид сервиса</label>
              <Dropdown
                fluid
                search
                selection
                value={srls.typeOfService}
                options={typeOfServiceOptions}
                // onChange={(e, o) => onInputChange(o, 'typeOfService')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>Статус сервиса</label>
              <Dropdown
                fluid
                search
                selection
                options={serviceStatusOptions}
                value={srls.statusService}
                // onChange={(e, o) => onInputChange(o, 'statusService')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={startDate}
                onChange={date => setStartDate(date)}
                maxDate={new Date()}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={endDate}
                onChange={date => setEndDate(date)}
                maxDate={new Date()}
              />
            </Grid.Column>

            <Grid.Column verticalAlign="bottom">
              <Button onClick={handleClickSearch} color="teal">
                Применить
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
      <ReactTableWrapper
        filterable
        columns={columns}
        rowsText={messages['rowsText']}
        pageText={messages['pageText']}
        ofText={messages['ofText']}
        previousText={messages['previousText']}
        nextText={messages['nextText']}
        noDataText={messages['loadingText']}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

export default connect(mapStateToProps, {
  f4FetchWerksBranchList,
  fetchServiceList,
})(injectIntl(Srls));

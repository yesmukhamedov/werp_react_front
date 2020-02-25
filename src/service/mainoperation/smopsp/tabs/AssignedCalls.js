import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Segment,
  Container,
  Dropdown,
  Grid,
  Button,
  Table,
  Input,
  Select,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import { fetchAssignedCalls } from '../smopspAction';
import { fetchServiceTypeId } from '../../smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { momentToStringYYYYMMDD } from '../../../../utils/helpers';
require('moment/locale/ru');
require('moment/locale/tr');

const AssignedCalls = props => {
  const {
    countryOptions,
    companyOptions = [],
    branches,
    finStatusOption,
    serviceDateTypeOptions,
    categoryOptions,
    warrantyOptions,
  } = props;

  const {
    intl: { messages },
    language,
    fetchAssignedCalls,
    dynamicObject = [],
    srlsmList = [],
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    finStatus: '',
    categoryId: '',
    serviceDateType: '',
    warranty: '',
    date: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [serBranchOptions, setSerBranchOptions] = useState([]);

  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [dateState, setDateState] = useState(moment(new Date()));

  useEffect(() => {
    setParam({
      ...param,
      date: momentToStringYYYYMMDD(dateState),
    });
  }, [dateState]);

  useEffect(() => {
    const getBranchByBukrs = (branches, bukrs) => {
      let br = branches.filter(item => item.bukrs == bukrs);

      let brSer = br.filter(
        item =>
          item.business_area_id == 5 ||
          item.business_area_id == 6 ||
          item.business_area_id == 9,
      );

      let serBranchOpt = brSer.map(item => {
        return {
          key: item.branch_id,
          text: item.text45,
          value: item.branch_id,
        };
      });
      return serBranchOpt;
    };

    setSerBranchOptions(getBranchByBukrs(branches, param.bukrs));
  }, [param.bukrs]);

  const [columns, setColumns] = useState([
    {
      Header: '№',
      accessor: '1',
      status: false,
      id: 1,
    },
    {
      Header: 'CN',
      accessor: '2',
      status: true,
      id: 2,
    },
    {
      Header: 'Филиал',
      accessor: '3',
      status: true,
      id: 3,
    },
    {
      Header: 'Заводской номер',
      accessor: '4',
      status: true,
      id: 4,
    },
    {
      Header: 'Дата продажи',
      accessor: '5',
      status: true,
      id: 5,
    },
    {
      Header: 'ФИО клиента',
      accessor: '6',
      status: true,
      id: 6,
    },
    {
      Header: 'ИИН клиента',
      accessor: '7',
      status: true,
      id: 7,
    },
    {
      Header: 'Адрес',
      accessor: '8',
      status: true,
      id: 8,
    },
    {
      Header: 'ФИО дилера',
      accessor: '9',
      status: true,
      id: 9,
    },
    {
      Header: 'F1',
      accessor: '10',
      status: true,
      id: 10,
    },
    {
      Header: 'Гарантия',
      accessor: '11',
      status: true,
      id: 11,
    },

    {
      Header: 'Категория',
      accessor: '12',
      status: true,
      id: 12,
    },

    {
      Header: 'Фин статус',
      accessor: '13',
      status: true,
      id: 13,
    },
    {
      Header: 'Просмотр',
      accessor: '14',
      status: true,
      id: 14,
    },
  ]);

  const filterColumns = columns.filter(item => item.status === true);
  const columnsOption = columns.map(item => {
    return {
      key: item.id,
      text: item.Header,
      value: item.id,
    };
  });

  const handleClickApply = () => {
    fetchAssignedCalls({ ...param });
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'country':
          prevParam.country = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;

        case 'categoryId':
          prevParam.categoryId = o.value;
          break;
        case 'serviceTypeId':
          prevParam.serviceTypeId = o.value;
          break;

        case 'serviceStatusId':
          prevParam.serviceStatusId = o.value;
          break;
        case 'dateStart':
          prevParam.dateStart = o.value;
          break;

        case 'finStatus':
          prevParam.finStatus = o.value;

        case 'serviceDateType':
          prevParam.serviceDateType = o.value;

        case 'warranty':
          prevParam.warranty = o.value;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  const options = [
    { key: 1, text: 'text 1', value: 1 },
    { key: 2, text: 'text 2', value: 2 },
    { key: 3, text: 'text 3', value: 3 },
  ];

  return (
    <Container fluid className="containerMargin">
      <Segment>
        <Grid>
          <Grid.Row columns={9}>
            <Grid.Column>
              <label>Страна</label>
              <Dropdown
                options={countryOptions}
                fluid
                selection
                placeholder="Страна"
                onChange={(e, o) => onInputChange(o, 'country')}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Компания</label>
              <Dropdown
                options={companyOptions}
                fluid
                selection
                placeholder="Компания"
                onChange={(e, o) => onInputChange(o, 'bukrs')}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Филиал</label>
              <Dropdown
                fluid
                selection
                placeholder="Филиал"
                onChange={(e, o) => onInputChange(o, 'branchId')}
                options={serBranchOptions}
              />
            </Grid.Column>

            <Grid.Column>
              <label>Фин. Статус</label>
              <Dropdown
                fluid
                selection
                placeholder="Фин. Статус"
                onChange={(e, o) => onInputChange(o, 'finStatus')}
                options={finStatusOption}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Срок сервиса</label>
              <Select
                options={serviceDateTypeOptions}
                onChange={(e, o) => onInputChange(o, 'serviceDateType')}
                fluid
                selection
                placeholder="Статус сервиса"
              />
            </Grid.Column>
            <Grid.Column>
              <label>Категория товара</label>
              <Dropdown
                options={categoryOptions}
                onChange={(e, o) => onInputChange(o, 'categoryId')}
                fluid
                selection
                placeholder="Категория товара"
              />
            </Grid.Column>
            <Grid.Column>
              <label>Гарантия</label>
              <Select
                options={warrantyOptions}
                onChange={(e, o) => onInputChange(o, 'warranty')}
                fluid
                selection
                placeholder="Вид сервиса"
              />
            </Grid.Column>
            <Grid.Column>
              <label>{messages['Form.Date']}</label>
              <DatePicker
                className="datePicker"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={dateState}
                onChange={date => setDateState(date)}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="bottom">
              <Button onClick={handleClickApply} color="blue">
                Применить
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <ReactTableServerSideWrapper data={srlsmList} columns={filterColumns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    dynamicObject: state.smopspReducer.dynamicObject,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchAssignedCalls,
})(injectIntl(AssignedCalls));

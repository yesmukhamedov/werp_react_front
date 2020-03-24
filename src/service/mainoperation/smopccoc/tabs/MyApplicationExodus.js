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
  Popup,
  Select,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import { fetchServiceTypeId } from '../../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import { fetchMyApplicationExodus } from '../smopccocAction';
import ModalColumns from '../../../../utils/ModalColumns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { momentToStringYYYYMMDD } from '../../../../utils/helpers';
import { LinkToSmcuspor } from '../../../../utils/outlink';
require('moment/locale/ru');
require('moment/locale/tr');

const MyApplicationExodus = props => {
  const {
    intl: { messages },
    language,
    fetchServiceTypeId,
  } = props;

  const {
    serviceTypeId = [],
    srlsmList,
    companyOptions,
    countryOptions,
    category,
    serviceStatusList = [],
    contractStatusList,
    branches,
    myApplication,
  } = props;

  console.log('myApplication', myApplication);

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceTypeId: '',
    serviceStatusId: '',
    dateStart: '',
    dateEnd: '',
  };
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [param, setParam] = useState({ ...emptyParam });
  const [startDates, setStartDates] = useState(moment(new Date(y - 1, m, 1)));
  const [endDates, setEndDates] = useState(moment(new Date()));
  const columnsSrlsm = [
    {
      Header: 'Филиал',
      accessor: 'recommenderId',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Дата',
      accessor: 'recommender',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'CN',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Заводской номер',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'ФИО клиента',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Статус сервиса',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Мастер',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Оператор',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Вид сервиса',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Сумма',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Оплачено',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Остаток',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Сервис №',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'История клиента',
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
  ];
  const [columns, setColumns] = useState([...columnsSrlsm]);

  const [serBranchOptions, setSerBranchOptions] = useState([]);

  useEffect(() => {
    fetchServiceTypeId();
  }, []);

  useEffect(() => {
    setParam({
      ...param,
      dateStart: momentToStringYYYYMMDD(startDates),
      dateEnd: momentToStringYYYYMMDD(endDates),
    });
  }, [startDates, endDates]);

  useEffect(() => {
    const getBranchByBukrs = (branches, bukrs) => {
      let br = branches.filter(item => item.bukrs === bukrs);

      let brSer = br.filter(
        item =>
          item.business_area_id === 5 ||
          item.business_area_id === 6 ||
          item.business_area_id === 9,
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

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const serviceTypeOptions = serviceTypeId.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });

  const serviceStatusOptions = serviceStatusList.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });

  const handleClickApply = () => {
    props.fetchMyApplicationExodus({ ...param });
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

        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

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
              <label>Вид сервиса</label>
              <Select
                options={serviceTypeOptions}
                onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
                fluid
                selection
                placeholder="Вид сервиса"
              />
            </Grid.Column>
            <Grid.Column>
              <label>Статус сервиса</label>
              <Select
                options={serviceStatusOptions}
                onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
                fluid
                selection
                placeholder="Статус сервиса"
              />
            </Grid.Column>
            <Grid.Column>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                className="datePicker"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={startDates}
                onChange={date => setStartDates(date)}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                className="datePicker"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={endDates}
                onChange={date => setEndDates(date)}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="bottom">
              <Button onClick={handleClickApply} color="blue">
                Применить
              </Button>
            </Grid.Column>
            <Grid.Column>
              <ModalColumns columns={columns} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <ReactTableServerSideWrapper data={srlsmList} columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    myApplication: state.smopccocReducer.myApplication,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchMyApplicationExodus,
})(injectIntl(MyApplicationExodus));

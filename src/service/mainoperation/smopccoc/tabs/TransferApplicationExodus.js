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

import { fetchTransferApplicationExodus } from '../smopccocAction';
import { fetchServiceTypeId } from '../../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { momentToStringYYYYMMDD } from '../../../../utils/helpers';
require('moment/locale/ru');
require('moment/locale/tr');

const TransferApplicationExodus = props => {
  const {
    intl: { messages },
    language,
    fetchServiceTypeId,
    fetchTransferApplicationExodus,
  } = props;

  const {
    serviceTypeId = [],
    companyOptions = [],
    countryOptions,
    serviceStatusList = [],
    contractStatusList,
    serviceDateTypeOptions,
    branches,
    finStatusOption,
    transfer,
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceDateType: '',
    finStatus: '',
    configuration: '',
    date: '',
  };

  //Date option
  const [date, setDate] = useState(moment(new Date()));
  useEffect(() => {
    setParam({
      ...param,
      date: momentToStringYYYYMMDD(date),
    });
  }, [date]);

  //END Date option
  const [param, setParam] = useState({ ...emptyParam });

  const columnsSrlsm = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
    },
    {
      Header: 'Дата продажи',
      accessor: 'contractDate',
    },
    {
      Header: 'Дата переноса',
      accessor: '888',
    },
    {
      Header: 'Дата заявки',
      accessor: '999',
    },
    {
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
    },
    {
      Header: 'Адрес',
      accessor: 'address',
    },
    {
      Header: 'Телефон',
      accessor: 'address',
    },
    {
      Header: 'ФИО мастер',
      accessor: 'dealerFIO',
    },
    {
      Header: 'F1',
      accessor: 'f1',
    },
    {
      Header: 'F2',
      accessor: 'f2',
    },
    {
      Header: 'F3',
      accessor: 'f3',
    },
    {
      Header: 'F4',
      accessor: 'f4',
    },
    {
      Header: 'F5',
      accessor: 'f5',
    },
    {
      Header: 'Категория',
      accessor: 'crmCategory',
    },
    {
      Header: 'Статус заявки',
      accessor: '15',
    },
    {
      Header: 'Заявка',
      accessor: '898',
    },
    {
      Header: 'Просмотр',
      accessor: '16',
    },
  ];
  const [columns, setColumns] = useState([...columnsSrlsm]);

  const [serBranchOptions, setSerBranchOptions] = useState([]);

  useEffect(() => {
    fetchServiceTypeId();
  }, []);

  //Get service branches
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

  const categoryOptions = [
    { key: 1, text: 'Зеленый', value: 'Зеленый' },
    { key: 2, text: 'Желтый', value: 'Желтый' },
    { key: 3, text: 'Красный', value: 'Красный' },
    { key: 4, text: 'Черный', value: 'Черный' },
  ];

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

  const configurationOptions = [
    { key: 1, text: 'F-1', value: 1 },
    { key: 2, text: 'F-2+3', value: 2 },
    { key: 3, text: 'F-1+2+3', value: 3 },
    { key: 4, text: 'F-1+2+3+4+5', value: 4 },
  ];

  const handleClickApply = () => {
    props.fetchTransferApplicationExodus({ ...param });
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
        case 'serviceDateType':
          prevParam.serviceDateType = o.value;
          break;

        case 'configuration':
          prevParam.configuration = o.value;
          break;

        case 'finStatus':
          prevParam.finStatus = o.value;
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
              <label>Фин. Статус</label>
              <Select
                options={finStatusOption}
                onChange={(e, o) => onInputChange(o, 'finStatus')}
                fluid
                selection
                placeholder="Фин. Статус"
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
              <label>Категория</label>
              <Dropdown
                options={categoryOptions}
                onChange={(e, o) => onInputChange(o, 'categoryId')}
                fluid
                selection
                placeholder="Категория товара"
              />
            </Grid.Column>
            <Grid.Column>
              <label>Конфигурация</label>
              <Select
                options={configurationOptions}
                onChange={(e, o) => onInputChange(o, 'configuration')}
                fluid
                selection
                placeholder="Конфигурация"
              />
            </Grid.Column>
            <Grid.Column>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                className="datePicker"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={date}
                onChange={date => setDate(date)}
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
      <ReactTableServerSideWrapper data={transfer} columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    transfer: state.smopccocReducer.transfer,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchTransferApplicationExodus,
})(injectIntl(TransferApplicationExodus));

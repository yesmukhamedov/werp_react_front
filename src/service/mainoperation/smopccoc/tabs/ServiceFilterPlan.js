import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Segment,
  Container,
  Dropdown,
  Grid,
  Button,
  Popup,
  Select,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';

import { fetchServiceFilterPlan } from '../smopccocAction';
import { fetchServiceTypeId } from '../../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ModalColumns from '../../../../utils/ModalColumns';
import { momentToStringYYYYMMDD } from '../../../../utils/helpers';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import ColumnsReactTable from '../components/ColumnsReactTable';
import { LinkToSmcuspor } from '../../../../utils/outlink';
require('moment/locale/ru');
require('moment/locale/tr');

const ServiceFilterPlan = props => {
  const {
    intl: { messages },
    language,
    fetchServiceTypeId,
    fetchServiceFilterPlan,
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
    serviceFilterPlan,
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceTypeId: '',
    finStatus: '',
    serviceStatusId: '',
    configuration: '',
  };

  //Date option
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [startDates, setStartDates] = useState(moment(new Date(y - 1, m, 1)));
  const [endDates, setEndDates] = useState(moment(new Date()));
  useEffect(() => {
    setParam({
      ...param,
      dateStart: momentToStringYYYYMMDD(startDates),
      dateEnd: momentToStringYYYYMMDD(endDates),
    });
  }, [startDates, endDates]);

  //END Date option
  const [param, setParam] = useState({ ...emptyParam });

  const columnsSrlsm = [
    {
      Header: 'Id',
      accessor: 'id',
      Cell: <div style={{ height: '100px' }}></div>,
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
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
    },
    {
      Header: 'ИИН клиента',
      accessor: 'customerIinBin',
    },
    {
      Header: 'Адрес',
      accessor: 'address',
    },
    {
      Header: 'ФИО дилера',
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
      Header: 'Фин. статус',
      accessor: '15',
    },
    {
      Header: 'Просмотр',
      accessor: '16',
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
    },
  ];
  const [columns, setColumns] = useState([...columnsSrlsm]);

  const [serBranchOptions, setSerBranchOptions] = useState([]);

  useEffect(() => {
    fetchServiceTypeId();
  }, []);

  const optionsSelect = [
    { label: 'Thing 1', value: 1 },
    { label: 'Thing 2', value: 2 },
  ];

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

  const options8 = [
    { label: 'Thing 1', value: 1 },
    { label: 'Thing 2', value: 2 },
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
    props.fetchServiceFilterPlan({ ...param });
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'country':
          prevParam.country = [o.value];
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
                multiple
                search
                options={countryOptions}
                fluid
                selection
                placeholder="Страна"
                onChange={(e, o) => onInputChange(o, 'country')}
                wrapSelection="false"
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
                wrapSelection="false"
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
                wrapSelection="false"
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
      <ReactTableServerSideWrapper data={serviceFilterPlan} columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    serviceFilterPlan: state.smopccocReducer.serviceFilterPlan,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchServiceFilterPlan,
})(injectIntl(ServiceFilterPlan));

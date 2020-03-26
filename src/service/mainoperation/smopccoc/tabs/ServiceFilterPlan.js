import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';

import { fetchServiceFilterPlan } from '../smopccocAction';
import { fetchServiceTypeId } from '../../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import { momentToStringYYYYMMDD } from '../../../../utils/helpers';
import { LinkToSmcuspor } from '../../../../utils/outlink';
import matchSorter from 'match-sorter';

const ServiceFilterPlan = props => {
  const {
    intl: { messages },
    language,
    fetchServiceTypeId,
    fetchServiceFilterPlan,
  } = props;
  const transaction = 'smopccocServiceFilterPlan';
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

  //END Date option
  const [param, setParam] = useState({ ...emptyParam });
  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
      Cell: <div style={{ height: '100px' }}></div>,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['contractNumber'] }),
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['tovarSn'] }),
    },
    {
      Header: 'Дата продажи',
      accessor: 'contractDate',
      checked: true,
      filterable: false,
    },
    {
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['customerFIO'] }),
      filterAll: true,
    },
    {
      Header: 'ИИН клиента',
      accessor: 'customerIinBin',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['customerIinBin'] }),
      filterAll: true,
    },
    {
      Header: 'Адрес',
      accessor: 'address',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['address'] }),
      filterAll: true,
    },
    {
      Header: 'ФИО дилера',
      accessor: 'dealerFIO',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['dealerFIO'] }),
      filterAll: true,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Категория',
      accessor: 'crmCategory',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Фин. статус',
      accessor: '15',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Просмотр',
      accessor: '16',
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
      checked: true,
    },
  ];

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
  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Страна"
            options={countryOptions}
            placeholder="Страна"
            onChange={(e, o) => onInputChange(o, 'country')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Компания"
            options={companyOptions}
            placeholder="Компания"
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Филиал"
            options={serBranchOptions}
            placeholder="Филиал"
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />
          <Form.Select
            fluid
            label="Фин. Статус"
            options={finStatusOption}
            placeholder="Фин. Статус"
            onChange={(e, o) => onInputChange(o, 'finStatus')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Срок сервиса"
            options={serviceDateTypeOptions}
            placeholder="Фин. Статус"
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория"
            options={categoryOptions}
            placeholder="Категория"
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Конфигурация"
            options={configurationOptions}
            placeholder="Конфигурация"
            onChange={(e, o) => onInputChange(o, 'configuration')}
            className="alignBottom"
          />
        </Form.Group>
        <Form.Group className="spaceBetween">
          <Form.Button
            onClick={handleClickApply}
            color="blue"
            className="alignBottom"
          >
            Применить
          </Form.Button>

          <Form.Field className="alignBottom">
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Divider />
      <ReactTableServerSideWrapper
        data={serviceFilterPlan}
        columns={columns}
        filterable={true}
        resolveData={data => data.map(row => row)}
      />
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

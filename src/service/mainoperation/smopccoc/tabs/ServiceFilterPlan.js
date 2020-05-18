import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider, Icon } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import { fetchServiceFilterPlan } from '../smopccocAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import { LinkToSmcuspor } from '../../../../utils/outlink';
import matchSorter from 'match-sorter';
import { f4FetchBranchesByBukrs } from './../../../../reference/f4/f4_action';

const ServiceFilterPlan = props => {
  const {
    intl: { messages },
    language,
  } = props;
  //const transaction = 'smopccocServiceFilterPlan';
  const {
    companyOptions = [],
    countryOptions,
    serviceDateTypeOptions,
    branches,
    finStatusOption,
    serviceFilterPlan,
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    contractStatusId: '',
    serviceDateType: '',
    crmCategory: '',
    configuration: '',
  };

  //END Date option
  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
      Cell: <div style={{ height: '100px' }}></div>,
      filterable: false,
    },
    {
      Header: 'Филиал',
      accessor: 'branch',
      checked: true,
      Cell: <div style={{ height: '100px' }}></div>,
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
      accessor: 'contractStatus',
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

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

  useEffect(() => {
    let servBrOptions = branches
      .filter(
        item =>
          item.business_area_id == 5 ||
          item.business_area_id == 6 ||
          item.business_area_id == 9,
      )
      .map(item => {
        return {
          key: item.branch_id,
          text: item.text45,
          value: item.branch_id,
          country_id: item.country_id,
          bukrs: item.bukrs,
        };
      });
    if (param.countryId !== '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions
        .filter(item => item.country_id === param.countryId)
        .filter(item => item.bukrs === param.bukrs);
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId !== '' && param.bukrs === '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.country_id === param.countryId,
      );
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId === '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.bukrs === param.bukrs,
      );

      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId === '' && param.bukrs === '') {
      setServiceBranchOptions([...servBrOptions]);
    }
  }, [branches, param.countryId, param.bukrs]);

  const categoryOptions = [
    { key: 1, text: 'Зеленый', value: 1 },
    { key: 2, text: 'Желтый', value: 2 },
    { key: 3, text: 'Красный', value: 3 },
    { key: 4, text: 'Черный', value: 4 },
  ];

  const configurationOptions = [
    { key: 1, text: 'F-1', value: 1 },
    { key: 2, text: 'F-2+3', value: 2 },
    { key: 3, text: 'F-1+2+3', value: 3 },
    { key: 4, text: 'F-1+2+3+4+5', value: 4 },
  ];

  const handleClickApply = () => {
    const page = 0;
    const size = 20;
    props.fetchServiceFilterPlan({ ...param, page, size });
    setTurnOnReactFetch(true);
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.countryId = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;
        case 'finStatus':
          prevParam.contractStatusId = o.value;
          break;
        case 'serviceDateType':
          prevParam.serviceDateType = o.value;
          break;
        case 'crmCategory':
          prevParam.crmCategory = o.value;
          break;
        case 'configuration':
          prevParam.configuration = o.value;
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
            label={messages['country']}
            options={countryOptions}
            placeholder={messages['country']}
            onChange={(e, o) => onInputChange(o, 'countryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['bukrs']}
            options={companyOptions}
            placeholder={messages['bukrs']}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['brnch']}
            options={serviceBranchOptions}
            placeholder={messages['brnch']}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />
          <Form.Select
            fluid
            label={messages['fin_status']}
            options={finStatusOption}
            placeholder={messages['fin_status']}
            onChange={(e, o) => onInputChange(o, 'finStatus')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['service_period']}
            options={serviceDateTypeOptions}
            placeholder={messages['service_period']}
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['category']}
            options={categoryOptions}
            placeholder={messages['category']}
            onChange={(e, o) => onInputChange(o, 'crmCategory')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['configuration']}
            options={configurationOptions}
            placeholder={messages['configuration']}
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
            <Icon name="search" />
            {messages['apply']}
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
        data={serviceFilterPlan ? serviceFilterPlan.data : []}
        columns={columns}
        resolveData={data => data.map(row => row)}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={param => {
          props.fetchServiceFilterPlan({ ...param });
        }}
        pages={serviceFilterPlan ? serviceFilterPlan.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    serviceFilterPlan: state.smopccocReducer.serviceFilterPlan,
    branchService: state.userInfo.branchOptionsService,
  };
}

export default connect(mapStateToProps, {
  f4FetchBranchesByBukrs,
  fetchServiceListManager,
  fetchServiceFilterPlan,
})(injectIntl(ServiceFilterPlan));

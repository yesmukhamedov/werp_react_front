import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Form,
  Divider,
  Icon,
  Popup,
  Segment,
  Dropdown,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchServiceFilterPlan } from '../smopccocAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ColumnsModal from '../../../../utils/ColumnsModal';
import CancelPlanModal from '../components/CancelPlanModal';
import matchSorter from 'match-sorter';
import TextAlignCenter from '../../../../utils/TextAlignCenter';
import {
  f4FetchBranchesByBukrs,
  f4FetchFilterPlanStatus,
} from './../../../../reference/f4/f4_action';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../utils/DropdownClearable';
import moment from 'moment';

const ServiceFilterPlan = props => {
  const {
    intl: { messages },
    companyOptions = [],
    countryOptions,
    serviceDateTypeOptions,
    branchOptions,
    finStatusOption,
    serviceFilterPlan = [],
    filterPlanStatus = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    contractStatusId: '',
    serviceDateType: '',
    crmCategoryId: '',
    configuration: '',
    planStatusId: [1, 6],
  };

  //END Date option
  const [param, setParam] = useState({ ...emptyParam });
  const [planId, setPlanId] = useState('');
  const [error, setError] = useState([]);
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [cancelPlanModal, setCancelPlanModal] = useState(false);

  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 55,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['contractNumber'] }),
      width: 60,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['tovarSn'] }),
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterable: false,
      width: 80,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['customerFIO'] }),
      filterAll: true,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['customerIinBin'] }),
      filterAll: true,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['address'] }),
      filterAll: true,
    },
    {
      Header: messages['Dealer.Fullname'],
      accessor: 'dealerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['dealerFIO'] }),
      filterAll: true,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 40,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryName',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
    },
    {
      Header: messages['fin_status'],
      accessor: 'contractStatusName',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
    },
    {
      Header: messages['plan_status'],
      accessor: 'planStatusName',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
    },
    {
      Header: messages['Table.View'],
      accessor: '16',
      filterable: false,

      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}&filterPlanId=${original.row.id}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              <Icon name="address card" color="black" />
            </Link>
          </div>
        );
      },
      checked: true,
      width: 50,
      fixed: 'right',
    },
    {
      Header: messages['cancel'],
      accessor: '17',
      filterable: false,

      Cell: original => {
        return original.original.planStatusName === 'Отменен' ||
          original.original.planStatusName === 'Canceled' ||
          original.original.planStatusName === 'İptal edildi' ? (
          <div style={{ textAlign: 'center' }}>
            <Popup
              content={original.original.cancelReasonText}
              on="hover"
              pinned="true"
              trigger={
                <div style={{ textAlign: 'center' }}>
                  {original.original.cancelReasonText}
                </div>
              }
            />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Icon
              name="cancel"
              color="red"
              onClick={() => {
                setCancelPlanModal(true);
                setPlanId(original.row.id);
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        );
      },
      checked: true,
      fixed: 'right',
      width: 50,
    },
  ];

  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    props.f4FetchFilterPlanStatus();

    const transactionCodeText = localStorage.getItem('smopccocServFilter');
    if (transactionCodeText) {
      let transactionCodeObject = JSON.parse(transactionCodeText);

      let temp = initialColumns.map(item => {
        return { ...item, show: transactionCodeObject[item.accessor] };
      });
      setColumnsForTable(temp);
    } else {
      setColumnsForTable(initialColumns);
    }
  }, []);

  useEffect(() => {
    if (param.bukrs) {
      setServiceBranchOptions(branchOptions[param.bukrs]);
    }
    if (param.bukrs !== '' && param.countryId !== '' && branchOptions) {
      let brnchOpt = branchOptions[param.bukrs].filter(
        item => item.countryid === param.countryId,
      );
      setServiceBranchOptions(brnchOpt);
    }
  }, [branchOptions, param.countryId, param.bukrs]);

  const [serverSideParams, setServerSideParams] = useState({});

  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '' && param.planStatusId !== null) {
      const page = 0;
      const size = 20;
      if (Object.keys(serverSideParams).length > 0) {
        props.fetchServiceFilterPlan({
          ...param,
          ...serverSideParams,
          planStatusId: param.planStatusId.toString(),
        });
      } else {
        props.fetchServiceFilterPlan({
          ...param,
          page,
          size,
          planStatusId: param.planStatusId.toString(),
        });
      }
      setTurnOnReactFetch(true);
    }
  };

  const validate = () => {
    const errors = [];
    if (param.bukrs === '') {
      errors.push(errorTableText(5));
    }
    if (param.planStatusId === null) {
      errors.push(errorTableText(176));
    }
    setError(() => errors);
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
        case 'crmCategoryId':
          prevParam.crmCategoryId = o.value;
          break;
        case 'configuration':
          prevParam.configuration = o.value;
          break;
        case 'planStatusId':
          prevParam.planStatusId = o.value.length > 0 ? o.value.join() : null;
          break;

        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  const handleClear = fieldName => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.countryId = '';
          break;
        case 'bukrs':
          prevParam.bukrs = '';
          break;
        case 'branchId':
          prevParam.branchId = '';
          break;
        case 'finStatus':
          prevParam.contractStatusId = '';
          break;
        case 'serviceDateType':
          prevParam.serviceDateType = '';
          break;
        case 'crmCategoryId':
          prevParam.crmCategoryId = '';
          break;
        case 'configuration':
          prevParam.configuration = '';
          break;

        default:
          prevParam[fieldName] = '';
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <CancelPlanModal
        open={cancelPlanModal}
        handleClickApply={() => handleClickApply()}
        planId={planId}
        onClosePlanModal={bool => setCancelPlanModal(bool)}
      />
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['country']}</label>
            <DropdownClearable
              options={countryOptions}
              value={param.countryId}
              placeholder={messages['country']}
              onChange={(e, o) => onInputChange(o, 'countryId')}
              handleClear={() => handleClear('countryId')}
            />
          </Form.Field>

          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              options={companyOptions}
              value={param.bukrs}
              placeholder={messages['bukrs']}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              handleClear={() => handleClear('bukrs')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['brnch']}</label>
            <DropdownClearable
              options={serviceBranchOptions}
              value={param.branchId}
              placeholder={messages['brnch']}
              onChange={(e, o) => onInputChange(o, 'branchId')}
              handleClear={() => handleClear('branchId')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['fin_status']}</label>
            <DropdownClearable
              options={finStatusOption}
              value={param.contractStatusId}
              placeholder={messages['fin_status']}
              onChange={(e, o) => onInputChange(o, 'finStatus')}
              handleClear={() => handleClear('finStatus')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['service_period']}</label>
            <DropdownClearable
              options={serviceDateTypeOptions}
              value={param.serviceDateType}
              placeholder={messages['service_period']}
              onChange={(e, o) => onInputChange(o, 'serviceDateType')}
              handleClear={() => handleClear('serviceDateType')}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="5">
          <Form.Field>
            <label>{messages['category']}</label>
            <DropdownClearable
              options={categoryOptions}
              value={param.crmCategoryId}
              placeholder={messages['category']}
              onChange={(e, o) => onInputChange(o, 'crmCategoryId')}
              handleClear={() => handleClear('crmCategoryId')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['configuration']}</label>
            <DropdownClearable
              options={configurationOptions}
              value={param.configuration}
              placeholder={messages['configuration']}
              onChange={(e, o) => onInputChange(o, 'configuration')}
              handleClear={() => handleClear('configuration')}
            />
          </Form.Field>
          <Form.Field required>
            <label>{messages['plan_status']}</label>
            <Dropdown
              multiple
              selection
              options={getFilterPlanStatus(filterPlanStatus)}
              defaultValue={param.planStatusId}
              placeholder={messages['plan_status']}
              onChange={(e, o) => onInputChange(o, 'planStatusId')}
            />
          </Form.Field>
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
            <ColumnsModal
              tableHeaderCols={columnsForTable}
              tableThings={things => {
                setColumnsForTable(things);
                //store in localstorage
                let temp = {};
                things.map(el => {
                  temp = { ...temp, [el.accessor]: el.show };
                });
                localStorage.setItem(
                  'smopccocServFilter',
                  JSON.stringify(temp),
                );
              }}
            />
          </Form.Field>
        </Form.Group>
        <OutputErrors errors={error} />
      </Form>
      <Divider />

      {Object.keys(serviceFilterPlan).length !== 0 ? (
        <Segment>
          <h4>{`Общее количество: ${serviceFilterPlan.totalElements}`}</h4>
        </Segment>
      ) : null}

      <ReactTableServerSideWrapper
        data={serviceFilterPlan ? serviceFilterPlan.data : []}
        columns={columnsForTable}
        resolveData={data => data.map(row => row)}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchServiceFilterPlan({ ...params, ...param });
          setServerSideParams({ ...params });
        }}
        pages={serviceFilterPlan ? serviceFilterPlan.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

const getFilterPlanStatus = options => {
  const opt = options;
  if (!opt) {
    return [];
  }
  let out = options.map(c => {
    return {
      key: parseInt(c.id, 10),
      text: `${c.name}`,
      value: parseInt(c.id, 10),
    };
  });
  return out;
};

const categoryOptions = [
  { key: 1, text: 'Зеленый', value: 1 },
  { key: 2, text: 'Желтый', value: 2 },
  { key: 3, text: 'Красный', value: 3 },
  { key: 4, text: 'Черный', value: 4 },
];

const configurationOptions = [
  { key: 1, text: 'F1', value: 1 },
  { key: 2, text: 'F1+M1', value: 2 },
  { key: 3, text: 'F2', value: 3 },
  { key: 4, text: 'F2+M1', value: 4 },
  { key: 5, text: 'F3', value: 5 },
  { key: 6, text: 'F3+M1', value: 6 },
  { key: 7, text: 'F4', value: 7 },
  { key: 8, text: 'F4+M1', value: 8 },
  { key: 9, text: 'M1', value: 9 },
];

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    serviceFilterPlan: state.smopccocReducer.serviceFilterPlan,
    branchService: state.userInfo.branchOptionsService,
    filterPlanStatus: state.f4.filterPlanStatus,
  };
}

export default connect(mapStateToProps, {
  f4FetchBranchesByBukrs,
  fetchServiceListManager,
  fetchServiceFilterPlan,
  f4FetchFilterPlanStatus,
})(injectIntl(ServiceFilterPlan));

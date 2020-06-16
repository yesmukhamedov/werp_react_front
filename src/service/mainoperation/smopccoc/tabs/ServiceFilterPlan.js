import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider, Icon, Popup } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchServiceFilterPlan } from '../smopccocAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import CancelPlanModal from '../components/CancelPlanModal';
import matchSorter from 'match-sorter';
import { f4FetchBranchesByBukrs } from './../../../../reference/f4/f4_action';
import { Link } from 'react-router-dom';

const ServiceFilterPlan = props => {
  const {
    intl: { messages },
    language,
  } = props;

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
    crmCategoryId: '',
    configuration: '',
    planId: '',
  };

  //END Date option
  const [param, setParam] = useState({ ...emptyParam });
  const [error, setError] = useState([]);
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [cancelPlanModal, setCancelPlanModal] = useState(false);

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
      Cell: <div style={{ height: '100px' }}></div>,
      filterable: false,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
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
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['tovarSn'] }),
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['customerFIO'] }),
      filterAll: true,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['customerIinBin'] }),
      filterAll: true,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['address'] }),
      filterAll: true,
    },
    {
      Header: messages['Dealer.Fullname'],
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
      Header: messages['category'],
      accessor: 'crmCategoryName',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['fin_status'],
      accessor: 'contractStatusName',
      checked: true,
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
      width: 60,
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
                setParam({ ...param, planId: original.row.id });
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        );
      },
      checked: true,
      fixed: 'right',
    },
  ];

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

  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      props.fetchServiceFilterPlan({ ...param, page, size });
      setTurnOnReactFetch(true);
    }
  };

  const validate = () => {
    const errors = [];
    if (param.bukrs === '') {
      errors.push(errorTableText(5));
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
      <CancelPlanModal
        open={cancelPlanModal}
        handleClickApply={() => handleClickApply()}
        planId={param.planId}
        onClosePlanModal={bool => setCancelPlanModal(bool)}
      />
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
            required
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
            onChange={(e, o) => onInputChange(o, 'crmCategoryId')}
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
        <OutputErrors errors={error} />
      </Form>
      <Divider />
      <ReactTableServerSideWrapper
        data={serviceFilterPlan ? serviceFilterPlan.data : []}
        columns={columns}
        resolveData={data => data.map(row => row)}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchServiceFilterPlan({ ...params, ...param });
        }}
        pages={serviceFilterPlan ? serviceFilterPlan.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

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

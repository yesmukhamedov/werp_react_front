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
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchServicePacketPlan } from '../smopspAction';
import { fetchServiceTypeId } from '../../smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import {
  f4FetchCrmCategory,
  f4FetchFilterPlanStatus,
} from '../../../../reference/f4/f4_action';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from './../../../../utils/ModalColumns';
import TextAlignCenter from '../../../../utils/TextAlignCenter';
import CancelPlanModalVC from '../components/CancelPlanModalVC';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../utils/DropdownClearable';

const ServiceFilterVC = props => {
  const {
    countryOptions,
    companyOptions = [],
    finStatusOption,
    serviceDateTypeOptions,
    warrantyOptions,
    crmCategory,
    branchOptions,
    filterPlanStatus = [],
  } = props;

  const {
    intl: { messages },
    fetchServicePacketPlan,
    servicePacket = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    contractStatusId: '',
    crmCategory: '',
    serviceDateType: '',
    warranty: '',
    planStatusId: [1, 6],
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [planId, setPlanId] = useState('');
  const [error, setError] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [cancelPlanModal, setCancelPlanModal] = useState(false);

  useEffect(() => {
    props.f4FetchCrmCategory();
    props.f4FetchFilterPlanStatus();
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
  }, [branchOptions, param.bukrs, param.countryId]);

  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      filterable: false,
      Cell: row => <TextAlignCenter text={row.value} />,
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
      width: 60,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 80,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['Dealer.Fullname'],
      accessor: 'dealerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
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
      Header: messages['guarantee'],
      accessor: 'warrantyName',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
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
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}&filterVCId=${original.row.id}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              <Icon name="address card" color="black" />
            </Link>
          </div>
        );
      },
      checked: true,
      width: 40,
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
      width: 40,
    },
  ];

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
        case 'crmCategory':
          prevParam.crmCategory = o.value;
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

        case 'contractStatusId':
          prevParam.contractStatusId = o.value;
          break;

        case 'serviceDateType':
          prevParam.serviceDateType = o.value;
          break;

        case 'warranty':
          prevParam.warranty = o.value;
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

  const [serverSideParams, setServerSideParams] = useState({});

  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '' && param.planStatusId !== null) {
      const page = 0;
      const size = 20;
      if (Object.keys(serverSideParams).length > 0) {
        fetchServicePacketPlan({
          ...param,
          ...serverSideParams,
          planStatusId: param.planStatusId.toString(),
        });
      } else {
        fetchServicePacketPlan({
          ...param,
          page,
          size,
          planStatusId: param.planStatusId.toString(),
        });
      }
      setTurnOnReactFetch(true);
    }
  };

  const [serverSideParams, setServerSideParams] = useState({});

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

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
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
        case 'crmCategory':
          prevParam.crmCategory = '';
          break;
        case 'serviceTypeId':
          prevParam.serviceTypeId = '';
          break;

        case 'serviceStatusId':
          prevParam.serviceStatusId = '';
          break;
        case 'dateStart':
          prevParam.dateStart = '';
          break;

        case 'contractStatusId':
          prevParam.contractStatusId = '';
          break;

        case 'serviceDateType':
          prevParam.serviceDateType = '';
          break;

        case 'warranty':
          prevParam.warranty = '';
          break;

        default:
          prevParam[fieldName] = '';
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <CancelPlanModalVC
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
              onChange={(e, o) => onInputChange(o, 'contractStatusId')}
              handleClear={() => handleClear('contractStatusId')}
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
              options={getCrmCategory(crmCategory)}
              value={param.crmCategory}
              placeholder={messages['category']}
              onChange={(e, o) => onInputChange(o, 'crmCategory')}
              handleClear={() => handleClear('crmCategory')}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['guarantee']}</label>
            <DropdownClearable
              options={warrantyOptions}
              value={param.warranty}
              placeholder={messages['guarantee']}
              onChange={(e, o) => onInputChange(o, 'warranty')}
              handleClear={() => handleClear('warranty')}
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
      {Object.keys(servicePacket).length !== 0 ? (
        <Segment>
          <h4>{`Общее количество ${servicePacket.totalElements}`}</h4>
        </Segment>
      ) : null}

      <ReactTableServerSideWrapper
        data={servicePacket ? servicePacket.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          fetchServicePacketPlan({ ...params, ...param });
          setServerSideParams({ ...params });
        }}
        pages={servicePacket ? servicePacket.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

const getCrmCategory = crmCategory => {
  const crmCat = crmCategory;
  if (!crmCat) {
    return [];
  }
  let out = crmCategory.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });
  return out;
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

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    servicePacket: state.smopspReducer.servicePacket,
    crmCategory: state.f4.crmCategory,
    filterPlanStatus: state.f4.filterPlanStatus,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchServicePacketPlan,
  f4FetchCrmCategory,
  f4FetchFilterPlanStatus,
})(injectIntl(ServiceFilterVC));

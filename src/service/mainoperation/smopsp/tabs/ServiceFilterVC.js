import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider, Icon, Popup } from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchServicePacketPlan } from '../smopspAction';
import { fetchServiceTypeId } from '../../smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import { f4FetchCrmCategory } from '../../../../reference/f4/f4_action';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from './../../../../utils/ModalColumns';
import CancelPlanModalVC from '../components/CancelPlanModalVC';
import { Link } from 'react-router-dom';

const ServiceFilterVC = props => {
  const {
    countryOptions,
    companyOptions = [],
    finStatusOption,
    serviceDateTypeOptions,
    warrantyOptions,
    crmCategory,
    branchOptions,
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
    planId: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [error, setError] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [cancelPlanModal, setCancelPlanModal] = useState(false);

  useEffect(() => {
    props.f4FetchCrmCategory();
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
      Header: 'ID',
      accessor: 'id',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      with: 200,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
      with: 150,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
    },
    {
      Header: messages['Dealer.Fullname'],
      accessor: 'dealerFIO',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['guarantee'],
      accessor: 'warrantyName',
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

  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      fetchServicePacketPlan({ ...param, page, size });
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

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  return (
    <Container fluid className="containerMargin">
      <CancelPlanModalVC
        open={cancelPlanModal}
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
            onChange={(e, o) => onInputChange(o, 'contractStatusId')}
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
            options={getCrmCategory(crmCategory)}
            placeholder={messages['category']}
            onChange={(e, o) => onInputChange(o, 'crmCategory')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['guarantee']}
            options={warrantyOptions}
            placeholder={messages['guarantee']}
            onChange={(e, o) => onInputChange(o, 'warranty')}
            className="alignBottom"
          />
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

      <ReactTableServerSideWrapper
        data={servicePacket ? servicePacket.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => fetchServicePacketPlan({ ...params, ...param })}
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

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    servicePacket: state.smopspReducer.servicePacket,
    crmCategory: state.f4.crmCategory,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchServicePacketPlan,
  f4FetchCrmCategory,
})(injectIntl(ServiceFilterVC));

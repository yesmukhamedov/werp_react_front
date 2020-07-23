import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Icon } from 'semantic-ui-react';
import { errorTableText } from '../../../../utils/helpers';
import 'react-table/react-table.css';
import { fetchTransferApplication } from '../smopccicAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableWrapperFixedColumns from '../../../../utils/ReactTableWrapperFixedColumns';
import ModalColumns from '../../../../utils/ModalColumns';
import { LinkToSmcuspor } from '../../../../utils/outlink';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../utils/DropdownClearable';
import moment from 'moment';

const TransferApplicationEntry = props => {
  const {
    intl: { messages },
    transferApplicationData = [],
    companyOptions = [],
    countryOptions,
    branchOptions = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    contractStatusId: '',
    dateOpenAt: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

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

  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 55,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 60,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        </div>
      ),
      filterable: false,
      width: 80,
    },
    {
      Header: messages['transfer_date'],
      accessor: 'rescheduledDate',
      checked: true,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        </div>
      ),
      filterable: false,
    },

    {
      Header: messages['Application_Date'],
      accessor: 'applicationDate',
      checked: true,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        </div>
      ),
      filterable: false,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Phone'],
      accessor: 'phoneNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['master'],
      accessor: 'masterFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 40,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['application_status'],
      accessor: 'applicationStatusId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['request_number'],
      accessor: 'applicationNumber',
      Cell: original => {
        const url = `../mainoperation/smvca?id=${original.value}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              {original.value}
            </Link>
          </div>
        );
      },

      checked: true,
      filterable: false,
      fixed: 'right',
      width: 60,
    },
    {
      Header: messages['Table.View'],
      accessor: '16',
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text={messages['Table.View']}
          />
        </div>
      ),
      checked: true,
      width: 60,
      fixed: 'right',
    },
  ];

  const [serverSideParams, setServerSideParams] = useState({});

  const handleClickApplyTransfer = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      const orderBy = 'id';
      const direction = 'DESC';
      if (Object.keys(serverSideParams).length > 0) {
        props.fetchTransferApplication({ ...param, ...serverSideParams });
      } else {
        props.fetchTransferApplication({
          ...param,
          orderBy,
          direction,
          page,
          size,
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
        default:
          prevParam[fieldName] = '';
      }
      return prevParam;
    });
  };
  return (
    <Container fluid className="containerMargin">
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
        </Form.Group>
        <Form.Group className="spaceBetween">
          <Form.Button
            onClick={handleClickApplyTransfer}
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
      <ReactTableWrapperFixedColumns
        data={transferApplicationData ? transferApplicationData.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchTransferApplication({ ...params, ...param });
          setServerSideParams({ ...params });
        }}
        pages={
          transferApplicationData ? transferApplicationData.totalPages : ''
        }
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    transferApplicationData: state.smopccicReducer.transferApplicationData.data,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchTransferApplication,
})(injectIntl(TransferApplicationEntry));

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider, Segment, Icon } from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchMyApplication, clearSmopspMyApplication } from '../smopspAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import { f4FetchServiceAppStatus } from '../../../../reference/f4/f4_action';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ModalColumns from './../../../../utils/ModalColumns';
import { Link } from 'react-router-dom';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import DropdownClearable from '../../../../utils/DropdownClearable';
import ReactTableServerSideWrapperFilteredState from '../../../../utils/ReactTableServerSideWrapperFilteredState';

const MyApplication = props => {
  const {
    countryOptions,
    companyOptions = [],
    branchOptions = [],
    serviceAppStatus = [],
  } = props;

  const {
    intl: { messages },
    language,
    myApplication = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    dateAt: momentToStringYYYYMMDD(moment(new Date())),
    applicationStatusId: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);
  const [page, setPage] = useState(0);
  console.log('page', page);
  useEffect(() => {
    props.f4FetchServiceAppStatus();
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

  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      getProps: (state, rowInfo, column) => {
        return {
          style: {
            background:
              rowInfo && rowInfo.original.urgencyLevel === true
                ? '#cc0000'
                : null,
            color:
              rowInfo && rowInfo.original.urgencyLevel === true
                ? 'white'
                : 'black',
          },
        };
      },
      width: 55,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      checked: true,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 60,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
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
      width: 80,
    },

    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
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
      Header: messages['Dealer.Fullname'],
      accessor: 'dealerFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,

      filterable: false,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 40,
      filterable: false,
    },
    {
      Header: messages['guarantee'],
      accessor: 'warrantyId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,

      filterable: false,
    },

    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,

      filterable: false,
    },

    {
      Header: messages['fin_status'],
      accessor: 'contractStatusId',
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
      width: 40,
    },
    {
      Header: messages['Table.View'],
      filterable: false,
      accessor: '16',
      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}&filterVCId=${original.original.serviceFilterVCPlanId}`;
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
  ];

  const initialServerSideParams = {
    page: 0,
    size: 20,
    orderBy: 'id',
    direction: 'DESC',
  };

  const [serverSideParams, setServerSideParams] = useState({
    ...initialServerSideParams,
  });

  console.log('serverSideParams', serverSideParams);

  const handleClickApply = () => {
    setServerSideParams({
      ...initialServerSideParams,
    });

    props.clearSmopspMyApplication();
    validate();
    if (param.bukrs !== '') {
      props.fetchMyApplication({ ...param, ...initialServerSideParams }, () =>
        setTurnOnReactFetch(true),
      );
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
        case 'applicationStatusId':
          prevParam.applicationStatusId = o.value;
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
        case 'applicationStatusId':
          prevParam.applicationStatusId = '';
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
          <Form.Field>
            <label>{messages['application_status']}</label>
            <DropdownClearable
              options={getAppStatus(serviceAppStatus, language)}
              value={param.applicationStatusId}
              placeholder={messages['application_status']}
              onChange={(e, o) => onInputChange(o, 'applicationStatusId')}
              handleClear={() => handleClear('applicationStatusId')}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['date']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['date']}
                selected={
                  param.dateAt === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateAt: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              {messages['apply']}
            </Form.Button>
          </div>

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
      {Object.keys(myApplication).length !== 0 ? (
        <Segment>
          <h4>{`Общее количество ${myApplication.totalElements}`}</h4>
        </Segment>
      ) : null}
      {/* <ReactTableServerSideWrapper
        data={myApplication ? myApplication.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchMyApplication({ ...params, ...param });
          setServerSideParams({ ...params });
        }}
        pages={myApplication ? myApplication.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      /> */}

      <ReactTableServerSideWrapperFilteredState
        data={myApplication ? myApplication.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        pageSize={serverSideParams.size}
        showPagination={true}
        requestData={params => {
          props.fetchMyApplication({ ...params, ...param }, () =>
            setTurnOnReactFetch(true),
          );
          setServerSideParams({ ...params });
        }}
        pages={myApplication ? myApplication.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
        page={serverSideParams.page}
        //onPageChange={newPage => setSer(newPage)}
      />
    </Container>
  );
};

const getAppStatus = (serviceAppStatus, lang) => {
  const appStatus = serviceAppStatus;
  if (!appStatus) {
    return [];
  }
  let out = serviceAppStatus.map(c => {
    return {
      key: parseInt(c.id, 10),
      text: c[lang],
      value: parseInt(c.id, 10),
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    myApplication: state.smopspReducer.myApplication,
    serviceAppStatus: state.f4.serviceAppStatus,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchMyApplication,
  clearSmopspMyApplication,
  f4FetchServiceAppStatus,
})(injectIntl(MyApplication));

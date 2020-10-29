import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Icon, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import {
  fetchMyApplicationExodus,
  clearMyApplicationExodus,
} from '../smopccicAction';
import ReactTableServerSideWrapperFilteredState from '../../../../utils/ReactTableServerSideWrapperFilteredState';
import ModalColumns from '../../../../utils/ModalColumns';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../utils/DropdownClearable';

const MyApplication = props => {
  const {
    intl: { messages },
    language,
    myApplicationData,
    countryOptions,
    companyOptions = [],
    serviceAppStatusOptions,
    tovarCategoryOptions,
    branchOptions = [],
  } = props;

  const emptyParam = {
    countryId: null,
    bukrs: null,
    branchId: null,
    tovarCategory: null,
    applicationStatus: null,
    dateOpenAt: '',
    dateOpenTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  useEffect(() => {
    if (param.bukrs) {
      setServiceBranchOptions(branchOptions[param.bukrs]);
    }
    if (param.bukrs && param.countryId && branchOptions) {
      let brnchOpt = branchOptions[param.bukrs].filter(
        item => item.countryid === param.countryId,
      );
      setServiceBranchOptions(brnchOpt);
    }
  }, [branchOptions, param.countryId, param.bukrs]);

  const initialColumns = [
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      width: 60,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        </div>
      ),
      checked: true,
      filterable: false,
      width: 80,
    },
    {
      Header: messages['Application_Date'],
      accessor: 'applicationDate',
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        </div>
      ),
      checked: true,
      filterable: false,
      width: 80,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['address'],
      accessor: 'fullAddress',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['Phone'],
      accessor: 'fullPhone',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['master'],
      accessor: 'masterFIO',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
      width: 40,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
      width: 40,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['application_status'],
      accessor: 'applicationStatusName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
      width: 70,
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
      checked: true,
      filterable: false,
      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}`;
        return original.row.contractNumber ? (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              <Icon name="address card" color="black" />
            </Link>
          </div>
        ) : null;
      },
      width: 60,
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

  const [filtered, setFiltered] = useState([]);

  //
  const handleClickApply = () => {
    if (param.bukrs) {
      props.clearMyApplicationExodus();
      setFiltered([]);
      setTurnOnReactFetch(false);
      props.fetchMyApplicationExodus(
        { ...param, ...initialServerSideParams },
        () => setTurnOnReactFetch(true),
      );
      setServerSideParams({
        ...initialServerSideParams,
      });
      setError([]);
    } else {
      const errors = [];
      errors.push(errorTableText(5));
      setError(() => errors);
    }
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
        case 'tovarCategory':
          prevParam.tovarCategory = o.value;
          break;
        case 'applicationStatus':
          prevParam.applicationStatus =
            o.value.length > 0 ? o.value.join() : null;
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
          prevParam.countryId = null;
          break;
        case 'bukrs':
          prevParam.bukrs = null;
          break;
        case 'branchId':
          prevParam.branchId = null;
          break;
        case 'tovarCategory':
          prevParam.tovarCategory = null;
          break;
        case 'applicationStatus':
          prevParam.applicationStatus = null;
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
              value={param.countryId ? param.countryId : ''}
              placeholder={messages['country']}
              onChange={(e, o) => onInputChange(o, 'countryId')}
              handleClear={() => handleClear('countryId')}
            />
          </Form.Field>

          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              options={companyOptions}
              value={param.bukrs ? param.bukrs : ''}
              placeholder={messages['bukrs']}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              handleClear={() => handleClear('bukrs')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['brnch']}</label>
            <DropdownClearable
              options={serviceBranchOptions}
              value={param.branchId ? param.branchId : ''}
              placeholder={messages['brnch']}
              onChange={(e, o) => onInputChange(o, 'branchId')}
              handleClear={() => handleClear('branchId')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['category']}</label>
            <DropdownClearable
              options={tovarCategoryOptions}
              value={param.tovarCategoryId ? param.tovarCategoryId : ''}
              placeholder={messages['category']}
              onChange={(e, o) => onInputChange(o, 'tovarCategoryId')}
              handleClear={() => handleClear('tovarCategoryId')}
            />
          </Form.Field>

          <Form.Select
            label={messages['application_status']}
            placeholder={messages['application_status']}
            options={serviceAppStatusOptions}
            onChange={(e, o) => onInputChange(o, 'applicationStatus')}
            className="alignBottom"
            multiple
          />
        </Form.Group>
        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['Form.DateFrom']}
                selected={
                  param.dateOpenAt === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenAt: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={moment(new Date())}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>

            <Form.Field className="marginRight">
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['Form.DateTo']}
                selected={stringYYYYMMDDToMoment(param.dateOpenTo)}
                selected={
                  param.dateOpenTo === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenTo)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenTo: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={moment(new Date())}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              <Icon name="search" />
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

      <ReactTableServerSideWrapperFilteredState
        data={myApplicationData ? myApplicationData.data : []}
        columns={columns}
        filterable={true}
        showPagination={true}
        pageSize={serverSideParams.size}
        requestData={params => {
          props.fetchMyApplicationExodus({ ...param, ...params }, () =>
            setTurnOnReactFetch(true),
          );
          setServerSideParams({ ...params });
        }}
        pages={myApplicationData ? myApplicationData.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
        page={serverSideParams.page}
        filtered={filtered}
        onFilteredChange={filter => {
          setFiltered(filter);
        }}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    myApplicationData: state.smopccicReducer.myApplicationData,
  };
}

export default connect(mapStateToProps, {
  fetchMyApplicationExodus,
  clearMyApplicationExodus,
})(injectIntl(MyApplication));

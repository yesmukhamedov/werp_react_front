import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Divider, Button, Form, Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import {
  clearDynObjService,
  fetchAppStatus,
  fetchAppType,
  fetchAppList,
  fetchAppMasterList,
  fetchClearAppList,
  fetchAppListSearchParam,
  fetchMasterList,
  fetchOperatorList,
  clearOperatorList,
  clearMasterList,
} from '../../serviceAction';

import { f4fetchCategory } from '../../../reference/f4/f4_action';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  errorTableText,
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../utils/helpers';
import ColumnsModal from '../../../utils/ColumnsModal';
import './index.css';
import {
  LinkToSmecam,
  LinkToSmvs,
  LinkToSmcsEmpty,
} from '../../../utils/outlink';
import Masters from './Masters';
import DropdownClearable from '../../../utils/DropdownClearable';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/tr';
import '../../service.css';

import TotalCountsTable from '../../../utils/TotalCountsTable';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';

const Smappl = props => {
  const {
    companyPosition = [],
    intl: { messages },
    branchOptions,
    fetchAppStatus,
    appStatus,
    fetchAppType,
    appType,
    fetchClearAppList,
    category,
    appList,
    masterListSmappl = [],
    operatorListSmappl = [],
  } = props;

  console.log('masterListSmappl', masterListSmappl);
  console.log('operatorListSmappl', operatorListSmappl);

  const [error, setError] = useState([]);
  const language = localStorage.getItem('language');
  const [applicationStatus, setApplicationStatus] = useState([]);
  const [applicationType, setApplicationType] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

  const [search, setSearch] = useState({
    bukrs: null,
    branchId: null,
    dateOpenAt: momentToStringYYYYMMDD(moment(new Date())),
    dateOpenTo: '',
    aDateFrom: null,
    aDateTo: null,
    tovarCategorys: null,
    appStatusIds: '1,2,3,4',
    appTypeIds: null,
    masterId: null,
    operatorId: null,
    direction: 'DESC',
    orderBy: 'id',
  });

  console.log('search', search);

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const masterOptions = masterListSmappl.map((item, index) => {
    return {
      key: parseInt(`${Math.floor(Math.random() * 10000)}${item.staffId}`),
      text: item.fullName,
      value: item.staffId,
    };
  });
  const operatorOptions = operatorListSmappl.map((item, index) => {
    return {
      key: parseInt(`${Math.floor(Math.random() * 10)}${item.staffId}`),
      text: item.fullName,
      value: item.staffId,
    };
  });

  const allColumns = [
    {
      Header: `id`,
      accessor: 'id',
      show: true,
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
      fixed: 'left',
    },
    {
      Header: `Филиал`,
      accessor: 'branchName',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: `CN `,
      accessor: 'contractNumber',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },

    {
      Header: messages['productSerialNumber'],
      accessor: 'tovarSn',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['TBL_H__PRODUCT'],
      accessor: 'matnrName',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Application_Date'],
      accessor: 'adate',
      show: true,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {moment(row.value).format('DD-MM-YYYY')}
        </div>
      ),
    },
    {
      Header: messages['Form.Reco.RecoName'],
      accessor: 'applicantName',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Table.Address'],
      accessor: 'address',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Phone'],
      accessor: 'fullPhone',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Masters'],
      accessor: 'masterName',
      show: true,
      filterable: false,
      Cell: ({ row }) => (
        <div style={{ textAlign: 'center' }}>
          {row._original.masterName}
          <Masters
            master={row._original.masterName}
            id={row._original.masterId}
            request={row._original}
          />
        </div>
      ),
    },
    {
      Header: messages['L__ORDER_STATUS'],
      accessor: 'appStatusName',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Operator'],
      accessor: 'operatorName',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['type_of_application'],
      accessor: 'appTypeName',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },

    {
      Header: `${messages['service']} №`,

      accessor: 'serviceId',
      Footer: original => {
        let total = 0;
        original.data.map((item, index) => {
          if (
            item._original.serviceTotalSum != null ||
            item._original.serviceTotalSum != undefined
          ) {
            total = total + item._original.serviceTotalSum;
          }
        });
        return <div style={{ textAlign: 'center' }}>Итого:{total}</div>;
      },
      show: true,
      filterable: false,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmvs serviceNumber={row.value} />
        </div>
      ),
    },
    {
      Header: `№ ${messages['Applications']}`,
      accessor: 'id',
      show: true,
      filterable: false,
      Cell: ({ row }) => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmecam id={row._original.id} />
        </div>
      ),
      fixed: 'right',
    },

    {
      Header: messages['Table.View'],
      accessor: 'clientStory',
      checked: true,
      filterable: false,
      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}`;
        return original.row.contractNumber == null ||
          original.row.contractNumber == undefined ? (
          ''
        ) : (
          <Popup
            content="История клиента"
            size="tiny"
            trigger={
              <div style={{ textAlign: 'center' }}>
                <Link to={url} target="_blank">
                  <Icon name="address card" color="black" />
                </Link>
              </div>
            }
          />
        );
      },
      width: 60,
      fixed: 'right',
    },
  ];
  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    props.clearOperatorList();
    props.clearMasterList();
    let param = {
      bukrs: search.bukrs,
      branchId: search.branchId,
      categoryId: search.tovarCategorys,
    };
    if (search.bukrs) {
      props.fetchMasterList({ ...param });
      props.fetchOperatorList({ ...param });
    }
  }, [search.bukrs, search.branchId, search.tovarCategorys]);

  useEffect(() => {
    props.fetchClearAppList();
    fetchAppStatus();
    fetchAppType();
    props.f4fetchCategory();
  }, []);

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smappl');
    if (transactionCodeText) {
      let transactionCodeObject = JSON.parse(transactionCodeText);

      let temp = allColumns.map(item => {
        return { ...item, show: transactionCodeObject[item.accessor] };
      });
      setColumnsForTable(temp);
    } else {
      setColumnsForTable(allColumns);
    }
  }, []);

  useEffect(() => {
    const app = appStatus.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
    setApplicationStatus(app);
  }, [appStatus]);

  useEffect(() => {
    const app = appType.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
    setApplicationType(app);
  }, [appType]);

  const onChange = (text, value) => {
    setSearch(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          varTs.bukrs = value;
          varTs.branchId = null;
          break;
        case 'branch':
          varTs.branchId = value;
          break;
        case 'product':
          varTs.tovarCategorys = value.length > 0 ? value.join() : null;
          break;
        case 'status':
          varTs.appStatusIds = value.length > 0 ? value.join() : '';
          //varTs.appStatusIds = value;
          break;
        case 'ApplicationType':
          varTs.appTypeIds = value.length > 0 ? value.join() : null;
          break;
        case 'changeMaster':
          varTs.masterId = value.length > 0 ? value.join() : null;
          break;
        case 'changeOperator':
          varTs.operatorId = value.length > 0 ? value.join() : null;
          break;
        default:
          return varTs;
      }
      return varTs;
    });
  };

  const [serverSideParams, setServerSideParams] = useState({});

  const onSearch = () => {
    const errors = [];
    const param = {
      branchId: search.branchId,
      bukrs: search.bukrs,
      categoryId: search.categoryId,
    };
    if (search.bukrs === '') {
      errors.push(errorTableText(5));
    }
    if (search.branchId === 0 || search.branchId === '') {
      errors.push(errorTableText(7));
    }
    if (errors.length === 0) {
      if (Object.keys(serverSideParams).length > 0) {
        props.fetchAppList({
          ...search,
          appStatusIds: search.appStatusIds.toString(),
          ...serverSideParams,
        });
        props.fetchAppMasterList({ ...param });
        setTurnOnReactFetch(true);
        props.fetchAppListSearchParam(search);
      } else {
        const page = 0;
        const size = 20;
        props.fetchAppList({
          ...search,
          appStatusIds: search.appStatusIds.toString(),
          page,
          size,
        });
        props.fetchAppMasterList({ ...param });
        setTurnOnReactFetch(true);
        props.fetchAppListSearchParam(search);
      }
    }
    setError(() => errors);
  };

  const arrayAppStatus = search.appStatusIds
    ? search.appStatusIds.split(',').map(Number)
    : '';

  return (
    <Segment>
      <Divider hidden></Divider>
      <Segment>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>{messages['service_requests']}</h3>
          {/* <LinkToSmccald buttonName="Создать заявку без данных" /> */}
          <LinkToSmcsEmpty />
        </div>
      </Segment>

      <Divider />

      <Form>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              selection
              options={companyPosition}
              value={search.bukrs}
              placeholder={messages['bukrs']}
              onChange={(e, { value }) => onChange('bukrs', value)}
              handleClear={() => setSearch({ ...search, bukrs: '' })}
            />
          </Form.Field>

          <Form.Field required>
            <label>{messages['Task.Branch']}</label>
            <DropdownClearable
              selection
              options={search.bukrs ? branchOptions[search.bukrs] : []}
              value={search.branchId}
              placeholder={messages['Task.Branch']}
              onChange={(e, { value }) => onChange('branch', value)}
              handleClear={() => setSearch({ ...search, branchId: '' })}
            />
          </Form.Field>
          <Form.Select
            label={messages['product_category']}
            clearable="true"
            multiple
            selection
            options={categoryOptions}
            placeholder={messages['product_category']}
            onChange={(e, { value }) => onChange('product', value)}
          />
          <Form.Select
            label={messages['L__ORDER_STATUS']}
            clearable="true"
            selection
            fluid
            multiple
            defaultValue={arrayAppStatus}
            options={applicationStatus}
            placeholder={messages['L__ORDER_STATUS']}
            onChange={(e, { value }) => onChange('status', value)}
          />
          <Form.Select
            label={messages['type_of_application']}
            clearable="true"
            selection
            multiple
            options={applicationType}
            placeholder={messages['type_of_application']}
            onChange={(e, { value }) => onChange('ApplicationType', value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <label>{messages['Form.DateFrom']}</label>
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              locale={language}
              selected={stringYYYYMMDDToMoment(search.dateOpenAt)}
              onChange={event =>
                setSearch({
                  ...search,
                  dateOpenAt: momentToStringYYYYMMDD(event),
                })
              }
              dateFormat="DD.MM.YYYY"
              placeholderText={messages['Form.DateFrom']}
              isClearable
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['Form.DateTo']}</label>
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              selected={stringYYYYMMDDToMoment(search.dateOpenTo)}
              onChange={event =>
                setSearch({
                  ...search,
                  dateOpenTo: momentToStringYYYYMMDD(event),
                })
              }
              locale={language}
              dateFormat="DD.MM.YYYY"
              placeholderText={messages['Form.DateTo']}
              isClearable
            />
          </Form.Field>
          <Form.Field className="marginRight width25Rem">
            <label>Мастер</label>
            <Form.Select
              clearable="true"
              selection
              fluid
              multiple
              //value={param.masterId ? param.masterId : ''}
              options={masterOptions}
              placeholder="Мастер"
              onChange={(e, o) => onChange('changeMaster', o.value)}
            />
          </Form.Field>
          <Form.Field className="marginRight width25Rem">
            <label>Оператор</label>
            <Form.Select
              clearable="true"
              selection
              fluid
              multiple
              options={operatorOptions}
              placeholder="Оператор"
              onChange={(e, o) => onChange('changeOperator', o.value)}
            />
          </Form.Field>

          <Form.Field
            control={Button}
            color="blue"
            style={{ marginTop: 24 }}
            onClick={onSearch}
          >
            {messages['search']}
          </Form.Field>
        </Form.Group>
      </Form>

      <OutputErrors errors={error} />

      <Divider></Divider>

      <Segment basic textAlign="right">
        <ColumnsModal
          tableHeaderCols={columnsForTable}
          tableThings={things => {
            setColumnsForTable(things);
            //store in localstorage
            let temp = {};
            things.map(el => {
              temp = { ...temp, [el.accessor]: el.show };
            });
            localStorage.setItem('smappl', JSON.stringify(temp));
          }}
        />
      </Segment>
      <TotalCountsTable count={appList.totalElements} />
      <ReactTableServerSideWrapper
        data={appList.data}
        columns={columnsForTable}
        filterable={true}
        pageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchAppList({ ...params, ...search });
          setServerSideParams({ ...params });
        }}
        pages={appList.totalPages ? appList.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    state,
    appList: state.serviceReducer.appList,
    companyPosition: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
    appStatus: state.serviceReducer.appStatus,
    appType: state.serviceReducer.appType,
    appMasterList: state.serviceReducer.appMasterList,
    category: state.f4.category,
    masterListSmappl: state.serviceReducer.masterListSmappl,
    operatorListSmappl: state.serviceReducer.operatorListSmappl,
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
  fetchAppStatus,
  fetchAppType,
  fetchAppList,
  fetchAppMasterList,
  fetchClearAppList,
  fetchAppListSearchParam,
  f4fetchCategory,
  fetchMasterList,
  fetchOperatorList,
  clearOperatorList,
  clearMasterList,
})(injectIntl(Smappl));

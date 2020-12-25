import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4fetchCategory,
  f4FetchServiceAppStatus,
} from '../../../reference/f4/f4_action';
import { fetchSrls, fetchServiceTypeList, clearSrls } from './srlsAction';
import { injectIntl } from 'react-intl';
import { Icon, Container, Segment, Form, Dropdown } from 'semantic-ui-react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalColumns from './../../../utils/ModalColumns';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
  moneyFormat,
} from '../../../utils/helpers';
import '../../service.css';
import { LinkToSmcuspor, LinkToSmvs } from '../../../utils/outlink';
import ReactTableServerSideWrapperFilteredState from '../../../utils/ReactTableServerSideWrapperFilteredState';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import TotalCountsTable from '../../../utils/TotalCountsTable';
import moment from 'moment';

require('moment/locale/ru');

const Srls = props => {
  const {
    intl: { messages },
    language = '',
    category = [],
    companyOptions = [],
    serviceAppStatus = [],
    serviceTypeList = [],
    srlsData = {},
    branchOptionsService,
  } = props;
  const emptyParam = {
    bukrs: null,
    branchId: null,
    categoryId: null,
    serviceTypeId: null,
    serviceStatusId: null,
    dateAt: '',
    dateTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [error, setError] = useState([]);

  useEffect(() => {
    props.f4FetchServiceAppStatus();
    props.f4fetchCategory();
    props.f4FetchServiceAppStatus();
    props.fetchServiceTypeList();
  }, []);
  const tovarCategoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const serviceAppStatusOptions = serviceAppStatus.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const serviceTypeOptions = serviceTypeList.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const varSrls = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varSrls.bukrs = o.value;
          varSrls.branchId = null;
          break;
        case 'branchId':
          varSrls.branchId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'categoryId':
          varSrls.categoryId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'serviceTypeId':
          varSrls.serviceTypeId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'serviceStatusId':
          varSrls.serviceStatusId = o.value.length > 0 ? o.value.join() : null;
          break;
        default:
          varSrls[fieldName] = o.value;
      }
      return varSrls;
    });
  };

  //Колоны ReactTable
  const initialColumns = [
    {
      Header: `${messages['service']} №`,
      accessor: 'serviceNumber',
      checked: true,
      width: 120,

      Cell: original => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          <LinkToSmvs serviceNumber={original.row.serviceNumber} />
        </div>
      ),
      fixed: 'left',
    },
    {
      Header: messages['L__BRANCH'],
      accessor: 'branchName',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['TBL_H__DATE'],
      accessor: 'dateOpen',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD.MM.YYYY') : ''}
        </div>
      ),
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['productSerialNumber'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['full_name_of_client'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: messages['service_status'],
      accessor: 'serviceStatusName',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['master'],
      accessor: 'masterFIO',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['Operator'],
      accessor: 'operatorFIO',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    // {
    //   Header: 'Вид сервиса',
    //   accessor: 'serviceTypeName',
    //   checked: true,
    //   filterable: false,
    //   Cell: row => (
    //     <div className="text-wrap" style={{ textAlign: 'center' }}>
    //       {row.value}
    //     </div>
    //   ),
    // },
    {
      Header: messages['amount'],
      accessor: 'sumTotal',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },

    {
      Header: messages['waers'],
      accessor: 'currencyName',
      checked: true,
      filterable: false,
      width: 80,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: messages['paid'],
      accessor: 'paid',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['remainder'],
      accessor: 'residue',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: messages['customer_story'],
      accessor: '16',
      filterable: false,
      Cell: original => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
      checked: true,
      fixed: 'right',
    },
  ];
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  const initialServerSideParams = {
    page: 0,
    size: 20,
    orderBy: 'serviceNumber',
    direction: 'DESC',
  };

  const [serverSideParams, setServerSideParams] = useState({
    ...initialServerSideParams,
  });

  const [filtered, setFiltered] = useState([]);

  //Поиск
  const handleClickApply = () => {
    if (param.bukrs) {
      props.clearSrls();
      setFiltered([]);
      setTurnOnReactFetch(false);
      props.fetchSrls({ ...param, ...initialServerSideParams }, () =>
        setTurnOnReactFetch(true),
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

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Segment>
        <h3>{`${messages['Services_list']} (${messages['Common']})`}</h3>
      </Segment>
      <Form>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>{messages['Form.Company']}</label>
            <DropdownClearable
              placeholder={messages['Form.Company']}
              options={companyOptions}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              value={param.bukrs}
              handleClear={() =>
                setParam({ ...param, bukrs: null, branchId: null })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['Form.Branch']}</label>
            <Dropdown
              selection
              multiple
              placeholder={messages['Form.Branch']}
              options={param.bukrs ? branchOptionsService[param.bukrs] : []}
              onChange={(e, o) => onInputChange(o, 'branchId')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['product_category']}</label>
            <Dropdown
              selection
              multiple
              placeholder={messages['product_category']}
              options={tovarCategoryOptions ? tovarCategoryOptions : []}
              onChange={(e, o) => onInputChange(o, 'categoryId')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['typeOfService']}</label>
            <Dropdown
              selection
              multiple
              placeholder={messages['typeOfService']}
              options={serviceTypeOptions ? serviceTypeOptions : []}
              onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['service_status']}</label>
            <Dropdown
              selection
              multiple
              placeholder={messages['service_status']}
              options={serviceAppStatusOptions ? serviceAppStatusOptions : []}
              onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                isClearable
                placeholderText={messages['Form.DateFrom']}
                className="date-auto-width"
                autoComplete="off"
                locale={`${language}`}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateAt == '' ? '' : stringYYYYMMDDToMoment(param.dateAt)
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

            <Form.Field className="marginRight">
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                isClearable
                locale={language}
                placeholderText={messages['Form.DateTo']}
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateTo == '' ? '' : stringYYYYMMDDToMoment(param.dateTo)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateTo: momentToStringYYYYMMDD(date),
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
      </Form>
      <OutputErrors errors={error} />

      <TotalCountsTable
        text={messages['overallAmount']}
        count={srlsData ? srlsData.totalElements : 0}
      />

      <ReactTableServerSideWrapperFilteredState
        data={srlsData ? srlsData.data : []}
        columns={columns}
        filterable={true}
        showPagination={true}
        pageSize={serverSideParams.size}
        requestData={params => {
          props.fetchSrls(
            {
              ...param,
              ...params,
              orderBy: params.orderBy
                ? params.orderBy
                : serverSideParams.orderBy,
              direction: params.direction
                ? params.direction
                : serverSideParams.direction,
            },
            () => setTurnOnReactFetch(true),
          );
          setServerSideParams({ ...params });
        }}
        pages={srlsData ? srlsData.totalPages : ''}
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
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    category: state.f4.category,
    serviceAppStatus: state.f4.serviceAppStatus,
    contractStatusList: state.f4.contractStatusList,
    serviceTypeList: state.srlsmReducer.serviceTypeList,
    srlsData: state.srlsReducer.srlsData,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchServiceAppStatus,
  fetchSrls,
  clearSrls,
  fetchServiceTypeList,
})(injectIntl(Srls));

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
    //intl: { messages },
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

  console.log('PARAM', param);
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
      Header: '#',
      accessor: 'id',
      checked: true,
      filterable: false,
      width: 50,
    },
    {
      Header: 'Филиал',
      accessor: 'branchId',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата',
      accessor: 'dateOpen',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
      checked: true,
    },

    {
      Header: 'Статус сервиса',
      accessor: 'serviceStatusId',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Мастер',
      accessor: 'masterFIO',
      checked: true,
    },
    {
      Header: 'Оператор',
      accessor: 'operatorFIO',
      checked: true,
    },
    {
      Header: 'Вид сервиса',
      accessor: 'serviceTypeId',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Сумма',
      accessor: 'sumTotal',
      checked: true,
      filterable: false,
    },

    {
      Header: 'Валюта',
      accessor: 'currencyId',
      checked: true,
      filterable: false,
      width: 100,
    },

    {
      Header: 'Оплачено',
      accessor: 'paid',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Остаток',
      accessor: 'residue',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Сервис №',
      accessor: 'serviceNumber',
      checked: true,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmvs serviceNumber={original.row.id} />
        </div>
      ),
      fixed: 'right',
    },
    {
      Header: 'История клиента',
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
    orderBy: 'id',
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
        <h3>Список сервисов(Общий)</h3>
      </Segment>
      <Form>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>Компания</label>
            <DropdownClearable
              placeholder="Компания"
              options={companyOptions}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              value={param.bukrs}
              handleClear={() =>
                setParam({ ...param, bukrs: null, branchId: null })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Филиал</label>
            <Dropdown
              selection
              multiple
              placeholder="Филиал"
              options={param.bukrs ? branchOptionsService[param.bukrs] : []}
              onChange={(e, o) => onInputChange(o, 'branchId')}
            />
          </Form.Field>

          <Form.Field>
            <label>Категория товара</label>
            <Dropdown
              selection
              multiple
              placeholder="Категория товара"
              options={tovarCategoryOptions ? tovarCategoryOptions : []}
              onChange={(e, o) => onInputChange(o, 'categoryId')}
            />
          </Form.Field>

          <Form.Field>
            <label>Вид сервиса</label>
            <Dropdown
              selection
              multiple
              placeholder="Вид сервиса"
              options={serviceTypeOptions ? serviceTypeOptions : []}
              onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
            />
          </Form.Field>

          <Form.Field>
            <label>Статус сервиса</label>
            <Dropdown
              selection
              multiple
              placeholder="Статус сервиса"
              options={serviceAppStatusOptions ? serviceAppStatusOptions : []}
              onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата с</label>
              <DatePicker
                isClearable
                placeholderText="Дата с"
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
              <label>Дата по</label>
              <DatePicker
                isClearable
                locale={language}
                placeholderText="Дата по"
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
              Применить
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

      <TotalCountsTable count={srlsData ? srlsData.totalElements : 0} />

      <ReactTableServerSideWrapperFilteredState
        data={srlsData ? srlsData.data : []}
        columns={columns}
        filterable={true}
        showPagination={true}
        pageSize={serverSideParams.size}
        requestData={params => {
          props.fetchSrls({ ...param, ...params }, () =>
            setTurnOnReactFetch(true),
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

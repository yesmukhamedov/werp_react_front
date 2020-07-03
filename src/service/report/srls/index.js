import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4fetchCategory,
  f4FetchServiceAppStatus,
} from '../../../reference/f4/f4_action';
import { fetchSrls, fetchServiceTypeList } from './srlsAction';
import { injectIntl } from 'react-intl';
import {
  Icon,
  Container,
  Segment,
  Form,
  Divider,
  Dropdown,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalColumns from './../../../utils/ModalColumns';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import '../../service.css';
import { LinkToSmcuspor } from '../../../utils/outlink';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { formatDMY, errorTableText } from '../../../utils/helpers';
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
    srlsData = [],
    srlsTotalPages,
    srlsTotalElements,
    branchOptionsService,
  } = props;
  const emptyParam = {
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceTypeId: '',
    serviceStatusId: '',
    dateAt: '',
    dateTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [error, setError] = useState([]);
  const [maxDateAt, setMaxDateAt] = useState(
    param.dateTo == ''
      ? moment(new Date())
      : stringYYYYMMDDToMoment(param.dateTo),
  );

  const [maxDateTo, setMaxDateTo] = useState(
    param.dateTo == ''
      ? moment(new Date())
      : stringYYYYMMDDToMoment(param.dateTo),
  );

  useEffect(() => {
    if (stringYYYYMMDDToMoment(param.dateTo) != '') {
      setMaxDateAt(stringYYYYMMDDToMoment(param.dateTo));
    }
  }, [param.dateAt, param.dateTo]);

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
          break;
        case 'branchId':
          //varSrls.branchId = o.value;
          varSrls.branchId = o.value.length > 0 ? o.value.join() : '';
          break;
        case 'categoryId':
          varSrls.categoryId = o.value.length > 0 ? o.value.join() : '';
          break;
        case 'serviceTypeId':
          varSrls.serviceTypeId = o.value.length > 0 ? o.value.join() : '';
          break;
        case 'serviceStatusId':
          varSrls.serviceStatusId = o.value.length > 0 ? o.value.join() : '';
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
      Header: 'Id',
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
      accessor: 'contractDate',
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
      accessor: 'id',
      checked: true,
      filterable: false,
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
  const handleClickApply = () => {
    // //validate();
    // if (param.bukrs !== '') {
    //   const page = 0;
    //   const size = 20;
    //   props.fetchSrls({ ...param, page, size });
    // }
    // setTurnOnReactFetch(true);
    // setError(errors);

    const errors = [];
    if (param.bukrs == null || param.bukrs == '') {
      errors.push(errorTableText(5));
    } else {
      const page = 0;
      const size = 20;
      props.fetchSrls({ ...param, page, size });
    }
    setTurnOnReactFetch(true);
    setError(errors);
  };

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  useEffect(() => {
    if (param.bukrs == '') {
      setParam({ ...param, branchId: '' });
    }
  }, [param.bukrs]);

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
              handleClear={() => setParam({ ...param, bukrs: '' })}
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
                maxDate={maxDateAt}
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
                maxDate={maxDateTo}
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

      <TotalCountsTable count={srlsTotalElements ? srlsTotalElements : 0} />

      <ReactTableServerSideWrapper
        data={srlsData}
        columns={columns}
        filterable={true}
        pageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchSrls({ ...params, ...param });
        }}
        pages={srlsTotalPages ? srlsTotalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
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
    srlsTotalPages: state.srlsReducer.srlsTotalPages,
    srlsTotalElements: state.srlsReducer.srlsTotalElements,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchServiceAppStatus,
  fetchSrls,
  fetchServiceTypeList,
})(injectIntl(Srls));

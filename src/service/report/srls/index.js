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
  Table,
  Input,
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
import ReactTableWrapper from './../../../utils/ReactTableWrapper';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import moment from 'moment';

const Srls = props => {
  const {
    intl: { messages },
    language,
    category = [],
    companyOptions = [],
    serviceAppStatus = [],
    serviceType = [],
    serviceTypeList = [],
    srlsData = [],
    srlsTotalPages,
    branchOptionsService,
  } = props;
  console.log('srlsTotalPages', srlsTotalPages);

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
  const [maxDateAt, setMaxDateAt] = useState(
    param.dateTo == ''
      ? moment(new Date())
      : stringYYYYMMDDToMoment(param.dateTo),
  );
  console.log('param', param);

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

  console.log('maxDateAt', maxDateAt);
  console.log('maxDateTo', maxDateTo);

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
          varSrls.branchId = o.value;
          break;
        case 'categoryId':
          varSrls.categoryId = o.value;
          break;
        case 'serviceTypeId':
          varSrls.serviceTypeId = o.value;
          break;
        case 'serviceStatusId':
          varSrls.serviceStatusId = o.value;
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
    //validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      props.fetchSrls({ ...param, page, size });
    }
    setTurnOnReactFetch(true);
  };

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
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
          <Form.Select
            fluid
            label="Компания"
            placeholder="Компания"
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Филиал"
            placeholder="Филиал"
            options={param.bukrs == '' ? [] : branchOptionsService[param.bukrs]}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория товара"
            placeholder="Категория товара"
            value={param.c}
            options={tovarCategoryOptions}
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Вид сервиса"
            placeholder="Вид сервиса"
            options={serviceTypeOptions}
            onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Статус сервиса"
            placeholder="Статус сервиса"
            options={serviceAppStatusOptions}
            onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата с</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
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

      <Divider />

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
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchServiceAppStatus,
  fetchSrls,
  fetchServiceTypeList,
})(injectIntl(Srls));

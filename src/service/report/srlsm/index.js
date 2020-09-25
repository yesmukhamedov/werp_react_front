import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  f4FetchCountryList,
  f4FetchServiceStatusList,
} from '../../../reference/f4/f4_action';
import {
  fetchSrlsm,
  fetchServiceTypeList,
  fetchAcceptPaymentUsers,
  fetchMasterList,
  fetchOperatorList,
} from './srlsmAction';
import { injectIntl } from 'react-intl';
import {
  Container,
  Segment,
  Form,
  Table,
  Input,
  Dropdown,
  Modal,
  Button,
} from 'semantic-ui-react';
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
import { LinkToSmcuspor, LinkToSmesManager } from '../../../utils/outlink';
import ReactTableServerSideWrapperFilteredState from '../../../utils/ReactTableServerSideWrapperFilteredState';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import TotalCountsTable from '../../../utils/TotalCountsTable';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import moment from 'moment';
require('moment/locale/ru');

const Srlsm = props => {
  const {
    intl: { messages },
    language,
    category = [],
    companyOptions = [],
    branchOptionsService,
    serviceStatusList = [],
    //serviceType = [],
    srlsmListData = {},
    srlsmListSum = {},
    premiumSum = [],
    serviceTypeList = [],
    srlsmTotalPages,
    countryList = [],
    acceptPaymentUsers = [],
    masterList = [],
    operatorList = [],
  } = props;

  const emptyParam = {
    countryId: null,
    bukrs: null,
    branchId: '',
    categoryId: null,
    serviceTypeId: null,
    serviceStatusId: '1,4',
    masterId: null,
    operatorId: null,
    acceptedPaymentById: null,
    dateAt: momentToStringYYYYMMDD(moment(new Date())),
    dateTo: null,
  };

  const [param, setParam] = useState({ ...emptyParam });

  const [error, setError] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

  const [modalDetails, setModalDetails] = useState(false);
  const [filtered, setFiltered] = useState([]);

  console.log('filtered', filtered);

  const masterOptions = masterList.map((item, index) => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  const operatorOptions = operatorList.map((item, index) => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  useEffect(() => {
    props.f4fetchCategory();
    props.f4FetchBranches();
    props.f4FetchServiceStatusList();
    props.fetchServiceTypeList();
    props.f4FetchCountryList();
  }, []);

  useEffect(() => {
    if (param.bukrs && param.branchId) {
      let params = {
        bukrs: param.bukrs,
        branchId: param.branchId,
        categoryId: param.categoryId,
      };
      let paramsAcceptPay = {
        bukrs: param.bukrs,
        branchId: param.branchId,
      };
      props.fetchAcceptPaymentUsers({ ...paramsAcceptPay });
      props.fetchMasterList({ ...params });
      props.fetchOperatorList({ ...params });
    }
  }, [param.bukrs, param.branchId, param.categoryId]);

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
    };
  });

  const tovarCategoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const serviceStatusListOptions = serviceStatusList
    .filter(
      item =>
        parseInt(item.id) == 1 ||
        parseInt(item.id) == 4 ||
        parseInt(item.id) == 6,
    )
    .map(item => {
      return {
        key: parseInt(item.id),
        text: item.name,
        value: parseInt(item.id),
      };
    });

  const serviceTypeOptions = serviceTypeList.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const acceptUsersOptions = acceptPaymentUsers.map((item, index) => {
    return {
      key: parseInt(item.userId) * index,
      text: item.username,
      value: item.userId,
    };
  });

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const varSrls = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSrls.countryId = o.value;
          break;
        case 'bukrs':
          varSrls.bukrs = o.value;
          varSrls.branchId = '';
          varSrls.categoryId = '';
          varSrls.serviceTypeId = '';
          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'acceptPayment':
          varSrls.acceptedPaymentById = o.value;

          break;
        case 'branchId':
          varSrls.branchId = o.value.length > 0 ? o.value.join() : null;
          varSrls.categoryId = '';
          varSrls.serviceTypeId = '';
          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'categoryId':
          varSrls.categoryId = o.value.length > 0 ? o.value.join() : null;
          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'serviceTypeId':
          varSrls.serviceTypeId = o.value.length > 0 ? o.value.join() : null;

          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'serviceStatusId':
          // varSrls.serviceStatusId = o.value;
          varSrls.serviceStatusId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'changeMaster':
          varSrls.masterId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'changeOperator':
          varSrls.operatorId = o.value.length > 0 ? o.value.join() : null;
          break;
        default:
          varSrls[fieldName] = o.value;
      }
      return varSrls;
    });
  };

  //Колонки ReactTable
  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      filterable: false,
      width: 70,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          Филиал
        </div>
      ),
      accessor: 'branchId',
      checked: true,
      filterable: false,
      width: 100,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          Дата сервиса
        </div>
      ),
      accessor: 'dateOpen',
      Cell: row => (
        <div className="flexCenter">
          {row.value ? moment(row.value).format('DD.MM.YYYY') : ''}
        </div>
      ),
      checked: true,
      filterable: false,
      width: 120,
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          CN
        </div>
      ),
      accessor: 'contractNumber',
      checked: true,
      width: 70,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          Заводской номер
        </div>
      ),
      accessor: 'tovarSn',
      checked: true,
      width: 120,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          ФИО клиента
        </div>
      ),
      accessor: 'customerFIO',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
      width: 200,
    },

    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          Статус сервиса
        </div>
      ),
      accessor: 'serviceStatusId',
      checked: true,
      filterable: false,
      width: 90,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Мастер',
      accessor: 'masterFIO',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 150,
    },
    {
      Header: 'Оператор',
      accessor: 'operatorFIO',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 150,
    },
    {
      Header: 'Вид сервиса',
      accessor: 'serviceTypeId',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Сумма',
      accessor: 'sumTotal',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          {moneyFormat(original.row.sumTotal)}
        </div>
      ),
      width: 90,
    },
    {
      Header: 'Оплачено',
      accessor: 'paid',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          {moneyFormat(original.row.paid)}
        </div>
      ),
      width: 90,
    },
    {
      Header: 'Остаток',
      accessor: 'residue',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          {moneyFormat(original.row.residue)}
        </div>
      ),
      width: 90,
    },
    {
      Header: 'Валюта',
      accessor: 'currencyId',
      checked: true,
      filterable: false,
      width: 70,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Гарантия',
      accessor: 'warrant',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Принял',
      accessor: 'acceptPaymentByName',
      checked: true,
      filterable: false,
      width: 90,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: `${messages['service']} №`,
      accessor: 'serviceNumber',
      show: true,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmesManager serviceNumber={row.value} />
        </div>
      ),

      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
      fixed: 'right',
      width: 100,
    },
    {
      Header: '',
      accessor: '16',
      filterable: false,
      Cell: original =>
        original.row.contractNumber ? (
          <div style={{ textAlign: 'center' }}>
            <LinkToSmcuspor
              contractNumber={original.row.contractNumber}
              text="Просмотр"
            />
          </div>
        ) : (
          ''
        ),
      checked: true,
      fixed: 'right',
      width: 50,
    },
  ];

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  const detailColumns = [
    {
      Header: 'Вид сервиса',
      accessor: 'serviceTypeName',

      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Премя мастера',
      accessor: 'masterPremium',

      Footer: info => {
        let total = info.data.reduce(
          (total, item) => total + item.masterPremium,
          0,
        );

        console.log('INFO', info);
        console.log('total', total);

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            Всего: {moneyFormat(total)}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
    {
      Header: 'Премя оператора',
      accessor: 'operatorPremium',
      Footer: info => {
        let total = info.data.reduce(
          (total, item) => total + item.operatorPremium,
          0,
        );

        console.log('INFO', info);
        console.log('total', total);

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            Всего: {moneyFormat(total)}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
    {
      Header: 'Скидка',
      accessor: 'discount',
      Footer: info => {
        let total = info.data.reduce((total, item) => total + item.discount, 0);

        console.log('INFO', info);
        console.log('total', total);

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            Всего: {moneyFormat(total)}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
    {
      Header: 'Количество',
      accessor: 'serviceCount',
      Footer: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          Всего: {srlsmListData.totalElements}
        </div>
      ),
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
      width: 90,
    },

    {
      Header: 'Общая сумма(со скидкой)',
      accessor: 'totalSumWithDiscount',
      Footer: info => {
        let total = info.data.reduce(
          (total, item) => total + item.totalSumWithDiscount,
          0,
        );

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            Всего: {moneyFormat(total)}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
  ];

  const handleClickApply = () => {
    const errors = [];
    setColumns([...initialColumns]);
    setFiltered([]);
    if (param.bukrs) {
      props.fetchSrlsm({
        ...param,
        serviceStatusId: param.serviceStatusId.toString(),
        page: 0,
        size: 20,
      });
    } else {
      errors.push(errorTableText(5));
    }
    //setTurnOnReactFetch(true);
    setError(errors);
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
        <h3>Список сервисов(Менеджер)</h3>
      </Segment>
      <Modal
        onClose={() => setModalDetails(false)}
        open={modalDetails}
        closeIcon
        size="large"
      >
        <Modal.Header>Детальный просмотр</Modal.Header>
        <Modal.Content>
          <ReactTableWrapper
            data={premiumSum}
            columns={detailColumns}
            pageSize={8}
            showPagination
          />
        </Modal.Content>
      </Modal>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Страна</label>
            <DropdownClearable
              fluid
              placeholder="Все"
              value={param.countryId}
              options={countryOptions}
              onChange={(e, o) => onInputChange(o, 'countryId')}
              className="alignBottom"
              handleClear={() => setParam({ ...param, countryId: '' })}
            />
          </Form.Field>

          <Form.Field required>
            <label>Компания</label>
            <DropdownClearable
              fluid
              placeholder="Все"
              value={param.bukrs}
              options={companyOptions}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              className="alignBottom"
              handleClear={() => setParam({ ...param, bukrs: '' })}
            />
          </Form.Field>
          <Form.Field>
            <label>Филиал</label>
            <Dropdown
              selection
              fluid
              placeholder="Все"
              options={
                param.bukrs == '' || param.bukrs == null
                  ? []
                  : branchOptionsService[param.bukrs]
              }
              onChange={(e, o) => onInputChange(o, 'branchId')}
              className="alignBottom"
              multiple
              value={
                param.branchId ? param.branchId.split(',').map(Number) : []
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Вид сервиса</label>
            <Form.Select
              fluid
              placeholder="Все"
              options={serviceTypeOptions}
              onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
              className="alignBottom"
              multiple
              value={
                param.serviceTypeId
                  ? param.serviceTypeId.split(',').map(Number)
                  : []
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Категория товара</label>
            <Form.Select
              fluid
              placeholder="Все"
              options={tovarCategoryOptions}
              onChange={(e, o) => onInputChange(o, 'categoryId')}
              className="alignBottom"
              multiple
              value={
                param.categoryId ? param.categoryId.split(',').map(Number) : []
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Статус сервиса</label>
            <Form.Select
              clearable="true"
              selection
              fluid
              multiple
              value={
                param.serviceStatusId
                  ? param.serviceStatusId.split(',').map(Number)
                  : []
              }
              options={serviceStatusListOptions}
              placeholder="Все"
              onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
            />
          </Form.Field>
          <Form.Field>
            <label>Принял автор</label>
            <DropdownClearable
              fluid
              placeholder="Все"
              value={param.acceptedPaymentById}
              options={acceptUsersOptions}
              onChange={(e, o) => onInputChange(o, 'acceptPayment')}
              className="alignBottom"
              handleClear={() =>
                setParam({ ...param, acceptedPaymentById: '' })
              }
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата с</label>
              <DatePicker
                placeholderText="Дата с"
                isClearable
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateAt === null
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

            <Form.Field className="marginRight">
              <label>Дата по</label>
              <DatePicker
                placeholderText="Дата по"
                isClearable
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateTo === null
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateTo)
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
            <Form.Field className="marginRight width25Rem">
              <label>Мастер</label>
              <Form.Select
                clearable="true"
                selection
                fluid
                multiple
                options={masterOptions}
                placeholder="Мастер"
                onChange={(e, o) => onInputChange(o, 'changeMaster')}
                value={
                  param.masterId ? param.masterId.split(',').map(Number) : []
                }
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
                onChange={(e, o) => onInputChange(o, 'changeOperator')}
                value={
                  param.operatorId
                    ? param.operatorId.split(',').map(Number)
                    : []
                }
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              Применить
            </Form.Button>
          </div>

          <Form.Field className="alignBottom">
            <Button onClick={() => setModalDetails(true)} color="orange">
              Подробно
            </Button>
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <OutputErrors errors={error} />

      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Общая сумма (со скидкой)</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.sumTotal
                    ? srlsmListSum.sumTotal - srlsmListSum.discount
                    : '',
                )}
              />
            </Table.Cell>
            <Table.Cell>Оплачено</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.paid === undefined || srlsmListSum.paid === null
                    ? ''
                    : srlsmListSum.paid,
                )}
              />
            </Table.Cell>
            <Table.Cell>Остаток</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.paymentDue === null ||
                    srlsmListSum.paymentDue === undefined
                    ? ''
                    : srlsmListSum.paymentDue,
                )}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Премия мастера</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.masterPremium === null ||
                    srlsmListSum.masterPremium === undefined
                    ? ''
                    : srlsmListSum.masterPremium,
                )}
              />
            </Table.Cell>
            <Table.Cell>Премия оператора</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.operatorPremium === null ||
                    srlsmListSum.operatorPremium === undefined
                    ? ''
                    : srlsmListSum.operatorPremium,
                )}
              />
            </Table.Cell>
            <Table.Cell>Скидка</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.discount ? srlsmListSum.discount : '',
                )}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <TotalCountsTable count={srlsmListData.totalElements} />

      <ReactTableServerSideWrapperFilteredState
        data={srlsmListData.data}
        columns={columns}
        filterable
        pageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchSrlsm({ ...param, ...params });
        }}
        pages={srlsmTotalPages ? srlsmTotalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
        filtered={filtered}
        onFilteredChange={filter => {
          setFiltered(filter);
          setTurnOnReactFetch(true);
        }}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    countryList: state.f4.countryList,
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    category: state.f4.category,
    branchOptionsService: state.userInfo.branchOptionsService,
    contractStatusList: state.f4.contractStatusList,
    serviceTypeList: state.srlsmReducer.serviceTypeList,
    srlsmListData: state.srlsmReducer.srlsmListData,
    srlsmListSum: state.srlsmReducer.srlsmListSum,
    premiumSum: state.srlsmReducer.premiumSum,
    masterList: state.srlsmReducer.masterList,
    operatorList: state.srlsmReducer.operatorList,
    srlsmTotalPages: state.srlsmReducer.srlsmTotalPages,
    acceptPaymentUsers: state.srlsmReducer.acceptPaymentUsers,
    serviceStatusList: state.f4.serviceStatusList,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  fetchSrlsm,
  fetchServiceTypeList,
  f4FetchCountryList,
  f4FetchServiceStatusList,
  fetchAcceptPaymentUsers,
  fetchMasterList,
  fetchOperatorList,
})(injectIntl(Srlsm));

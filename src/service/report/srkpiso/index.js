import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Segment,
  Form,
  Icon,
  Divider,
  Dropdown,
  Modal,
  Button,
  Popup,
} from 'semantic-ui-react';
import {
  f4FetchCountryList,
  f4FetchConTypeList,
  f4fetchCategory,
} from '../../../reference/f4/f4_action';
import {
  fetchSrkpiso,
  fetchSrkpisoDetal,
  clearSrkpisoDetal,
  clearSrkpiso,
} from './srkpisoAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import ModalColumns from './../../../utils/ModalColumns';
import '../../service.css';

import DropdownClearable from '../../../utils/DropdownClearable';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import { Link } from 'react-router-dom';
import moment from 'moment';
require('moment/locale/ru');

const Srkpiso = props => {
  const {
    intl: { messages },
    language,
    companyOptions = [],
    countryList = [],
    productList = [],
    branchOptionsService,
    srkpisoData = [],
    srkpisoDetal = [],
    category = [],
  } = props;

  const emptyParam = {
    countryId: null,
    bukrs: null,
    branchId: null,
    categoryId: null,
    product: null,
    dateAt: null,
    dateTo: null,
  };
  const [param, setParam] = useState({ ...emptyParam });
  const [modalDetalOpen, setModalDetalOpen] = useState(false);
  const [loaderTableDetal, setLoaderTableDetal] = useState(false);

  // let emptyParamDetal = {
  //   branchId: null,
  //   bukrs: null,
  //   categoryId: null,
  //   configurationId: null,
  //   countryId: null,
  //   operatorId: null,
  //   productId: null,
  //   dateAt: param.dateAt,
  //   dateTo: param.dateTo,
  // };

  const [detalParam, setDetalParam] = useState({});

  useEffect(() => {
    if (Object.keys(detalParam).length > 0) {
      setLoaderTableDetal(true);
      props.fetchSrkpisoDetal(
        { ...detalParam, dateAt: param.dateAt, dateTo: param.dateTo },
        () => setLoaderTableDetal(false),
      );
    }
  }, [detalParam]);

  const toDetalization = (original, confId, param) => {
    props.clearSrkpisoDetal();
    setModalDetalOpen(true);
    console.log('original', original, 'confId', confId);
    setDetalParam({
      ...detalParam,
      branchId: original.branchId,
      bukrs: original.bukrs,
      categoryId: original.categoryId,
      configurationId: confId,
      countryId: original.countryId,
      operatorId: original.operatorId,
      productId: original.productId,
    });
  };

  const initialColumns = [
    {
      Header: '#',
      accessor: 'recommenderId',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 80,
    },
    {
      Header: () => <div className="text-wrap">{messages['brnch']}</div>,
      accessor: 'branchName',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: () => <div className="text-wrap">Оператор</div>,
      accessor: 'operatorName',
      filterable: false,
      checked: true,
      width: 250,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: () => <div className="text-wrap">Текущий</div>,
      headerStyle: { background: 'teal', color: '#fff' },
      columns: [
        {
          Header: () => <div className="text-wrap">Текущий план</div>,
          accessor: 'currentPlanSum',
          filterable: false,
          checked: true,

          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 1);
                    }}
                  />
                }
              />
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Текущий перенос</div>,
          accessor: 'currentRescheduledPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 2);
                    }}
                  />
                }
              />
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Текущий отмена</div>,
          accessor: 'currentCanceledPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 3);
                    }}
                  />
                }
              />
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Текущий выполнен</div>,
          accessor: 'currentCompletedPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 4);
                    }}
                  />
                }
              />
            </div>
          ),
        },
      ],
    },
    {
      Header: () => <div className="text-wrap">Просроченный</div>,
      headerStyle: {
        background: 'red',
        color: '#fff',
        height: '2rem',
      },
      columns: [
        {
          Header: () => <div className="text-wrap">Просроченный план</div>,
          accessor: 'overDueSum',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 5);
                    }}
                  />
                }
              />
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Просроченный перенос</div>,
          accessor: 'overDueRescheduledPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 6);
                    }}
                  />
                }
              />
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Просроченный отмена</div>,
          accessor: 'overDueCanceledPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 7);
                    }}
                  />
                }
              />
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Просроченный выполнен</div>,
          accessor: 'overDueCompletedPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>
              <Popup
                content="Детализация"
                trigger={
                  <Button
                    circular
                    color="green"
                    icon="search"
                    size="mini"
                    onClick={() => {
                      toDetalization(row.original, 8);
                    }}
                  />
                }
              />
            </div>
          ),
        },
      ],
    },

    {
      Header: () => <div className="text-wrap">KPI по %</div>,
      columns: [
        {
          Header: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              Просроченная сумма
            </div>
          ),
          headerStyle: {
            background: 'red',
            color: '#fff',
          },
          accessor: 'overDuePlanPercent',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          filterable: false,
          checked: true,
        },
        {
          Header: () => <div className="text-wrap">Текущая сумма</div>,
          headerStyle: { background: 'teal', color: '#fff' },
          accessor: 'currentPlanPercent',
          Cell: row => <div className="text-wrap">{row.value}</div>,
          filterable: false,
          checked: true,
        },
      ],
    },
  ];

  useEffect(() => {
    props.f4FetchCountryList();
    props.f4FetchConTypeList();
    props.f4fetchCategory();
  }, []);

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

  const productListOptions =
    param.bukrs === ''
      ? productList.map(item => {
          return {
            key: item.contract_type_id,
            text: item.name,
            value: item.contract_type_id,
          };
        })
      : productList
          .filter(item => item.bukrs === param.bukrs)
          .map(item => {
            return {
              key: item.contract_type_id,
              text: item.name,
              value: item.contract_type_id,
            };
          });

  const onInputChange = (value, fieldName) => {
    switch (fieldName) {
      case 'countryId':
        setParam({ ...param, countryId: value });
        break;
      case 'bukrs':
        setParam({ ...param, bukrs: value, branchId: null });
        break;
      case 'branchId':
        setParam({
          ...param,
          branchId: value.length > 0 ? value.join() : null,
        });
        break;
      case 'categoryId':
        setParam({
          ...param,
          categoryId: value,
        });
        break;
      case 'product':
        setParam({
          ...param,
          product: value.length > 0 ? value.join() : null,
        });
        break;
    }
  };

  const handleClickApply = () => {
    if (param.bukrs && param.categoryId) {
      props.clearSrkpiso();
      props.clearSrkpisoDetal();
      props.fetchSrkpiso({ ...param });
    } else {
      alert('Выберите все обязательные поля');
    }
  };

  const [columns, setColumns] = useState([...initialColumns]);

  const detalColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 55,
    },
    {
      Header: messages['brnch'],
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
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 60,
    },
    {
      Header: messages['factory_number'],
      headerStyle: { whiteSpace: 'pre-wrap' },
      accessor: 'tovarSn',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
    },
    {
      Header: messages['Crm.DateOfSale'],
      headerStyle: { whiteSpace: 'pre-wrap' },
      accessor: 'contractDate',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD.MM.YYYY') : ''}
        </div>
      ),
      filterable: false,
      width: 100,
    },
    {
      Header: messages['fio'],
      headerStyle: { whiteSpace: 'pre-wrap' },
      accessor: 'customerFIO',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
    },
    {
      Header: messages['address'],
      headerStyle: { whiteSpace: 'pre-wrap' },
      accessor: 'address',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),

      filterable: false,
    },
    {
      Header: messages['Dealer.Fullname'],
      headerStyle: { whiteSpace: 'pre-wrap' },
      accessor: 'dealerFIO',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),

      filterable: false,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 40,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 40,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 40,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 40,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 40,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryName',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
    },
    {
      Header: messages['fin_status'],
      accessor: 'contractStatusName',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
    },
    {
      Header: messages['plan_status'],
      accessor: 'planStatusName',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
    },
    {
      accessor: '16',
      filterable: false,

      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Popup
              content="История клиента"
              trigger={
                <Link to={url} target="_blank">
                  <Icon circular name="history" color="teal" />
                </Link>
              }
            />
          </div>
        );
      },
      checked: true,
      width: 50,
      fixed: 'right',
    },
  ];

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
      <Segment className="spaceBetween">
        <h3>KPI Сервис операторов</h3>
      </Segment>

      <Modal
        closeIcon
        onClose={() => setModalDetalOpen(false)}
        open={modalDetalOpen}
        size="fullscreen"
      >
        <Modal.Header>KPI сервис операторов(Детализация) </Modal.Header>
        <Modal.Content>
          <ReactTableWrapper
            data={srkpisoDetal ? srkpisoDetal : []}
            loading={loaderTableDetal}
            filterable={true}
            defaultPageSize={10}
            showPagination={true}
            columns={detalColumns}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={() => setModalDetalOpen(false)}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Страна</label>
            <DropdownClearable
              placeholder="Все"
              options={countryOptions}
              value={param.countryId ? param.countryId : ''}
              onChange={(e, { value }) => onInputChange(value, 'countryId')}
              handleClear={() => setParam({ ...param, countryId: null })}
            />
          </Form.Field>
          <Form.Field required>
            <label>Компания</label>
            <DropdownClearable
              placeholder="Все"
              options={companyOptions}
              value={param.bukrs ? param.bukrs : ''}
              onChange={(e, { value }) => onInputChange(value, 'bukrs')}
              handleClear={() => setParam({ ...param, bukrs: null })}
            />
          </Form.Field>

          <Form.Field>
            <label>Филиал</label>
            <Dropdown
              fluid
              selection
              label="Филиал"
              placeholder="Все"
              clearable="true"
              multiple
              options={
                param.bukrs == '' || param.bukrs == null
                  ? []
                  : branchOptionsService[param.bukrs]
              }
              onChange={(e, { value }) => onInputChange(value, 'branchId')}
              className="alignBottom"
              value={
                param.branchId ? param.branchId.split(',').map(Number) : []
              }
            />
          </Form.Field>

          <Form.Field required>
            <label>Категория товара</label>
            <DropdownClearable
              placeholder="Все"
              options={tovarCategoryOptions}
              value={param.categoryId ? param.categoryId : ''}
              onChange={(e, { value }) => onInputChange(value, 'categoryId')}
              handleClear={() => setParam({ ...param, categoryId: null })}
            />
          </Form.Field>

          <Form.Field>
            <label>Продукт</label>
            <Dropdown
              fluid
              selection
              placeholder="Все"
              clearable="true"
              multiple
              options={productListOptions}
              onChange={(e, { value }) => onInputChange(value, 'product')}
              className="alignBottom"
              value={param.product ? param.product.split(',').map(Number) : []}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата с</label>
              <DatePicker
                placeholderText="Дата c"
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
      <ReactTableWrapper
        data={srkpisoData}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        pageSize={20}
        showPagination={true}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    category: state.f4.category,
    productList: state.f4.contractTypeList,
    srkpisoData: state.srkpisoReducer.srkpisoData,
    srkpisoDetal: state.srkpisoReducer.srkpisoDetal,
    branchOptionsService: state.userInfo.branchOptionsService,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchConTypeList,
  f4fetchCategory,
  fetchSrkpiso,
  fetchSrkpisoDetal,
  clearSrkpisoDetal,
  clearSrkpiso,
})(injectIntl(Srkpiso));

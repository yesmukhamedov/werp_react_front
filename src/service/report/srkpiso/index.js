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
} from 'semantic-ui-react';
import {
  f4FetchBranches,
  f4FetchCountryList,
  f4FetchConTypeList,
} from '../../../reference/f4/f4_action';
import { fetchSrkpiso } from './srkpisoAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import matchSorter from 'match-sorter';
import ModalColumns from './../../../utils/ModalColumns';
import '../../service.css';

import DropdownClearable from '../../../utils/DropdownClearable';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';

const Srkpiso = props => {
  const {
    intl: { messages },
    language,
    companyOptions = [],
    countryList = [],
    branches = [],
    productList = [],
    branchOptionsService,
    srkpisoData = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    product: '',
    dateAt: '',
    dateTo: '',
  };
  const [param, setParam] = useState({ ...emptyParam });

  const [modalDetalOpen, setModalDetalOpen] = useState(false);

  const toDetalization = original => {
    console.log('row original', original);
    setModalDetalOpen(true);
    // window.location = `srkpisod?serviceNumber=${original}`;
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
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderBranchName'] }),
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
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderName'] }),
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
          accessor: 'currentPlanPercent',
          filterable: false,
          checked: true,
          Cell: row => (
            <div
              className="flexJustifySpaceBeetween"
              style={{ textAlign: 'center' }}
            >
              <p>{row.value}</p>

              <Icon
                color="teal"
                name="search"
                onClick={() => {
                  toDetalization(row.original);
                }}
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
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Текущий отмена</div>,
          accessor: 'currentCanceledPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Текущий выполнен</div>,
          accessor: 'currentCompletedPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
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
          accessor: 'overDuePlanPercent',
          filterable: false,
          checked: true,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Просроченный перенос</div>,
          accessor: 'overDueRescheduledPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Просроченный отмена</div>,
          accessor: 'overDueCanceledPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
        },
        {
          Header: () => <div className="text-wrap">Просроченный выполнен</div>,
          accessor: 'overDueCompletedPlan',
          filterable: false,
          checked: true,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
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
          accessor: 'overDueSum',
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
          accessor: 'currentPlanSum',
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
  }, []);

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
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
        setParam({ ...param, bukrs: value, branchId: '' });
        break;
      case 'branchId':
        setParam({
          ...param,
          branchId: value.length > 0 ? value.join() : null,
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
    props.fetchSrkpiso({ ...param });
  };

  const [columns, setColumns] = useState([...initialColumns]);
  const detalColumns = [
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
      Header: () => <div className="text-wrap"> {messages['brnch']}</div>,
      accessor: 'branchName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderBranchName'] }),
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: () => <div className="text-wrap">CN</div>,
      accessor: 'contractNumber',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: () => <div className="text-wrap">Заводской номер</div>,
      accessor: 'tovarSn',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Дата',
      accessor: 'date',
      checked: true,
      filterable: false,
      width: 250,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Адрес',
      accessor: 'currentPlanPercent',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Телефон',
      accessor: 'currentRescheduledPlan',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: () => <div className="text-wrap">ФИО мастер</div>,
      accessor: 'currentCanceledPlan',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'F1',
      accessor: 'f1',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 70,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 70,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 70,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 70,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 70,
    },
    {
      Header: 'Категория',
      accessor: 'overDuePlanPercent',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Заявка',
      accessor: 'overDueRescheduledPlan',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Просмотр',
      accessor: 'overDueCanceledPlan',
      filterable: false,
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
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
      <Segment>
        <h3>KPI Сервис операторов</h3>
      </Segment>

      <Modal
        onClose={() => setModalDetalOpen(false)}
        open={modalDetalOpen}
        size="fullscreen"
      >
        <Modal.Header>KPI сервис операторов(Детализация) </Modal.Header>
        <Modal.Content>
          <ReactTableWrapper
            filterable={true}
            defaultPageSize={5}
            pageSize={5}
            showPagination={true}
            columns={detalColumns}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalDetalOpen(false)}>Ок</Button>
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
              handleClear={() => setParam({ ...param, countryId: '' })}
            />
          </Form.Field>
          <Form.Field>
            <label>Компания</label>
            <DropdownClearable
              placeholder="Все"
              options={companyOptions}
              value={param.bukrs ? param.bukrs : ''}
              onChange={(e, { value }) => onInputChange(value, 'bukrs')}
              handleClear={() => setParam({ ...param, bukrs: '' })}
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
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата с</label>
              <DatePicker
                placeholderText="Дата"
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
    productList: state.f4.contractTypeList,
    srkpisoData: state.srkpisoReducer.srkpisoData,
    branchOptionsService: state.userInfo.branchOptionsService,
  };
}

export default connect(mapStateToProps, {
  f4FetchBranches,
  f4FetchCountryList,
  f4FetchConTypeList,
  fetchSrkpiso,
})(injectIntl(Srkpiso));

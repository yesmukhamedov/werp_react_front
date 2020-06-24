import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  f4FetchCountryList,
} from '../../../reference/f4/f4_action';
import { fetchSrlsm, fetchServiceTypeList } from './srlsmAction';
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
  moneyFormat,
} from '../../../utils/helpers';
import '../../service.css';
import { LinkToSmcuspor, LinkToSmvs } from '../../../utils/outlink';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import TotalCountsTable from '../../../utils/TotalCountsTable';
import moment from 'moment';
import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { formatDMY, errorTableText } from '../../../utils/helpers';

const Srlsm = props => {
  const {
    intl: { messages },
    language,
    category = [],
    companyOptions = [],
    branchOptionsService,
    serviceAppStatus = [],
    serviceType = [],
    srlsmListData = {},
    srlsmListSum = {},
    serviceTypeList = [],
    srlsmTotalPages,
    countryList = [],
  } = props;

  const emptyParam = {
    countryId: null,
    bukrs: null,
    branchId: null,
    categoryId: null,
    serviceTypeId: null,
    serviceStatusId: null,
    dateOpenAt: null,
    dateOpenTo: null,
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [error, setError] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  console.log('PARAM', param);
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    props.f4FetchServiceAppStatus();
    props.f4fetchCategory();
    props.f4FetchBranches();
    props.f4FetchServiceAppStatus();
    props.fetchServiceTypeList();
    props.f4FetchCountryList();
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
        case 'countryId':
          varSrls.countryId = o.value;
          break;
        case 'bukrs':
          varSrls.bukrs = o.value;
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
      Header: 'Id',
      accessor: 'id',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Филиал',
      accessor: 'branchId',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата сервиса',
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
      Cell: original => (
        <div style={{ textAlign: 'right' }}>
          {moneyFormat(original.row.sumTotal)}
        </div>
      ),
    },
    {
      Header: 'Оплачено',
      accessor: 'paid',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'right' }}>
          {moneyFormat(original.row.paid)}
        </div>
      ),
    },
    {
      Header: 'Остаток',
      accessor: 'residue',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'right' }}>
          {moneyFormat(original.row.residue)}
        </div>
      ),
    },
    {
      Header: 'Валюта',
      accessor: 'currencyId',
      checked: true,
      filterable: false,
      width: 70,
    },
    {
      Header: 'Принял',
      accessor: 'prinyal',
      checked: true,
      filterable: false,
    },

    {
      Header: `${messages['service']} №`,

      accessor: 'id',
      show: true,
      filterable: false,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmvs serviceNumber={row.value} />
        </div>
      ),
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

  const handleClickApply = () => {
    const errors = [];
    if (param.bukrs != null) {
      const page = 0;
      const size = 20;
      props.fetchSrlsm({ ...param, page, size });
    } else {
      errors.push(errorTableText(5));
    }
    setTurnOnReactFetch(true);
    setError(errors);
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
        <h3>Список сервисов(Менеджер)</h3>
      </Segment>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Страна</label>
            <DropdownClearable
              fluid
              placeholder="Страна"
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
              placeholder="Компания"
              value={param.bukrs}
              options={companyOptions}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              className="alignBottom"
              handleClear={() => setParam({ ...param, bukrs: '' })}
            />
          </Form.Field>
          <Form.Field>
            <label>Филиал</label>
            <Form.Select
              fluid
              placeholder="Филиал"
              options={
                param.bukrs == '' || param.bukrs == null
                  ? []
                  : branchOptionsService[param.bukrs]
              }
              onChange={(e, o) => onInputChange(o, 'branchId')}
              className="alignBottom"
              multiple
            />
          </Form.Field>

          <Form.Field>
            <label>Вид сервиса</label>
            <Form.Select
              fluid
              placeholder="Вид сервиса"
              options={serviceTypeOptions}
              onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
              className="alignBottom"
              multiple
            />
          </Form.Field>

          <Form.Field>
            <label>Категория товара</label>
            <Form.Select
              fluid
              placeholder="Категория товара"
              options={tovarCategoryOptions}
              onChange={(e, o) => onInputChange(o, 'categoryId')}
              className="alignBottom"
              multiple
            />
          </Form.Field>
          <Form.Field>
            <label>Статус сервиса</label>
            <Form.Select
              fluid
              placeholder="Статус сервиса"
              options={serviceAppStatusOptions}
              onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
              className="alignBottom"
              multiple
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата заявки с</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateOpenAt === null
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenAt: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>

            <Form.Field className="marginRight">
              <label>Дата заявки по</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateOpenTo === null
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenTo)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenTo: momentToStringYYYYMMDD(date),
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

      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Общая сумма</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.sumTotal === undefined ||
                    srlsmListSum.sumTotal === null
                    ? ''
                    : srlsmListSum.sumTotal,
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
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <TotalCountsTable count={srlsmListData.totalElements} />
      <ReactTableServerSideWrapper
        data={srlsmListData.data}
        columns={columns}
        filterable={true}
        pageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchSrlsm({ ...params, ...param });
        }}
        pages={srlsmTotalPages ? srlsmTotalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
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
    serviceAppStatus: state.f4.serviceAppStatus,
    contractStatusList: state.f4.contractStatusList,
    serviceTypeList: state.srlsmReducer.serviceTypeList,
    srlsmListData: state.srlsmReducer.srlsmListData,
    srlsmListSum: state.srlsmReducer.srlsmListSum,
    srlsmTotalPages: state.srlsmReducer.srlsmTotalPages,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  fetchSrlsm,
  fetchServiceTypeList,
  f4FetchCountryList,
})(injectIntl(Srlsm));

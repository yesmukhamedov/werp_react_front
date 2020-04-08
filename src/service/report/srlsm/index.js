import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  f4FetchServicType,
} from '../../../reference/f4/f4_action';
import { fetchSrlsm } from './srlsmAction';
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
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';

const Srlsm = props => {
  const {
    intl: { messages },
    language,
    category = [],
    companyOptions = [],
    branches = [],
    serviceAppStatus = [],
    serviceType = [],
    srlsmList = [],
  } = props;

  console.log('SRLSM', srlsmList, 'LANGUAGE', language);

  const emptyParam = {
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceTypeId: '',
    serviceStatusId: '',
    dateOpenAt: '',
    dateOpenTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });

  useEffect(() => {
    props.f4FetchServiceAppStatus();
    props.f4fetchCategory();
    props.f4FetchBranches();
    props.f4FetchServiceAppStatus();
    props.f4FetchServicType();
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

  const serviceTypeOptions = serviceType.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });
  const [serBranchOptions, setSerBranchOptions] = useState([]);
  useEffect(() => {
    const getBranchByBukrs = (branches, bukrs) => {
      let br = branches.filter(item => item.bukrs == bukrs);

      let brSer = br.filter(
        item =>
          item.business_area_id == 5 ||
          item.business_area_id == 6 ||
          item.business_area_id == 9,
      );

      let serBranchOpt = brSer.map(item => {
        return {
          key: item.branch_id,
          text: item.text45,
          value: item.branch_id,
        };
      });
      return serBranchOpt;
    };

    setSerBranchOptions(getBranchByBukrs(branches, param.bukrs));
  }, [param.bukrs]);
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
      accessor: 'customerId',
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
      accessor: 'masterId',
      checked: true,
    },
    {
      Header: 'Оператор',
      accessor: 'operatorId',
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
      accessor: '',
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
    },
  ];

  const handleClickApply = () => {
    props.fetchSrlsm({ ...param });
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
            options={serBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория товара"
            placeholder="Категория товара"
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
              <label>Дата заявки с</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.dateOpenAt)}
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenAt: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={new Date()}
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
                selected={stringYYYYMMDDToMoment(param.dateOpenTo)}
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenTo: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={new Date()}
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
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Общая сумма</Table.Cell>
            <Table.Cell>
              <Input readOnly value="0" />
            </Table.Cell>
            <Table.Cell>Оплачено</Table.Cell>
            <Table.Cell>
              <Input readOnly value="0" />
            </Table.Cell>
            <Table.Cell>Остаток</Table.Cell>
            <Table.Cell>
              <Input readOnly value="0" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Премия мастера</Table.Cell>
            <Table.Cell>
              <Input readOnly value="0" />
            </Table.Cell>
            <Table.Cell>Премия оператора</Table.Cell>
            <Table.Cell>
              <Input readOnly value="0" />
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider />
      <ReactTableServerSideWrapper filterable={true} columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    category: state.f4.category,
    branches: state.f4.branches,
    serviceAppStatus: state.f4.serviceAppStatus,
    contractStatusList: state.f4.contractStatusList,
    serviceType: state.f4.serviceType,
    srlsmList: state.srlsmReducer.srlsmList,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  f4FetchServicType,
  fetchSrlsm,
})(injectIntl(Srlsm));

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { fetchSrls } from './srlsAction';
import { injectIntl } from 'react-intl';
import { Icon, Container, Segment, Form, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import ModalColumns from './../../../utils/ModalColumns';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import '../../service.css';
import { LinkToSmcuspor } from '../../../utils/outlink';

const Srls = props => {
  const {
    intl: { messages },
    language,
    companyOptions = [],
    srlsList = [],
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceTypeId: '',
    dateStart: '',
    dateEnd: '',
  };

  const [param, setParam] = useState({ ...emptyParam });

  //Статус сервиса
  const serviceStatusOptions = [
    { key: '1', text: 'Выполнено', value: '1' },
    { key: '2', text: 'Отмена', value: '2' },
  ];

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
        case 'productCategory':
          varSrls.productCategory = o.value;
          break;
        case 'typeOfService':
          varSrls.typeOfService = o.value;
          break;
        case 'statusService':
          varSrls.statusService = o.value;
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
      accessor: 'dateOpen',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractId',
      checked: true,
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: 'ФИО клиента',
      accessor: '',
      checked: true,
    },

    {
      Header: 'Статус сервиса',
      accessor: 'servStatus',
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
      accessor: 'operId',
      checked: true,
    },
    {
      Header: 'Вид сервиса',
      accessor: '',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Сумма',
      accessor: 'summTotal',
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
      accessor: '',
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
    props.fetchSrls({ ...param });
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
        <h3>Список сервисов</h3>
      </Segment>
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Страна"
            placeholder="Страна"
            onChange={(e, o) => onInputChange(o, 'country')}
            className="alignBottom"
          />

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
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория"
            placeholder="Категория"
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Статус заявки"
            placeholder="Статус заявки"
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
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
                selected={stringYYYYMMDDToMoment(param.dateStart)}
                onChange={date =>
                  setParam({
                    ...param,
                    dateStart: momentToStringYYYYMMDD(date),
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
                selected={stringYYYYMMDDToMoment(param.dateEnd)}
                onChange={date =>
                  setParam({
                    ...param,
                    dateEnd: momentToStringYYYYMMDD(date),
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
      <ReactTableWrapper filterable={true} columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    srlsList: state.srlsReducer.srlsList,
  };
}

export default connect(mapStateToProps, {
  f4FetchWerksBranchList,
  fetchSrls,
})(injectIntl(Srls));

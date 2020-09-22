import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchSmsetplpById,
  fetchSmsetplpList,
  postSmsetplpForm,
  updateSmsetplp,
} from './smsetplpAction';
import { injectIntl } from 'react-intl';
import { Container, Segment, Form, Dropdown } from 'semantic-ui-react';
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
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import TotalCountsTable from '../../../utils/TotalCountsTable';
import debounce from 'lodash/debounce';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import moment from 'moment';
import { Header } from 'semantic-ui-react';
require('moment/locale/ru');

const Smsetplp = props => {
  const {
    intl: { messages },
    language,
    countryList = [],
    companyOptions = [],
    branchOptionsService,
    smsetplpList = [],
  } = props;

  const initialState = {
    countryId: '',
    bukrs: '',
    branchId: '',
    dateAt: '',
  };

  const [param, setParam] = useState({
    ...initialState,
  });

  const [formStatus, setFormStatus] = useState(true);

  console.log('formStatus', formStatus);

  useEffect(() => {
    props.f4FetchCountryList();
  }, []);

  useEffect(() => {
    if (smsetplpList) {
      if (smsetplpList.length > 0) {
        setFormStatus(true);
      } else {
        setFormStatus(false);
      }
    }
  }, [smsetplpList]);

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
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
          branchId: value.length > 0 ? value.join() : '',
        });
        break;

      default:
        alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
    }
  };

  //Колоны ReactTable
  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      headerStyle: { whiteSpace: 'pre-wrap', border: '2px solid #e48b44' },
    },
    {
      Header: 'Компания',
      accessor: 'bukrsName',
      headerStyle: { whiteSpace: 'pre-wrap', border: '2px solid #e48b44' },
    },
    {
      Header: 'Филиал',
      accessor: 'branchName',
      headerStyle: { whiteSpace: 'pre-wrap', border: '2px solid #e48b44' },
    },

    {
      Header: 'Замена картриджей(Система по очистке воды)',
      headerStyle: {
        whiteSpace: 'pre-wrap',
        background: '#72e89c',
        border: '2px solid #e48b44',
      },
      columns: [
        {
          Header: 'Текущий план база по количеству',
          accessor: 'filterCurrentDatabasePlanCount',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Текущий план база',
          accessor: 'filterCurrentDatabasePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Текущий план',
          accessor: 'filterCurrentPlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Просроченный план по количеству',
          accessor: 'filterOverDueDatabasePlanCount',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Просроченный план база',
          accessor: 'filterOverDueDatabasePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Просроченный план',
          accessor: 'filterOverDuePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Общий план',
          accessor: 'filterTotalPlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterDonePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
      ],
    },
    {
      Header: 'Сервис пакет(Система по очистке воды)',
      headerStyle: {
        whiteSpace: 'pre-wrap',
        background: '#72e89c',
        border: '2px solid #e48b44',
      },
      columns: [
        {
          Header: 'План',
          accessor: 'filterServicePacketPlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Выполненный план',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
          accessor: 'filterServicePacketDonePlanSum',
        },
      ],
    },
    {
      Header: 'Продажа запчастей(Система по очистке воды)',
      headerStyle: {
        whiteSpace: 'pre-wrap',
        background: '#72e89c',
        border: '2px solid #e48b44',
      },
      columns: [
        {
          Header: 'План',
          accessor: 'filterPartsPlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterPartsDonePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(114, 232, 156)',
            border: '2px solid #e48b44',
          },
        },
      ],
    },

    {
      Header: 'Сервис пакет(Уборочная система)',
      headerStyle: {
        whiteSpace: 'pre-wrap',
        background: 'rgb(54 137 239)',
        background: 'rgb(54 137 239)',
        border: '2px solid #e48b44',
      },
      columns: [
        {
          Header: 'Текущий план база по количеству',
          accessor: 'filterVCServicePacketCurrentDatabasePlanCount',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Текущий план база',
          accessor: 'filterVCServicePacketCurrentDatabasePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Просроченный план база по количеству',
          accessor: 'filterVCServicePacketOverDueDatabasePlanCount',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Просроченный план база',
          accessor: 'filterVCServicePacketOverDueDatabasePlanSum;',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'План',
          accessor: 'filterVCServicePacketPlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterVCServicePacketDonePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
      ],
    },
    {
      Header: 'Продажа запчастей(Уборочная система)',
      headerStyle: {
        whiteSpace: 'pre-wrap',
        background: 'rgb(54 137 239)',
        background: 'rgb(54 137 239)',
        border: '2px solid #e48b44',
      },
      columns: [
        {
          Header: 'План',
          accessor: 'filterVCPartsPlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterVCPartsDonePlanSum',
          headerStyle: {
            whiteSpace: 'pre-wrap',
            background: 'rgb(54 137 239)',
            border: '2px solid #e48b44',
          },
        },
      ],
    },
    {
      Header: '',
      columns: [
        {
          Header: 'Общая сумма плана',
          accessor: 'totalPlanSum',
          headerStyle: { whiteSpace: 'pre-wrap', border: '2px solid #e48b44' },
          Footer: 'Общий:',
        },
        {
          Header: 'Выполненный план',
          accessor: 'totalDonePlanSum',
          headerStyle: { whiteSpace: 'pre-wrap', border: '2px solid #e48b44' },
        },
        {
          Header: '%',
          accessor: 'donePlanPercent',
          headerStyle: { whiteSpace: 'pre-wrap', border: '2px solid #e48b44' },
        },
        {
          Header: 'Действие',
          headerStyle: { whiteSpace: 'pre-wrap', border: '2px solid #e48b44' },
        },
      ],
    },
  ];

  //Применить
  const handleClickApply = () => {
    console.log('Применить');
    if (param.bukrs) {
      props.fetchSmsetplpList({ ...param });
    } else {
      alert('ВЫБЕРИТЕ КОМПАНИЮ');
    }
  };

  //Формировать
  const handleClickForm = () => {
    if (param.dateAt) {
      props.postSmsetplpForm(param.dateAt);
    } else {
      alert('ВЫБЕРИТЕ ДАТУ ФОРМИРОВАНИЯ');
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
        <h3>Настройка планов и процентов</h3>
      </Segment>

      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Страна</label>
            <DropdownClearable
              fluid
              placeholder="Все"
              value={param.countryId}
              options={countryOptions}
              onChange={(e, { value }) => onInputChange(value, 'countryId')}
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
              onChange={(e, { value }) => onInputChange(value, 'bukrs')}
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
              onChange={(e, { value }) => onInputChange(value, 'branchId')}
              className="alignBottom"
              multiple
              value={
                param.branchId ? param.branchId.split(',').map(Number) : []
              }
            />
          </Form.Field>

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
          <Form.Button
            onClick={handleClickApply}
            color="blue"
            className="alignBottom"
          >
            Применить
          </Form.Button>
          <Form.Button
            disabled={formStatus}
            onClick={handleClickForm}
            color="green"
            className="alignBottom"
          >
            Сформировать
          </Form.Button>
        </Form.Group>
      </Form>
      <OutputErrors
      //errors={error}
      />

      <TotalCountsTable
      //count={srlsmListData.totalElements}
      />
      <ReactTableWrapper
        data={smsetplpList ? smsetplpList : []}
        columns={initialColumns}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    countryList: state.f4.countryList,
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    smsetplpList: state.smsetplpReducer.smsetplpList,
  };
}

export default connect(mapStateToProps, {
  fetchSmsetplpById,
  fetchSmsetplpList,
  postSmsetplpForm,
  updateSmsetplp,
  f4FetchCountryList,
})(injectIntl(Smsetplp));

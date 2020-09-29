import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchSmsetplpById,
  fetchSmsetplpList,
  clearSmsetplpList,
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

import TotalCountsTable from '../../../utils/TotalCountsTable';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';

import Table from './Table';
import { Divider } from 'semantic-ui-react';
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

  const [stateSmsetplpList, setStateSmsetplpList] = useState([]);

  console.log('stateSmsetplpList', stateSmsetplpList);

  useEffect(() => {
    if (smsetplpList.length !== 0) {
      setStateSmsetplpList(
        smsetplpList.map(item => {
          return {
            ...item,
            editStatus: true,
          };
        }),
      );
    }
  }, [smsetplpList]);

  const [formStatus, setFormStatus] = useState(true);

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

  //Применить
  const handleClickApply = () => {
    if (param.bukrs) {
      props.fetchSmsetplpList({ ...param }, () => {
        props.clearSmsetplpList();
        setStateSmsetplpList([]);
      });
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

  const onChangeTable = (fieldName, original, value) => {
    switch (fieldName) {
      case 'editRowTable':
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id ? { ...item, editStatus: false } : item,
          ),
        );

        break;
      case 'saveRowTable':
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id ? { ...item, editStatus: true } : item,
          ),
        );

        props.updateSmsetplp({
          branchId: original.branchId,
          branchName: original.branchName,
          bukrs: original.bukrs,
          bukrsName: original.bukrsName,
          countryId: original.countryId,
          countryName: original.countryName,
          dateAt: original.dateAt,
          donePlanPercent: original.donePlanPercent,
          filterCurrentDatabasePlanCount:
            original.filterCurrentDatabasePlanCount,
          filterCurrentDatabasePlanSum: original.filterCurrentDatabasePlanSum,
          filterCurrentPlanSum: original.filterCurrentPlanSum,
          filterDonePlanSum: original.filterDonePlanSum,
          filterOverDueDatabasePlanCount:
            original.filterOverDueDatabasePlanCount,
          filterOverDueDatabasePlanSum: original.filterOverDueDatabasePlanSum,
          filterOverDuePlanSum: original.filterOverDuePlanSum,
          filterPartsDonePlanSum: original.filterPartsDonePlanSum,
          filterPartsPlanSum: original.filterPartsPlanSum,
          filterServicePacketDonePlanSum:
            original.filterServicePacketDonePlanSum,
          filterServicePacketPlanSum: original.filterServicePacketPlanSum,
          filterTotalPlanSum: original.filterTotalPlanSum,
          filterVCPartsDonePlanSum: original.filterVCPartsDonePlanSum,
          filterVCPartsPlanSum: original.filterVCPartsPlanSum,
          filterVCServicePacketCurrentDatabasePlanCount:
            original.filterVCServicePacketCurrentDatabasePlanCount,
          filterVCServicePacketCurrentDatabasePlanSum:
            original.filterVCServicePacketCurrentDatabasePlanSum,
          filterVCServicePacketDonePlanSum:
            original.filterVCServicePacketDonePlanSum,
          filterVCServicePacketOverDueDatabasePlanCount:
            original.filterVCServicePacketOverDueDatabasePlanCount,
          filterVCServicePacketOverDueDatabasePlanSum:
            original.filterVCServicePacketOverDueDatabasePlanSum,
          filterVCServicePacketPlanSum: original.filterVCServicePacketPlanSum,
          id: original.id,
          totalDonePlanSum: original.totalDonePlanSum,
          totalPlanSum: original.totalPlanSum,
        });
        break;

      //Редактирование Текущий план
      case 'changeFilterCurrentPlanSum':
        console.log('changeFilterCurrentPlanSum', value);
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id
              ? { ...item, filterCurrentPlanSum: parseInt(value) }
              : item,
          ),
        );
        break;

      //Редактирование Просроченный план по количеству
      case 'changeFilterOverDuePlanSum':
        console.log('changeFilterOverDuePlanSum', value);
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id
              ? { ...item, filterOverDuePlanSum: parseInt(value) }
              : item,
          ),
        );
        break;

      //Редактирование Сервис пакет(Система по очистке воды) План
      case 'changeFilterServicePacketPlanSum':
        console.log('changeFilterServicePacketPlanSum', value);
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id
              ? { ...item, filterServicePacketPlanSum: parseInt(value) }
              : item,
          ),
        );
        break;

      //Редактирование Продажа запчастей(Система по очистке воды) План
      case 'changeFilterPartsPlanSum':
        console.log('changeFilterPartsPlanSum', value);
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id
              ? { ...item, filterPartsPlanSum: parseInt(value) }
              : item,
          ),
        );
        break;

      //Редактирование Сервис пакет(Уборочная система) План
      case 'changeFilterVCServicePacketPlanSum':
        console.log('changeFilterVCServicePacketPlanSum', value);
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id
              ? { ...item, filterVCServicePacketPlanSum: parseInt(value) }
              : item,
          ),
        );
        break;
      //Редактирование Продажа запчастей(Уборочная система) План
      case 'changeFilterVCPartsPlanSum':
        console.log('changeFilterVCPartsPlanSum', value);
        setStateSmsetplpList(
          stateSmsetplpList.map(item =>
            item.id == original.id
              ? { ...item, filterVCPartsPlanSum: parseInt(value) }
              : item,
          ),
        );
        break;

      default:
        alert('Нет такое значение');
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
            <label>Дата</label>

            <DatePicker
              dateFormat="MMMM YYYY"
              showMonthYearPicker
              placeholderText="Месяц"
              autoComplete="off"
              selected={
                param.dateAt === null
                  ? ''
                  : stringYYYYMMDDToMoment(param.dateAt)
              }
              dropdownMode="select" //timezone="UTC"
              locale={language}
              onChange={date =>
                setParam({
                  ...param,
                  dateAt: momentToStringYYYYMMDD(date),
                })
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
      <Divider />
      <Table
        data={stateSmsetplpList ? stateSmsetplpList : []}
        messages={props.intl.messages}
        onChangeTable={onChangeTable}
        // editStatus={editStatus}
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
  clearSmsetplpList,
  postSmsetplpForm,
  updateSmsetplp,
  f4FetchCountryList,
})(injectIntl(Smsetplp));

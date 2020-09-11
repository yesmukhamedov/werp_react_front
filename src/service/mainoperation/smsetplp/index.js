import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchSmsetplpList } from './smsetplpAction';
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

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import moment from 'moment';
require('moment/locale/ru');

const Smsetplp = props => {
  const {
    intl: { messages },
    language,
    countryList = [],
    companyOptions = [],
    branchOptionsService,
    smsetplpList,
  } = props;

  console.log('smsetplpList', smsetplpList);

  const initialState = {
    countryId: '',
    bukrs: '',
    branchId: '',
    dateAt: '',
  };

  const [param, setParam] = useState({
    ...initialState,
  });

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
    };
  });

  const onInputChange = (value, fieldName) => {
    switch (fieldName) {
      case '':
        break;

      default:
        alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
    }
  };

  //Колоны ReactTable
  const initialColumns = React.useMemo(
    () => [
      {
        Header: '№',
        accessor: 'id',
      },
      {
        Header: 'Компания',
        accessor: 'id',
      },
      {
        Header: 'Филиал',
        accessor: 'id',
      },
      {
        Header: 'Система по очистке воды',
        columns: [
          {
            Header: 'Замена картриджей',
            columns: [
              {
                Header: 'План по количеству (текущий)',
                accessor: 'id',
              },
              {
                Header: 'Текущий план база',
                accessor: 'id',
              },
              {
                Header: 'Текущий план',
                accessor: 'id',
              },
              {
                Header: 'План по количеству (просроченный)',
                accessor: 'id',
              },
              {
                Header: 'Просроченный план база',
                accessor: 'id',
              },
              {
                Header: 'Просроченный',
                accessor: 'id',
              },
              {
                Header: 'Общий план',
                accessor: 'id',
              },
              {
                Header: 'Выполненный план',
                accessor: 'id',
              },
            ],
          },
          {
            Header: 'Сервис пакет',
            columns: [
              {
                Header: 'План',
                accessor: 'id',
              },
              {
                Header: 'Выполненный план',
                accessor: 'id',
              },
            ],
          },
          {
            Header: 'Продажа запчастей',
            columns: [
              {
                Header: 'План',
                accessor: 'id',
              },
              {
                Header: 'Выполненный план',
                accessor: 'id',
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  const handleClickApply = () => {
    console.log('Применить');
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
            // onClick={handleClickApply}
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
        // data={srlsmListData.data}
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
  fetchSmsetplpList,
})(injectIntl(Smsetplp));

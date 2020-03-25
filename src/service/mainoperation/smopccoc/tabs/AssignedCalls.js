import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';

import { fetchAssignedCalls } from '../smopccocAction';
import { fetchServiceTypeId } from '../../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';

import ModalColumns from '../../../../utils/ModalColumns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
require('moment/locale/ru');
require('moment/locale/tr');

const AssignedCalls = props => {
  const {
    intl: { messages },
    language,
    fetchServiceTypeId,
  } = props;

  const {
    companyOptions = [],
    countryOptions,
    serviceDateTypeOptions,
    branches,
    finStatusOption,
    assignedCalls,
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceDateType: '',
    finStatus: '',
    date: '',
  };

  const [param, setParam] = useState({ ...emptyParam });

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
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
      Header: 'Дата продажи',
      accessor: 'contractDate',
      checked: true,
    },
    {
      Header: 'Дата назначения',
      accessor: '888',
      checked: true,
    },

    {
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
      checked: true,
    },

    {
      Header: 'Телефон',
      accessor: 'phone',
      checked: true,
    },
    {
      Header: 'Адрес',
      accessor: 'address',
      checked: true,
    },
    {
      Header: 'ФИО дилера',
      accessor: 'dealerFIO',
      checked: true,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
    },
    {
      Header: 'Категория',
      accessor: 'crmCategory',
      checked: true,
    },
    {
      Header: 'Фин. статус',
      accessor: '15',
      checked: true,
    },
    {
      Header: 'Просмотр',
      accessor: '16',
      checked: true,
    },
  ];

  const [serBranchOptions, setSerBranchOptions] = useState([]);

  useEffect(() => {
    fetchServiceTypeId();
  }, []);

  //Get service branches
  useEffect(() => {
    const getBranchByBukrs = (branches, bukrs) => {
      let br = branches.filter(item => item.bukrs === bukrs);

      let brSer = br.filter(
        item =>
          item.business_area_id === 5 ||
          item.business_area_id === 6 ||
          item.business_area_id === 9,
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

  const categoryOptions = [
    { key: 1, text: 'Зеленый', value: 'Зеленый' },
    { key: 2, text: 'Желтый', value: 'Желтый' },
    { key: 3, text: 'Красный', value: 'Красный' },
    { key: 4, text: 'Черный', value: 'Черный' },
  ];

  const handleClickApply = () => {
    props.fetchAssignedCalls({ ...param });
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'country':
          prevParam.country = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;

        case 'categoryId':
          prevParam.categoryId = o.value;
          break;
        case 'serviceDateType':
          prevParam.serviceDateType = o.value;
          break;

        case 'configuration':
          prevParam.configuration = o.value;
          break;

        case 'finStatus':
          prevParam.finStatus = o.value;
          break;

        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Страна"
            placeholder="Страна"
            options={countryOptions}
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
            options={serBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Фин. Статус"
            placeholder="Фин. Статус"
            options={finStatusOption}
            onChange={(e, o) => onInputChange(o, 'finStatus')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Статус сервиса"
            placeholder="Статус сервиса"
            options={serviceDateTypeOptions}
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />

          <Form.Select
            label="Категория"
            placeholder="Категория"
            options={categoryOptions}
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />

          <div className="flexColumn alignBottom">
            <label>Дата</label>
            <DatePicker
              className="datePicker"
              autoComplete="off"
              locale={language}
              dropdownMode="select" //timezone="UTC"
              selected={stringYYYYMMDDToMoment(param.date)}
              onChange={date =>
                setParam({ ...param, date: momentToStringYYYYMMDD(date) })
              }
              maxDate={new Date()}
            />
          </div>

          <Form.Button
            onClick={handleClickApply}
            color="blue"
            className="alignBottom"
          >
            Применить
          </Form.Button>

          <Form.Field className="alignBottom">
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <ReactTableServerSideWrapper data={assignedCalls} columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    assignedCalls: state.smopccocReducer.assignedCalls,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchAssignedCalls,
})(injectIntl(AssignedCalls));

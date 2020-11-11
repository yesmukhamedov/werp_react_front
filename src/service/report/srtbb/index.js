import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Icon,
  Container,
  Segment,
  Form,
  Dropdown,
  Divider,
  Label,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import moment from 'moment';
import TextAlignCenter from '../../../utils/TextAlignCenter';
import DropdownClearable from '../../../utils/DropdownClearable';
import SelectWithCheckBox from '../../../utils/Dropdown/selectWithCheckBox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../utils/helpers';
import {
  f4FetchServiceAppStatus,
  f4fetchCategory,
} from '../../../reference/f4/f4_action';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
require('moment/locale/ru');

//Сервис отчеты: Итого по филиалам
const SrTbb = props => {
  const {
    intl: { messages },
    companyOptions = [],
    language,
    serviceAppStatus = [],
    branchOptionsService = {},
    category = [],
  } = props;

  const [param, setParam] = useState({
    bukrs: null,
    branchId: null,
    dateAt: '',
    dateTo: '',
    serviceStatus: [],
    categoryId: null,
  });

  const [error, setError] = useState([]);

  useEffect(() => {
    props.f4FetchServiceAppStatus();
    props.f4fetchCategory();
  }, []);

  const serviceAppStatusOptions = serviceAppStatus.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const columns = [
    {
      Header: 'Филиал',
      accessor: 'id',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Валюта',
      accessor: 'waers',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Общая сумма',
      accessor: 'totalAmount',
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterAll: true,
    },
    {
      Header: 'Премия мастера',
      accessor: 'masterAmount',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Премия оператора',
      accessor: 'operatorAmount',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
  ];

  const handleClickApply = () => {
    //ВАЛИДАЦИЯ
    if (
      param.bukrs &&
      param.branchId &&
      param.dateAt &&
      param.dateTo &&
      param.categoryId &&
      param.serviceStatus
    ) {
      console.log('ЗАПРОС НА СЕРВЕР ====>');
    } else {
      const errors = [];
      if (!param.bukrs) {
        errors.push(errorTableText(5));
      }
      if (!param.branchId) {
        errors.push(errorTableText(7));
      }
      if (!param.dateAt) {
        errors.push(errorTableText(13));
      }
      if (!param.dateTo) {
        errors.push(errorTableText(14));
      }
      if (!param.categoryId) {
        errors.push(errorTableText(109));
      }
      setError(() => errors);
    }
  };

  const onChangeMultiSelectBox = (fieldName, value) => {
    switch (fieldName) {
      case 'selectServiceStatus':
        let arr = value.map(item => item.value);
        console.log(' selectServiceStatus value', value);
        //  setParam({ ...param, serviceStatus: [...arr] });
        break;
      case 'changeCategory':
        console.log('arr', value);
        //setParam({ ...param, serviceStatus: value });
        break;
    }
  };

  return (
    <div>
      <Segment>
        <h3>Сервис отчеты: Итого по филиалам</h3>
      </Segment>
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>Компания</label>
              <DropdownClearable
                selection
                options={companyOptions}
                placeholder="Компания"
                onChange={(o, { value }) =>
                  setParam({ ...param, bukrs: value })
                }
                value={param.value ? param.value : ''}
                allSelect={false}
                handleClear={() => setParam({ ...param, bukrs: null })}
              />
            </Form.Field>
            <Form.Field required>
              <label>Филиал</label>
              <SelectWithCheckBox
                listItem={branchOptionsService[param.bukrs]}
                // onSelectDone={selTypesFromChild =>
                //   changeFoeaSearchParamsAction({
                //     selectedTypes: selTypesFromChild
                //       .map(element => element.value)
                //       .join(),
                //   })
                // }
              />
            </Form.Field>
            <Form.Field className="marginRight" required>
              <label>Дата с</label>
              <DatePicker
                isClearable
                placeholderText="Дата с"
                className="date-auto-width"
                autoComplete="off"
                locale={`${language}`}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateAt == '' ? '' : stringYYYYMMDDToMoment(param.dateAt)
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
            <Form.Field required>
              <label>Статус сервиса</label>
              {/* <Dropdown
                selection
                multiple
                placeholder="Статус сервиса"
                options={serviceAppStatusOptions ? serviceAppStatusOptions : []}
                onChange={(e, { value }) =>
                  setParam({
                    ...param,
                    serviceStatus: value.length > 0 ? value.join() : null,
                  })
                }
              /> */}
              <SelectWithCheckBox
                listItem={
                  serviceAppStatusOptions ? serviceAppStatusOptions : []
                }
                onSelectDone={item =>
                  onChangeMultiSelectBox('selectServiceStatus', item)
                }
              />
            </Form.Field>
            <Form.Field required>
              <label>Категория товара</label>
              {/* <Dropdown
                selection
                multiple
                placeholder="Статус сервиса"
                options={serviceAppStatusOptions ? serviceAppStatusOptions : []}
                onChange={(e, { value }) =>
                  setParam({
                    ...param,
                    serviceStatus: value.length > 0 ? value.join() : null,
                  })
                }
              /> */}
              <SelectWithCheckBox
                listItem={categoryOptions ? categoryOptions : []}
                onSelectDone={item => {
                  console.log('selTypesFromChild', item);
                  let arrCatTov = item.map(item => item.value);
                  onChangeMultiSelectBox('changeCategory', arrCatTov);
                }}
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
          </Form.Group>
        </Form>
      </Segment>
      <OutputErrors errors={error} />
      <Divider />

      <ReactTableWrapper
        //data={data}
        columns={columns}
        showPagination={true}
        className="-striped -highlight"
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    serviceAppStatus: state.f4.serviceAppStatus,
    category: state.f4.category,
  };
}

export default connect(mapStateToProps, {
  f4FetchServiceAppStatus,
  f4fetchCategory,
})(injectIntl(SrTbb));

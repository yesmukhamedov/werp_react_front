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
  Checkbox,
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
import { f4fetchCategory } from '../../../reference/f4/f4_action';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
require('moment/locale/ru');

//Сервис отчеты: Количество и зав цены списанных товаров по сервису
const Srqpwgs = props => {
  const {
    intl: { messages },
    companyOptions = [],
    language,
    branchOptionsService = {},
    category = [],
  } = props;

  const [param, setParam] = useState({
    bukrs: null,
    branchId: null,
    dateAt: '',
    dateTo: '',
    categoryId: null,
    warranty: false,
  });

  const [error, setError] = useState([]);

  console.log('PARAM', param);

  useEffect(() => {
    props.f4fetchCategory();
  }, []);

  const columns = [
    {
      Header: 'Филиал',
      accessor: 'id',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Код',
      accessor: 'code',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Название',
      accessor: 'matnrName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Заводская цена',
      accessor: 'fabPrice',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Количество',
      accessor: 'quantity',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
  ];

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

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const handleClickApply = () => {
    //ВАЛИДАЦИЯ
    if (
      param.bukrs &&
      param.branchId &&
      param.dateAt &&
      param.dateTo &&
      param.categoryId
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

  return (
    <Container fluid style={{ padding: '10px' }}>
      <Segment>
        <h3>
          Сервис отчеты: Количество и зав цены списанных товаров по сервису
        </h3>
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
                value={param.bukrs ? param.bukrs : ''}
                allSelect={false}
                handleClear={() =>
                  setParam({ ...param, bukrs: null, branchId: null })
                }
              />
            </Form.Field>
            <Form.Field required>
              <label>Филиал</label>
              <SelectWithCheckBox
                listItem={branchOptionsService[param.bukrs]}
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
            <Form.Field className="marginRight" required>
              <label>Дата по</label>
              <DatePicker
                isClearable
                placeholderText="Дата по"
                className="date-auto-width"
                autoComplete="off"
                locale={`${language}`}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateTo == '' ? '' : stringYYYYMMDDToMoment(param.dateTo)
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

            <Form.Field required>
              <label>Категория товара</label>

              <DropdownClearable
                selection
                options={categoryOptions}
                placeholder="Категория"
                onChange={(o, { value }) =>
                  setParam({ ...param, categoryId: value })
                }
                value={param.categoryId ? param.categoryId : ''}
                allSelect={false}
                handleClear={() => setParam({ ...param, categoryId: null })}
              />
            </Form.Field>
            <Form.Field className="alignBottom">
              <Checkbox
                checked={param.warranty}
                label="Гарантия"
                onChange={() =>
                  setParam({ ...param, warranty: !param.warranty })
                }
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
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    category: state.f4.category,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
})(injectIntl(Srqpwgs));

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment, Form, Icon, Divider } from 'semantic-ui-react';
import {
  f4FetchCountryList,
  f4FetchBranches,
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

const Srkpiso = props => {
  const {
    intl: { messages },
    language,
    fetchSrkpiso,
    f4FetchCountryList,
    f4FetchBranches,
    branches,
    countryList,
    companyOptions,
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    product: '',
    date: '',
  };
  const [param, setParam] = useState({ ...emptyParam });

  const initialColumns = [
    {
      Header: 'ID',
      accessor: 'recommenderId',
      filterable: false,
      checked: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'recommenderBranchName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderBranchName'] }),
      checked: true,
    },
    {
      Header: 'Оператор',
      accessor: 'recommenderName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderName'] }),
      checked: true,
    },
    {
      Header: 'Текущий план',
      accessor: 'recommenderPositionName',
      filterable: false,
      checked: true,
    },
    {
      Header: 'Текущий перенос',
      accessor: 'applicantQuantity',
      filterable: false,
      checked: true,
    },
    {
      Header: 'Текущий отмена',
      accessor: 'saleCount',
      filterable: false,
      checked: true,
    },
    {
      Header: 'Текущий выполнен',
      accessor: 'recomenderBonus',
      filterable: false,
      checked: true,
    },
    {
      Header: 'Просроченный план',
      accessor: '88',
      filterable: false,
      checked: true,
    },
    {
      Header: 'Просроченный перенос',
      accessor: '78754',
      filterable: false,
      checked: true,
    },
    {
      Header: 'Просроченный отмена',
      accessor: '656',
      filterable: false,
      checked: true,
    },
    {
      Header: 'Просроченный выполнен',
      accessor: '858',
      filterable: false,
      checked: true,
    },
    {
      Header: 'KPI по %',
      accessor: '858',
      filterable: false,
      checked: true,
    },
  ];

  useEffect(() => {
    f4FetchCountryList();
    f4FetchBranches();
  }, []);

  const countryOptions = countryList.map(item => {
    return {
      key: parseInt(item.countryId, 10),
      text: `${item.country}`,
      value: parseInt(item.countryId, 10),
    };
  });

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.country = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;

        case 'date':
          prevParam.date = o.value;
          break;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  const handleClickApply = () => {
    props.fetchSrkpiso({ ...param });
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
        <h3>KPI Сервис операторов</h3>
      </Segment>
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
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Продукт"
            placeholder="Продукт"
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.date)}
                onChange={date =>
                  setParam({
                    ...param,
                    date: momentToStringYYYYMMDD(date),
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
      <ReactTableServerSideWrapper columns={columns} filterable={true} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    branches: state.f4.branches,
    companyOptions: state.userInfo.companyOptions,
    srkpisoData: state.srkpisoReducer.srkpisoData,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchBranches,
  fetchSrkpiso,
})(injectIntl(Srkpiso));

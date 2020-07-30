import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment, Form, Icon, Divider } from 'semantic-ui-react';
import {
  f4FetchBranches,
  f4FetchCountryList,
  f4FetchConTypeList,
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
    //language,
    companyOptions = [],
    countryList = [],
    branches = [],
    productList = [],
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    product: '',
    dateOpenAt: '',
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
      accessor: '57878',
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
    props.f4FetchCountryList();
    props.f4FetchBranches();
    props.f4FetchConTypeList();
  }, []);

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
    };
  });

  const productListOptions =
    param.bukrs === ''
      ? productList.map(item => {
          return {
            key: item.contract_type_id,
            text: item.name,
            value: item.contract_type_id,
          };
        })
      : productList
          .filter(item => item.bukrs === param.bukrs)
          .map(item => {
            return {
              key: item.contract_type_id,
              text: item.name,
              value: item.contract_type_id,
            };
          });

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

  useEffect(() => {
    let servBrOptions = branches
      .filter(
        item =>
          item.business_area_id == 5 ||
          item.business_area_id == 6 ||
          item.business_area_id == 9,
      )
      .map(item => {
        return {
          key: item.branch_id,
          text: item.text45,
          value: item.branch_id,
          country_id: item.country_id,
          bukrs: item.bukrs,
        };
      });
    if (param.country !== '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions
        .filter(item => item.country_id === param.country)
        .filter(item => item.bukrs === param.bukrs);
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.country !== '' && param.bukrs === '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.country_id === param.country,
      );
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.country === '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.bukrs === param.bukrs,
      );

      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.country === '' && param.bukrs === '') {
      setServiceBranchOptions([...servBrOptions]);
    }
  }, [branches, param.country, param.bukrs]);

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
          prevParam.branchId = o.length > 0 ? o.join() : null;
          break;
        case 'product':
          prevParam.product = o.length > 0 ? o.join() : null;
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
            onChange={(e, value) => onInputChange(value, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Филиал"
            placeholder="Филиал"
            clearable="true"
            multiple
            options={serviceBranchOptions}
            onChange={(e, { value }) => onInputChange(value, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Продукт"
            placeholder="Продукт"
            clearable="true"
            multiple
            options={productListOptions}
            onChange={(e, { value }) => onInputChange(value, 'product')}
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
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    branches: state.f4.branches,
    productList: state.f4.contractTypeList,
    srkpisoData: state.srkpisoReducer.srkpisoData,
  };
}

export default connect(mapStateToProps, {
  f4FetchBranches,
  f4FetchCountryList,
  f4FetchConTypeList,
  fetchSrkpiso,
})(injectIntl(Srkpiso));

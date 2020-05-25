import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Form,
  Icon,
  Button,
  Popup,
  Divider,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchSearchCustomer } from '../smopccicAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';

const SearchCustomer = props => {
  const {
    countryOptions = [],
    companyOptions = [],
    branches = [],
    finStatusOptions = [],
    tovarCategoryOptions = [],
  } = props;

  const {
    intl: { messages },
    searchCustomer,
  } = props;
  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    tovarCategorys: '',
    contractStatusIds: '',
    contractDateFrom: '',
    contractDateTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'customerId',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['fin_status'],
      accessor: 'contractStatusName',
      checked: true,
      filterable: false,
    },

    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
    },

    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
    },
    {
      Header: messages['Phone'],
      accessor: 'phoneNumber',
      checked: true,
    },

    {
      Header: messages['customer_story'],
      accessor: '16',
      checked: true,
      filterable: false,
      Cell: (
        <div style={{ textAlign: 'center' }}>
          <Popup
            content="Просмотр сервис карту"
            trigger={<Button icon="address card" />}
          />
        </div>
      ),
    },
  ];

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
        case 'country':
          prevParam.country = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;
        case 'tovarCategorys':
          prevParam.tovarCategorys = o.value;
          break;
        case 'contractStatusIds':
          prevParam.contractStatusIds = o.value;
          break;

        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };
  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      props.fetchSearchCustomer({ ...param, page, size });
      setTurnOnReactFetch(true);
    }
  };

  const validate = () => {
    const errors = [];
    if (param.bukrs === '') {
      errors.push(errorTableText(5));
    }
    setError(() => errors);
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
            label={messages['country']}
            placeholder={messages['country']}
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'country')}
            className="alignBottom"
          />

          <Form.Select
            required
            fluid
            label={messages['bukrs']}
            placeholder={messages['bukrs']}
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['brnch']}
            placeholder={messages['brnch']}
            options={serviceBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            label={messages['category']}
            placeholder={messages['category']}
            options={tovarCategoryOptions}
            onChange={(e, o) => onInputChange(o, 'tovarCategorys')}
            className="alignBottom"
          />

          <Form.Select
            label={messages['fin_status']}
            placeholder={messages['fin_status']}
            options={finStatusOptions}
            onChange={(e, o) => onInputChange(o, 'configuration')}
            className="alignBottom"
          />
        </Form.Group>
        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['Form.DateFrom']}
                selected={
                  param.contractDateFrom === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.contractDateFrom)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    contractDateFrom: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={moment(new Date())}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>

            <Form.Field className="marginRight">
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['Form.DateTo']}
                selected={
                  param.contractDateTo === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.contractDateFrom)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    contractDateTo: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={moment(new Date())}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              <Icon name="search" />
              {messages['apply']}
            </Form.Button>
          </div>

          <Form.Field className="alignBottom">
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
        <OutputErrors errors={error} />
      </Form>
      <Divider />
      <ReactTableServerSideWrapper
        data={searchCustomer ? searchCustomer.data : []}
        filterable={true}
        columns={columns}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchSearchCustomer({ ...params, ...param });
        }}
        pages={searchCustomer ? searchCustomer.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    searchCustomer: state.smopccicReducer.searchCustomerData,
  };
}

export default connect(mapStateToProps, {
  fetchSearchCustomer,
})(injectIntl(SearchCustomer));

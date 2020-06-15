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
  Segment,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchSearchCustomer } from '../smopccicAction';
import { f4FetchPhysStatus } from '../../../../reference/f4/f4_action';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import { LinkToSmcusporFromSmsrcus } from '../../../../utils/outlink';
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
    physStatusOptions = [],
  } = props;

  const {
    intl: { messages },
    searchCustomer,
    language,
  } = props;
  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    tovarCategoryId: '',
    contractStatusId: [],
    contractDateFrom: '',
    contractDateTo: '',
    lastStateId: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    props.f4FetchPhysStatus();
  }, []);

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'customerId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['fin_status'],
      accessor: 'contractStatusName',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: 'Физ статус',
      accessor: 'lastStateId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },

    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },

    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Phone'],
      accessor: 'phoneNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },

    {
      Header: messages['customer_story'],
      accessor: '16',
      checked: true,
      filterable: false,
      Cell: original => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div></div>
            <LinkToSmcusporFromSmsrcus
              contractNumber={original.row.contractNumber}
            />
          </div>
        );
      },
      fixed: 'right',
    },
  ];

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

  useEffect(() => {
    setParam({ ...param, branchId: '' });
    let servBrOptions = branches
      .filter(
        item =>
          item.business_area_id == 1 ||
          item.business_area_id == 2 ||
          item.business_area_id == 3 ||
          item.business_area_id == 4 ||
          item.business_area_id == 7 ||
          item.business_area_id == 8,
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

    if (param.countryId !== '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions
        .filter(item => item.country_id === param.countryId)
        .filter(item => item.bukrs === param.bukrs);
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId !== '' && param.bukrs === '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.country_id === param.countryId,
      );
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId === '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.bukrs === param.bukrs,
      );

      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId === '' && param.bukrs === '') {
      setServiceBranchOptions([...servBrOptions]);
    }
  }, [branches, param.countryId, param.bukrs]);

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.countryId = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;
        case 'tovarCategoryId':
          prevParam.tovarCategoryId = o.value;
          break;
        case 'contractStatusId':
          prevParam.contractStatusId =
            o.value.length > 0 ? o.value.join() : null;
          break;
        case 'lastStateId':
          prevParam.lastStateId = o.value.length > 0 ? o.value.join() : null;
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

  console.log(getPhysStatus(physStatusOptions, language));

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label={messages['country']}
            placeholder={messages['country']}
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'countryId')}
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
            onChange={(e, o) => onInputChange(o, 'tovarCategoryId')}
            className="alignBottom"
          />

          <Form.Select
            label={messages['fin_status']}
            placeholder={messages['fin_status']}
            options={finStatusOptions}
            onChange={(e, o) => onInputChange(o, 'contractStatusId')}
            className="alignBottom"
            multiple
          />

          <Form.Select
            fluid
            label="Физ. статус"
            placeholder="Физ. статус"
            options={getPhysStatus(physStatusOptions, language)}
            onChange={(e, o) => onInputChange(o, 'lastStateId')}
            className="alignBottom"
            multiple
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
                    : stringYYYYMMDDToMoment(param.contractDateTo)
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
        {searchCustomer.totalElements ? (
          <Segment>
            <h5>
              {`Общее количество: 
              ${
                searchCustomer.totalElements
                  ? searchCustomer.totalElements
                  : null
              }`}
            </h5>
          </Segment>
        ) : null}
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

const getPhysStatus = (value, lang) => {
  const physStatus = value;
  if (!physStatus) {
    return [];
  }
  let out = value.map(c => {
    return {
      key: c.id,
      text: c.name,
      value: parseInt(c.id, 10),
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    searchCustomer: state.smopccicReducer.searchCustomerData,
    physStatusOptions: state.f4.physStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSearchCustomer,
  f4FetchPhysStatus,
})(injectIntl(SearchCustomer));

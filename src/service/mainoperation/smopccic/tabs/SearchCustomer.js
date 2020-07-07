import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Icon, Divider, Segment } from 'semantic-ui-react';
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
import DropdownClearable from '../../../../utils/DropdownClearable';

const SearchCustomer = props => {
  const {
    intl: { messages },
    searchCustomer,
    language,
    countryOptions = [],
    companyOptions = [],
    branchOptions = [],
    finStatusOptions = [],
    tovarCategoryOptions = [],
    physStatusOptions = [],
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
      Header: '#',
      accessor: 'contractId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 55,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 90,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 60,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 90,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 80,
    },
    {
      Header: messages['TBL_H__PRODUCT'],
      accessor: 'productName',
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
      width: 90,
    },
    {
      Header: 'Физ статус',
      accessor: 'lastStateId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
      width: 90,
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
      width: 100,
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
      width: 60,
      fixed: 'right',
    },
  ];

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

  useEffect(() => {
    if (param.bukrs) {
      setServiceBranchOptions(branchOptions[param.bukrs]);
    }
    if (param.bukrs !== '' && param.countryId !== '' && branchOptions) {
      let brnchOpt = branchOptions[param.bukrs].filter(
        item => item.countryid === param.countryId,
      );
      setServiceBranchOptions(brnchOpt);
    }
  }, [branchOptions, param.countryId, param.bukrs]);

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

  const handleClear = fieldName => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.countryId = '';
          break;
        case 'bukrs':
          prevParam.bukrs = '';
          break;
        case 'branchId':
          prevParam.branchId = '';
          break;
        case 'tovarCategoryId':
          prevParam.tovarCategoryId = '';
          break;
        case 'contractStatusId':
          prevParam.contractStatusId = '';
          break;
        case 'lastStateId':
          prevParam.lastStateId = '';
          break;

        default:
          prevParam[fieldName] = '';
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['country']}</label>
            <DropdownClearable
              options={countryOptions}
              value={param.countryId}
              placeholder={messages['country']}
              onChange={(e, o) => onInputChange(o, 'countryId')}
              handleClear={() => handleClear('countryId')}
            />
          </Form.Field>

          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              options={companyOptions}
              value={param.bukrs}
              placeholder={messages['bukrs']}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              handleClear={() => handleClear('bukrs')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['brnch']}</label>
            <DropdownClearable
              options={serviceBranchOptions}
              value={param.branchId}
              placeholder={messages['brnch']}
              onChange={(e, o) => onInputChange(o, 'branchId')}
              handleClear={() => handleClear('branchId')}
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['category']}</label>
            <DropdownClearable
              options={tovarCategoryOptions}
              value={param.tovarCategoryId}
              placeholder={messages['category']}
              onChange={(e, o) => onInputChange(o, 'tovarCategoryId')}
              handleClear={() => handleClear('tovarCategoryId')}
            />
          </Form.Field>

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

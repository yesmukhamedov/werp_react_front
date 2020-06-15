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
  Dropdown,
  Input,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchMyApplicationExodus } from '../smopccicAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import { Link } from 'react-router-dom';

const MyApplication = props => {
  const {
    countryOptions,
    companyOptions = [],
    branches,
    serviceAppStatusOptions,
    tovarCategoryOptions,
  } = props;

  const {
    intl: { messages },
    language,
    myApplicationData,
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    tovarCategory: '',
    applicationStatus: '',
    dateOpenAt: '',
    dateOpenTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
      filterable: false,
      width: 70,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      getProps: (state, rowInfo, column) => {
        return {
          style: {
            background:
              rowInfo && rowInfo.original.urgencyLevel === true
                ? '#cc0000'
                : null,
            color:
              rowInfo && rowInfo.original.urgencyLevel === true
                ? 'white'
                : 'black',
          },
        };
      },
      fixed: 'left',
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['Application_Date'],
      accessor: 'applicationDate',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['Phone'],
      accessor: 'phoneNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['master'],
      accessor: 'masterFIO',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['application_status'],
      accessor: 'contractStatusId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['request_number'],
      accessor: 'applicationNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
      Cell: ({ original }) => <span>{original.contractNumber}</span>,
    },
    {
      Header: messages['Table.View'],
      accessor: '16',
      checked: true,
      filterable: false,
      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}&filterPlanId=${original.row.id}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              <Icon name="address card" color="black" />
            </Link>
          </div>
        );
      },
      width: 60,
      fixed: 'right',
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

  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      props.fetchMyApplicationExodus({ ...param, page, size });
      setTurnOnReactFetch(true);
    }
  };

  console.log(myApplicationData);

  const validate = () => {
    const errors = [];
    if (param.bukrs === '') {
      errors.push(errorTableText(5));
    }
    setError(() => errors);
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
        case 'tovarCategory':
          prevParam.tovarCategory = o.value;
          break;
        case 'applicationStatus':
          prevParam.applicationStatus =
            o.value.length > 0 ? o.value.join() : null;
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
            label={messages['country']}
            placeholder={messages['country']}
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'country')}
            className="alignBottom"
            clearable
          />

          <Form.Select
            required
            fluid
            label={messages['bukrs']}
            placeholder={messages['bukrs']}
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
            clearable
          />

          <Form.Select
            fluid
            label={messages['brnch']}
            placeholder={messages['brnch']}
            options={serviceBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
            clearable
          />

          <Form.Select
            label={messages['category']}
            placeholder={messages['category']}
            options={tovarCategoryOptions}
            onChange={(e, o) => onInputChange(o, 'tovarCategory')}
            className="alignBottom"
            clearable
          />

          <Form.Select
            label={messages['fin_status']}
            placeholder={messages['fin_status']}
            options={serviceAppStatusOptions}
            onChange={(e, o) => onInputChange(o, 'applicationStatus')}
            className="alignBottom"
            multiple
            clearable
          />
        </Form.Group>
        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['Form.DateFrom']}
                selected={
                  param.dateOpenAt === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenAt: momentToStringYYYYMMDD(date),
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
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['Form.DateTo']}
                selected={stringYYYYMMDDToMoment(param.dateOpenTo)}
                selected={
                  param.dateOpenTo === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenTo)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenTo: momentToStringYYYYMMDD(date),
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
        data={myApplicationData ? myApplicationData.data : []}
        filterable={true}
        columns={columns}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchMyApplicationExodus({ ...params, ...param });
        }}
        pages={myApplicationData ? myApplicationData.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    myApplicationData: state.smopccicReducer.myApplicationData,
  };
}

export default connect(mapStateToProps, {
  fetchMyApplicationExodus,
})(injectIntl(MyApplication));

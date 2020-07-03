import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Form, Container, Divider, Icon, Segment } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import { fetchMyApplicationExodus } from '../smopccocAction';
import ColumnsModal from '../../../../utils/ColumnsModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import DropdownClearable from '../../../../utils/DropdownClearable';

const MyApplicationExodus = props => {
  const {
    intl: { messages },
    language,
    companyOptions = [],
    countryOptions,
    myApplication = [],
    branchOptions = [],
    crmCategoryOptions = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    dateOpenAt: '',
    dateOpenTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      filterable: false,
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
      width: 55,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
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
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 60,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 80,
      filterable: false,
    },
    {
      Header: messages['Application_Date'],
      accessor: 'applicationDate',
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
      Header: messages['master'],
      accessor: 'masterFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 40,
      filterable: false,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,

      filterable: false,
    },
    {
      Header: messages['application_status'],
      accessor: 'applicationStatusId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,

      filterable: false,
    },
    {
      Header: messages['request_number'],
      accessor: 'applicationNumber',
      checked: true,
      Cell: original => {
        const url = `../mainoperation/smvca?id=${original.value}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              {original.value}
            </Link>
          </div>
        );
      },
      fixed: 'right',
      width: 50,
      filterable: false,
    },
    {
      Header: messages['customer_story'],
      accessor: '5885',
      checked: true,
      filterable: false,
      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}&filterPlanId=${original.original.serviceFilterPlanId}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              <Icon name="address card" color="black" />
            </Link>
          </div>
        );
      },
      width: 50,
      fixed: 'right',
    },
  ];

  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smopccocMyApp');
    if (transactionCodeText) {
      let transactionCodeObject = JSON.parse(transactionCodeText);

      let temp = initialColumns.map(item => {
        return { ...item, show: transactionCodeObject[item.accessor] };
      });
      setColumnsForTable(temp);
    } else {
      setColumnsForTable(initialColumns);
    }
  }, []);

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

  const handleClickApplyMyApp = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      props.fetchMyApplicationExodus({ ...param, page, size });
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
        case 'dateOpenAt':
          prevParam.dateOpenAt = o.value;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
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
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApplyMyApp}
              color="blue"
              className="alignBottom"
            >
              <Icon name="search" />
              {messages['apply']}
            </Form.Button>
          </div>

          <Form.Field className="alignBottom">
            <ColumnsModal
              tableHeaderCols={columnsForTable}
              tableThings={things => {
                setColumnsForTable(things);
                //store in localstorage
                let temp = {};
                things.map(el => {
                  temp = { ...temp, [el.accessor]: el.show };
                });
                localStorage.setItem('smopccocMyApp', JSON.stringify(temp));
              }}
            />
          </Form.Field>
        </Form.Group>
        <OutputErrors errors={error} />
      </Form>
      <Divider />

      {Object.keys(myApplication).length !== 0 ? (
        <Segment>
          <h4>{`Общее количество: ${myApplication.totalElements}`}</h4>
        </Segment>
      ) : null}

      <ReactTableServerSideWrapper
        data={myApplication ? myApplication.data : []}
        columns={columnsForTable}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchMyApplicationExodus({ ...params, ...param });
        }}
        pages={myApplication ? myApplication.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    myApplication: state.smopccocReducer.myApplication,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchMyApplicationExodus,
})(injectIntl(MyApplicationExodus));

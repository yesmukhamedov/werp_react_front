import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Form,
  Divider,
  Icon,
  Segment,
  Popup,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import { fetchCRMSchedule } from '../smopccocAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ColumnsModal from '../../../../utils/ColumnsModal';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextAlignCenter from '../../../../utils/TextAlignCenter';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../utils/DropdownClearable';
import moment from 'moment';

const AssignedCalls = props => {
  const {
    intl: { messages },
    language,
  } = props;

  const {
    companyOptions = [],
    countryOptions,
    branchOptions = [],
    assignedCalls = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    dateOpenAt: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 55,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 60,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      width: 80,
      filterable: false,
    },
    {
      Header: messages['appointment_date'],
      accessor: 'crmScheduleDate',
      checked: true,
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      width: 80,
      filterable: false,
    },

    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },

    {
      Header: messages['Phone'],
      accessor: 'phoneNumber',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['Dealer.Fullname'],
      accessor: 'dealerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 40,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 40,
      filterable: false,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,

      filterable: false,
    },
    {
      Header: messages['description'],
      accessor: 'info',
      checked: true,
      filterable: false,
      Cell: row => (
        <Popup
          content={row.value}
          on="hover"
          pinned="true"
          trigger={<div style={{ textAlign: 'center' }}>{row.value}</div>}
        />
      ),
    },
    {
      Header: messages['Table.View'],
      accessor: '16',
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
      checked: true,
      fixed: 'right',
      width: 50,
    },
  ];

  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smopccocAssignedCalls');
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

  const [serverSideParams, setServerSideParams] = useState({});

  const handleClickApplyAssigned = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      if (Object.keys(serverSideParams).length > 0) {
        props.fetchCRMSchedule({ ...param, ...serverSideParams });
      } else {
        props.fetchCRMSchedule({ ...param, page, size });
      }
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
              <label>{messages['date']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['date']}
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
            <Form.Button
              onClick={handleClickApplyAssigned}
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
                localStorage.setItem(
                  'smopccocAssignedCalls',
                  JSON.stringify(temp),
                );
              }}
            />
          </Form.Field>
        </Form.Group>
        <OutputErrors errors={error} />
      </Form>
      <Divider />

      {Object.keys(assignedCalls).length !== 0 ? (
        <Segment>
          <h4>{`Общее количество: ${assignedCalls.totalElements}`}</h4>
        </Segment>
      ) : null}

      <ReactTableServerSideWrapper
        data={assignedCalls ? assignedCalls.data : []}
        columns={columnsForTable}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchCRMSchedule({ ...params, ...param });
          setServerSideParams({ ...params });
        }}
        pages={assignedCalls ? assignedCalls.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    assignedCalls: state.smopccocReducer.CRMSchedule,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchCRMSchedule,
})(injectIntl(AssignedCalls));

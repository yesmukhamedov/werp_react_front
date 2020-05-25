import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
import List from './list';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OutputErrors from '../../../general/error/outputErrors';
import { f4FetchWerksBranchList } from '../../../reference/f4/f4_action';
import ColumnsModal from '../../../utils/ColumnsModal';
import moment from 'moment';
import { errorTableText } from '../../../utils/helpers';
import { LinkToSmcusporFromSmsrcus } from '../../../utils/outlink';

import {
  Segment,
  Container,
  Header,
  Button,
  Form,
  Icon,
  Divider,
} from 'semantic-ui-react';
import {
  fetchSmsrcus,
  clearDynObjService,
  fetchContractStatus,
} from '../../serviceAction';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';

const Smsrcus = props => {
  const {
    intl: { messages },
    companyList = [],
    language,
    branchList,
    fetchSmsrcus,
    dynamicObject,
    clearDynObjService,
    fetchContractStatus,
    contractStatus,
  } = props;

  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
  let page = dynamicObject.totalPages ? dynamicObject.totalPages : 1;
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [errors, setErrors] = useState([]);
  let emptySearch = {
    branchId: '',
    bukrs: '',
  };
  const [searchParams, setSearchParams] = useState({ ...emptySearch });
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [startDate, setStartDate] = useState(
    momentToStringYYYYMMDD(moment(new Date(y - 1, m, 1))),
  );
  const [endDate, setEndDate] = useState(
    momentToStringYYYYMMDD(moment(new Date())),
  );

  let allColumns = [
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSerial',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
    },
    {
      Header: messages['Table.Date'],
      accessor: 'contractDate',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
      filterable: false,
    },
    {
      Header: messages['financial_status'],
      accessor: 'contractStatusName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
      filterable: false,
    },
    {
      Header: messages['full_name_of_client'],
      accessor: 'customerName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
    },
    {
      Header: messages['customer_key'],
      accessor: 'iinBin',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
    },
    {
      Header: messages['address'],
      accessor: 'fullAddress',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
    },
    {
      Header: messages['telephone'],
      accessor: 'fullPhone',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      show: true,
    },
    {
      Header: messages['customer_story'],
      show: true,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcusporFromSmsrcus
            contractNumber={row.original.contractNumber}
          />
        </div>
      ),
      filterable: false,
    },
  ];

  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    fetchContractStatus();
    clearDynObjService();
  }, []);

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smsrcus');
    if (transactionCodeText) {
      let transactionCodeObject = JSON.parse(transactionCodeText);

      let temp = allColumns.map(item => {
        return { ...item, show: transactionCodeObject[item.accessor] };
      });
      setColumnsForTable(temp);
    } else {
      setColumnsForTable(allColumns);
    }
  }, []);

  const handleInputSearch = (o, fieldName) => {
    setSearchParams(prev => {
      let searchArr = { ...prev };
      switch (fieldName) {
        case 'company':
          {
            searchArr.bukrs = o.value;
          }
          break;
        case 'finStatus':
          {
            searchArr.contractStatusIds =
              o.value.length > 0 ? o.value.join() : null;
          }

          break;
        default: {
          searchArr[fieldName] = o.value;
        }
      }
      return searchArr;
    });
  };

  const onSearch = () => {
    let errs = validateSearch();
    setTurnOnReactFetch(true);
    if (errs === null || errs === undefined || errs.length === 0) {
      let contractDateFrom = startDate,
        contractDateTo = endDate;
      let Obj = { ...searchParams };

      if (startDate) Obj = { ...Obj, contractDateFrom };
      if (endDate) Obj = { ...Obj, contractDateTo };

      fetchSmsrcus({ ...Obj, page });
    }
    setErrors(() => errs);
  };

  const validateSearch = () => {
    let errors = [];
    if (
      searchParams.bukrs === null ||
      searchParams.bukrs === undefined ||
      !searchParams.bukrs
    )
      errors.push(errorTableText(5));

    if (
      searchParams.branchId === null ||
      searchParams.branchId === undefined ||
      !searchParams.branchId
    )
      errors.push(errorTableText(7));

    return errors;
  };

  return (
    <div>
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing tertiary>
          <Header as="h2" floated="left">
            {messages['customer_search']}
          </Header>
        </Segment>
        <Divider />
        <Form>
          <Form.Group>
            <Form.Select
              required
              label={messages['bukrs']}
              onChange={(e, o) => {
                handleInputSearch(o, 'company');
              }}
              search
              selection
              options={companyList || []}
              placeholder={messages['bukrs']}
            />
            <Form.Button
              required
              label={messages['brnch']}
              color="pink"
              onClick={() => setF4BranchIsOpen(true)}
              icon
              labelPosition="right"
            >
              <Icon name="checkmark box" />
              {messages['select']}
            </Form.Button>
            <Form.Select
              label={messages['financial_status']}
              placeholder={messages['financial_status']}
              search
              selection
              multiple
              options={getContractStatus(contractStatus)}
              onChange={(e, o) => {
                handleInputSearch(o, 'finStatus');
              }}
            />
            <Form.Input
              label={
                <label>
                  {messages['Form.DateFrom']} <Icon name="calendar" />{' '}
                </label>
              }
            >
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                isClearable={startDate ? true : false}
                showMonthDropdown
                showYearDropdown
                colo="pink"
                selected={startDate ? stringYYYYMMDDToMoment(startDate) : null}
                onChange={event => {
                  event
                    ? setStartDate(momentToStringYYYYMMDD(event))
                    : setStartDate(event);
                }}
                dateFormat="YYYY.MM.DD"
                placeholderText={messages['Form.DateFrom']}
              />
            </Form.Input>

            <Form.Input
              label={
                <label>
                  {' '}
                  {messages['Form.DateTo']} <Icon name="calendar" />{' '}
                </label>
              }
            >
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                isClearable={endDate ? true : false}
                showMonthDropdown
                showYearDropdown
                selected={endDate ? stringYYYYMMDDToMoment(endDate) : null}
                onChange={date => {
                  date
                    ? setEndDate(momentToStringYYYYMMDD(date))
                    : setEndDate(date);
                }}
                dateFormat="YYYY.MM.DD"
                placeholderText={messages['Form.DateTo']}
              />
            </Form.Input>
            <Form.Field>
              <label>
                <br />
              </label>
              <Button color="pink" onClick={onSearch} icon>
                <Icon name="search" />
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
        <OutputErrors errors={errors} />
        <Divider />

        <Segment basic textAlign="right">
          <ColumnsModal
            tableHeaderCols={columnsForTable}
            tableThings={things => {
              setColumnsForTable(things);
              //store in localstorage
              let temp = {};
              things.map(el => {
                temp = { ...temp, [el.accessor]: el.show };
              });
              localStorage.setItem('smsrcus', JSON.stringify(temp));
            }}
          />
        </Segment>
        <List
          messages={messages}
          dynamicObject={dynamicObject}
          fetchSmsrcus={fetchSmsrcus}
          turnOnReactFetch={turnOnReactFetch}
          searchParams={searchParams}
          columnsForTable={columnsForTable}
        />
        <BranchF4Advanced
          branches={searchParams.bukrs ? branchList[searchParams.bukrs] : []}
          branches={searchParams.bukrs ? branchList[searchParams.bukrs] : []}
          isOpen={f4BranchIsOpen}
          onClose={selectedBranches => {
            let obj = { ...searchParams };
            setF4BranchIsOpen(false);

            if (selectedBranches.length !== 0) {
              obj.branchId = selectedBranches[0].value;
            } else {
              delete obj['branchId'];
            }

            setSearchParams(obj);
          }}
          selection="single"
        />
      </Container>
    </div>
  );
};

const getContractStatus = contractStatusList => {
  if (!contractStatusList) {
    return [];
  }
  let out = contractStatusList.map(c => {
    return {
      key: c.id,
      text: c.name,
      value: c.id,
    };
  });
  return out;
};
function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    branchList: state.userInfo.branchOptionsAll,
    companyList: state.userInfo.companyOptions,
    dynamicObject: state.serviceReducer.dynamicObject,
    contractStatus: state.serviceReducer.contractStatus,
  };
}
export default connect(mapStateToProps, {
  f4FetchWerksBranchList,
  fetchSmsrcus,
  clearDynObjService,
  fetchContractStatus,
})(injectIntl(Smsrcus));

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Form,
  Container,
  Divider,
  Icon,
  Segment,
  Dropdown,
  Checkbox,
  Popup,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../service.css';
//import moment from 'moment';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import ColumnsModal from '../../../utils/ColumnsModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
  momentToStringDDMMYYYY,
} from '../../../utils/helpers';
import { LinkToSmcusporFromSmsrcus } from '../../../utils/outlink';

import {
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
  f4FetchPhysStatus,
  f4FetchCurrentStaff,
} from '../../../reference/f4/f4_action';

import { fetchSmsrcusList, clearSmsrcusList } from './smsrcusAction';
import TotalCountsTable from '../../../utils/TotalCountsTable';

import DropdownClearable from '../../../utils/DropdownClearable';

const Smsrcus = props => {
  const {
    intl: { messages },
    language,
    countryList = [],
    contractStatusList,
    companyOptions = [],
    branches = [],
    category = [],
    smsrcusData = {},
    physStatus = [],
    branchOptionsService,
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    tovarCategoryId: '',
    contractStatusId: '',
    lastStateId: '',
    contractDateFrom: '',
    contractDateTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [blackListChecked, setBlackListChecked] = useState(false);
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(true);
  const [error, setError] = useState([]);

  const [columnsForTable, setColumnsForTable] = useState([]);

  const serviceBranchArr = Object.values(branchOptionsService);

  const allServiceBranches = [];
  for (let i = 0; i < Object.keys(branchOptionsService).length; i++) {
    allServiceBranches.push(...serviceBranchArr[i]);
  }

  console.log('allServiceBranches', allServiceBranches);
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

  let initialColumns = allServiceBranches
    ? [
        {
          Header: messages['brnch'],
          accessor: 'serviceBranchName',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),

          Filter: ({ filter, onChange }) => {
            return (
              <input
                onKeyPress={event => {
                  if (event.keyCode === 13 || event.which === 13) {
                    setTurnOnReactFetch(true);
                    onChange(event.target.value);
                  }
                }}
              />
            );
          },
          filterable: true,
          width: 90,
        },
        {
          Header: 'CN',
          accessor: 'contractNumber',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          Filter: ({ filter, onChange }) => {
            return (
              <input
                onKeyPress={event => {
                  if (event.keyCode === 13 || event.which === 13) {
                    setTurnOnReactFetch(true);
                    onChange(event.target.value);
                  }
                }}
              />
            );
          },

          width: 80,
        },
        {
          Header: 'Продукт',
          accessor: 'matnrName',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          filterable: false,
        },
        {
          Header: messages['factory_number'],
          headerStyle: { whiteSpace: 'pre-wrap' },
          accessor: 'tovarSn',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          Filter: ({ filter, onChange }) => {
            return (
              <input
                onKeyPress={event => {
                  if (event.keyCode === 13 || event.which === 13) {
                    setTurnOnReactFetch(true);
                    onChange(event.target.value);
                  }
                }}
              />
            );
          },
          width: 110,
        },
        {
          Header: messages['Crm.DateOfSale'],
          headerStyle: { whiteSpace: 'pre-wrap' },
          accessor: 'contractDate',
          Cell: row => {
            let momentDate = stringYYYYMMDDToMoment(row.value);
            let date = momentToStringDDMMYYYY(momentDate);
            return (
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                {date}
              </div>
            );
          },
          filterable: false,
          width: 90,
        },
        {
          Header: messages['full_name_of_client'],
          accessor: 'customerFIO',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          Filter: ({ filter, onChange }) => {
            return (
              <input
                onKeyPress={event => {
                  if (event.keyCode === 13 || event.which === 13) {
                    setTurnOnReactFetch(true);
                    onChange(event.target.value);
                  }
                }}
              />
            );
          },
        },
        {
          Header: messages['customer_key'],
          accessor: 'customerIinBin',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          Filter: ({ filter, onChange }) => {
            return (
              <input
                onKeyPress={event => {
                  if (event.keyCode === 13 || event.which === 13) {
                    setTurnOnReactFetch(true);
                    onChange(event.target.value);
                  }
                }}
              />
            );
          },
        },
        {
          Header: messages['address'],
          accessor: 'fullAddress',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          Filter: ({ filter, onChange }) => {
            return (
              <input
                onKeyPress={event => {
                  if (event.keyCode === 13 || event.which === 13) {
                    setTurnOnReactFetch(true);
                    onChange(event.target.value);
                  }
                }}
              />
            );
          },
          filterable: true,
          width: 200,
        },
        {
          Header: messages['telephone'],
          accessor: 'fullPhone',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          Filter: ({ filter, onChange }) => {
            return (
              <input
                onKeyPress={event => {
                  if (event.keyCode === 13 || event.which === 13) {
                    setTurnOnReactFetch(true);
                    onChange(event.target.value);
                  }
                }}
              />
            );
          },
        },
        {
          Header: 'F1',
          accessor: 'f1MtLeft',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          width: 40,
          filterable: false,
        },
        {
          Header: 'F2',
          accessor: 'f2MtLeft',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          width: 40,
          filterable: false,
        },
        {
          Header: 'F3',
          accessor: 'f3MtLeft',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          width: 40,
          filterable: false,
        },
        {
          Header: 'F4',
          accessor: 'f4MtLeft',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          width: 40,
          filterable: false,
        },
        {
          Header: 'F5',
          accessor: 'f5MtLeft',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          width: 40,
          filterable: false,
        },
        {
          Header: 'Категория',
          accessor: 'tovarCategoryName',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          filterable: false,
        },
        {
          Header: messages['financial_status'],
          headerStyle: { whiteSpace: 'pre-wrap' },
          accessor: 'contractStatusName',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          filterable: false,
          width: 100,
        },
        {
          Header: 'Физический статус',
          headerStyle: { whiteSpace: 'pre-wrap' },
          accessor: 'lastStateName',
          style: { 'white-space': 'unset' },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          filterable: false,
          width: 100,
        },
        {
          Header: 'ФИО диллера',
          accessor: 'dealerFIO',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          filterable: false,
        },
        {
          Header: 'Оператор',
          accessor: 'operatorFIO',
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          filterable: false,
        },

        {
          accessor: 'contractNumberBtnLink',
          Cell: original => {
            return (
              <Popup
                content={messages['customer_story']}
                trigger={
                  <div className="text-wrap" style={{ textAlign: 'center' }}>
                    <LinkToSmcusporFromSmsrcus
                      contractNumber={original.row.contractNumber}
                    />
                  </div>
                }
              />
            );
          },
          filterable: false,
          width: 50,
          fixed: 'right',
        },
      ]
    : [];

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smsrcusTable');
    if (transactionCodeText) {
      let transactionCodeObject = JSON.parse(transactionCodeText);

      let temp = initialColumns.map(item => {
        return { ...item, show: transactionCodeObject[item.accessor] };
      });

      console.log('table temp', temp);
      setColumnsForTable(temp);
    } else {
      setColumnsForTable(initialColumns);
    }
  }, []);

  //Список компании
  const countryOptions = countryList.map(item => {
    return {
      key: parseInt(item.countryId, 10),
      text: `${item.country}`,
      value: parseInt(item.countryId, 10),
    };
  });

  //Список фин. статусов
  const finStatusOptions = contractStatusList.map(item => {
    return {
      key: item.contract_status_id,
      text: item.name,
      value: item.contract_status_id,
    };
  });

  //Список категории
  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const physStatusOptions = physStatus.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    props.f4fetchCategory();
    props.f4FetchCountryList();
    props.f4FetchConStatusList();
    props.f4FetchBranches();
    props.f4FetchPhysStatus();
    props.f4FetchCurrentStaff();
  }, []);

  const handleClickSmsrcus = () => {
    // validate();
    // if (param.bukrs !== '') {
    //   const page = 0;
    //   const size = 20;
    //   setTurnOnReactFetch(true);
    // }
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
        case 'tovarCategoryId':
          prevParam.tovarCategoryId = o.value;
          break;
        case 'lastStateId':
          prevParam.lastStateId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'contractStatusId':
          console.log('o', o);
          prevParam.contractStatusId =
            o.value.length > 0 ? o.value.join() : null;
          break;
        case 'contractDateFrom':
          prevParam.contractDateFrom = o.value;
          break;
        case 'contractDateTo':
          prevParam.contractDateTo = o.value;
          break;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <Segment className="justifySegment">
        <h3>Поиск клиентов</h3>
        {blackListChecked == true ? (
          <Checkbox
            checked={blackListChecked}
            label="Черный список"
            onChange={() => setBlackListChecked(!blackListChecked)}
          />
        ) : (
          ''
        )}
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
              localStorage.setItem('smsrcusTable', JSON.stringify(temp));
            }}
          />
        </Form.Field>
      </Segment>
      {blackListChecked == true ? (
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>{messages['country']}</label>
                <DropdownClearable
                  fluid
                  placeholder={messages['country']}
                  value={param.countryId}
                  options={countryOptions}
                  onChange={(e, o) => onInputChange(o, 'countryId')}
                  className="alignBottom"
                  handleClear={() => setParam({ ...param, countryId: '' })}
                />
              </Form.Field>

              <Form.Field required>
                <label>{messages['bukrs']}</label>
                <DropdownClearable
                  fluid
                  placeholder={messages['bukrs']}
                  value={param.bukrs}
                  options={companyOptions}
                  onChange={(e, o) => onInputChange(o, 'bukrs')}
                  handleClear={() => setParam({ ...param, bukrs: '' })}
                />
              </Form.Field>

              <Form.Field>
                <label>{messages['brnch']}</label>
                <DropdownClearable
                  fluid
                  placeholder={messages['brnch']}
                  value={param.branchId}
                  options={branchOptionsService[param.bukrs]}
                  onChange={(e, o) => onInputChange(o, 'branchId')}
                  handleClear={() => setParam({ ...param, branchId: '' })}
                />
              </Form.Field>

              <Form.Field>
                <label>{messages['category']}</label>
                <DropdownClearable
                  fluid
                  placeholder={messages['category']}
                  value={param.tovarCategoryId}
                  options={categoryOptions}
                  onChange={(e, o) => onInputChange(o, 'tovarCategoryId')}
                  handleClear={() =>
                    setParam({ ...param, tovarCategoryId: '' })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Фин. статус</label>
                <Dropdown
                  selection
                  fluid
                  placeholder="Фин. статус"
                  options={finStatusOptions}
                  onChange={(e, o) => onInputChange(o, 'contractStatusId')}
                  className="alignBottom"
                  multiple
                />
              </Form.Field>

              <Form.Field>
                <label>Физ. статус</label>
                <Form.Select
                  selection
                  fluid
                  placeholder="Физ. статус"
                  options={physStatusOptions}
                  onChange={(e, o) => onInputChange(o, 'lastStateId')}
                  className="alignBottom"
                  multiple
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
                    dateFormat="DD.MM.YYYY"
                  />
                </Form.Field>
                <Form.Button
                  onClick={handleClickSmsrcus}
                  color="blue"
                  className="alignBottom"
                >
                  <Icon name="search" />
                  {messages['apply']}
                </Form.Button>
              </div>
            </Form.Group>
            <OutputErrors errors={error} />
          </Form>
        </Segment>
      ) : (
        ''
      )}

      <Divider />

      <TotalCountsTable count={smsrcusData.totalElements} />
      {allServiceBranches ? (
        <ReactTableServerSideWrapper
          data={smsrcusData ? smsrcusData.data : []}
          columns={columnsForTable}
          filterable={true}
          defaultPageSize={20}
          showPagination={true}
          requestData={params => {
            console.log('params', params);
            if (Object.keys(params).length > 3) {
              let initParams = {
                orderBy: null,
                direction: null,
                page: 0,
                size: 20,
              };

              if (JSON.stringify(initParams) !== JSON.stringify(params)) {
                props.fetchSmsrcusList({ ...params });
              }
            }
          }}
          pages={smsrcusData ? smsrcusData.totalPages : ''}
          turnOnReactFetch={turnOnReactFetch}
          style={{ height: 500 }}
        />
      ) : (
        ''
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    myApplication: state.smopccocReducer.myApplication,
    smsrcusData: state.smsrcusReducer.smsrcusData,
    branchOptionsService: state.userInfo.branchOptionsService,
    //
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    category: state.f4.category,
    contractStatusList: state.f4.contractStatusList,
    branches: state.f4.branches,
    physStatus: state.f4.physStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSmsrcusList,
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
  f4FetchPhysStatus,
  f4FetchCurrentStaff,
  clearSmsrcusList,
})(injectIntl(Smsrcus));

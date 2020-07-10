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
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../service.css';
import moment from 'moment';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../utils/ModalColumns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
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

  let initialColumns = [
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: 'Продукт',
      accessor: 'productName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: 'Дата продажи',
      accessor: 'contractDate',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: messages['full_name_of_client'],
      accessor: 'customerFIO',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
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
      Header: messages['telephone'],
      accessor: 'phoneNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['financial_status'],
      accessor: 'contractStatusName',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },
    {
      Header: 'Физический статус',
      accessor: 'lastStateId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
    },

    {
      Header: messages['customer_story'],
      checked: true,
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
      filterable: false,
    },
  ];

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
    // const page = 0;
    // const size = 20;

    // props.fetchSmsrcusList({ ...param, page, size });
    // setTurnOnReactFetch(true);
  }, []);

  const handleClickSmsrcus = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      props.fetchSmsrcusList({ ...param, page, size });
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

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  const serverSideSearch = ssParams => {
    let params = { ...ssParams };

    if (params.contractNumber != undefined || params.contractNumber != null) {
      if (params.contractNumber.length > 2) {
        props.fetchSmsrcusList({ ...params, ...param });
      } else {
        props.clearSmsrcusList();
      }
    }
    if (params.tovarSn != undefined || params.tovarSn != null) {
      if (params.tovarSn.length > 2) {
        props.fetchSmsrcusList({ ...params, ...param });
      } else {
        props.clearSmsrcusList();
      }
    }
    if (params.customerFIO != undefined || params.customerFIO != null) {
      if (params.customerFIO.length > 2) {
        props.fetchSmsrcusList({ ...params, ...param });
      } else {
        props.clearSmsrcusList();
      }
    }
    if (params.customerIinBin != undefined || params.customerIinBin != null) {
      if (params.customerIinBin.length > 2) {
        props.fetchSmsrcusList({ ...params, ...param });
      } else {
        props.clearSmsrcusList();
      }
    }
    if (params.address != undefined || params.address != null) {
      if (params.address.length > 2) {
        props.fetchSmsrcusList({ ...params, ...param });
      } else {
        props.clearSmsrcusList();
      }
    }
    if (params.phoneNumber != undefined || params.phoneNumber != null) {
      if (params.phoneNumber.length > 2) {
        props.fetchSmsrcusList({ ...params, ...param });
      } else {
        props.clearSmsrcusList();
      }
    }
  };

  return (
    <Container fluid className="containerMargin">
      <Segment>
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

              <Form.Field className="alignBottom">
                <ModalColumns columns={columns} finishColumns={finishColumns} />
              </Form.Field>
            </Form.Group>
            <OutputErrors errors={error} />
          </Form>
        </Segment>
      ) : (
        ''
      )}

      <Divider />

      <TotalCountsTable count={smsrcusData.totalElements} />
      <ReactTableServerSideWrapper
        data={smsrcusData ? smsrcusData.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => serverSideSearch(params)}
        pages={smsrcusData ? smsrcusData.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
        style={{ height: 500 }}
      />
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

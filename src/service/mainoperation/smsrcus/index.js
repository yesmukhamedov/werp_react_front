import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Form, Container, Divider, Icon, Segment } from 'semantic-ui-react';
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
} from '../../../reference/f4/f4_action';

import { fetchSmsrcusList } from './smsrcusAction';

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
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  console.log('serviceBranchOptions', serviceBranchOptions);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
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
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
    },
    {
      Header: messages['Table.Date'],
      accessor: 'contractDate',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      checked: true,
      filterable: false,
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
      Header: messages['customer_story'],
      checked: true,
      Cell: original => {
        console.log('ORIGINAL', original.row.contractNumber);
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
      text: item.oper_name_ru,
      value: item.id,
    };
  });

  console.log('physStatusOptions', physStatusOptions);

  useEffect(() => {
    props.f4fetchCategory();
    props.f4FetchCountryList();
    props.f4FetchConStatusList();
    props.f4FetchBranches();
    props.f4FetchPhysStatus();
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

  return (
    <Container fluid className="containerMargin">
      <Segment>
        <h3>Поиск клиентов</h3>
      </Segment>
      <Segment>
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
              fluid
              label={messages['category']}
              placeholder={messages['category']}
              options={categoryOptions}
              onChange={(e, o) => onInputChange(o, 'tovarCategoryId')}
              className="alignBottom"
            />

            <Form.Select
              fluid
              label="Фин. статус"
              placeholder="Фин. статус"
              options={finStatusOptions}
              onChange={(e, o) => onInputChange(o, 'contractStatusId')}
              className="alignBottom"
              multiple
            />
            <Form.Select
              fluid
              label="Физ. статус"
              placeholder="Физ. статус"
              options={physStatusOptions}
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
      </Segment>{' '}
      <Divider />
      <Segment>
        <h5>
          {`Общее количество: 
          ${smsrcusData.totalElements ? smsrcusData.totalElements : 0}`}
        </h5>
      </Segment>
      <ReactTableServerSideWrapper
        data={smsrcusData ? smsrcusData.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchSmsrcusList({ ...params, ...param });
        }}
        pages={smsrcusData ? smsrcusData.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
        style={{ height: 500 }}
        className="-striped"
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    myApplication: state.smopccocReducer.myApplication,
    smsrcusData: state.smsrcusReducer.smsrcusData,
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
})(injectIntl(Smsrcus));

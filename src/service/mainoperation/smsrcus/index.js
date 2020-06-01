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
import {
  LinkToSmcuspor,
  LinkToSmcusporFromSmsrcus,
} from '../../../utils/outlink';

import {
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
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
    myApplication,
    category = [],
    smsrcusData = {},
  } = props;

  console.log('smsrcusData', smsrcusData);

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    contractStatusId: '',
    contractDateFrom: '',
    contractDateTo: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

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

  useEffect(() => {
    props.f4fetchCategory();
    props.f4FetchCountryList();
    props.f4FetchConStatusList();
    props.f4FetchBranches();
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

        case 'categoryId':
          prevParam.categoryId = o.value;
          break;

        case 'contractStatusId':
          prevParam.contractStatusId = o.value;
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
              onChange={(e, o) => onInputChange(o, 'categoryId')}
              className="alignBottom"
            />

            <Form.Select
              fluid
              label="Фин. статус"
              placeholder="Фин. статус"
              options={finStatusOptions}
              onChange={(e, o) => onInputChange(o, 'contractStatusId')}
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
  };
}

export default connect(mapStateToProps, {
  fetchSmsrcusList,
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
})(injectIntl(Smsrcus));

// import React, { useEffect, useState } from 'react';
// import { injectIntl } from 'react-intl';
// import { connect } from 'react-redux';
// import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
// import List from './list';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import OutputErrors from '../../../general/error/outputErrors';
// import { f4FetchWerksBranchList } from '../../../reference/f4/f4_action';
// import ColumnsModal from '../../../utils/ColumnsModal';
// import moment from 'moment';
// import { errorTableText } from '../../../utils/helpers';
// import { LinkToSmcusporFromSmsrcus } from '../../../utils/outlink';

// import {
//   Segment,
//   Container,
//   Header,
//   Button,
//   Form,
//   Icon,
//   Divider,
// } from 'semantic-ui-react';
// import {
//   fetchSmsrcus,
//   clearDynObjService,
//   fetchContractStatus,
// } from '../../serviceAction';
// import {
//   stringYYYYMMDDToMoment,
//   momentToStringYYYYMMDD,
// } from '../../../utils/helpers';

// const Smsrcus = props => {
//   const {
//     intl: { messages },
//     companyList = [],
//     language,
//     branchList,
//     fetchSmsrcus,
//     dynamicObject,
//     clearDynObjService,
//     fetchContractStatus,
//     contractStatus,
//   } = props;

//   const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
//   let page = dynamicObject.totalPages ? dynamicObject.totalPages : 1;
//   const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
//   const [errors, setErrors] = useState([]);
//   let emptySearch = {
//     branchId: '',
//     bukrs: '',
//   };
//   const [searchParams, setSearchParams] = useState({ ...emptySearch });
//   const date = new Date();
//   const y = date.getFullYear();
//   const m = date.getMonth();
//   const [startDate, setStartDate] = useState(
//     momentToStringYYYYMMDD(moment(new Date(y - 1, m, 1))),
//   );
//   const [endDate, setEndDate] = useState(
//     momentToStringYYYYMMDD(moment(new Date())),
//   );

//   let allColumns = [
//     {
//       Header: messages['brnch'],
//       accessor: 'branchName',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//       filterable: false,
//     },
//     {
//       Header: 'CN',
//       accessor: 'contractNumber',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//     },
//     {
//       Header: messages['factory_number'],
//       accessor: 'tovarSerial',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//     },
//     {
//       Header: messages['Table.Date'],
//       accessor: 'contractDate',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//       filterable: false,
//     },
//     {
//       Header: messages['financial_status'],
//       accessor: 'contractStatusName',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//       filterable: false,
//     },
//     {
//       Header: messages['full_name_of_client'],
//       accessor: 'customerName',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//     },
//     {
//       Header: messages['customer_key'],
//       accessor: 'iinBin',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//     },
//     {
//       Header: messages['address'],
//       accessor: 'fullAddress',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//     },
//     {
//       Header: messages['telephone'],
//       accessor: 'fullPhone',
//       Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
//       show: true,
//     },
//     {
//       Header: messages['customer_story'],
//       show: true,
//       Cell: row => (
//         <div style={{ textAlign: 'center' }}>
//           <LinkToSmcusporFromSmsrcus
//             contractNumber={row.original.contractNumber}
//           />
//         </div>
//       ),
//       filterable: false,
//     },
//   ];

//   const [columnsForTable, setColumnsForTable] = useState([]);

//   useEffect(() => {
//     fetchContractStatus();
//     clearDynObjService();
//   }, []);

//   useEffect(() => {
//     const transactionCodeText = localStorage.getItem('smsrcus');
//     if (transactionCodeText) {
//       let transactionCodeObject = JSON.parse(transactionCodeText);

//       let temp = allColumns.map(item => {
//         return { ...item, show: transactionCodeObject[item.accessor] };
//       });
//       setColumnsForTable(temp);
//     } else {
//       setColumnsForTable(allColumns);
//     }
//   }, []);

//   const handleInputSearch = (o, fieldName) => {
//     setSearchParams(prev => {
//       let searchArr = { ...prev };
//       switch (fieldName) {
//         case 'company':
//           {
//             searchArr.bukrs = o.value;
//           }
//           break;
//         case 'finStatus':
//           {
//             searchArr.contractStatusIds =
//               o.value.length > 0 ? o.value.join() : null;
//           }

//           break;
//         default: {
//           searchArr[fieldName] = o.value;
//         }
//       }
//       return searchArr;
//     });
//   };

//   const onSearch = () => {
//     let errs = validateSearch();
//     setTurnOnReactFetch(true);
//     if (errs === null || errs === undefined || errs.length === 0) {
//       let contractDateFrom = startDate,
//         contractDateTo = endDate;
//       let Obj = { ...searchParams };

//       if (startDate) Obj = { ...Obj, contractDateFrom };
//       if (endDate) Obj = { ...Obj, contractDateTo };

//       fetchSmsrcus({ ...Obj, page });
//     }
//     setErrors(() => errs);
//   };

//   const validateSearch = () => {
//     let errors = [];
//     if (
//       searchParams.bukrs === null ||
//       searchParams.bukrs === undefined ||
//       !searchParams.bukrs
//     )
//       errors.push(errorTableText(5));

//     if (
//       searchParams.branchId === null ||
//       searchParams.branchId === undefined ||
//       !searchParams.branchId
//     )
//       errors.push(errorTableText(7));

//     return errors;
//   };

//   return (
//     <div>
//       <Container
//         fluid
//         style={{
//           marginTop: '2em',
//           marginBottom: '2em',
//           paddingLeft: '2em',
//           paddingRight: '2em',
//         }}
//       >
//         <Segment clearing tertiary>
//           <Header as="h2" floated="left">
//             {messages['customer_search']}
//           </Header>
//         </Segment>
//         <Divider />
//         <Form>
//           <Form.Group>
//             <Form.Select
//               required
//               label={messages['bukrs']}
//               onChange={(e, o) => {
//                 handleInputSearch(o, 'company');
//               }}
//               search
//               selection
//               options={companyList || []}
//               placeholder={messages['bukrs']}
//             />
//             <Form.Button
//               required
//               label={messages['brnch']}
//               color="pink"
//               onClick={() => setF4BranchIsOpen(true)}
//               icon
//               labelPosition="right"
//             >
//               <Icon name="checkmark box" />
//               {messages['select']}
//             </Form.Button>
//             <Form.Select
//               label={messages['financial_status']}
//               placeholder={messages['financial_status']}
//               search
//               selection
//               multiple
//               options={getContractStatus(contractStatus)}
//               onChange={(e, o) => {
//                 handleInputSearch(o, 'finStatus');
//               }}
//             />
//             <Form.Input
//               label={
//                 <label>
//                   {messages['Form.DateFrom']} <Icon name="calendar" />{' '}
//                 </label>
//               }
//             >
//               <DatePicker
//                 autoComplete="off"
//                 locale={language}
//                 dropdownMode="select" //timezone="UTC"
//                 isClearable={startDate ? true : false}
//                 showMonthDropdown
//                 showYearDropdown
//                 colo="pink"
//                 selected={startDate ? stringYYYYMMDDToMoment(startDate) : null}
//                 onChange={event => {
//                   event
//                     ? setStartDate(momentToStringYYYYMMDD(event))
//                     : setStartDate(event);
//                 }}
//                 dateFormat="YYYY.MM.DD"
//                 placeholderText={messages['Form.DateFrom']}
//               />
//             </Form.Input>

//             <Form.Input
//               label={
//                 <label>
//                   {' '}
//                   {messages['Form.DateTo']} <Icon name="calendar" />{' '}
//                 </label>
//               }
//             >
//               <DatePicker
//                 autoComplete="off"
//                 locale={language}
//                 dropdownMode="select" //timezone="UTC"
//                 isClearable={endDate ? true : false}
//                 showMonthDropdown
//                 showYearDropdown
//                 selected={endDate ? stringYYYYMMDDToMoment(endDate) : null}
//                 onChange={date => {
//                   date
//                     ? setEndDate(momentToStringYYYYMMDD(date))
//                     : setEndDate(date);
//                 }}
//                 dateFormat="YYYY.MM.DD"
//                 placeholderText={messages['Form.DateTo']}
//               />
//             </Form.Input>
//             <Form.Field>
//               <label>
//                 <br />
//               </label>
//               <Button color="pink" onClick={onSearch} icon>
//                 <Icon name="search" />
//               </Button>
//             </Form.Field>
//           </Form.Group>
//         </Form>
//         <OutputErrors errors={errors} />
//         <Divider />

//         <Segment basic textAlign="right">
//           <ColumnsModal
//             tableHeaderCols={columnsForTable}
//             tableThings={things => {
//               setColumnsForTable(things);
//               //store in localstorage
//               let temp = {};
//               things.map(el => {
//                 temp = { ...temp, [el.accessor]: el.show };
//               });
//               localStorage.setItem('smsrcus', JSON.stringify(temp));
//             }}
//           />
//         </Segment>
//         <List
//           messages={messages}
//           dynamicObject={dynamicObject}
//           fetchSmsrcus={fetchSmsrcus}
//           turnOnReactFetch={turnOnReactFetch}
//           searchParams={searchParams}
//           columnsForTable={columnsForTable}
//         />
//         <BranchF4Advanced
//           branches={searchParams.bukrs ? branchList[searchParams.bukrs] : []}
//           branches={searchParams.bukrs ? branchList[searchParams.bukrs] : []}
//           isOpen={f4BranchIsOpen}
//           onClose={selectedBranches => {
//             let obj = { ...searchParams };
//             setF4BranchIsOpen(false);

//             if (selectedBranches.length !== 0) {
//               obj.branchId = selectedBranches[0].value;
//             } else {
//               delete obj['branchId'];
//             }

//             setSearchParams(obj);
//           }}
//           selection="single"
//         />
//       </Container>
//     </div>
//   );
// };

// const getContractStatus = contractStatusList => {
//   if (!contractStatusList) {
//     return [];
//   }
//   let out = contractStatusList.map(c => {
//     return {
//       key: c.id,
//       text: c.name,
//       value: c.id,
//     };
//   });
//   return out;
// };

// function mapStateToProps(state) {
//   return {
//     language: state.locales.lang,
//     branchList: state.userInfo.branchOptionsAll,
//     companyList: state.userInfo.companyOptions,
//     dynamicObject: state.serviceReducer.dynamicObject,
//     contractStatus: state.serviceReducer.contractStatus,
//   };
// }
// export default connect(mapStateToProps, {
//   f4FetchWerksBranchList,
//   fetchSmsrcus,
//   clearDynObjService,
//   fetchContractStatus,
// })(injectIntl(Smsrcus));

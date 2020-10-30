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
  Input,
  Checkbox,
  Label,
  Table,
  Button,
  Popup,
  Modal,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../service.css';
import moment from 'moment';
import ReactTableServerSideWrapperFilteredState from '../../../utils/ReactTableServerSideWrapperFilteredState';
import ColumnsModal from '../../../utils/ColumnsModal';
import 'react-datepicker/dist/react-datepicker.css';
import {
  stringYYYYMMDDToMoment,
  momentToStringDDMMYYYY,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LinkToDmsc03, LinkToSmcuspor } from '../../../utils/outlink';

import {
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchConTypeList,
  f4FetchBranches,
  f4FetchPhysStatus,
  f4FetchCurrentStaff,
} from '../../../reference/f4/f4_action';

import {
  fetchSmsrcusList,
  clearSmsrcusList,
  //
  fetchSmsrcusClient,
  //
  fetchSmsrcusBlackList,
  clearSmsrcusBlackList,
  postSmsrcusDeactivateClientFilter,
} from './smsrcusAction';
import TotalCountsTable from '../../../utils/TotalCountsTable';

import DropdownClearable from '../../../utils/DropdownClearable';

const Smsrcus = props => {
  const {
    intl: { messages },
    smsrcusData = {},
    smsrcusBlackListData = {},
    branchOptionsService = {},
    countryList = [],
    category = [],
    contractStatusList = [],
    contractTypeList = [],
    companyOptions = [],
    branchOptions = [],
    physStatusOptions = [],
    smsrcusClient = {},
  } = props;

  const mainCellStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const emptyParam = {
    serviceBranchId: null,
    contractNumber: null,
    contractTypeId: null,
    tovarSn: null,
    customerFIO: null,
    customerIinBin: null,
    fullAddress: null,
    fullPhone: null,
  };

  const emptyBlackListParam = {
    countryId: '',
    bukrs: '',
    serviceBranchId: '',
    tovarCategoryId: '',
    contractStatusId: [],
    contractDateFrom: '',
    contractDateTo: '',
    lastStateId: '',
  };

  const [serverSideParams, setServerSideParams] = useState({});
  const [serverSideParamsBlack, setServerSideParamsBlack] = useState({});
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [turnOnReactFetchBlack, setTurnOnReactFetchBlack] = useState(false);

  const [param, setParam] = useState({ ...emptyParam });
  const [bukrs, setBukrs] = useState(null);
  //Параметры черного списка
  const [blackListParam, setBlackListParam] = useState({
    ...emptyBlackListParam,
  });

  const [blackList, setBlackList] = useState(false);

  const [tablePage, setTablePage] = useState(0);
  const [tablePageBlack, setTablePageBlack] = useState(0);

  const [smsrcusClientList, setSmsrcusClientList] = useState([]);

  const productOptions = bukrs
    ? contractTypeList
        .filter(item => parseInt(item.bukrs) == parseInt(bukrs))
        .map(item => {
          return {
            key: item.contract_type_id,
            text: item.name,
            value: item.contract_type_id,
          };
        })
    : contractTypeList.map(item => {
        return {
          key: item.contract_type_id,
          text: item.name,
          value: item.contract_type_id,
        };
      });

  const branchObjValues = Object.values(branchOptionsService);
  const servBrOptions = [];
  const arr = branchObjValues.map(item => {
    servBrOptions.push(...item);
  });
  const serviceBranchOptions = bukrs
    ? branchOptionsService[bukrs]
    : servBrOptions;

  useEffect(() => {
    if (Object.keys(smsrcusClient).length > 0) {
      if (smsrcusClientList.length > 0) {
        smsrcusClientList.map(item =>
          item.contractnumber == smsrcusClient.contractnumber
            ? setSmsrcusClientList(
                smsrcusClientList.map(item =>
                  item.contractnumber == smsrcusClient.contractnumber
                    ? { ...smsrcusClient }
                    : item,
                ),
              )
            : setSmsrcusClientList([...smsrcusClientList, smsrcusClient]),
        );
      } else {
        setSmsrcusClientList([...smsrcusClientList, smsrcusClient]);
      }
    }
  }, [smsrcusClient]);

  let initialColumns = [
    {
      expander: true,
      Header: '',
      width: 65,
      getProps: (state, rowInfo, column) => {
        return {
          style: mainCellStyle,
        };
      },
      Expander: ({ isExpanded, original, ...rest }) => {
        return (
          <div className="fullCell">
            {isExpanded ? (
              <div className="expandPlus" style={mainCellStyle}>
                <Icon color="blue" name="minus square outline" />
              </div>
            ) : (
              <div
                className="expandPlus"
                onClick={() =>
                  props.fetchSmsrcusClient(original.contractNumber)
                }
                style={mainCellStyle}
              >
                <Icon color="blue" name="plus square outline" />
              </div>
            )}
          </div>
        );
      },
      style: {
        cursor: 'pointer',
        fontSize: 25,
        padding: '0',
        textAlign: 'center',
        userSelect: 'none',
        color: 'green',
      },
    },
    {
      Header: messages['brnch'],
      accessor: 'serviceBranchName',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 90,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          <LinkToDmsc03 snNum={row.value} />
        </div>
      ),

      width: 80,
    },
    {
      Header: 'Продукт',
      accessor: 'contractTypeName',
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
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['address'],
      accessor: 'fullAddress',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),

      filterable: false,
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
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      filterable: false,
      width: 100,
    },

    {
      accessor: 'contractNumberBtnLink',
      Cell: original => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            <LinkToSmcuspor contractNumber={original.row.contractNumber} />
          </div>
        );
      },
      filterable: false,
      width: 50,
      fixed: 'right',
    },
  ];

  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smsrcusTable');
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

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
    };
  });

  const tovarCategoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const finStatusOptions = contractStatusList.map(item => {
    return {
      key: item.contract_status_id,
      text: item.name,
      value: item.contract_status_id,
    };
  });

  const getPhysStatus = value => {
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

  useEffect(() => {
    props.f4fetchCategory();
    props.f4FetchCountryList();
    props.f4FetchConTypeList();
    props.f4FetchConStatusList();
    props.f4FetchBranches();
    props.f4FetchPhysStatus();
    props.f4FetchCurrentStaff();
  }, []);

  //Поиск
  const handleApplySearch = () => {
    setColumnsForTable([...initialColumns]);
    props.clearSmsrcusList();
    setServerSideParams({});

    setTablePage(0);
    props.fetchSmsrcusList({ ...param, page: 0, size: 20 }, () =>
      setTurnOnReactFetch(true),
    );
  };

  //Очистить фильтр
  const handleClearAllFilter = () => {
    setParam({ ...emptyParam });
    setBukrs(null);
    props.clearSmsrcusList();
  };

  const [filtered, setFiltered] = useState([]);
  const [filteredBlack, setFilteredBlack] = useState([]);

  const onChangeBlackList = (value, fieldName) => {
    switch (fieldName) {
      case 'countryId':
        setBlackListParam({ ...blackListParam, countryId: value });
        break;
      case 'bukrs':
        setBlackListParam({ ...blackListParam, bukrs: value });
        break;
      case 'serviceBranchId':
        setBlackListParam({ ...blackListParam, serviceBranchId: value });
        break;
      case 'tovarCategoryId':
        setBlackListParam({ ...blackListParam, tovarCategoryId: value });
        break;
      case 'contractStatusId':
        setBlackListParam({
          ...blackListParam,
          contractStatusId: value.length > 0 ? value.join() : null,
        });
        break;
      case 'lastStateId':
        setBlackListParam({
          ...blackListParam,
          lastStateId: value.length > 0 ? value.join() : null,
        });
        break;
    }
  };

  const handleClear = fieldName => {
    switch (fieldName) {
      case 'countryId':
        setBlackListParam({ ...blackListParam, countryId: null });
        break;
      case 'bukrs':
        setBlackListParam({ ...blackListParam, bukrs: null });
        break;
      case 'serviceBranchId':
        setBlackListParam({ ...blackListParam, serviceBranchId: null });
        break;
      case 'tovarCategoryId':
        setBlackListParam({ ...blackListParam, tovarCategoryId: null });
        break;
    }
  };

  //Поиск по черным клиентам
  const handleApplyBlackList = () => {
    if (blackListParam.bukrs) {
      setColumnsForTable([...initialColumns]);
      props.clearSmsrcusBlackList();
      setServerSideParamsBlack({});
      setTablePageBlack(0);
      props.fetchSmsrcusBlackList(
        { ...blackListParam, page: 0, size: 20 },
        () => setTurnOnReactFetchBlack(true),
      );
    } else {
      alert('Выберите компанию');
    }
  };

  const [modalDelete, setModalDelete] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});

  const btnDeactivateFilter = (contractNumber, id) => {
    setModalDelete(true);
    setDeleteModalData({
      contractNumber: contractNumber,
      id: id,
    });
  };

  const confirmDeleteFilter = () => {
    props.postSmsrcusDeactivateClientFilter(
      deleteModalData.contractNumber,
      deleteModalData.id,

      () => {
        let deleteFilter = smsrcusClientList.filter(
          item => item.contractnumber !== deleteModalData.contractNumber,
        );

        setSmsrcusClientList([...deleteFilter]);
        setModalDelete(false);
      },
    );
  };

  return (
    <Container fluid className="containerMargin">
      <Segment className="justifySegment">
        <h3>Поиск клиентов {blackList == true ? '(Черный список)' : ''}</h3>

        <Checkbox
          checked={blackList}
          label="Поиск по черным спискам"
          onChange={(o, event) => setBlackList(event.checked)}
        />
      </Segment>
      <Modal closeIcon open={modalDelete} onClose={() => setModalDelete(false)}>
        <Modal.Content>
          <h3>Вы действительно хотите деактивировать?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalDelete(false)}>
            <Icon name="remove" /> Нет
          </Button>
          <Button color="green" onClick={() => confirmDeleteFilter()}>
            <Icon name="checkmark" /> Да
          </Button>
        </Modal.Actions>
      </Modal>

      {blackList == true ? (
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>{messages['country']}</label>
                <DropdownClearable
                  options={countryOptions}
                  value={blackListParam.countryId}
                  placeholder={messages['country']}
                  onChange={(e, { value }) =>
                    onChangeBlackList(value, 'countryId')
                  }
                  handleClear={() => handleClear('countryId')}
                />
              </Form.Field>

              <Form.Field required>
                <label>{messages['bukrs']}</label>

                <DropdownClearable
                  options={companyOptions}
                  value={blackListParam.bukrs}
                  placeholder={messages['bukrs']}
                  onChange={(e, { value }) => onChangeBlackList(value, 'bukrs')}
                  handleClear={() => handleClear('bukrs')}
                />
              </Form.Field>

              <Form.Field>
                <label>{messages['brnch']}</label>
                <DropdownClearable
                  options={
                    serviceBranchOptions.length > 0 ? serviceBranchOptions : []
                  }
                  value={blackListParam.serviceBranchId}
                  placeholder={messages['brnch']}
                  onChange={(e, { value }) =>
                    onChangeBlackList(value, 'serviceBranchId')
                  }
                  handleClear={() => handleClear('serviceBranchId')}
                />
              </Form.Field>

              <Form.Field>
                <label>{messages['category']}</label>
                <DropdownClearable
                  options={tovarCategoryOptions}
                  value={blackListParam.tovarCategoryId}
                  placeholder={messages['category']}
                  onChange={(e, { value }) =>
                    onChangeBlackList(value, 'tovarCategoryId')
                  }
                  handleClear={() => handleClear('tovarCategoryId')}
                />
              </Form.Field>

              <Form.Select
                label={messages['fin_status']}
                placeholder={messages['fin_status']}
                options={finStatusOptions}
                onChange={(e, { value }) =>
                  onChangeBlackList(value, 'contractStatusId')
                }
                className="alignBottom"
                multiple
              />

              <Form.Select
                fluid
                label={messages['phys_status']}
                placeholder={messages['phys_status']}
                options={getPhysStatus(physStatusOptions)}
                onChange={(e, { value }) =>
                  onChangeBlackList(value, 'lastStateId')
                }
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
                      blackListParam.contractDateFrom === ''
                        ? ''
                        : stringYYYYMMDDToMoment(
                            blackListParam.contractDateFrom,
                          )
                    }
                    onChange={date =>
                      setBlackListParam({
                        ...blackListParam,
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
                    dropdownMode="select" //timezone="UTC"
                    placeholderText={messages['Form.DateTo']}
                    selected={
                      blackListParam.contractDateTo === ''
                        ? ''
                        : stringYYYYMMDDToMoment(blackListParam.contractDateTo)
                    }
                    onChange={date =>
                      setBlackListParam({
                        ...blackListParam,
                        contractDateTo: momentToStringYYYYMMDD(date),
                      })
                    }
                    dateFormat="DD.MM.YYYY"
                  />
                </Form.Field>
                <Form.Button
                  onClick={handleApplyBlackList}
                  color="blue"
                  className="alignBottom"
                >
                  <Icon name="search" />
                  Поиск
                </Form.Button>
              </div>
            </Form.Group>
          </Form>
          <Divider />
          <div className="flexJustifySpaceBeetween">
            <TotalCountsTable count={smsrcusBlackListData.totalElements} />
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
          </div>
          <ReactTableServerSideWrapperFilteredState
            data={smsrcusBlackListData.data}
            columns={columnsForTable}
            filterable={false}
            defaultPageSize={20}
            showPagination={true}
            requestData={params => {
              //props.fetchSmsrcusList({ ...param, ...params });
              setServerSideParamsBlack({ ...params });
              props.fetchSmsrcusBlackList(
                { ...blackListParam, ...params },
                () => setTurnOnReactFetchBlack(true),
              );
            }}
            filtered={filteredBlack}
            onFilteredChange={filtered => {
              // this.setState({ filtered });
            }}
            page={tablePageBlack}
            onPageChange={pageIndex => setTablePageBlack(pageIndex)}
            pages={smsrcusBlackListData ? smsrcusBlackListData.totalPages : ''}
            turnOnReactFetch={turnOnReactFetchBlack}
            style={{ height: 500 }}
            SubComponent={({ row }) => {
              const filterSubRow = smsrcusClientList.filter(
                item => item.contractnumber === row.contractNumber,
              );
              return (
                <Segment
                  style={{ backgroundColor: 'rgb(202 241 222)' }}
                  className="flexColumn"
                >
                  <div>
                    ФИО диллера:{' '}
                    {filterSubRow.length > 0
                      ? filterSubRow[0].contract.dealerFIO
                      : ''}
                  </div>
                  <Table celled color="violet">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Категория</Table.HeaderCell>
                        <Table.HeaderCell>Оператор</Table.HeaderCell>
                        <Table.HeaderCell>F1</Table.HeaderCell>
                        <Table.HeaderCell>F2</Table.HeaderCell>
                        <Table.HeaderCell>F3</Table.HeaderCell>
                        <Table.HeaderCell>F4</Table.HeaderCell>
                        <Table.HeaderCell>F5</Table.HeaderCell>
                        <Table.HeaderCell>Дейсвия</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {filterSubRow.length > 0
                        ? filterSubRow[0].filter.map((item, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>{item.id}</Table.Cell>
                              <Table.Cell>{item.crmCategoryName}</Table.Cell>
                              <Table.Cell>{item.planOperatorFIO}</Table.Cell>
                              <Table.Cell>{item.f1MtLeft}</Table.Cell>
                              <Table.Cell>{item.f2MtLeft}</Table.Cell>
                              <Table.Cell>{item.f3MtLeft}</Table.Cell>
                              <Table.Cell>{item.f4MtLeft}</Table.Cell>
                              <Table.Cell>{item.f5MtLeft}</Table.Cell>
                              <Table.Cell>
                                <Popup
                                  content="Деактивировать"
                                  trigger={
                                    <Button
                                      size="mini"
                                      circular
                                      color="red"
                                      icon="x"
                                      onClick={() =>
                                        btnDeactivateFilter(
                                          filterSubRow[0].contractnumber,
                                          item.id,
                                        )
                                      }
                                    />
                                  }
                                />
                              </Table.Cell>
                            </Table.Row>
                          ))
                        : ''}
                    </Table.Body>
                  </Table>
                </Segment>
              );
            }}
          />
        </Segment>
      ) : (
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>{messages['bukrs']}</label>
                <DropdownClearable
                  options={companyOptions}
                  value={bukrs ? bukrs : ''}
                  placeholder={messages['bukrs']}
                  onChange={(e, { value }) => {
                    setBukrs(value);
                    setParam({
                      ...param,
                      serviceBranchId: null,
                      contractTypeId: null,
                    });
                  }}
                  handleClear={() => {
                    setBukrs(null);
                    setParam({
                      ...param,
                      serviceBranchId: null,
                      contractTypeId: null,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Филиал</label>
                <Dropdown
                  selection
                  fluid
                  placeholder="Филиал"
                  options={serviceBranchOptions}
                  onChange={(o, { value }) => {
                    setParam({ ...param, serviceBranchId: value.join() });
                  }}
                  className="alignBottom"
                  multiple
                  value={
                    param.serviceBranchId
                      ? param.serviceBranchId.split(',').map(Number)
                      : []
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Продукт</label>
                <Dropdown
                  selection
                  fluid
                  placeholder="Филиал"
                  options={productOptions}
                  onChange={(o, { value }) => {
                    setParam({ ...param, contractTypeId: value.join() });
                  }}
                  className="alignBottom"
                  multiple
                  value={
                    param.contractTypeId
                      ? param.contractTypeId.split(',').map(Number)
                      : []
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>CN</label>
                <Input
                  value={param.contractNumber ? param.contractNumber : ''}
                  placeholder="CN"
                  fluid
                  onChange={event =>
                    setParam({ ...param, contractNumber: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Заводской номер</label>
                <Input
                  value={param.tovarSn ? param.tovarSn : ''}
                  placeholder="Заводской номер"
                  fluid
                  onChange={event =>
                    setParam({ ...param, tovarSn: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>ФИО клиента</label>
                <Input
                  value={param.customerFIO ? param.customerFIO : ''}
                  placeholder="ФИО клиента"
                  fluid
                  onChange={event =>
                    setParam({ ...param, customerFIO: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>ИИН клиента</label>
                <Input
                  value={param.customerIinBin ? param.customerIinBin : ''}
                  placeholder="ИИН клиента"
                  fluid
                  onChange={event =>
                    setParam({ ...param, customerIinBin: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Адрес клиента</label>
                <Input
                  value={param.fullAddress ? param.fullAddress : ''}
                  placeholder="Адрес клиента"
                  fluid
                  onChange={event =>
                    setParam({ ...param, fullAddress: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Телефон клиента</label>
                <Input
                  value={param.fullPhone ? param.fullPhone : ''}
                  placeholder="Телефон клиента"
                  fluid
                  onChange={event =>
                    setParam({ ...param, fullPhone: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Button
                color="blue"
                className="alignBottom"
                onClick={handleApplySearch}
              >
                <Icon name="search" />
                Поиск
              </Form.Button>

              <Form.Button
                color="red"
                className="alignBottom"
                onClick={handleClearAllFilter}
              >
                <Icon name="x" />
                Очистить фильтр
              </Form.Button>
            </Form.Group>
          </Form>
          <Divider />
          <div className="flexJustifySpaceBeetween">
            <TotalCountsTable count={smsrcusData.totalElements} />
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
          </div>
          <ReactTableServerSideWrapperFilteredState
            data={smsrcusData.data}
            columns={columnsForTable}
            filterable={false}
            defaultPageSize={20}
            showPagination={true}
            requestData={params => {
              //props.fetchSmsrcusList({ ...param, ...params });
              setServerSideParams({ ...params });
              props.fetchSmsrcusList({ ...param, ...params }, () =>
                setTurnOnReactFetch(true),
              );
            }}
            filtered={filtered}
            onFilteredChange={filtered => {
              // this.setState({ filtered });
            }}
            page={tablePage}
            onPageChange={pageIndex => setTablePage(pageIndex)}
            pages={smsrcusData ? smsrcusData.totalPages : ''}
            turnOnReactFetch={turnOnReactFetch}
            style={{ height: 500 }}
            SubComponent={({ row }) => {
              const filterSubRow = smsrcusClientList.filter(
                item => item.contractnumber === row.contractNumber,
              );
              return (
                <Segment
                  style={{ backgroundColor: 'rgb(202 241 222)' }}
                  className="flexColumn"
                >
                  <div>
                    ФИО диллера:{' '}
                    {filterSubRow.length > 0
                      ? filterSubRow[0].contract.dealerFIO
                      : ''}
                  </div>
                  <Table celled color="violet">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Категория</Table.HeaderCell>
                        <Table.HeaderCell>Оператор</Table.HeaderCell>
                        <Table.HeaderCell>F1</Table.HeaderCell>
                        <Table.HeaderCell>F2</Table.HeaderCell>
                        <Table.HeaderCell>F3</Table.HeaderCell>
                        <Table.HeaderCell>F4</Table.HeaderCell>
                        <Table.HeaderCell>F5</Table.HeaderCell>
                        <Table.HeaderCell>Дейсвия</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {filterSubRow.length > 0
                        ? filterSubRow[0].filter.map((item, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>{item.id}</Table.Cell>
                              <Table.Cell>{item.crmCategoryName}</Table.Cell>
                              <Table.Cell>{item.planOperatorFIO}</Table.Cell>
                              <Table.Cell>{item.f1MtLeft}</Table.Cell>
                              <Table.Cell>{item.f2MtLeft}</Table.Cell>
                              <Table.Cell>{item.f3MtLeft}</Table.Cell>
                              <Table.Cell>{item.f4MtLeft}</Table.Cell>
                              <Table.Cell>{item.f5MtLeft}</Table.Cell>
                              <Table.Cell>
                                <Popup
                                  content="Деактивировать"
                                  trigger={
                                    <Button
                                      size="mini"
                                      circular
                                      color="red"
                                      icon="x"
                                      onClick={() =>
                                        btnDeactivateFilter(
                                          filterSubRow[0].contractnumber,
                                          item.id,
                                        )
                                      }
                                    />
                                  }
                                />
                              </Table.Cell>
                            </Table.Row>
                          ))
                        : ''}
                    </Table.Body>
                  </Table>
                </Segment>
              );
            }}
          />
        </Segment>
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    myApplication: state.smopccocReducer.myApplication,
    smsrcusData: state.smsrcusReducer.smsrcusData,
    smsrcusClient: state.smsrcusReducer.smsrcusClient,
    smsrcusBlackListData: state.smsrcusReducer.smsrcusBlackListData,
    branchOptionsService: state.userInfo.branchOptionsService,
    //
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    category: state.f4.category,
    contractStatusList: state.f4.contractStatusList,
    contractTypeList: state.f4.contractTypeList,
    branches: state.f4.branches,
    physStatusOptions: state.f4.physStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSmsrcusList,
  fetchSmsrcusClient,
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
  f4FetchPhysStatus,
  f4FetchCurrentStaff,
  f4FetchConTypeList,
  clearSmsrcusList,
  fetchSmsrcusBlackList,
  clearSmsrcusBlackList,
  postSmsrcusDeactivateClientFilter,
})(injectIntl(Smsrcus));

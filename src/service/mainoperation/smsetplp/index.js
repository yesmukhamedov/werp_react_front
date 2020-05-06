import React, { useState, useEffect } from 'react';
import {
  Container,
  Segment,
  Header,
  Button,
  Icon,
  Form,
  Grid,
  Modal,
  Label,
  Table,
  Input,
  Dropdown,
} from 'semantic-ui-react';
import {
  fetchSmsetplp,
  postSmsetplp,
  editSmsetplp,
  fetchOperationTypeList,
} from '../../serviceAction';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Edit from './edit';
import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
import {
  f4FetchWerksBranchList,
  f4FetchCountryList,
} from '../../../reference/f4/f4_action';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import ColumnsModal from '../../../utils/ColumnsModal';
import List from './list';
require('moment/locale/ru');
require('moment/locale/tr');

const Smsetplp = props => {
  const {
    intl: { messages },
    countryList,
    companyOptions,
    branchOptions,
    fetchSmsetplp,
    dynamicObject,
    postSmsetplp,
    fetchOperationTypeList,
    operationTypeList,
  } = props;

  useEffect(() => {
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
    fetchOperationTypeList();
  }, []);
  const [bukrs, setBukrs] = useState({});
  const [dateAt, setDateAt] = useState(momentToStringYYYYMMDD(moment()));
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branchF4IsOpen, setBranchF4IsOpen] = useState(false);
  const [postParams, setPostParams] = useState({});
  const [brnchErr, setBrnchErr] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const language = localStorage.getItem('language');
  const [iss, setIss] = useState();

  let allColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrs', //Name Ф
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['country'],
      accessor: 'countryId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },

    {
      Header: messages['type_of_operation'],
      accessor: 'operationTypeId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['current_base_plan'],
      accessor: 'currentBasePlan',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['current_plan'],
      accessor: 'currentPlan', //Name', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['overdue_base_plan'],
      accessor: 'overDueBasePlan', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['overdue_plan'],
      accessor: 'overDuePlan', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['total_plan_amount'],
      accessor: 'totalSumPlan', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      show: true,
    },
    {
      Header: messages['BTN__EDIT'],
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <Edit
            getCountryOptions={getCountryOptions}
            getBranchOptions={getBranchOptions}
            getOperationList={getOperationList}
            row={row.original}
          />
        </div>
      ),
      show: true,
    },
  ];

  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smsetplp');
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

  const handleSearch = () => {
    let searchParams = {};
    if (Object.keys(bukrs).length > 0) {
      searchParams.bukrs = bukrs;
    }
    if (selectedBranches) {
      searchParams.branchId = selectedBranches;
    }

    if (dateAt) {
      searchParams.dateAt = dateAt;
    }
    fetchSmsetplp({ ...searchParams });
  };

  const handleChange = (label, o) => {
    let temporaryObj = { ...postParams };
    switch (label) {
      case 'bukrs': {
        if (
          temporaryObj.bukrs !== o.value &&
          temporaryObj.bukrs &&
          temporaryObj.branchId
        ) {
          temporaryObj.branchId = '';
          setBrnchErr(true);
        }
        temporaryObj.bukrs = o.value;

        break;
      }
      case 'countryId': {
        if (
          temporaryObj.countryId !== o.value &&
          temporaryObj.countryId &&
          temporaryObj.branchId
        ) {
          temporaryObj.branchId = '';
          setBrnchErr(true);
        }
        temporaryObj.countryId = o.value;
        break;
      }
      case 'branchId': {
        temporaryObj.branchId = o.value;
        setBrnchErr(false);
        break;
      }
      case 'currentBasePlan': {
        temporaryObj.currentBasePlan = Number(o.value);
        break;
      }
      case 'currentPlan': {
        temporaryObj.currentPlan = Number(o.value);
        break;
      }
      case 'operationId': {
        temporaryObj.operationTypeId = Number(o.value);
        break;
      }
      case 'overDueBasePlan': {
        temporaryObj.overDueBasePlan = Number(o.value);
        break;
      }
      case 'overDuePlan': {
        temporaryObj.overDuePlan = Number(o.value);
        break;
      }
    }
    temporaryObj.totalSumPlan =
      (temporaryObj.currentPlan || 0) + (temporaryObj.overDuePlan || 0);
    setPostParams({ ...temporaryObj });
  };

  const handlePost = () => {
    let searchParams = {
      burs: postParams.bukrs,
      branchId: postParams.branchId,
    };
    postSmsetplp({ ...postParams }, () => {
      setPostOpen(false);
      setPostParams({});
      console.log('postParams.bukrs', postParams.bukrs);
      fetchSmsetplp(searchParams);
    });
  };

  return (
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
          {messages['settings_of_plan_and_percent']}{' '}
        </Header>
        <Button
          color="pink"
          onClick={() => {
            setPostOpen(true);
          }}
          floated="right"
          icon
          labelPosition="left"
        >
          <Icon name="add circle" size="large" />
          {messages['BTN__ADD']}
        </Button>
      </Segment>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Group>
                <Form.Select
                  label={messages['bukrs']}
                  clearable="true"
                  selection
                  options={companyOptions || []}
                  placeholder={messages['bukrs']}
                  onChange={(e, o) => {
                    setBukrs(o.value);
                  }}
                />
                <Form.Button
                  label={messages['brnch']}
                  color="pink"
                  onClick={() => setBranchF4IsOpen(true)}
                  icon
                  labelPosition="right"
                >
                  <Icon name="checkmark box" />
                  {messages['select']}
                </Form.Button>

                <Form.Field>
                  <label>{messages['Table.Date']}</label>
                  <DatePicker
                    className="date-auto-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    isClearable={dateAt ? true : false}
                    dropdownMode="select" // timezone="UTC"
                    selected={dateAt ? stringYYYYMMDDToMoment(dateAt) : ''}
                    locale={language}
                    onChange={date => {
                      date
                        ? setDateAt(momentToStringYYYYMMDD(date))
                        : setDateAt(date);
                    }}
                    dateFormat="YYYY.MM.DD "
                    placeholderText={messages['Table.Date']}
                  />
                </Form.Field>

                <Form.Field>
                  <label>
                    <br />
                  </label>
                  <Button
                    color="pink"
                    onClick={() => {
                      handleSearch();
                    }}
                    icon
                  >
                    {' '}
                    <Icon name="search" />{' '}
                  </Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>
                  <br />
                </label>
                <p align="right">
                  {' '}
                  <ColumnsModal
                    tableHeaderCols={columnsForTable}
                    tableThings={things => {
                      setColumnsForTable(things);
                      //store in localstorage
                      let temp = {};
                      things.map(el => {
                        temp = { ...temp, [el.accessor]: el.show };
                      });
                      localStorage.setItem('smsetplp', JSON.stringify(temp));
                    }}
                  />
                </p>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Modal open={postOpen} size="tiny">
        <Segment style={{ padding: 0 }} clearing inverted color="blue">
          <Button
            size="mini"
            color="red"
            floated="right"
            icon
            onClick={() => {
              setPostOpen(false);
              setPostParams({});
            }}
          >
            <Icon name="close" />{' '}
          </Button>{' '}
          <br />
          <br />
          <Header style={{ margin: 0 }} textAlign="center" as="h2">
            {messages['BTN__ADD']}{' '}
          </Header>{' '}
          <br />
        </Segment>
        <Modal.Content>
          <Grid centered>
            <Grid.Row>
              <Grid.Column>
                <Table striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={7}>
                        <Label size="large" basic>
                          {' '}
                          {messages['bukrs']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          onChange={(e, o) => {
                            handleChange('bukrs', o);
                          }}
                          options={companyOptions || []}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {messages['country']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          onChange={(e, o) => {
                            handleChange('countryId', o);
                          }}
                          search
                          options={getCountryOptions(countryList)}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {' '}
                        <Label size="large" basic>
                          {' '}
                          {messages['brnch']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          error={brnchErr ? true : false}
                          onChange={(e, o) => {
                            handleChange('branchId', o);
                          }}
                          search
                          options={
                            postParams.bukrs
                              ? getBranchOptions(
                                  branchOptions[postParams.bukrs],
                                  postParams.countryId,
                                )
                              : []
                          }
                        />
                        {brnchErr ? (
                          <Label basic color="red" pointing>
                            {messages['enter_again']}
                          </Label>
                        ) : (
                          ''
                        )}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {messages['type_of_operation']}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          options={getOperationList(operationTypeList) || []}
                          onChange={(e, o) => {
                            handleChange('operationId', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {messages['current_base_plan']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          onChange={(e, o) => {
                            handleChange('currentBasePlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['current_plan']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          onChange={(e, o) => {
                            handleChange('currentPlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['overdue_base_plan']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          onChange={(e, o) => {
                            handleChange('overDueBasePlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['overdue_plan']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          onChange={(e, o) => {
                            handleChange('overDuePlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['total_plan_amount']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={
                            (postParams.currentPlan || 0) +
                            (postParams.overDuePlan || 0)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <div align="center">
                  {' '}
                  <Button
                    color="pink"
                    onClick={() => {
                      handlePost();
                    }}
                  >
                    {' '}
                    {messages['BTN__ADD']}{' '}
                  </Button>{' '}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>

      <List dynamicObject={dynamicObject} tableCols={columnsForTable} />

      <BranchF4Advanced
        branches={bukrs || bukrs !== undefined ? branchOptions[bukrs] : []}
        isOpen={branchF4IsOpen}
        countries={countryList}
        onClose={selectedBranches => {
          setBranchF4IsOpen(false);
          setSelectedBranches(
            selectedBranches.length !== 0 ? selectedBranches[0].value : '',
          );
        }}
        selection={'single'}
      />
    </Container>
  );
};

const getOperationList = operationTypeList => {
  if (!operationTypeList) {
    return [];
  }
  let out = (operationTypeList = operationTypeList.map(el => {
    return {
      key: el.id,
      text: el.name,
      value: el.id,
    };
  }));
  return out;
};

const getCountryOptions = countryList => {
  const countryLst = countryList;
  if (!countryLst) {
    return [];
  }
  let out = countryLst.map(c => {
    return {
      key: c.countryId,
      text: c.country,
      value: c.countryId,
    };
  });
  return out;
};

const getBranchOptions = (branchList, countryId) => {
  if (!branchList || !countryId) {
    return [];
  }
  let out = [],
    j = 0;
  for (let i = 0; i < branchList.length; i++) {
    if (branchList[i].countryid === countryId) {
      out[j] = branchList[i];
      j++;
    }
  }
  return out;
};
const mapStateToProps = state => {
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    dynamicObject: state.serviceReducer.dynamicObject,
    operationTypeList: state.serviceReducer.operationTypeList,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  fetchSmsetplp,
  postSmsetplp,
  editSmsetplp,
  fetchOperationTypeList,
})(injectIntl(Smsetplp));

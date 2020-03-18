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
import { fetchSmsetplp, postSmsetplp, editSmsetplp } from '../../serviceAction';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
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
    editSmsetplp,
  } = props;

  useEffect(() => {
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
  }, []);

  const [bukrs, setBukrs] = useState({});
  const [dateAt, setDateAt] = useState(momentToStringYYYYMMDD(moment()));
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branchF4IsOpen, setBranchF4IsOpen] = useState(false);
  const [postParams, setPostParams] = useState({});
  const [brnchErr, setBrnchErr] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const language = localStorage.getItem('language');

  const handleSearch = () => {
    let searchParams = {};
    if (Object.keys(bukrs).length > 0) {
      searchParams.bukrs = bukrs;
    }
    if (selectedBranches.length > 0) {
      searchParams.branchId = selectedBranches;
    }
    fetchSmsetplp({ searchParams, dateAt });
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
        temporaryObj.currentBasePlan = o.value;
        break;
      }
      case 'currentPlan': {
        temporaryObj.currentPlan = o.value;
        break;
      }
      case 'operationId': {
        temporaryObj.operationId = o.value;
        break;
      }
      case 'overDueBasePlan': {
        temporaryObj.overDueBasePlan = o.value;
        break;
      }
      case 'overDuePlan': {
        temporaryObj.overDuePlan = o.value;
        break;
      }
      case 'totalSumPlan': {
        temporaryObj.totalSumPlan = o.value;
        break;
      }
    }
    setPostParams({ ...temporaryObj });
  };

  const handlePost = () => {
    postSmsetplp({ ...postParams });
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
          primary
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
                  color="blue"
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
                    {' '}
                    <br />{' '}
                  </label>
                  <Button
                    primary
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
                  {' '}
                  <br />{' '}
                </label>
                <Button floated="right" primary>
                  {' '}
                  {messages['save']}{' '}
                </Button>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Modal open={postOpen} size="tiny">
        <Segment clearing inverted color="blue">
          <Button
            size="mini"
            color="red"
            icon
            floated="right"
            onClick={() => setPostOpen(false)}
          >
            <Icon name="close" />{' '}
          </Button>
          <Header className="addHeader" textAlign="center" as="h2">
            {messages['BTN__ADD']}{' '}
          </Header>
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
                          {' '}
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
                          {' '}
                          {messages['type_of_operation']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          options={companyOptions || []}
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
                          onChange={(e, o) => {
                            handleChange('totalSumPlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <div align="center">
                  {' '}
                  <Button
                    primary
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

      <List
        messages={messages}
        dynamicObject={dynamicObject}
        countryList={countryList}
        companyOptions={companyOptions}
        branchOptions={branchOptions}
        getCountryOptions={getCountryOptions}
        getBranchOptions={getBranchOptions}
        editSmsetplp={editSmsetplp}
      />

      <BranchF4Advanced
        branches={bukrs || bukrs !== undefined ? branchOptions[bukrs] : []}
        isOpen={branchF4IsOpen}
        countries={countryList}
        onClose={selectedBranches => {
          setBranchF4IsOpen(false);
          setSelectedBranches(selectedBranches);
        }}
        selection={'single'}
      />
    </Container>
  );
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
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  fetchSmsetplp,
  postSmsetplp,
  editSmsetplp,
})(injectIntl(Smsetplp));

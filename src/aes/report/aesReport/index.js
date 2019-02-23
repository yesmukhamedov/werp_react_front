import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchDepartmentList,
  f4FetchCountryList,
  f4FetchStaffList,
} from '../../../reference/f4/f4_action';
import {
  fetchCCBranch,
  fetchAll,
  newAes,
  fetchReport,
  findCompBrCode,
  findObject,
} from '../../aesAction';
import {
  Label,
  Container,
  Modal,
  Button,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import IndexForm from './indexForm';
import AddOwner from './addOwner';
import AddExaminer1 from './addExaminer1';
import SubSection from './subSection';
import { injectIntl } from 'react-intl';

class AesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {},
      localParams: {},
      comp: '',
    };
    this.loadCCBranch = this.loadCCBranch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.Search = this.Search.bind(this);
    this.Rejected = this.Rejected.bind(this);
    this.defaultSearch = this.defaultSearch.bind(this);
    this.loadCompBr = this.loadCompBr.bind(this);
    this.se0 = this.se0.bind(this);
    this.se1 = this.se1.bind(this);
  }

  /****************************find sub items  */

  findType1(os_id) {
    this.props.findObject('/api/aes/find/type1/', os_id);
  }

  findType2(type1_id) {
    this.props.findObject('/api/aes/find/type2/', type1_id);
  }
  findType3(type2_id) {
    this.props.findObject('/api/aes/find/type3/', type2_id);
  }
  findDetail(type3_id) {
    this.props.findObject('/api/aes/find/det/', type3_id);
  }

  defaultSearch() {
    let { queryParams } = this.state;
    queryParams['apprej'] = null;
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
    this.callAction();
  }

  Search() {
    let { queryParams } = this.state;
    queryParams['apprej'] = 1;
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
    this.callAction();
  }

  Rejected() {
    let { queryParams } = this.state;
    queryParams['apprej'] = 0;
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
    this.callAction();
  }

  se0(se0) {
    console.log('se0 ', se0);
    const queryParams = this.state.queryParams;
    queryParams['se0_id'] = se0.staffId;
    (queryParams['se0_name'] = se0.fio),
      this.setState({ ...this.state, queryParams: queryParams });
  }

  se1(se1) {
    const queryParams = this.state.queryParams;
    queryParams['se1_id'] = se1.staffId;
    queryParams['se1_name'] = se1.fio;
    this.setState({ ...this.state, queryParams: queryParams });
  }

  callAction() {
    this.props.fetchReport(this.state.queryParams);
  }

  handleInputChange(value, dataType) {
    let { queryParams } = this.state;
    switch (dataType) {
      case 'btFrom':
        queryParams[dataType] = value.format('YYYY-MM-DD');
        break;
      case 'btTo':
        queryParams[dataType] = value.format('YYYY-MM-DD');
        break;
      case 'dateFrom':
        queryParams[dataType] = value.format('YYYY-MM-DD');
        break;
      case 'dateTo':
        queryParams[dataType] = value.format('YYYY-MM-DD');
        break;
      case 'bukrs':
        queryParams['bukrs'] = value;
        break;
      case 'country_id':
        queryParams['country_id'] = value;
        break;
      case 'branch_id':
        queryParams['branch_id'] = value;
        break;
      case 'dep_id':
        queryParams['dep_id'] = value;
        break;
      case 'price':
        queryParams['price'] = value.value;
        break;
      case 'quantity':
        queryParams['quantity'] = value.value;
        break;
      default:
        queryParams[dataType] = value;
    }
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }
  show = dimmer => () => {
    this.setState({
      ...this.state,
      comp: dimmer,
      open: true,
    });
  };
  close = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      btTo,
      btFrom,
      dateFrom,
      dateTo,
      branch_id,
    } = this.state.queryParams;
    const { listAes } = this.props;
    const { messages } = this.props.intl;
    const isEnabledSe2 = branch_id != null;
    console.log('this props ', this.props);
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
        <IndexForm
          companyOptions={this.getCompanyOptions()}
          countryOptions={this.getCountryOptions()}
          branchOptions={this.getBranches()}
          depOptns={this.getDepartments()}
          loadCCBranch={this.loadCCBranch}
          loadCompBr={this.loadCompBr}
          loadBranches={this.loadBranches}
          //os options
          listOs={this.getOs()}
          listType1={this.getType1()}
          listType2={this.getType2()}
          listType3={this.getType3()}
          listDetail={this.getDetail()}
          listRooms={this.getRoom()}
          listStatus={this.getStatus()}
          inputChange={this.handleInputChange}
          queryParams={this.state.queryParams}
          localParams={this.state.localParams}
          messages={messages}
          //find sub items
          findType1={this.findType1.bind(this)}
          findType2={this.findType2.bind(this)}
          findType3={this.findType3.bind(this)}
          findDetail={this.findDetail.bind(this)}
        />

        <Segment padded size="small">
          <Label color="blue" ribbon>
            {messages['position']}
          </Label>
          <Table color={'grey'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{messages['owner']}</Table.HeaderCell>
                <Table.HeaderCell>{messages['examiner']}</Table.HeaderCell>
                <Table.HeaderCell>
                  <span>
                    {messages['approved']} / {messages['rejected']}
                  </span>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="calendar" />
                  {messages['buying_date_from']}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="calendar" />
                  {messages['buying_date_to']}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="calendar" />
                  {messages['Form.DateFrom']}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="calendar" />
                  {messages['Form.DateTo']}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {messages['inventory_code']}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={3}>
                  <span>
                    <Button
                      icon="external"
                      disabled={!isEnabledSe2}
                      onClick={this.show('owner')}
                    />
                    {this.state.queryParams.se0_name}
                  </span>
                </Table.Cell>
                <Table.Cell width={3}>
                  <span>
                    <Button icon="external" onClick={this.show('examiner1')} />
                    {this.state.queryParams.se1_name}
                  </span>
                </Table.Cell>
                <Table.Cell width={2}>
                  <Button
                    icon="check circle outline"
                    onClick={this.Search}
                    primary
                  />{' '}
                  <label className="formLabel">&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <Button
                    icon="cancel"
                    onClick={this.Rejected}
                    style={{ background: '#ff4d4d', color: 'white' }}
                  />
                </Table.Cell>
                <Table.Cell width={1}>
                  <DatePicker
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    dateFormat="DD.MM.YYYY"
                    selected={btFrom ? moment(btFrom) : null}
                    locale="ru"
                    onChange={v => this.handleInputChange(v, 'btFrom')}
                  />
                </Table.Cell>
                <Table.Cell width={1}>
                  <DatePicker
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    dateFormat="DD.MM.YYYY"
                    selected={btTo ? moment(btTo) : null}
                    locale="ru"
                    onChange={v => this.handleInputChange(v, 'btTo')}
                  />
                </Table.Cell>
                <Table.Cell width={1}>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    label=""
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="DD.MM.YYYY"
                    selected={dateFrom ? moment(dateFrom) : null}
                    onChange={v => this.handleInputChange(v, 'dateFrom')}
                  />
                </Table.Cell>
                <Table.Cell width={1}>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    label=""
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="DD.MM.YYYY"
                    selected={dateTo ? moment(dateTo) : null}
                    onChange={v => this.handleInputChange(v, 'dateTo')}
                  />
                </Table.Cell>
                <Table.Cell width={4}>
                  {listAes.map((code, i) => (
                    <strong key={i}>
                      {code.country_id}-{code.dep_id}-{code.os_code}-
                      {code.type1_code}-{code.type2_code}-{code.type3_code}-
                      {code.detail_code}-{code.room_code}-{code.status_code}
                      <br />
                    </strong>
                  ))}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Modal open={this.state.open} onClose={this.close} size="large">
            <Modal.Header>
              {(this.state.comp == 'owner' && messages['owner']) ||
                (this.state.comp == 'examiner1' && messages['examiner1'])}
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {(this.state.comp == 'owner' && (
                  <AddOwner
                    messages={messages}
                    open={true}
                    handleClose={this.close}
                    se0={this.se0}
                    staffList={this.props.staffList}
                  />
                )) ||
                  (this.state.comp == 'examiner1' && (
                    <AddExaminer1
                      messages={messages}
                      handleClose={this.close}
                      se1={this.se1}
                      companyOpts={this.props.companyOptions}
                    />
                  ))}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={this.close}>
                {messages['cancel']}
              </Button>
            </Modal.Actions>
          </Modal>
        </Segment>
        <SubSection
          messages={messages}
          listAes={this.props.listAes}
          apprRejected={this.ApprRejected}
        />
        <Button floated="right" onClick={this.defaultSearch} color="blue">
          {messages['search']}
        </Button>
        <br />
      </Container>
    );
  }

  componentWillMount() {
    this.props.f4FetchCountryList();
    this.props.f4FetchDepartmentList();
    this.props.fetchAll();
  }

  getCompanyOptions() {
    const { companyOptions } = this.props;
    if (!companyOptions) {
      return [];
    }
    let out = companyOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text} ${parseInt(c.value, 10)}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  }

  getCountryOptions() {
    if (!this.props.countryList) {
      return [];
    }
    const { countryList } = this.props;
    let out = countryList.map(c => {
      return {
        key: parseInt(c.countryId, 10),
        text: `${c.country} ${parseInt(c.countryId, 10)}`,
        currency: c.currency,
        value: parseInt(c.countryId, 10),
      };
    });
    return out;
  }

  getBranches() {
    const branchOptions = this.props.branchOptions;

    if (!this.props.branchOptions) {
      return [];
    }
    let map = [];
    for (let item in branchOptions) {
      map.push({
        key: branchOptions[item]['id'],
        text: `${branchOptions[item]['branch_name']} ${
          branchOptions[item]['id']
        }`,
        value: branchOptions[item]['id'],
      });
    }
    return map;
  }

  getDepartments() {
    const depOptions = this.props.departmentOptions;
    if (!this.props.departmentOptions) {
      return [];
    }
    let map = [];
    for (let k in depOptions) {
      map.push({
        key: depOptions[k]['key'],
        text: `${depOptions[k]['text']} ${depOptions[k]['value']}`,
        value: depOptions[k]['value'],
      });
    }
    return map;
  }
  loadCCBranch(country_id) {
    const queryParams = this.state.queryParams;
    queryParams.bukrs && queryParams.country_id
      ? this.props.fetchCCBranch(queryParams.bukrs, queryParams.country_id)
      : '';
  }

  loadCompBr(branch_id) {
    const queryParams = this.state.queryParams;
    if (queryParams.bukrs && queryParams.branch_id) {
      const staffs = this.props.f4FetchStaffList(
        'fcis',
        queryParams.bukrs,
        queryParams.branch_id,
        '',
        '',
        false,
        value => this.setState({ loading: false }),
      );
      this.props.findCompBrCode(queryParams.bukrs, branch_id);
    }
  }
  /*************************************************************************************GET OS  */
  getOs() {
    if (!this.props.listAll.listOs) {
      return [];
    }
    const { listOs } = this.props.listAll;
    let out = listOs.map(os => {
      return {
        key: parseInt(os.id, 10),
        text: `${os.os_name} ${parseInt(os.os_code, 10)}`,
        value: parseInt(os.id, 10),
      };
    });
    return out;
  }

  getType1() {
    if (!this.props.listAll.listType1) {
      return [];
    }
    const { listType1 } = this.props.listAll;
    let out = listType1.map(type1 => {
      return {
        key: parseInt(type1.id, 10),
        text: `${type1.type1_name} ${parseInt(type1.type1_code, 10)}`,
        value: parseInt(type1.id, 10),
      };
    });
    return out;
  }

  getType2() {
    if (!this.props.listAll.listType2) {
      return [];
    }
    const { listType2 } = this.props.listAll;
    let out = listType2.map(type2 => {
      return {
        key: parseInt(type2.id, 10),
        text: `${type2.type2_name} ${parseInt(type2.type2_code, 10)}`,
        value: parseInt(type2.id, 10),
      };
    });
    return out;
  }

  getType3() {
    if (!this.props.listAll.listType3) {
      return [];
    }
    const { listType3 } = this.props.listAll;
    let out = listType3.map(type3 => {
      return {
        key: parseInt(type3.id, 10),
        text: `${type3.type3_name} ${parseInt(type3.type3_code, 10)}`,
        value: parseInt(type3.id, 10),
      };
    });
    return out;
  }

  getDetail() {
    if (!this.props.listAll.listDetail) {
      return [];
    }
    const { listDetail } = this.props.listAll;
    let out = listDetail.map(detail => {
      return {
        key: parseInt(detail.id, 10),
        text: `${detail.detail_name} ${parseInt(detail.detail_code, 10)}`,
        value: parseInt(detail.id, 10),
      };
    });
    return out;
  }

  getRoom() {
    if (!this.props.listAll.listRoom) {
      return [];
    }
    const { listRoom } = this.props.listAll;
    let out = listRoom.map(room => {
      return {
        key: parseInt(room.id, 10),
        text: `${parseInt(room.room_code, 10)}`,
        value: parseInt(room.room_code, 10),
      };
    });
    return out;
  }

  getStatus() {
    if (!this.props.listAll.listStatus) {
      return [];
    }
    const { listStatus } = this.props.listAll;
    let out = listStatus.map(st => {
      return {
        key: parseInt(st.id, 10),
        text: `${st.status_name} ${parseInt(st.status_code, 10)}`,
        value: parseInt(st.status_code, 10),
      };
    });
    return out;
  }
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    branchOptions: state.aesReducer.listBranches,
    departmentOptions: state.f4.departmentOptions,
    listAll: state.aesReducer.listAll,
    staffList: state.f4.staffList,
    queryParams: state.aesReducer.queryParams,
    listAes: state.aesReducer.listAes,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchCountryList,
    f4FetchDepartmentList,
    fetchCCBranch,
    findCompBrCode,
    fetchAll,
    f4FetchStaffList,
    newAes,
    fetchReport,
    findObject,
  },
)(injectIntl(AesReport));

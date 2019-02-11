import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchDepartmentList,
  f4FetchCountryList,
} from '../../../reference/f4/f4_action';
import { Container, Modal, Button, Segment, Grid } from 'semantic-ui-react';
import IndexForm from './indexForm';
import AddOsName from './addItem/addOsName';
import AddType1 from './addItem/addType1';
import AddType2 from './addItem/addType2';
import AddType3 from './addItem/addType3';
import AddOsDetail from './addItem/addOsDetail';
import AddRoomNum from './addItem/addRoomNum';
import AddStatus from './addItem/addStatus';
import AddCompBr from './addItem/addCompBr';
import { injectIntl } from 'react-intl';

import _ from 'lodash';
import {
  fetchAll,
  newOs,
  newType1,
  newType2,
  newType3,
  newDetail,
  newRnum,
  newStatus,
  newCompBr,
  fetchCCBranch,
} from '../../aesAction';

class AssetRef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comp: '',
      queryParams: {},
      open: false,
    };

    this.loadCCBranch = this.loadCCBranch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    // add new Items
    this.newOs = this.newOs.bind(this);
    this.newType1 = this.newType1.bind(this);
    this.newType2 = this.newType2.bind(this);
    this.newType3 = this.newType3.bind(this);
    this.newDetail = this.newDetail.bind(this);
    this.newRnum = this.newRnum.bind(this);
    this.newStatus = this.newStatus.bind(this);
    this.newCompBr = this.newCompBr.bind(this);
  }

  newOs(newOs) {
    this.props.newOs(newOs);
  }
  newType1(newtype1) {
    this.props.newType1(newtype1);
  }
  newType2(newtype2) {
    this.props.newType2(newtype2);
  }
  newType3(newType3) {
    this.props.newType3(newType3);
  }
  newDetail(newDetail) {
    this.props.newDetail(newDetail);
  }
  newRnum(newRnum) {
    this.props.newRnum(newRnum);
  }
  newStatus(newStatus) {
    this.props.newStatus(newStatus);
  }
  newCompBr(newCompBr) {
    this.props.newCompBr(newCompBr);
  }

  handleInputChange(value, dataType) {
    let { queryParams } = this.state;
    switch (dataType) {
      case 'bukrs':
        queryParams['bukrs'] = value;
        break;
      case 'country_id':
        queryParams['country_id'] = value;
        break;
      case 'state_id':
        queryParams['state_id'] = value;
        break;
      case 'branch_id':
        queryParams['branch_id'] = value;
        break;
      case 'dep_id':
        queryParams['dep_id'] = value;
        break;
      case 'compbr_code':
        queryParams['compbr_code'] = value;
      default:
        queryParams[dataType] = value;
        break;
    }

    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  render() {
    const { open, dimmer } = this.state;
    const { messages } = this.props.intl;
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
          countryOpts={this.getCountryOptions()}
          companyOpts={this.getCompanyOptions()}
          branchOptns={this.getBranches()}
          depOptns={this.getDepartments()}
          loadCCBranch={this.loadCCBranch}
          inputChange={this.handleInputChange}
          //------ last button options
          osList={this.getOs()}
          listType1={this.getType1()}
          listType2={this.getType2()}
          listType3={this.getType3()}
          listDetail={this.getDetail()}
          listRoom={this.getRoom()}
          listStatus={this.getStatus()}
          compbranchOpts={this.getCompBrCodes()}
          messages={messages}
          {...this.state}
        />
        <Segment padded size="small" color={'grey'}>
          <Grid columns={8}>
            <Grid.Row>
              <Grid.Column>
                <Button color="teal" onClick={this.show('comp_br')}>
                  {messages['add_compbr_code']}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" onClick={this.show('room_num')}>
                  {messages['add_room']}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" onClick={this.show('os_name')}>
                  {messages['add_os']}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" onClick={this.show('type1')}>
                  {messages['add_type1']}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" onClick={this.show('type2')}>
                  {messages['add_type2']}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" onClick={this.show('type3')}>
                  {messages['add_type3']}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" onClick={this.show('os_detail')}>
                  {messages['add_det']}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" onClick={this.show('status')}>
                  {messages['add_cond']}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>
            {(this.state.comp == 'os_name' && messages['add_os']) ||
              (this.state.comp == 'type1' && messages['add_type1']) ||
              (this.state.comp == 'type2' && messages['add_type2']) ||
              (this.state.comp == 'type3' && messages['add_type3']) ||
              (this.state.comp == 'os_detail' && messages['add_det']) ||
              (this.state.comp == 'room_num' && messages['add_room']) ||
              (this.state.comp == 'status' && messages['add_cond']) ||
              messages['add_compbr_code']}
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              {(this.state.comp == 'os_name' && (
                <AddOsName
                  messages={messages}
                  handleClose={this.close}
                  newOs={this.newOs}
                />
              )) ||
                (this.state.comp == 'type1' && (
                  <AddType1
                    messages={messages}
                    handleClose={this.close}
                    newType1={this.newType1}
                  />
                )) ||
                (this.state.comp == 'type2' && (
                  <AddType2
                    messages={messages}
                    handleClose={this.close}
                    newType2={this.newType2}
                  />
                )) ||
                (this.state.comp == 'type3' && (
                  <AddType3
                    messages={messages}
                    handleClose={this.close}
                    newType3={this.newType3}
                  />
                )) ||
                (this.state.comp == 'os_detail' && (
                  <AddOsDetail
                    messages={messages}
                    handleClose={this.close}
                    newDetail={this.newDetail}
                  />
                )) ||
                (this.state.comp == 'room_num' && (
                  <AddRoomNum
                    messages={messages}
                    handleClose={this.close}
                    newRnum={this.newRnum}
                  />
                )) ||
                (this.state.comp == 'status' && (
                  <AddStatus
                    messages={messages}
                    handleClose={this.close}
                    newStatus={this.newStatus}
                  />
                )) ||
                (this.state.comp == 'comp_br' && (
                  <AddCompBr
                    messages={messages}
                    handleClose={this.close}
                    newCompBr={this.newCompBr}
                    bukrs={this.state.queryParams.bukrs}
                    branch_id={this.state.queryParams.branch_id}
                  />
                ))}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Container>
    );
  }

  show = dimmer => () => {
    this.setState({
      ...this.state,
      comp: dimmer,
      open: true,
    });
  };

  close = () => this.setState({ open: false });

  componentWillMount() {
    this.props.f4FetchCountryList();
    this.props.f4FetchDepartmentList();
    this.props.fetchAll();
  }

  getCompanyOptions() {
    if (!this.props.companyOptions) {
      return [];
    }
    const { companyOptions } = this.props;
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
  /****************************get items  */
  getOs() {
    if (!this.props.listAll.listOs) {
      return [];
    }
    const { listOs } = this.props.listAll;
    let out = listOs.map(os => {
      return {
        key: parseInt(os.id, 10) ? parseInt(os.id, 10) : Math.random(),
        text: `${os.os_name} ${parseInt(os.os_code, 10)}`,
        value: parseInt(os.os_code, 10),
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
        key: parseInt(type1.id, 10) ? parseInt(type1.id, 10) : Math.random(),
        text: `${type1.type1_name} ${parseInt(type1.type1_code, 10)}`,
        value: parseInt(type1.type1_code, 10),
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
        key: parseInt(type2.id, 10) ? parseInt(type2.id, 10) : Math.random(),
        text: `${type2.type2_name} ${parseInt(type2.type2_code, 10)}`,
        value: parseInt(type2.type2_code, 10),
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
        key: parseInt(type3.id, 10) ? parseInt(type3.id, 10) : Math.random(),
        text: `${type3.type3_name} ${parseInt(type3.type3_code, 10)}`,
        value: parseInt(type3.type3_code, 10),
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
        key: parseInt(detail.id, 10) ? parseInt(detail.id, 10) : Math.random(),
        text: `${detail.detail_name} ${parseInt(detail.detail_code, 10)}`,
        value: parseInt(detail.detail_code, 10),
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
        key: parseInt(room.id, 10) ? parseInt(room.id, 10) : Math.random(),
        text: `${room.room_name} ${parseInt(room.room_code, 10)}`,
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
        key: parseInt(st.id, 10) ? parseInt(st.id, 10) : Math.random(),
        text: `${st.status_name} ${parseInt(st.status_code, 10)}`,
        value: parseInt(st.status_code, 10),
      };
    });
    return out;
  }
  getCompBrCodes() {
    if (!this.props.listAll.listCompBranchCodes) {
      return [];
    }
    const { listCompBranchCodes } = this.props.listAll;
    let out = listCompBranchCodes.map(c => {
      return {
        key: parseInt(c.id, 10) ? parseInt(c.id, 10) : Math.random(),
        text: c.compbr_code,
        value: parseInt(c.compbr_code, 10),
      };
    });
    return out;
  }
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    departmentOptions: state.f4.departmentOptions,
    countryList: state.f4.countryList,
    listAll: state.aesReducer.listAll,
    branchOptions: state.aesReducer.listBranches,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAll,
    f4FetchDepartmentList,
    f4FetchCountryList,
    fetchCCBranch,
    newOs,
    newType1,
    newType2,
    newType3,
    newDetail,
    newRnum,
    newStatus,
    newCompBr,
  },
)(injectIntl(AssetRef));

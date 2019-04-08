import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchDepartmentList,
  f4FetchCountryList,
} from '../../../reference/f4/f4_action';
import { Container } from 'semantic-ui-react';
import IndexForm from './indexForm';
import MainSubField from './modItems/mainSubField';
import { injectIntl } from 'react-intl';

import {
  fetchAll,
  fetchCCBranch,
  newObject,
  disableObject,
  findCompBrCode,
  findObject,
  unmountAll,
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
    this.loadCompBr = this.loadCompBr.bind(this);
  }

  newOs(newOs) {
    this.props.newObject('/api/aes/os/save', newOs, 'NEW_OS');
  }
  newType1(newtype1) {
    this.props.newObject('/api/aes/type1/save', newtype1, 'NEW_TYPE1');
  }
  newType2(newtype2) {
    this.props.newObject('/api/aes/type2/save', newtype2, 'NEW_TYPE2');
  }
  newType3(newType3) {
    this.props.newObject('/api/aes/type3/save', newType3, 'NEW_TYPE3');
  }
  newDetail(newDetail) {
    this.props.newObject('/api/aes/detail/save', newDetail, 'NEW_DETAIL');
  }
  newRnum(newRnum) {
    this.props.newObject('/api/aes/room/save', newRnum, 'NEW_RNUM');
  }
  newStatus(newStatus) {
    this.props.newObject('/api/aes/status/save', newStatus, 'NEW_STATUS');
  }
  newCompBr(newCompBr) {
    this.props.newObject('/api/aes/compbr/save', newCompBr, 'COMP_BR');
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

  /******************************************************************* CALL DISABLE FUNCTION */
  disableOs(os) {
    this.props.disableObject('/api/aes/os/disable', os, 'DIS_OS');
  }
  disableType1(type1) {
    this.props.disableObject('/api/aes/type1/disable', type1, 'DIS_TYPE1');
  }
  disableType2(type2) {
    this.props.disableObject('/api/aes/type2/disable', type2, 'DIS_TYPE2');
  }
  disableType3(type3) {
    this.props.disableObject('/api/aes/type3/disable', type3, 'DIS_TYPE3');
  }
  disableDetail(det) {
    this.props.disableObject('/api/aes/det/disable', det, 'DIS_DET');
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
        break;
      default:
        queryParams[dataType] = value;
    }

    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  render() {
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
          compbranch={this.props.compBrAes}
          inputChange={this.handleInputChange}
          //------ last button options
          osList={this.getOs()}
          listType1={this.getType1()}
          listType2={this.getType2()}
          listType3={this.getType3()}
          listDetail={this.getDetail()}
          listRoom={this.getRoom()}
          listStatus={this.getStatus()}
          loadCompBr={this.loadCompBr}
          //find sub items
          findType1={this.findType1.bind(this)}
          findType2={this.findType2.bind(this)}
          findType3={this.findType3.bind(this)}
          findDetail={this.findDetail.bind(this)}
          messages={messages}
          {...this.state}
        />
        <MainSubField
          messages={messages}
          osList={this.getOs()}
          listType1={this.getType1()}
          listType2={this.getType2()}
          listType3={this.getType3()}
          listDetail={this.getDetail()}
          show={this.show.bind(this)}
          close={this.close.bind(this)}
          newCompBr={this.newCompBr.bind(this)}
          newStatus={this.newStatus.bind(this)}
          newRnum={this.newRnum.bind(this)}
          newOs={this.newOs.bind(this)}
          newType1={this.newType1.bind(this)}
          newType2={this.newType2.bind(this)}
          newType3={this.newType3.bind(this)}
          newDetail={this.newDetail.bind(this)}
          selOs={this.disableOs.bind(this)}
          selType1={this.disableType1.bind(this)}
          selType2={this.disableType2.bind(this)}
          selType3={this.disableType3.bind(this)}
          selDetail={this.disableDetail.bind(this)}
          {...this.state}
        />
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

  componentWillUnmount() {
    this.props.unmountAll();
  }

  getCompanyOptions() {
    if (!this.props.companyOptions) {
      return [];
    }
    const { companyOptions } = this.props;
    let out = companyOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
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
        text: `${c.country}`,
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
        text: `${branchOptions[item]['branch_name']}`,
        value: branchOptions[item]['id'],
      });
    }
    return map;
  }

  loadCompBr(branch_id) {
    const queryParams = this.state.queryParams;
    if (queryParams.bukrs && queryParams.branch_id) {
      this.props.findCompBrCode(queryParams.bukrs, branch_id);
    }
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
        key: parseInt(room.id, 10) ? parseInt(room.id, 10) : Math.random(),
        text: `${room.rname} ${parseInt(room.rnum, 10)}`,
        value: parseInt(room.id, 10),
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
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    departmentOptions: state.f4.departmentOptions,
    countryList: state.f4.countryList,
    listAll: state.aesReducer.listAll,
    branchOptions: state.aesReducer.listBranches,
    compBrAes: state.aesReducer.compBrAes,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAll,
    f4FetchDepartmentList,
    f4FetchCountryList,
    fetchCCBranch,
    findCompBrCode,
    findObject,
    newObject,
    disableObject,
    unmountAll,
  },
)(injectIntl(AssetRef));

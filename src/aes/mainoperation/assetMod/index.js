import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchDepartmentList,
  f4FetchCountryList,
  f4FetchStaffList,
} from '../../../reference/f4/f4_action';
import {
  fetchBlank,
  newAes,
  fetchCCBranch,
  fetchAll,
  fetchCompBrCode,
} from '../../aesAction';
import IndexForm from './indexForm';
import { injectIntl } from 'react-intl';

class AssetMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      comp: '',
      queryParams: {},
    };

    this.loadCCBranch = this.loadCCBranch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clichAChange = this.clichAChange.bind(this);
    this.loadCompBr = this.loadCompBr.bind(this);
  }

  clichAChange() {
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.newAes(this.state.queryParams);
    }
    this.setState({ errors });
  }
  validate() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const {
      bukrs,
      country_id,
      branch_id,
      dep_id,
      status_id,
      quantity,
      price,
      se0_id,
      se1_id,
      buying_time,
    } = this.state.queryParams;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable['5' + language]);
    }
    if (branch_id === null || branch_id === undefined || !branch_id) {
      errors.push(errorTable['7' + language]);
    }
    if (country_id === null || country_id === undefined || !country_id) {
      errors.push(errorTable['138' + language]);
    }
    if (dep_id === null || dep_id === undefined || !dep_id) {
      errors.push(errorTable['4' + language]);
    }
    if (status_id === null || status_id === undefined || !status_id) {
      errors.push(errorTable['136' + language]);
    }
    if (quantity === null || quantity === undefined || !quantity) {
      errors.push(errorTable['134' + language]);
    }
    if (price === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable['61' + language]);
    }
    if (se0_id === null || se0_id === undefined || !se0_id) {
      errors.push(errorTable['90' + language]);
    }
    if (se1_id === null || se1_id === undefined || !se1_id) {
      errors.push(errorTable['140' + language]);
    }
    if (buying_time === null || buying_time === undefined || !buying_time) {
      errors.push(errorTable['22' + language]);
    }
    return errors;
  }

  handleInputChange(value, dataType) {
    const queryParams = this.props.queryParams;
    switch (dataType) {
      case 'bukrs':
        queryParams.bukrs = value;
        this.props.companyOptions.some(c => {
          if (c.key == value) {
            queryParams.bukrs_name = c.text;
            queryParams.bukrs_code = c.value;
            return true;
          }
        });
        break;
      case 'country_id':
        queryParams.country_id = value;
        this.props.countryList.some(c => {
          if (c.countryId == value) {
            queryParams.country_name = c.country;
            queryParams.currency = c.currency;
            return true;
          }
        });
        break;
      case 'branch_id':
        queryParams.branch_id = value;
        this.props.branchOptions.some(c => {
          if (c.id == value) {
            queryParams.branch_code = value;
            queryParams.branch_name = c.branch_name;
            return true;
          }
        });
        break;
      case 'dep_id':
        queryParams.dep_id = value;
        this.props.departmentOptions.some(function(c) {
          if (c.key == value) {
            queryParams.dep_name = c.text;
            queryParams.dep_code = c.value;
            return true;
          }
        });
        break;
      case 'currency':
        queryParams.currency = value;
        break;
      case 'price':
        queryParams.price = value.value;
        break;
      case 'quantity':
        queryParams.quantity = value.value;
        break;
      case 'buying_time':
        queryParams.buying_time = value;
        break;
      case 'compbr_code':
        queryParams.compbr_code = value;
        break;
      default:
        queryParams[dataType] = value;
        if (dataType === 'os_id') {
          this.props.listAll.listOs.some(c => {
            if (c.id == value) {
              queryParams.os_name = c.os_name;
              queryParams.os_code = c.os_code;
              return true;
            }
          });
        } else if (dataType === 'type1_id') {
          this.props.listAll.listType1.some(c => {
            if (c.id == value) {
              queryParams.type1_name = c.type1_name;
              queryParams.type1_code = c.type1_code;
              return true;
            }
          });
        } else if (dataType === 'type2_id') {
          this.props.listAll.listType2.some(c => {
            if (c.id == value) {
              queryParams.type2_name = c.type2_name;
              queryParams.type2_code = c.type2_code;
              return true;
            }
          });
        } else if (dataType === 'type3_id') {
          this.props.listAll.listType3.some(c => {
            if (c.id == value) {
              queryParams.type3_name = c.type3_name;
              queryParams.type3_code = c.type3_code;
              return true;
            }
          });
        } else if (dataType === 'detail_id') {
          this.props.listAll.listDetail.some(c => {
            if (c.id == value) {
              queryParams.detail_name = c.detail_name;
              queryParams.detail_code = c.detail_code;
              return true;
            }
          });
        } else if (dataType === 'room_id') {
          this.props.listAll.listRoom.some(c => {
            if (c.id == value) {
              queryParams.room_name = c.room_name;
              queryParams.room_code = c.room_code;
              return true;
            }
          });
        } else if (dataType === 'status_id') {
          this.props.listAll.listStatus.some(c => {
            if (c.id == value) {
              queryParams.status_name = c.status_name;
              queryParams.status_code = c.status_code;
              return true;
            }
          });
        }
    }
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  render() {
    const { messages } = this.props.intl;

    return (
      <div>
        <IndexForm //place options
          companyOpts={this.getCompanyOptions()}
          countryOpts={this.getCountryOptions()}
          branchOptns={this.getBranches()}
          depOptns={this.getDepartments()}
          //os options
          osList={this.getOs()}
          listType1={this.getType1()}
          listType2={this.getType2()}
          listType3={this.getType3()}
          listDetail={this.getDetail()}
          listRoom={this.getRoom()}
          listStatus={this.getStatus()}
          loadCCBranch={this.loadCCBranch}
          loadCompBr={this.loadCompBr}
          loadDepartments={this.loadDepartments}
          staffList={this.props.staffList}
          queryParams={this.props.queryParams}
          inputChange={this.handleInputChange}
          clichAChange={this.clichAChange}
          compbranch={this.props.compBrAes}
          messages={messages}
          errors={this.state.errors}
        />
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchBlank();
    this.props.f4FetchDepartmentList();
    this.props.f4FetchCountryList();
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
    queryParams.bukrs && country_id
      ? this.props.fetchCCBranch(queryParams.bukrs, queryParams.country_id)
      : '';
  }

  loadCompBr(branch_id) {
    const queryParams = this.props.queryParams;
    if (queryParams.bukrs && queryParams.branch_id) {
      const staffs = this.props.f4FetchStaffList(
        'fcis',
        queryParams.bukrs_code,
        queryParams.branch_id,
        '',
        '',
        false,
        value => this.setState({ loading: false }),
      );
      this.props.fetchCompBrCode(queryParams.bukrs, branch_id);
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
        text: `${room.room_name} ${parseInt(room.room_code, 10)}`,
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
        key: parseInt(st.id, 10),
        text: `${st.status_name} ${parseInt(st.status_code, 10)}`,
        value: parseInt(st.id, 10),
      };
    });
    return out;
  }

  staffOpts() {
    const staffList = this.props.staffList;
    if (!this.props.staffList) {
      return [];
    }

    let out = staffList.map(st => {
      return {
        id: parseInt(st.staffId, 10),
        text: st.fio,
        iin: st.iinBin,
        value: parseInt(st.staffId, 10),
      };
    });
    return out;
  }
}

function mapStateToProps(state) {
  return {
    queryParams: state.aesReducer.queryParams,
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    departmentOptions: state.f4.departmentOptions,
    branchOptions: state.aesReducer.listBranches,
    listAll: state.aesReducer.listAll,
    staffList: state.f4.staffList,
    compBrAes: state.aesReducer.compBrAes,
    aesErrors: state.aesReducer.aesErrors,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchCountryList,
    f4FetchDepartmentList,
    fetchAll,
    fetchCompBrCode,
    fetchBlank,
    f4FetchStaffList,
    fetchCCBranch,
    newAes,
  },
)(injectIntl(AssetMod));

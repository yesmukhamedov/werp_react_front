import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchDepartmentList,
  f4FetchCountryList,
} from '../../../reference/f4/f4_action';
import {
  fetchAll,
  fetchAes,
  saveApprRej,
  fetchCCBranch,
} from '../../aesAction';
import { Container, Button } from 'semantic-ui-react';
import IndexForm from './indexForm';
import SubSection from './subSection';
import { injectIntl } from 'react-intl';

class AssetApr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {},
    };

    this.loadCCBranch = this.loadCCBranch.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.Search = this.Search.bind(this);
    this.ApprRejected = this.ApprRejected.bind(this);
  }

  Search() {
    this.props.fetchAes(this.state.queryParams);
  }

  handleInputChange(value, dataType) {
    let { queryParams } = this.state;
    switch (dataType) {
      case 'dateFrom':
        queryParams[dataType] = value.format('YYYY-MM-DD');
        break;
      case 'dateTo':
        queryParams[dataType] = value.format('YYYY-MM-DD');
        break;
      case 'btFrom':
        queryParams[dataType] = value.format('YYYY-MM-DD');
        break;
      case 'btTo':
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

  ApprRejected(approve, rejected) {
    this.props.saveApprRej(approve, rejected);
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
          companyOpts={this.getCompanyOptions()}
          countryOpts={this.getCountryOptions()}
          branchOptns={this.getBranches()}
          depOptns={this.getDepartments()}
          loadCCBranch={this.loadCCBranch}
          //os options
          osList={this.getOs()}
          listType1={this.getType1()}
          listType2={this.getType2()}
          listType3={this.getType3()}
          listDetail={this.getDetail()}
          listRooms={this.getRoom()}
          listStatus={this.getStatus()}
          loadStates={this.loadStates}
          loadCities={this.loadCities}
          loadBranches={this.loadBranches}
          loadDepartments={this.loadDepartments}
          queryParams={this.state.queryParams}
          inputChange={this.handleInputChange}
          listAes={this.props.listAes}
          messages={messages}
        />
        <br />
        <SubSection
          messages={messages}
          listAes={this.props.listAes}
          apprRejected={this.ApprRejected}
        />
        <Button floated="right" onClick={this.Search} color="blue">
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
    let out = companyOptions.map((c, key) => {
      return {
        key: parseInt(key, 10),
        text: c.text,
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
        text: c.country,
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
        key: parseInt(type2.id, 10),
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
        key: parseInt(type3.id, 10),
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
        key: parseInt(detail.id, 10),
        text: `${detail.detail_name} ${parseInt(detail.detail_code, 10)}`,
        value: parseInt(detail.detail_code, 10),
      };
    });
    return out;
  }

  getRoom() {
    if (!this.props.listAll.listRooms) {
      return [];
    }
    const { listRooms } = this.props.listAll;
    let out = listRooms.map(room => {
      return {
        key: parseInt(room.id, 10),
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
        key: parseInt(st.id, 10),
        text: `${st.status_name} ${parseInt(st.status_code, 10)}`,
        value: parseInt(st.status_code, 10),
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
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    branchOptions: state.aesReducer.listBranches,
    departmentOptions: state.f4.departmentOptions,
    listAll: state.aesReducer.listAll,
    listAes: state.aesReducer.listAes,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchCountryList,
    f4FetchDepartmentList,
    fetchCCBranch,
    fetchAll,
    fetchAes,
    saveApprRej,
  },
)(injectIntl(AssetApr));

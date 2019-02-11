import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REP_894, REP_914, REP_934, REP_935, REP_740 } from '../../crmRepUtil';
import {
  RepSearch894,
  RepSearch740,
  RepSearch914,
  RepSearch935,
} from './RepSearchPanels';
import { fetchItems } from '../../actions/crmReportAction';
import { fetchAllManagers } from '../../../../../hr/mainoperation/staff/actions/hrStaffAction';
import moment from 'moment';

class RepSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {},
      managersLoaded: false,
    };
  }

  componentWillMount() {}

  branchOptions = bukrs => {
    if (!bukrs) {
      return [];
    }

    const { branchOptions } = this.props;
    if (!branchOptions) {
      return [];
    }

    return branchOptions[bukrs] || [];
  };

  businessAreaOptions = bukrs => {
    if (!bukrs) {
      return [];
    }

    const { businessAreaList } = this.props;
    if (!businessAreaList) {
      return [];
    }

    let filteredList = businessAreaList
      ? businessAreaList.filter(b => b.bukrs === bukrs)
      : [];

    let out = [
      {
        key: null,
        value: null,
        text: 'Не выбрано',
      },
    ];
    for (let k in filteredList) {
      out.push({
        key: filteredList[k]['business_area_id'],
        value: filteredList[k]['business_area_id'],
        text: filteredList[k]['name'],
      });
    }

    return out;
  };

  managersByBranchOptions = branchId => {
    if (!branchId) {
      return [];
    }

    const { managersByBranchOptions } = this.props;
    if (!managersByBranchOptions) {
      return [];
    }

    return managersByBranchOptions[branchId] || [];
  };

  handleChange = (e, d) => {
    const { name, value } = d;
    let search = Object.assign({}, this.state.search);

    switch (name) {
      case 'bukrs':
        search['branchId'] = null;

      default:
        search[name] = value;
    }

    this.setState({
      ...this.state,
      search: search,
    });
  };

  handleDate = (v, name) => {
    let search = Object.assign({}, this.state.search);
    if (v) {
      search[name] = moment(v)
        .format('YYYY-MM-DD')
        .toString();
    } else {
      search[name] = null;
    }
    //search[name] = v ? v : null
    this.setState({
      ...this.state,
      search: search,
    });
  };

  fetchItems = () => {
    this.props.loadItems(this.props.meta.id, this.state.search);
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.managersLoaded && nextProps.meta.id === REP_740) {
      this.props.fetchAllManagers();
      this.setState({
        ...this.state,
        managersLoaded: true,
      });
    }

    if (nextProps['match'] && nextProps['match']['params']) {
      this.setState({
        ...this.state,
        search: {},
      });
    }
  }

  render() {
    const { search } = this.state;
    const { id } = this.props.meta;
    const { companyOptions, branchOptions, businessAreaList } = this.props;
    let filteredBranchOptions = branchOptions
      ? branchOptions[search['bukrs']] || []
      : [];

    const fetchItems = () => this.props.fetchItems(id, this.state.search);
    switch (id) {
      case REP_934:
      case REP_935:
        return (
          <RepSearch935
            handleDate={this.handleDate}
            fetchItems={fetchItems}
            handleChange={this.handleChange}
            branchOptions={filteredBranchOptions}
            businessAreaOptions={this.businessAreaOptions(search['bukrs'])}
            companyOptions={companyOptions}
          />
        );

      case REP_894:
        return (
          <RepSearch894
            handleDate={this.handleDate}
            fetchItems={fetchItems}
            handleChange={this.handleChange}
            branchOptions={filteredBranchOptions}
            businessAreaOptions={this.businessAreaOptions(search['bukrs'])}
            companyOptions={companyOptions}
          />
        );

      case REP_740:
        return (
          <RepSearch740
            handleDate={this.handleDate}
            dateTo={search['dateTo'] || null}
            fetchItems={fetchItems}
            handleChange={this.handleChange}
            companyOptions={companyOptions}
            branchOptions={filteredBranchOptions}
            managerOptions={this.managersByBranchOptions(search['branchId'])}
          />
        );

      case REP_914:
        return (
          <RepSearch914
            handleDate={this.handleDate}
            fetchItems={fetchItems}
            handleChange={this.handleChange}
            branchOptions={filteredBranchOptions}
            businessAreaOptions={this.businessAreaOptions(search['bukrs'])}
            companyOptions={companyOptions}
          />
        );

      default:
        return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    meta: state.crmReportReducer.meta,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    businessAreaList: state.f4.businessAreaList,
    managersByBranchOptions: state.hrStaff.managersByBranchOptions,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchItems,
    fetchAllManagers,
  },
)(RepSearch);

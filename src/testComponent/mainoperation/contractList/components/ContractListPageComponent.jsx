import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import ContractListTable from './ContractListTable/ContractListTableContainer';
import ContractListSearch from './ContractListSearch/ContractListSearchContainer';

class ContractListPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: undefined,
      selectedBranch: undefined,
      selectedState: undefined,
      startDate: undefined,
      endDate: undefined,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetChange = this.handleResetChange.bind(this);
  }

  componentWillMount() {
    this.props.getDirectories();
  }

  componentWillUnmount() {
    this.props.clearContractListStore();
  }

  handleInputChange(value, dataType) {
    // console.log(dataType, value)
    this.setState({
      ...this.state,
      [dataType]: value,
    });
  }

  handleResetChange() {
    this.setState({
      selectedCompany: undefined,
      selectedBranch: undefined,
      selectedState: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  }

  handleSearch() {
    let startDateUtc;
    let endDateUtc;
    if (this.state.startDate) {
      const startVal = this.state.startDate.format('YYYY-MM-DD');
      startDateUtc = moment.utc(startVal).format();
    }

    if (this.state.endDate) {
      const endVal = this.state.endDate.format('YYYY-MM-DD');
      endDateUtc = moment.utc(endVal).format();
    }

    const paramsDict = {
      companyId: this.state.selectedCompany,
      branchId: this.state.selectedBranch,
      statusId: this.state.selectedState,
      startDate: startDateUtc,
      endDate: endDateUtc,
    };
    // console.log(paramsDict);
    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    )
      .filter(param => param)
      .join('&');

    console.log('PARAMS', params);
    this.props.searchContracts(params);
  }

  render() {
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
        <ContractListSearch
          selectedCompany={this.state.selectedCompany}
          selectedBranch={this.state.selectedBranch}
          selectedState={this.state.selectedState}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          inputChange={this.handleInputChange}
          resetChange={this.handleResetChange}
          handleSearch={this.handleSearch}
        />
        <br />
        <ContractListTable />
      </Container>
    );
  }
}

ContractListPageComponent.propTypes = {
  getDirectories: PropTypes.func.isRequired,
  searchContracts: PropTypes.func.isRequired,
  clearContractListStore: PropTypes.func.isRequired,
};

export default ContractListPageComponent;

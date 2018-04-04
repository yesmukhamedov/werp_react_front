import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import ContractListTable from './ContractListTable/ContractListTableContainer';
import ContractListSearch from '../ContractListSearch/ContractListSearchContainer';

class ContractListPageComponent extends Component {

  componentWillMount() {
    const { lang } = this.props;
    this.props.getDirectories(lang);
  }

  componentWillUnmount() {
    this.props.clearContractListStore();
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
        <ContractListSearch />
        <br />
        <ContractListTable />
      </Container>
    );
  }
}

ContractListPageComponent.propTypes = {
  getDirectories: PropTypes.func.isRequired,
  clearContractListStore: PropTypes.func.isRequired,
};

export default ContractListPageComponent;

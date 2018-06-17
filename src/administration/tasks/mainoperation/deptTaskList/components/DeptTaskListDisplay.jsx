import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DeptTaskListSearch from './DeptTaskListSearch/DeptTaskListSearchContainer';
import DeptTaskListTable from './DeptTaskListTable/DeptTaskListTableContainer';

class DeptTaskListDisplay extends Component {
  componentWillMount() {
    const { lang } = this.props;
    this.props.getDeptTaskListDirectories(lang);
  }

  componentWillUnmount() {
    this.props.clearDeptTaskListStore();
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
        <DeptTaskListSearch />
        <br />
        <DeptTaskListTable />
      </Container>
    );
  }
}

DeptTaskListDisplay.propTypes = {
  lang: PropTypes.string,
  getDeptTaskListDirectories: PropTypes.func.isRequired,
  clearDeptTaskListStore: PropTypes.func.isRequired,
};

export default DeptTaskListDisplay;

import React, { Component } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DeptTaskListSearch from './DeptTaskListSearch/DeptTaskListSearchContainer';
import DeptTaskListTable from './DeptTaskListTable/DeptTaskListTableContainer';
import PrivateTaskListTable from './PrivateTaskListTable/PrivateTaskListTableContainer';

const panes = [
  {
    menuItem: 'Мои задачи',
    pane: (
      <Tab.Pane key="tab1">
        <PrivateTaskListTable />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Все задачи',
    pane: (
      <Tab.Pane key="tab2">
        <DeptTaskListSearch />
        <br />
        <DeptTaskListTable />
      </Tab.Pane>
    ),
  },
];

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
        {/* <DeptTaskListSearch />
        <br />
        <DeptTaskListTable /> */}
        <Tab panes={panes} renderActiveOnly={false} />
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

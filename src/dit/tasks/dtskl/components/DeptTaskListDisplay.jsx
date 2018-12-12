import React, { Component } from 'react';
import { Container, Tab, Menu, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DeptTaskListSearch from './DeptTaskListSearch/DeptTaskListSearchContainer';
import DeptTaskListTable from './DeptTaskListTable/DeptTaskListTableContainer';
import PrivateTaskListTable from './PrivateTaskListTable/PrivateTaskListTableContainer';

function panes(size, messages) {
  const p = [
    {
      menuItem: (
        <Menu.Item key="messages">
          <Icon name="tasks" />
          {messages.H__MY_TASKS}
          <Label color="grey">
            <Icon name="mail" />
            {size}
          </Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key="tab1">
          <PrivateTaskListTable />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="messages2">
          <Icon name="list" />
          {messages.H__ALL_TASKS}
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key="tab2">
          <DeptTaskListSearch />
          <br />
          <DeptTaskListTable />
        </Tab.Pane>
      ),
    },
  ];
  return p;
}

class DeptTaskListDisplay extends Component {
  componentWillMount() {
    const { lang } = this.props;
    this.props.getDeptTaskListDirectories(lang);
  }

  componentWillUnmount() {
    this.props.clearDeptTaskListStore();
  }

  render() {
    const color = 'blue';
    const { size } = this.props;
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
        <Tab
          menu={{ color, attached: false, tabular: false }}
          panes={panes(size, messages)}
          renderActiveOnly={false}
        />
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

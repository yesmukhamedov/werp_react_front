import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TaskListSearch from './TaskListSearch/TaskListSearchContainer';
import TaskListTable from './TaskListTable/TaskListTableContainer';

class TaskListPage extends Component {
  componentWillMount() {
    const { lang } = this.props;
    this.props.getTaskDirectories(lang);
  }

  componentWillUnmount() {
    this.props.clearTaskListStore();
  }

  render() {
    return (
      <Container
        //fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <TaskListSearch />
        <br />
        <TaskListTable />
      </Container>
    );
  }
}

TaskListPage.propTypes = {
  getTaskDirectories: PropTypes.func.isRequired,
  clearTaskListStore: PropTypes.func.isRequired,
};

export default TaskListPage;

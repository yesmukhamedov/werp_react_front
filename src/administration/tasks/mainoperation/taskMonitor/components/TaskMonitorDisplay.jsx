import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TaskMonitorSearch from './TaskMonitorSearch/TaskMonitorSearchContainer';
import TaskMonitorTable from './TaskMonitorTable/TaskMonitorTableContainer';

class TaskMonitorComponent extends Component {

  componentWillMount() {
    const { lang } = this.props;
    this.props.getTaskMonitorDirectories(lang);
  }

  componentWillUnmount() {
    this.props.clearTaskMonitorStore();
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
        <TaskMonitorSearch />
        <br />
        <TaskMonitorTable />
      </Container>
    );
  }
}

TaskMonitorComponent.propTypes = {
  getTaskMonitorDirectories: PropTypes.func.isRequired,
  clearTaskMonitorStore: PropTypes.func.isRequired,
};

export default TaskMonitorComponent;

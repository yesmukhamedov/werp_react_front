import React, { Component } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TaskInfoComponent from './TaskInfo/TaskInfoComponent';
import TaskHistoryDisplay from './TaskHistory/TaskHistoryDisplay';

class TaskPageDisplay extends Component {
  componentWillMount() {
    const { id: taskId } = this.props.match.params;
    if (taskId) {
      this.props.fetchTaskById(taskId);
      this.props.getTaskDirectories(this.props.lang);
    }
  }

  componentWillUnmount() {
    this.props.clearTaskStore();
  }

  render() {
    const { taskDetails } = this.props;
    if (taskDetails) {
      return (
        <Container
          // fluid
          style={{
            marginTop: '2em',
            marginBottom: '2em',
            paddingLeft: '2em',
            paddingRight: '2em',
          }}
        >
          <TaskInfoComponent {...taskDetails} />
          <TaskHistoryDisplay {...taskDetails} />
        </Container>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching task details...</Loader>
      </Dimmer>
    );
  }
}

TaskPageDisplay.propTypes = {
  getTaskDirectories: PropTypes.func.isRequired,
  fetchTaskById: PropTypes.func.isRequired,
  clearTaskStore: PropTypes.func.isRequired,
  taskDetails: PropTypes.object,
  lang: PropTypes.string,
};

export default TaskPageDisplay;

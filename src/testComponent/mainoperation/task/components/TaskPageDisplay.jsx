import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TaskInfoComponent from './TaskInfo/TaskInfoComponent';
import TaskDetailsComponent from './TaskDetails/TaskDetailsComponent';

class TaskPageDisplay extends Component {

  componentWillMount() {    
    const { id: taskId } = this.props.match.params;
    console.log("id: ", taskId)
    this.props.getDirectories();
  }

  componentWillUnmount() {
    //this.props.clearTaskListStore();
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
        <TaskInfoComponent />
        <TaskDetailsComponent />
      </Container>
    );
  }
}

TaskPageDisplay.propTypes = {
  getDirectories: PropTypes.func.isRequired,
};

export default TaskPageDisplay;

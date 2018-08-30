import React from 'react';
import TaskInfoComponent from './TaskInfoComponent';
import TaskEditContainer from '../TaskEdit/TaskEditContainer';

const TaskInfoWrapper = props => (
  <TaskInfoComponent
    TaskEditContainer={TaskEditContainer}
    {...props}
    uploadble="true"
  />
);

export default TaskInfoWrapper;

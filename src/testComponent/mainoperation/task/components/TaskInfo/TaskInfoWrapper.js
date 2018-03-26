import React from 'react';
import TaskInfoComponent from './TaskInfoComponent';
import TaskEditContainer from '../TaskEdit/TaskEditContainer';

const TaskEditModalWrapper = props => (
  <TaskInfoComponent
    TaskEditContainer={TaskEditContainer}
    {...props}
  />
);

export default TaskEditModalWrapper;

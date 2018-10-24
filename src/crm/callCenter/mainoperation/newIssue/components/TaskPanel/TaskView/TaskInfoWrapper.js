import React from 'react';
import TaskInfoComponent from '../../../../task/components/TaskInfo/TaskInfoComponent';
import TaskEditContainer from './TaskEditContainer';

const TaskInfoWrapper = props => (
  <TaskInfoComponent
    TaskEditContainer={TaskEditContainer}
    {...props}
  />
);

export default TaskInfoWrapper;

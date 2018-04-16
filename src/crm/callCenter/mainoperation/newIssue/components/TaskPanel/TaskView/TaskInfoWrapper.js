import React from 'react';
import TaskInfoComponent from '../../../../task/components/TaskInfo/TaskInfoComponent';
import TaskEditContainer from './TaskEditContainer';

const TaskEditModalWrapper = props => (
  <TaskInfoComponent
    TaskEditContainer={TaskEditContainer}
    {...props}
  />
);

export default TaskEditModalWrapper;

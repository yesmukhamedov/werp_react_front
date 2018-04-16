import React from 'react';
import TaskEditModal from './TaskEditModal';

const TaskEditModalWrapper = (props) => {
  const fieldState = {
    title: true,
    status: false,
    priority: true,
    branch: true,
    department: true,
    position: true,
    description: true,
    comment: false,
  };
  return (
    <TaskEditModal
      fieldState={fieldState}
      {...props}
    />
  );
};

export default TaskEditModalWrapper;

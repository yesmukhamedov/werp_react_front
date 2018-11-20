import React from 'react';
import TaskEditModal from '../../../../../../../dit/tasks/dtskedit/components/TaskEdit/TaskEditModal';

const TaskEditModalWrapper = (props) => {
  const fieldState = {
    title: false,
    status: true,
    priority: false,
    branch: false,
    department: false,
    position: false,
    description: false,
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

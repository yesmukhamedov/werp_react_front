import { connect } from 'react-redux';
import { editTask } from '../../../../../../../dit/tasks/dtskedit/actions/TaskAction';
import TaskEditModalWrapper from './TaskEditModalWrapper';

function mapStateToProps(state, props) {
  const initialData = {
    title: props.title,
    status: props.status.id,
    priority: props.priority.id,
    branch: props.recipient.branch.id,
    department: props.recipient.department.id,
    position: props.recipient.position.id,
    description: props.description,
  };
  return {
    directories: state.taskList.directories,
    initialValues: initialData,
  };
}

const TaskEditContainer =
  connect(mapStateToProps, { editTask })(TaskEditModalWrapper);

export default TaskEditContainer;

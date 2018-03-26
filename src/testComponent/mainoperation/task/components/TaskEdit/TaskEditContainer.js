import { connect } from 'react-redux';
import { editTask } from '../../actions/TaskAction';
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
  return {
    directories: state.taskList.directories,
    initialValues: initialData,
    fieldState,
  };
}

const TaskEditContainer =
  connect(mapStateToProps, { editTask })(TaskEditModalWrapper);

export default TaskEditContainer;

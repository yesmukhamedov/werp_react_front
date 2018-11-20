import { connect } from 'react-redux';
import moment from 'moment';
import { editTask } from '../../actions/TaskAction';
import TaskEditModalWrapper from './TaskEditModalWrapper';
// import { formatDMY } from '../../../../../../utils/helpers';


function mapStateToProps(state, props) {
  const initialData = {
    title: props.title,
    status: props.status.id,
    priority: props.priority.id,
    branch: props.recipient.branch.id,
    department: props.recipient.department.id,
    position: props.recipient.position && props.recipient.position.id,
    description: props.description,
    estimatedAt: props.estimatedAt && moment(props.estimatedAt),
  };
  return {
    directories: state.taskList.directories,
    initialValues: initialData,
  };
}

const TaskEditContainer =
  connect(mapStateToProps, { editTask })(TaskEditModalWrapper);

export default TaskEditContainer;

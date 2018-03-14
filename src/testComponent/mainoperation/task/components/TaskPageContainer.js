import { connect } from 'react-redux';
import { getDirectories } from '../../taskList/actions/TaskListAction';
import { fetchTaskById, clearTaskStore } from '../actions/TaskAction';
import TaskPageDisplay from './TaskPageDisplay';

function mapStateToProps(state) {
  return {
    taskDetails: state.task.taskDetails,
  };
}

const TaskPageContainer =
  connect(mapStateToProps, { getDirectories, fetchTaskById, clearTaskStore })(TaskPageDisplay);

export default TaskPageContainer;

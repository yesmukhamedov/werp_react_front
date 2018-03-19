import { connect } from 'react-redux';
import { getTaskDirectories } from '../../taskList/actions/TaskListAction';
import { fetchTaskById, clearTaskStore } from '../actions/TaskAction';
import TaskPageDisplay from './TaskPageDisplay';

function mapStateToProps(state) {
  return {
    taskDetails: state.task.taskDetails,
    lang: state.locales.lang,
  };
}

const TaskPageContainer =
  connect(mapStateToProps, { getTaskDirectories, fetchTaskById, clearTaskStore })(TaskPageDisplay);

export default TaskPageContainer;

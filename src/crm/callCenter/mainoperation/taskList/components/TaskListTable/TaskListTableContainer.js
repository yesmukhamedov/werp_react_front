import { connect } from 'react-redux';
import TaskListTableComponent from './TaskListTableComponent';

function mapStateToProps(state) {
  return {
    result: state.taskList.result,
    lang: state.locales.lang,
  };
}

const TaskListTableContainer = connect(mapStateToProps)(TaskListTableComponent);

export default TaskListTableContainer;

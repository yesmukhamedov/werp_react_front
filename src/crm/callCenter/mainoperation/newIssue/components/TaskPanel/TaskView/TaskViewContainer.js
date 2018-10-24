import { connect } from 'react-redux';
import { getTaskDirectories } from '../../../../taskList/actions/TaskListAction';
import { fetchTaskById, clearTaskStore } from '../../../../task/actions/TaskAction';
import TaskPageDisplay from '../../../../task/components/TaskPageDisplay';
import TaskInfoWrapper from './TaskInfoWrapper';

function mapStateToProps(state) {
  return {
    taskDetails: state.gtskeditTransaction.taskDetails,
    lang: state.locales.lang,
    TaskInfoWrapper,
  };
}

const TaskViewContainer =
  connect(mapStateToProps, { getTaskDirectories, fetchTaskById, clearTaskStore })(TaskPageDisplay);

export default TaskViewContainer;

import { connect } from 'react-redux';
import TaskHistoryItemDisplay from './TaskHistoryItemDisplay';

function mapStateToProps(state) {
  return {
    dir: state.taskList.directories,
  };
}

const TaskHistoryContainer = connect(mapStateToProps)(TaskHistoryItemDisplay);

export default TaskHistoryContainer;

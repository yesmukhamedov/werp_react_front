import { connect } from 'react-redux';
import TaskMonitorTableDisplay from './TaskMonitorTableDisplay';

function mapStateToProps(state) {
  return {
    result: state.taskMonitor.result,
    lang: state.locales.lang,
  };
}

const TaskMonitorTableContainer = connect(mapStateToProps)(TaskMonitorTableDisplay);

export default TaskMonitorTableContainer;

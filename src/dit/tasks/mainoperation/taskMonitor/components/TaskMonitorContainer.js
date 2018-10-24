import { connect } from 'react-redux';
import * as actions from '../actions/TaskMonitorAction';
import TaskMonitorDisplay from './TaskMonitorDisplay';

function mapStateToProps(state) {
  return {
    lang: state.locales.lang,
  };
}

const TaskMonitorContainer = connect(mapStateToProps, actions)(TaskMonitorDisplay);

export default TaskMonitorContainer;

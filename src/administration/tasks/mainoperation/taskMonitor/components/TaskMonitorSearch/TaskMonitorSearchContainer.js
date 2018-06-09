import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { searchTasks } from '../../actions/TaskMonitorAction';
import TaskMonitorSearchDisplay from './TaskMonitorSearchDisplay';

const selector = formValueSelector('taskMonitorSearchDisplay');

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    directories: state.taskMonitor.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

const TaskMonitorSearchContainer =
  connect(mapStateToProps, { searchTasks })(TaskMonitorSearchDisplay);

export default TaskMonitorSearchContainer;

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { defineMessages, injectIntl } from 'react-intl';
import { searchTasks } from '../../actions/TaskMonitorAction';
// import { messages } from '../../../dtskl/components/DeptTaskListSearch/DeptTaskListSearchContainer';
import TaskMonitorSearchDisplay from './TaskMonitorSearchDisplay';
import { messages } from '../../../../../locales/defineMessages';

const selector = formValueSelector('taskMonitorSearchDisplay');

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    messages,
    directories: state.taskMonitor.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

const TaskMonitorSearchContainer =
  connect(mapStateToProps, { searchTasks })(injectIntl(TaskMonitorSearchDisplay));

export default TaskMonitorSearchContainer;

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { defineMessages, injectIntl } from 'react-intl';
import { searchTasks } from '../../actions/TaskMonitorAction';
import { messages } from '../../../deptTaskList/components/DeptTaskListSearch/DeptTaskListSearchContainer';
import TaskMonitorSearchDisplay from './TaskMonitorSearchDisplay';

const selector = formValueSelector('taskMonitorSearchDisplay');

const msg = defineMessages({
  taskMonitor: {
    id: 'Form.TaskMonitorLabel',
    defaultMessage: 'Task monitor',
  },
});

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    messages: Object.assign(msg, messages),
    directories: state.taskMonitor.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

const TaskMonitorSearchContainer =
  connect(mapStateToProps, { searchTasks })(injectIntl(TaskMonitorSearchDisplay));

export default TaskMonitorSearchContainer;

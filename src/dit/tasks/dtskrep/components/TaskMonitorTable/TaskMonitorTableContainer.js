import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import TaskMonitorTableDisplay from './TaskMonitorTableDisplay';
// import { messages } from '../../../dtskl/components/DeptTaskListTable/DeptTaskListTableContainer';
import { messages } from '../../../../../locales/defineMessages';

function mapStateToProps(state) {
  return {
    messages,
    result: state.taskMonitor.result,
    lang: state.locales.lang,
  };
}

const TaskMonitorTableContainer = connect(mapStateToProps)(injectIntl(TaskMonitorTableDisplay));

export default TaskMonitorTableContainer;

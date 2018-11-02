import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import TaskListTableComponent from './TaskListTableComponent';
import { messages } from '../../../../../../dit/tasks/dtskl/components/DeptTaskListTable/DeptTaskListTableContainer';
import { msg } from '../../../contractList/components/ContractListTable/ContractListTableContainer';

function mapStateToProps(state) {
  return {
    messages: Object.assign(msg, messages),
    result: state.taskList.result,
    lang: state.locales.lang,
  };
}

const TaskListTableContainer = connect(mapStateToProps)(injectIntl(TaskListTableComponent));

export default TaskListTableContainer;

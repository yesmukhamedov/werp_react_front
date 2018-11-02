import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { defineMessages, injectIntl } from 'react-intl';
import * as actions from '../../actions/TaskListAction';
import TaskListSearchComponent from './TaskListSearchComponent';
import { messages } from '../../../../../../dit/tasks/dtskl/components/DeptTaskListSearch/DeptTaskListSearchContainer';

const selector = formValueSelector('taskListSearchComponent');

export const msg = defineMessages({
  priority: {
    id: 'Form.Priority',
    defaultMessage: 'Priority',
  },
});

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    messages: Object.assign(msg, messages),
    directories: state.taskList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

const TaskListSearchContainer = connect(mapStateToProps, actions)(injectIntl(TaskListSearchComponent));

export default TaskListSearchContainer;

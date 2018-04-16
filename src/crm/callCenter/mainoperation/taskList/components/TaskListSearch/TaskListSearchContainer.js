import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import * as actions from '../../actions/TaskListAction';
import TaskListSearchComponent from './TaskListSearchComponent';

const selector = formValueSelector('taskListSearchComponent');

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    directories: state.taskList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

const TaskListSearchContainer = connect(mapStateToProps, actions)(TaskListSearchComponent);

export default TaskListSearchContainer;

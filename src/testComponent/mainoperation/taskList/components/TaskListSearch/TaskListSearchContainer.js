import { connect } from 'react-redux';
import * as actions from '../../actions/TaskListAction';
import TaskListSearchComponent from './TaskListSearchComponent';

function mapStateToProps(state) {
  return {
    directories: state.taskList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

const TaskListSearchContainer = connect(mapStateToProps, actions)(TaskListSearchComponent);

export default TaskListSearchContainer;

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { searchTasks } from '../../actions/DeptTaskListAction';
import DeptTaskListSearchDisplay from './DeptTaskListSearchDisplay';

const selector = formValueSelector('deptTaskListSearchDisplay');

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    directories: state.deptTaskList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

const DeptTaskListSearchContainer =
  connect(mapStateToProps, { searchTasks })(DeptTaskListSearchDisplay);

export default DeptTaskListSearchContainer;

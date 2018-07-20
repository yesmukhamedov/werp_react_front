import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import DtskcComponent from './DtskcComponent';
import { fetchReferences, fetchUsers, createTask } from '../actions';

const selector = formValueSelector('DtskcForm');

const mapStateToProps = (state) => {
  const selectedCompany = selector(state, 'company');
  const selectedDepartment = selector(state, 'department');
  const selectedBranch = selector(state, 'branch');
  return {
    selectedCompany,
    selectedBranch,
    selectedDepartment,
    companyOpts: state.userInfo.companyOptions,
    branchOpts: state.userInfo.branchOptionsAll,
    deptOpts: state.dtskcTransaction.dtskc.reference.deptOptions,
    statusOpts: state.dtskcTransaction.dtskc.reference.statusOptions,
    taskTypeOpts: state.dtskcTransaction.dtskc.reference.taskTypeOptions,
    assigneeOpts: state.dtskcTransaction.dtskc.assigneeOpts,
    managerOpts: state.dtskcTransaction.dtskc.reference.managerOptions,
    lang: state.locales.lang,
  };
};

export default connect(mapStateToProps, {
  fetchReferences,
  fetchUsers,
  createTask,
})(DtskcComponent);

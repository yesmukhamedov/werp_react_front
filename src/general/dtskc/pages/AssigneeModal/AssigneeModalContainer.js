import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import AssigneeModal from './AssigneeModal';
import { toggleAssigneeModal } from '../../actions';


const selector = formValueSelector('DtskcForm');

const mapStateToProps = (state) => {
  const selectedCompany = selector(state, 'company');
  const branchOpts = (selectedCompany ? state.userInfo.branchOptionsNormalized[selectedCompany] : {});
  return {
    selectedCompany,
    branchOpts,
    modalOpen: state.dtskcTransaction.dtskc.assigneeModal,
    deptOpts: state.dtskcTransaction.dtskc.reference.deptOptions,
    managerOpts: state.dtskcTransaction.dtskc.reference.managerOptions,
  };
};

export default connect(
  mapStateToProps,
  { toggleAssigneeModal },
)(AssigneeModal);

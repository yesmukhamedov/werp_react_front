import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import AddMessageGroupUserModalDisplay from './AddMessageGroupUserModalDisplay';
import { createMessageGroupUser, fetchMessageGroupUsers, updateMessageGroupUser } from '../../actions/MessageGroupUserAction';

const selector = formValueSelector('MgruAddMessageGroupUserForm');

function mapStateToProps(state, props) {
  const initialData = {}
  if (props.modalData !== null) {
    initialData.messageGroup = props.modalData.groupId;
    initialData.user = props.modalData.userId;
    initialData.company = props.modalData.companyId;
    initialData.branch = props.modalData.branchId;
    initialData.department = props.modalData.departmentId;
    initialData.supervisor = props.modalData.supervisorId;
  } 
  const selectedCompany = selector(state, 'company');
  const selectedDepartment = selector(state, 'department');
  return {
    initialValues: initialData,
    selectedCompany,
    selectedDepartment,
    reference: state.mgruTransaction.mgru.reference,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

export default connect(mapStateToProps, {
  createMessageGroupUser,
  updateMessageGroupUser,
  fetchMessageGroupUsers,
})(AddMessageGroupUserModalDisplay);

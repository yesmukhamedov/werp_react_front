import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { injectIntl } from 'react-intl';
import AddMessageGroupUserModalDisplay from './AddMessageGroupUserModalDisplay';
import {
  createMessageGroupUser,
  fetchMessageGroupUsers,
  updateMessageGroupUser,
} from '../../actions/MessageGroupUserAction';

const selector = formValueSelector('mgruAddMessageGroupUserForm');

function mapStateToProps(state, props) {
  const initialData = {};
  if (props.modalData !== null) {
    initialData.messageGroup = props.modalData.groupId;
    // initialData.user = props.modalData.userId;
    initialData.company = props.modalData.companyId;
    initialData.branch = props.modalData.branchId;
    initialData.department = props.modalData.departmentId;
    initialData.supervisor = props.modalData.supervisorId;
  }
  const selectedCompany = selector(state, 'company');
  const selectedDepartment = selector(state, 'department');
  const branchOpts = selectedCompany
    ? state.userInfo.branchOptionsAll[selectedCompany]
    : {};
  return {
    initialValues: initialData,
    selectedCompany,
    selectedDepartment,
    reference: state.mgruTransaction.mgru.reference,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: branchOpts,
  };
}

export default connect(
  mapStateToProps,
  {
    createMessageGroupUser,
    updateMessageGroupUser,
    fetchMessageGroupUsers,
  },
)(injectIntl(AddMessageGroupUserModalDisplay));

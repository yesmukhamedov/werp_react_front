import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import moment from 'moment';
import DtskcComponent from './DtskcComponent';
import {
  fetchReferences,
  fetchUsers,
  createTask,
  toggleAssigneeModal,
  removeAssigneeGroup,
  removeAssigneePerson,
  clearTransaction,
} from '../actions';

const defaultDtskcFormData = {
  createdAt: moment(),
  estimatedAt: moment().add(3, 'days'),
};

const mapStateToProps = state => ({
  companyOpts: state.userInfo.companyOptions,
  statusOpts: state.dtskcTransaction.dtskc.reference.statusOptions,
  taskTypeOpts: state.dtskcTransaction.dtskc.reference.taskTypeOptions,
  managerOpts: state.dtskcTransaction.dtskc.reference.managerOptions,
  groupOpts: state.dtskcTransaction.dtskc.reference.groupOptions,
  lang: state.locales.lang,
  initialValues: defaultDtskcFormData,
  assigneeModal: state.dtskcTransaction.dtskc.assigneeModal,
  assigneeGroups: state.dtskcTransaction.dtskc.assigneeGroups,
  assignees: state.dtskcTransaction.dtskc.assignees,
  userId: state.auth.userId,
});

export default connect(
  mapStateToProps,
  {
    fetchReferences,
    fetchUsers,
    createTask,
    toggleAssigneeModal,
    removeAssigneeGroup,
    removeAssigneePerson,
    clearTransaction,
  },
)(DtskcComponent);

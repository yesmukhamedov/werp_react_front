import { connect } from 'react-redux';
import AddTaskAdminModalComponent from './AddTaskAdminModalComponent';
import { createTaskAdmin, fetchTaskAdmins } from '../../actions';

const mapStateToProps = state => ({
  lang: state.locales.lang,
  deptOptions: state.dtskdepTransaction.dtskdep.reference.deptOptions,
  userOptions: state.dtskdepTransaction.dtskdep.reference.userOptions,
});

export default connect(mapStateToProps, {
  createTaskAdmin,
  fetchTaskAdmins,
})(AddTaskAdminModalComponent);

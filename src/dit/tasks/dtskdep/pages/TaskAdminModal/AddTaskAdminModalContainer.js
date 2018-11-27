import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import AddTaskAdminModalComponent from './AddTaskAdminModalComponent';
import { createTaskAdmin, fetchTaskAdmins } from '../../actions';

const mapStateToProps = state => ({
  lang: state.locales.lang,
  deptOptions: state.dtskdepTransaction.dtskdep.reference.deptOptions,
  // userOptions: state.dtskdepTransaction.dtskdep.reference.userOptions,
});

export default connect(mapStateToProps, {
  createTaskAdmin,
  fetchTaskAdmins,
})(injectIntl(AddTaskAdminModalComponent));

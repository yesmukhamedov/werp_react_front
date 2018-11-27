import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import TaskAdminTableDisplay from './TaskAdminTableDisplay';
import { removeTaskAdmin, fetchTaskAdmins } from '../../actions';

const mapStateToProps = state => ({
  lang: state.locales.lang,
  taskAdminList: state.dtskdepTransaction.dtskdep.taskAdminList,
});

export default connect(mapStateToProps, {
  removeTaskAdmin,
  fetchTaskAdmins,
})(injectIntl(TaskAdminTableDisplay));

import { connect } from 'react-redux';
import DtskdepComponent from './DtskdepComponent';
import { fetchReferences, fetchTaskAdmins } from '../actions';

const mapStateToProps = state => ({
  lang: state.locales.lang,
  taskAdminList: state.dtskdepTransaction.dtskdep.taskAdminList,
});

export default connect(mapStateToProps, {
  fetchReferences,
  fetchTaskAdmins,
})(DtskdepComponent);

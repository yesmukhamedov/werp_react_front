import { connect } from 'react-redux';
import DtskdepComponent from './DtskdepComponent';
import { injectIntl } from 'react-intl';
import { fetchReferences, fetchTaskAdmins } from '../actions';

const mapStateToProps = state => ({
  lang: state.locales.lang,
  taskAdminList: state.dtskdepTransaction.dtskdep.taskAdminList,
});

export default connect(mapStateToProps, {
  fetchReferences,
  fetchTaskAdmins,
})(injectIntl(DtskdepComponent));

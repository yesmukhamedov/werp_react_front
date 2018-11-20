import { connect } from 'react-redux';
import TaskApproverDisplay from './TaskApproverDisplay';
import { fetchTaskDocStatus, approve, reject } from '../../actions/TaskApproverAction';
import { messages as msg} from '../../../../../locales/defineMessages';
import { injectIntl } from 'react-intl';

const mapStateToProps = state => ({
    msg,
    lang: state.locales.lang,
    taskDocStatus: state.gtskeditTransaction.taskDocStatus,
});
export default connect(mapStateToProps, 
    { fetchTaskDocStatus, approve, reject })(injectIntl(TaskApproverDisplay));

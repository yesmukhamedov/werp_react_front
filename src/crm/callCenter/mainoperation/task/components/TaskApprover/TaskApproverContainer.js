import { connect } from 'react-redux';
import TaskApproverDisplay from './TaskApproverDisplay';
import { fetchTaskById } from '../../actions/TaskAction';
import { messages } from '../../../../../../locales/defineMessages';
import { injectIntl } from 'react-intl';

const mapStateToProps = state => ({
    lang: state.locales.lang,
    messages
});
export default connect(mapStateToProps, { fetchTaskById })(injectIntl(TaskApproverDisplay));

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PrivateTaskListTableDisplay from './PrivateTaskListTableDisplay';
import { fetchPrivateTasks } from '../../actions/DeptTaskListAction';
import { messages } from '../DeptTaskListTable/DeptTaskListTableContainer';

function mapStateToProps(state) {
  return {
    messages,
    result: state.deptTaskList.privateTasks,
    lang: state.locales.lang,
  };
}

const PrivateTaskListTableContainer =
  connect(mapStateToProps, { fetchPrivateTasks })(injectIntl(PrivateTaskListTableDisplay));

export default PrivateTaskListTableContainer;

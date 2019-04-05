import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PrivateTaskListTableDisplay from './PrivateTaskListTableDisplay';
import { fetchPrivateTasks } from '../../actions/DeptTaskListAction';
// import { messages } from '../DeptTaskListTable/DeptTaskListTableContainer';
import { messages } from '../../../../../locales/defineMessages';

function mapStateToProps(state) {
  return {
    messages,
    result: state.deptTaskList.privateTasks,
    directories: state.deptTaskList.directories,
    lang: state.locales.lang,
  };
}

const PrivateTaskListTableContainer = connect(
  mapStateToProps,
  { fetchPrivateTasks },
)(injectIntl(PrivateTaskListTableDisplay));

export default PrivateTaskListTableContainer;

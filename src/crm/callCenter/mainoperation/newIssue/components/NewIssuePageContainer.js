import { connect } from 'react-redux';
import NewIssuePageComponent from './NewIssuePageComponent';
import { fetchContractById, fetchTasks } from '../actions';
import { getTaskDirectories } from '../../taskList/actions/TaskListAction';

function mapStateToProps(state) {
  return {
    contractDetails: state.outCalls.newIssuePage.contractDetails,
    directories: state.outCalls.newIssuePage.directories,
    outCallInfo: state.outCalls.newIssuePage.outCallInfo,
    lang: state.locales.lang,
  };
}

export default connect(mapStateToProps, {
  fetchContractById,
  fetchTasks,
  getTaskDirectories,
})(NewIssuePageComponent);

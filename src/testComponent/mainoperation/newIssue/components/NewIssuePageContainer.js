import { connect } from 'react-redux';
import NewIssuePageComponent from './NewIssuePageComponent';
import { fetchContractById, fetchTasks } from '../actions';

function mapStateToProps(state) {
  console.log("NIPC", state)
  return {
    contractDetails: state.outCalls.newIssuePage.contractDetails,
  };
}

export default connect(mapStateToProps, { fetchContractById, fetchTasks })(NewIssuePageComponent);

import { connect } from 'react-redux';
import NewIssuePageComponent from './NewIssuePageComponent';
import { fetchContractById, fetchTasks } from '../actions';

function mapStateToProps(state) {
  return {
    contractDetails: state.outCalls.contractDetails,
  };
}

export default connect(mapStateToProps, { fetchContractById, fetchTasks })(NewIssuePageComponent);

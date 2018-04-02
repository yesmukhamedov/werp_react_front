import { connect } from 'react-redux';
import NewTaskModalComponent from './NewTaskModalComponent';
import { createNewTask } from '../../actions';

const mapStateToProps = state => ({
  bukrs: state.outCalls.newIssuePage.bukrs,
  contractNumber: state.outCalls.newIssuePage.outCallInfo.contractNumber,
});

export default connect(mapStateToProps, { createNewTask })(NewTaskModalComponent);

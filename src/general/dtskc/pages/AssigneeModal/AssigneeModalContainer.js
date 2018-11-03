import { connect } from 'react-redux';
import AssigneeModal from './AssigneeModal';
import { toggleAssigneeModal } from '../../actions';

const mapStateToProps = state => ({
  modalOpen: state.dtskcTransaction.dtskc.assigneeModal,
});

export default connect(mapStateToProps, { toggleAssigneeModal })(AssigneeModal);

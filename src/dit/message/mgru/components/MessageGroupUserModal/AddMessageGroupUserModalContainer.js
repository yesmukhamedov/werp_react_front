import { connect } from 'react-redux';
import AddMessageGroupUserModalDisplay from './AddMessageGroupUserModalDisplay';
import { createMessageGroupUser, fetchMessageGroupUsers, updateMessageGroupUser } from '../../actions/MessageGroupUserAction';

function mapStateToProps(state, props) {
  if (props.modalData !== null) {
    const initialData = {
      groupName: props.modalData.groupName,
    };
    return {
      initialValues: initialData,
    };
  }
  return {};
}

export default connect(mapStateToProps, {
  createMessageGroupUser,
  updateMessageGroupUser,
  fetchMessageGroupUsers,
})(AddMessageGroupUserModalDisplay);

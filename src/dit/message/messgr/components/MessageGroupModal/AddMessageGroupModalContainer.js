import { connect } from 'react-redux';
import AddMessageGroupModalDisplay from './AddMessageGroupModalDisplay';
import { createMessageGroup, fetchMessageGroups, updateMessageGroup } from '../../actions/MessageGroupAction';

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
  createMessageGroup,
  updateMessageGroup,
  fetchMessageGroups,
})(AddMessageGroupModalDisplay);

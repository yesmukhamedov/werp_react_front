import { connect } from 'react-redux';
import AddMessageGroupModalDisplay from './AddMessageGroupModalDisplay';
import { createMessageGroup, fetchMessageGroups } from '../../actions/MessageGroupAction';

export default connect(null, {
  createMessageGroup,
  fetchMessageGroups,
})(AddMessageGroupModalDisplay);

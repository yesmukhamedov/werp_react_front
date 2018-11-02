import { connect } from 'react-redux';
import MessageGroupUserDisplay from './MessageGroupUserDisplay';
import { fetchMessageGroupUsers } from '../actions/MessageGroupUserAction';

export default connect(null, { fetchMessageGroupUsers })(MessageGroupUserDisplay);

import { connect } from 'react-redux';
import MessageGroupDisplay from './MessageGroupDisplay';
import { fetchMessageGroups } from '../actions/MessageGroupAction';

export default connect(null, { fetchMessageGroups })(MessageGroupDisplay);

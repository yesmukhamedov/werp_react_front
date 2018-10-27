import { connect } from 'react-redux';
import MessageGroupTableDisplay from './MessageGroupTableDisplay';
import { removeMessageGroup, fetchMessageGroups } from '../../actions/MessageGroupAction';

const mapStateToProps = state => ({
  messageGroupList: state.messgrTransaction.messgr.messageGroupList,
});

export default connect(
  mapStateToProps,
  { removeMessageGroup, fetchMessageGroups },
)(MessageGroupTableDisplay);

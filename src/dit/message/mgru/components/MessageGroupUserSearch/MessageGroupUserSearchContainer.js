import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchMessageGroupUsers } from '../../actions/MessageGroupUserAction';
import MessageGroupUserSearchDisplay from './MessageGroupUserSearchDisplay';
// import { messages } from '../../../../../locales/defineMessages';


function mapStateToProps(state) {
  return {
    // messages,
    reference: state.mgruTransaction.mgru.reference,
  };
}

const MessageGroupUserSearchContainer =
  connect(mapStateToProps, { fetchMessageGroupUsers })(injectIntl(MessageGroupUserSearchDisplay));

export default MessageGroupUserSearchContainer;

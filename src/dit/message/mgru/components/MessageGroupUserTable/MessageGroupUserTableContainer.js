import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MessageGroupUserTableDisplay from './MessageGroupUserTableDisplay';
import { removeMessageGroupUser, fetchMessageGroupUsers } from '../../actions/MessageGroupUserAction';

const mapStateToProps = state => ({
  lang: state.locales.lang,
  messageGroupUserList: state.mgruTransaction.mgru.messageGroupUserList,
});

export default connect(
  mapStateToProps,
  { removeMessageGroupUser, fetchMessageGroupUsers },
)(injectIntl(MessageGroupUserTableDisplay));

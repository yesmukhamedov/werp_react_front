import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MessageGroupUserDisplay from './MessageGroupUserDisplay';
import { fetchMessageGroupUsers, fetchReferences } from '../actions/MessageGroupUserAction';

const mapStateToProps = state => ({
  lang: state.locales.lang,
});
export default connect(mapStateToProps,
  { fetchMessageGroupUsers, fetchReferences })(injectIntl(MessageGroupUserDisplay));

import { connect } from 'react-redux';
import MessageGroupUserDisplay from './MessageGroupUserDisplay';
import { fetchMessageGroupUsers, fetchReferences } from '../actions/MessageGroupUserAction';

const mapStateToProps = state => ({
    lang: state.locales.lang,
});
export default connect(mapStateToProps, { fetchMessageGroupUsers, fetchReferences })(MessageGroupUserDisplay);

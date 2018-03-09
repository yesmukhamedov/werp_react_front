import { connect } from 'react-redux';
import OutCallDetailsPanelDisplay from './OutCallDetailsPanelDisplay';
import { editNewComment, submitNewComment } from '../../actions';


const mapStateToProps = state => ({
  comments: state.outCalls.outCallDetailsPanel.comments,
  newComment: state.outCalls.outCallDetailsPanel.newComment,
});

export default connect(mapStateToProps, {
  editNewComment,
  submitNewComment,
})(OutCallDetailsPanelDisplay);

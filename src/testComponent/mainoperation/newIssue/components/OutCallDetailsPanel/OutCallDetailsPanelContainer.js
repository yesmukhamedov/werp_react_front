import { connect } from 'react-redux';
import OutCallDetailsPanelDisplay from './OutCallDetailsPanelDisplay';

const mapStateToProps = state => ({
  comments: state.outCalls.newIssuePage.comments,
});

export default connect(mapStateToProps)(OutCallDetailsPanelDisplay);

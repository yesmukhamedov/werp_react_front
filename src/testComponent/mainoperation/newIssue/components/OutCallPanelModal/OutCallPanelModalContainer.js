import { connect } from 'react-redux';
import OutCallPanelModalComponent from './OutCallPanelModalComponent';
import { updateOutCall } from '../../actions/index';

const mapStateToProps = state => ({
  outCallId: state.outCalls.newIssuePage.outCallId,
});

export default connect(mapStateToProps, { updateOutCall })(OutCallPanelModalComponent);

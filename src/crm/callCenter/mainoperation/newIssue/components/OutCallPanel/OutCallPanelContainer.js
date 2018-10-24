import { connect } from 'react-redux';
import OutCallPanelDisplay from './OutCallPanelDisplay';
import { createOutCallFromContract } from '../../actions';

const mapStateToProps = state => ({
  lang: state.locales.lang,
});

export default connect(mapStateToProps, { createOutCallFromContract })(OutCallPanelDisplay);

import { connect } from 'react-redux';
import TaskPanelComponent from './TaskPanelComponent';

const mapStateToProps = state => ({
  tasks: state.outCalls.newIssuePage.tasks,
});

export default connect(mapStateToProps)(TaskPanelComponent);

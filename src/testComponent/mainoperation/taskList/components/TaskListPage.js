import { connect } from 'react-redux';
import * as actions from '../actions/TaskListAction';
import TaskListPageDisplay from './TaskListPageDisplay';

function mapStateToProps(state) {
  return {
    lang: state.locales.lang,
  };
}

const TaskListPageContainer = connect(mapStateToProps, actions)(TaskListPageDisplay);

export default TaskListPageContainer;

import { connect } from 'react-redux';
import * as actions from '../actions/TaskListAction';
import TaskListPageDisplay from './TaskListPageDisplay';

const TaskListPageContainer = connect(null, actions)(TaskListPageDisplay);

export default TaskListPageContainer;

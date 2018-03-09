import { connect } from 'react-redux';
import { getDirectories } from '../../taskList/actions/TaskListAction';
import TaskPageDisplay from './TaskPageDisplay';

const TaskPageContainer = connect(null, { getDirectories })(TaskPageDisplay);

export default TaskPageContainer;

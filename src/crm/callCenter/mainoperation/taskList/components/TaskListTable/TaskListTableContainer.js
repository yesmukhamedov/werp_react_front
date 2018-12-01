import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import TaskListTableComponent from './TaskListTableComponent';
import { messages } from '../../../../../../locales/defineMessages';

function mapStateToProps(state) {
  return {
    messages,
    result: state.taskList.result,
    lang: state.locales.lang,
  };
}

const TaskListTableContainer = connect(mapStateToProps)(injectIntl(TaskListTableComponent));

export default TaskListTableContainer;

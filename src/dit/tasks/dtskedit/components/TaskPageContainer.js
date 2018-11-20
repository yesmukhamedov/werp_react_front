import { connect } from 'react-redux';
import { getTaskDirectories } from '../../../../crm/callCenter/mainoperation/taskList/actions/TaskListAction';

import {
  fetchTaskById,
  clearTaskStore,
  toggleModal,
  addUpload,
  deleteUpload,
} from '../actions/TaskAction';
import TaskPageDisplay from './TaskPageDisplay';
import TaskInfoWrapper from './TaskInfo/TaskInfoWrapper';

function mapStateToProps(state) {
  return {
    taskDetails: state.gtskeditTransaction.taskDetails,
    attachment: state.gtskeditTransaction.attachment,
    lang: state.locales.lang,
    TaskInfoWrapper,
    modalAttachment: state.gtskeditTransaction.modalAttachment,
  };
}

const TaskPageContainer = connect(
  mapStateToProps,
  {
    getTaskDirectories,
    fetchTaskById,
    clearTaskStore,
    toggleModal,
    addUpload,
    deleteUpload,
  },
)(TaskPageDisplay);

export default TaskPageContainer;

import {
  CLEAR_TASK_STORE,
  FETCH_TASK_DETAILS,
  EDIT_TASK,
  TOGGLE_MODAL,
  ADD_UPLOADED,
  DELETE_UPLOADED,
} from '../actions/TaskAction';

import { FETCH_TASK_DOC_STATUS } from '../actions/TaskApproverAction';

const initialState = {
  modalAttachment: false,
  attachment: {},
};

export default function (state = initialState, action) {
  const { id, taskId, attachmentJson } = state.attachment;
  switch (action.type) {
    case FETCH_TASK_DETAILS:
      const { attachment, ...rest } = action.payload;
      return {
        ...state,
        taskDetails: rest,
        attachment,
      };
    case FETCH_TASK_DOC_STATUS:
      return { ...state, taskDocStatus: action.payload};  
    case EDIT_TASK:
      return { ...state, taskDetails: action.payload };
    case CLEAR_TASK_STORE:
      return { ...state, directories: undefined, taskDetails: undefined };
    case TOGGLE_MODAL:
      return { ...state, modalAttachment: !action.payload };
    case ADD_UPLOADED:
      return {
        ...state,
        attachment: {
          id,
          taskId,
          attachmentJson: [...attachmentJson, action.payload],
        },
      };
    case DELETE_UPLOADED:
      const json = attachmentJson.filter(el => el.fileDownloadUri != action.payload );
      return { ...state, attachment: { id, taskId, attachmentJson: json } };
    default:
      return state;
  }
}

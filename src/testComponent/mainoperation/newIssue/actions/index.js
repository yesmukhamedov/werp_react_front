import axios from 'axios';
import {
  FETCH_CONTRACT_DETAILS,
  EDIT_OUTCALL_COMMENT,
  CREATE_NEW_TASK,
  FETCH_TASKS,
  OUTCALL_STATUS_COMMENT_UPDATED,
} from './actionTypes';
import { ROOT_URL } from '../../../../utils/constants';

export function fetchContractById(contractNumber) {
  const req = axios.get(
    `${ROOT_URL}/api/call-center/out-calls/${contractNumber}`,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: FETCH_CONTRACT_DETAILS,
          payload: data,
        });
      })
      .catch(err =>
        console.log('NEW_ISSUE_PAGE ERROR: FETCH_CONTRACT_DETAILS ', err),);
  };
}

export function editNewComment(e) {
  return {
    type: EDIT_OUTCALL_COMMENT,
    payload: e.target.value,
  };
}

export function createNewTask(contractNumber, params) {
  const req = axios.post(
    `${ROOT_URL}/api/call-center/out-calls/${contractNumber}/tasks`,
    {
      title: params.title,
      description: params.description,
      status: {
        id: params.status,
      },
      priority: {
        id: params.priority,
      },
      recipient: {
        branch: {
          id: params.branch,
        },
        department: {
          id: params.department,
        },
        position: {
          id: params.position,
        },
      },
    },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: CREATE_NEW_TASK,
          payload: data,
        });
      })
      .catch(err => console.log('NEW_ISSUE_PAGE ERROR: CREATE_NEW_TASK ', err));
  };
}

export function fetchTasks(contractNumber) {
  const req = axios.get(
    `${ROOT_URL}/api/call-center/out-calls/${contractNumber}/tasks`,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: FETCH_TASKS,
          payload: data,
        });
      })
      .catch(err => console.log('NEW_ISSUE_PAGE ERROR: FETCH_TASKS ', err));
  };
}

export function updateOutCall(newOutCallParams) {
  const req = axios.put(
    `${ROOT_URL}/api/call-center/out-calls/${newOutCallParams.id}`,
    {
      id: newOutCallParams.id,
      status: {
        id: newOutCallParams.status,
      },
      newComment: newOutCallParams.text,
    },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: OUTCALL_STATUS_COMMENT_UPDATED,
          payload: data,
        });
      })
      .catch(err =>
        console.log(
          'NEW_ISSUE_PAGE ERROR: OUTCALL_STATUS_COMMENT_UPDATED ',
          err,
        ),);
  };
}

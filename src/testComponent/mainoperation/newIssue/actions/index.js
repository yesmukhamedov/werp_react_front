import axios from 'axios';
import {
  FETCH_CONTRACT_DETAILS,
  EDIT_OUTCALL_COMMENT,
  SUBMIT_OUTCALL_COMMENT,
  FETCH_TASKS,
  OUTCALL_STATUS_COMMENT_UPDATED,
} from './actionTypes';
import { ROOT_URL } from '../../../../utils/constants';

export function fetchContractById(outCallId) {
  const req = axios.get(`${ROOT_URL}/api/call-center/out-calls/${outCallId}`, {
    headers: {
      authorization: localStorage.getItem('token'),
    },
  });
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: FETCH_CONTRACT_DETAILS,
          payload: data,
        });
      })
      .catch(err => console.log('NEW_ISSUE_PAGE ERROR: FETCH_CONTRACT_DETAILS ', err));
  };
}

export function editNewComment(e) {
  return {
    type: EDIT_OUTCALL_COMMENT,
    payload: e.target.value,
  };
}

export function submitNewComment(outCallId, newComment) {
  return (dispatch) => {
    axios
      .post(
        `${ROOT_URL}/api/call-center/out-calls/${outCallId}/comments`,
        {
          text: newComment,
        },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(({ data }) => {
        dispatch({
          type: SUBMIT_OUTCALL_COMMENT,
          payload: data,
        });
      })
      .catch(err => console.log('NEW_ISSUE_PAGE ERROR: SUBMIT_OUTCALL_COMMENT ', err));
  };
}

export function fetchTasks(outCallId) {
  const req = axios.get(
    `${ROOT_URL}/api/call-center/out-calls/${outCallId}/tasks`,
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
      .catch(err => console.log('NEW_ISSUE_PAGE ERROR: OUTCALL_STATUS_COMMENT_UPDATED ', err));
  };
}

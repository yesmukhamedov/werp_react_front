import axios from 'axios';
import {
  FETCH_CONTRACT_DETAILS,
  EDIT_OUTCALL_COMMENT,
  SUBMIT_OUTCALL_COMMENT,
} from './actionTypes';
import { ROOT_URL } from '../../../../utils/constants';

export function fetchContractById(contractId) {
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/call-center/out-calls/${contractId}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: FETCH_CONTRACT_DETAILS,
          payload: data,
        });
      })
      .catch(err => console.log('NEW_ISSUE_PAGE ERROR: ', err));
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
      .catch(err => console.log('NEW_ISSUE_PAGE SUBMIT ERROR: ', err));
  };
}

export function fetchTasks() {
  return (dispatch) => {
    console.log(dispatch);
  };
}

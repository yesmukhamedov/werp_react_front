import axios from 'axios';
import { FETCH_CONTRACT_DETAILS } from './actionTypes';
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

export function fetchTasks() {
  return (dispatch) => {
    console.log(dispatch);
  };
}

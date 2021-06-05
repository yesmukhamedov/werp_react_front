import { doGet, doPost, doPut } from '../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';
import { errorTableText } from '../../utils/helpers';
import {
  EDIT_SMECAM,
  FETCH_SMECAM,
} from '../../service/mainoperation/smecam/smecamAction';
import { APPR_REJ, notSuccessed, successed } from '../../aes/aesAction';

export const FETCH_SUBJECT_APPEAL = 'FETCH_SUBJECT_APPEAL';
export const CREATE_SUBJECT_APPEAL = 'CREATE_SUBJECT_APPEAL';
export const UPDATE_SUBJECT_APPEAL = 'UPDATE_SUBJECT_APPEAL';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//--CRUD тема обращения
//GET
export function fetchSubjectAppeal(param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`call_center_2021/ref/theme`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_SUBJECT_APPEAL,
          payload: data,
        });
        dispatch(modifyLoader(false));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

//POST
export function createSubjectAppeal(param, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost('call_center_2021/ref/theme', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CREATE_SUBJECT_APPEAL,
          payload: data,
        });
        getCallback();
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}

//PUT
export function updateSubjectAppeal(body, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPut('call_center_2021/ref/theme', { ...body })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPDATE_SUBJECT_APPEAL,
          payload: [],
        });
        getCallback();
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

//--CRUD источник обращений

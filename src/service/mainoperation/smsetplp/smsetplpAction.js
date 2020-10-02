import { doGet, doPost, doPut } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SMSETPLP_BY_ID = 'FETCH_SMSETPLP_BY_ID';
export const FETCH_SMSETPLP_LIST = 'FETCH_SMSETPLP_LIST';
export const CLEAR_SMSETPLP_LIST = 'CLEAR_SMSETPLP_LIST';
export const POST_SMSETPLP_FORM = 'POST_SMSETPLP_FORM';
export const UPDATE_SMSETPLP = 'UPDATE_SMSETPLP';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//SMSETPLP получить данные по ID
export const fetchSmsetplpById = id => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsetplp/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPLP_BY_ID,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
//SMSETPLP получить список
export const fetchSmsetplpList = (param, clearFn) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsetplp/view`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPLP_LIST,
          data,
        });
        if (data.data.length > 0) {
          console.log('TRUE', data.data.length);
        } else {
          clearFn();
          console.log('FALSE', data.data.length);
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
//SMSETPLP получить список

export function clearSmsetplpList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SMSETPLP_LIST,
    });
  };
}

// Сформировать
export const postSmsetplpForm = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smsetplp/form?dateAt=${param}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMSETPLP_FORM,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//SMSETPLP редактировать
export const updateSmsetplp = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`smsetplp/update`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPDATE_SMSETPLP,
          data,
        });
        setFunc();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

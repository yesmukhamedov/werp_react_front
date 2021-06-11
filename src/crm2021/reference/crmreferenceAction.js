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
//
export const FETCH_SOURCE_REQUESTS = 'FETCH_SOURCE_REQUESTS';
export const CREATE_SOURCE_REQUESTS = 'CREATE_SOURCE_REQUESTS';
export const UPDATE_SOURCE_REQUESTS = 'UPDATE_SOURCE_REQUESTS';
//
export const FETCH_SOURCE_VACANCIES = 'FETCH_SOURCE_VACANCIES';
export const CREATE_SOURCE_VACANCIES = 'CREATE_SOURCE_VACANCIES';
export const UPDATE_SOURCE_VACANCIES = 'UPDATE_SOURCE_VACANCIES';
//
export const FETCH_REASON_CONTRACT = 'FETCH_REASON_CONTRACT';
export const CREATE_REASON_CONTRACT = 'CREATE_REASON_CONTRACT';
export const UPDATE_REASON_CONTRACT = 'UPDATE_REASON_CONTRACT';
//
export const FETCH_PRESENT = 'FETCH_PRESENT';
export const CREATE_PRESENT = 'CREATE_PRESENT';
export const UPDATE_PRESENT = 'UPDATE_PRESENT';
//
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
//
export const FETCH_VACANCY = 'FETCH_VACANCY';
export const CREATE_VACANCY = 'CREATE_VACANCY';
export const UPDATE_VACANCY = 'UPDATE_VACANCY';

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

//GET
export function fetchSource(type, param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`call_center_2021/ref/source?`, type)
      .then(({ data }) => {
        switch (type.type) {
          case 'APPLICATION':
            dispatch({
              type: FETCH_SOURCE_REQUESTS,
              payload: data,
            });
            break;
          case 'VACANCY':
            dispatch({
              type: FETCH_SOURCE_VACANCIES,
              payload: data,
            });
            break;
        }

        dispatch(modifyLoader(false));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

//POST
export function createSource(param, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost('call_center_2021/ref/source', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CREATE_SOURCE_REQUESTS,
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
export function updateSource(body, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPut('call_center_2021/ref/source', { ...body })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPDATE_SOURCE_REQUESTS,
          payload: [],
        });
        getCallback();
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}
//--CRUD источник вакансий
//GET
export function fetchVacancy(param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`call_center_2021/ref/vacancy`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_VACANCY,
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
export function createVacancy(param, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost('call_center_2021/ref/vacancy', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CREATE_VACANCY,
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
export function updateVacancy(body, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPut('call_center_2021/ref/vacancy', { ...body })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPDATE_VACANCY,
          payload: [],
        });
        getCallback();
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
} //--CRUD причина контракта
//GET
export function fetchReasonContract(param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`call_center_2021/ref/reason`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_REASON_CONTRACT,
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
export function createReasonContract(param, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost('call_center_2021/ref/reason', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CREATE_REASON_CONTRACT,
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
export function updateReasonContract(body, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPut('call_center_2021/ref/reason', { ...body })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPDATE_REASON_CONTRACT,
          payload: [],
        });
        getCallback();
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}
//--CRUD подарки
//GET
export function fetchPresent(param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`call_center_2021/ref/present`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_PRESENT,
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
export function createPresent(param, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost('call_center_2021/ref/present', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CREATE_PRESENT,
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
export function updatePresent(body, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPut('call_center_2021/ref/present', { ...body })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPDATE_PRESENT,
          payload: [],
        });
        getCallback();
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

//--CRUD категорий
//GET
export function fetchCategory(param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`call_center_2021/ref/category`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_CATEGORY,
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
export function createCategory(param, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost('call_center_2021/ref/category', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CREATE_CATEGORY,
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
export function updateCategory(body, getCallback) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPut('call_center_2021/ref/category', { ...body })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPDATE_CATEGORY,
          payload: [],
        });
        getCallback();
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

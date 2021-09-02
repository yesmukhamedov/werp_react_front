// import {
//   handleError,
//   notify,
// } from '../../../../general/notification/notification_action';
// import { modifyLoader } from '../../../../general/loader/loader_action';
// import browserHistory from '../../../../utils/history';
import axios from 'axios';
import { doPost, doPut } from '../../../../utils/apiActions';

const CONNECTOR_URL = 'http://192.168.0.26:3454';
export const CALL_CREATED = 'CALL_CREATED';
export const CALLING_FLAG = 'CALLING_FLAG';
export const CALL_STATUS = 'CALL_STATUS';

// function doGet(uri) {
//   //return fetch(`${CONNECTOR_URL}` + uri);

//   return axios.get(`${CONNECTOR_URL}` + uri, {
//     headers: {
//       authorization: localStorage.getItem('token'),
//     },
//   });
// }

export function createCall(code, phoneNumber) {
    return dispatch =>
        axios.get(
            `${CONNECTOR_URL}core/call/create/` + code + '/' + phoneNumber,
        );

    return function(dispatch) {
        axios
            .get(`${CONNECTOR_URL}core/call/create/` + code + '/' + phoneNumber)
            .then(({ data }) => {
                dispatch({
                    type: CALL_CREATED,
                    payload: data,
                });
            })
            .catch(e => {
                // handleError(e,dispatch)
            });
    };
}

export function callInfo(code) {
    return dispatch => axios.get(`${CONNECTOR_URL}core/call/info/` + code);
}

export function registerCall(model) {
    return dispatch => doPost('core/crm/call/register', model);
}

export function saveCall(phoneId, model) {
    if (model.id == null && !model.id) {
        return dispatch => doPost('core/crm/call/' + phoneId, model);
    }

    return dispatch => doPut('core/crm/call/update-register', model);
}

export function setCallingFlag(flag) {
    return {
        type: CALLING_FLAG,
        payload: flag,
    };
}

export function setCallStatus(status) {
    return {
        type: CALL_STATUS,
        payload: status,
    };
}

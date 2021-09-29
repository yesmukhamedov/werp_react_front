import { doDelete, doGet, doPost, doPut } from '../../../utils/apiActions';
import {
    handleError,
    notify,
} from '../../../general/notification/notification_action';

const BASE_URL = 'crm2/release-log';

// Types
export const GET_ALL_RELEASES = 'GET_ALL_RELEASES';

export const getAllReleases = () => {
    return dispatch => {
        doGet(BASE_URL)
            .then(({ data }) => {
                dispatch({
                    type: GET_ALL_RELEASES,
                    payload: data,
                });
            })
            .catch(err => {
                handleError(err, dispatch);
            });
    };
};

export const addRelease = (params, callback) => {
    return dispatch => {
        doPost(BASE_URL, params)
            .then(() => {
                callback();
            })
            .catch(error => {
                callback();
                handleError(error, dispatch);
            });
    };
};

export const editRelease = (params, callback) => {
    return dispatch => {
        doPut(BASE_URL, params)
            .then(() => {
                callback();
            })
            .catch(err => {
                callback();
                handleError(err, dispatch);
            });
    };
};

export const removeRelease = (id, callback) => {
    return dispatch => {
        doDelete(BASE_URL + `/${id}`)
            .then(() => {
                callback();
            })
            .catch(err => {
                callback();
                handleError(err, dispatch);
            });
    };
};

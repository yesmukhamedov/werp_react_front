import { doGet, doPost } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_ALL_DEMO_LIST = 'FETCH_ALL_DEMO_LIST';
export const CLEAR_DEMO_LIST = 'CLEAR_DEMO_LIST';
export const FETCH_MONEY_STATUS_LIST = 'FETCH_MONEY_STATUS_LIST';

//const errorTable = JSON.parse(localStorage.getItem('errorTableString'));

export function fetchAlldemoList() {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet('core/getAllDemoList/')
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_ALL_DEMO_LIST,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}

export function fetchMoneyStatusesList() {
    return function(dispatch) {
        dispatch.modifyLoader(true);
        doGet('core//moneyStatusesList')
            .then(({ data }) => {
                dispatch.modifyLoader(false);
                dispatch({
                    type: FETCH_MONEY_STATUS_LIST,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}

export function clearDemoList() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_DEMO_LIST,
        });
    };
}

export function postEditMoneyStatuses(params, setFunc, clearFunc) {
    return function(dispatch) {
        doPost('core/postMoneyStatuses', params)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                setFunc();
            })
            .catch(error => {
                clearFunc();
                handleError(error, dispatch);
            });
    };
}

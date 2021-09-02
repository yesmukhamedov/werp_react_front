import { doGet, doPost } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_COLLECT_MONIES = 'FETCH_COLLECT_MONIES';
export const POST_APPROVE_COLLECT_MONEY = 'POST_APPROVE_COLLECT_MONEY';
export const POST_CREATE_COLLECT_MONEY = 'POST_CREATE_COLLECT_MONEY';
export const POST_REJECT_COLLECT_MONEY = 'POST_REJECT_COLLECT_MONEY';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

// Получить список взносов
export const fetchCollectMonies = param => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/finance/mainoperation/collect_monies`, param)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_COLLECT_MONIES,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const postApproveCollectMoney = (collect_money_id, getCallback) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(`core/finance/mainoperation/approve/${collect_money_id}`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: POST_APPROVE_COLLECT_MONEY,
                    data,
                });
                getCallback();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};
export const postCreateCollectMoney = param => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(`core/finance/mainoperation/create`, param)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: POST_CREATE_COLLECT_MONEY,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};
export const postRejectCollectMoney = (collectMoneyId, getCallback) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(`core/finance/mainoperation/reject/${collectMoneyId}`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: POST_REJECT_COLLECT_MONEY,
                    data,
                });
                getCallback();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

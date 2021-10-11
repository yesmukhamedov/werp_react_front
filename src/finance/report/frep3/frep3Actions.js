import { doGet, doPost } from '../../../utils/apiActions';
import { modifyLoader } from '../../../general/loader/loader_action';
import { handleError } from '../../../general/notification/notification_action';

export const FETCH_RESULT = 'FETCH_RESULT';
export const FETCH_DETAIL = 'FETCH_DETAIL';

export const fetchResultList = param => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/finance/reports/frep3`, param)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_RESULT,
                    payload: { data, param },
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchDetailList = (detailParam, openModal) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/finance/reports/frep3/detail`, detailParam)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_DETAIL,
                    payload: data.result,
                });
                openModal();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';

export const CLEAR_ALL = 'CLEAR_ALL';
export const FETCH_BUSINESS_AREAS = 'FETCH_BUSINESS_AREAS';
export const FETCH_SALES_DETAILS = 'FETCH_SALES_DETAILS';

export function clearAll() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_ALL,
        });
    };
}

export const fetchBusinessAreas = () => {
    return dispatch => {
        doGet(`core/reference/business-areas`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_BUSINESS_AREAS,
                    payload: data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
};

export const fetchSalesDetails = (params, callback) => {
    return dispatch => {
        doGet('core/marketing/report/msr', params)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_SALES_DETAILS,
                    payload: data,
                });
                callback();
            })
            .catch(err => {
                handleError(err);
                callback();
            });
    };
};

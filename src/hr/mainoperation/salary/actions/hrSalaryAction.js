//import { ROOT_URL } from '../../../../utils/constants';
import { modifyLoader } from '../../../../general/loader/loader_action';
import {
    handleError,
    //notify,
} from '../../../../general/notification/notification_action';
import { doGet } from '../../../../utils/apiActions';

export const HR_FETCHED_CURRENT_SALARIES = 'HR_FETCHED_CURRENT_SALARIES';
export const HR_SALARY_LIST_MODAL_OPENED = 'HR_SALARY_LIST_MODAL_OPENED';
export const HR_SALARY_LIST_MODAL_LOADING = 'HR_SALARY_LIST_MODAL_LOADING';

export function fetchCurrentSalaries(params) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/hr/salary`, params)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: HR_FETCHED_CURRENT_SALARIES,
                    payload: data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}

export function toggleSalaryListModal(flag) {
    return {
        type: HR_SALARY_LIST_MODAL_OPENED,
        payload: flag,
    };
}

export function toggleSalaryListModalLoading(flag) {
    return {
        type: HR_SALARY_LIST_MODAL_LOADING,
        payload: flag,
    };
}

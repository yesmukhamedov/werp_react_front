import { doGet, doPut } from '../../utils/apiActions';
import { handleError } from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';

export const FETCH_COMPANY_LIST = 'FETCH_COMPANY_LIST';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const CLEAR_TEST = 'CLEAR_TEST';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

// список компании
export const fetchCompanyList = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`reference/company/list`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_COMPANY_LIST,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// редактировать компанию
export const updateCompany = obj => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPut(`reference/company/update/${obj}`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: UPDATE_COMPANY,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};
export function clearTest() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_TEST,
        });
    };
}

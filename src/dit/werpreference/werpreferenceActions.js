import { doGet } from '../../utils/apiActions';
import { handleError } from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';

export const FETCH_TEST = 'FETCH_TEST';
export const CLEAR_TEST = 'CLEAR_TEST';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

// SRLS список сервисов
export const fetchTest = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`reference/countries`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_TEST,
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

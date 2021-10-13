import { doGet, doPost } from '../../../utils/apiActions';
import { modifyLoader } from '../../../general/loader/loader_action';
import { handleError } from '../../../general/notification/notification_action';

export const FETCH_RESULT = 'FETCH_RESULT';

export const fetchResultList = (param, openModal) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/finance/reports/faglb03`, param)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_RESULT,
                    data,
                });
                openModal();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

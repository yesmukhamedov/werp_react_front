import { doGet } from '../../utils/apiActions';
import { handleError } from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';

export const EXAMPLE_ACTION_TYPE = 'EXAMPLE_ACTION_TYPE';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//SRLS список сервисов
export const fetchExample = param => {
    console.log('ACTION');
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/reco/archive`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: EXAMPLE_ACTION_TYPE,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                //handleError(error, dispatch);
            });
    };
};

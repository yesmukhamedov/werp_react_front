import { doGet, doPost, doPut } from '../../../utils/apiActions';
import { modifyLoader } from '../../../general/loader/loader_action';

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
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                alert('Oops oblazhalsya "result"');
            });
    };
};

export const fetchDetailList = detailParam => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/finance/reports/frep3/detail`, detailParam)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_DETAIL,
                    payload: data.result,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                alert('Oops oblazhalsya "detail"');
            });
    };
};

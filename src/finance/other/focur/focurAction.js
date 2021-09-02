import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const ACTION_TYPE = 'ACTION_TYPE';

export const fetchFunc = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/srls`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ACTION_TYPE,
          data,
        });
        setFunc();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

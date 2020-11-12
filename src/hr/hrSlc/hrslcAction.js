import { doGet } from '../../utils/apiActions';
import { handleError } from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';
import axios from 'axios';

export const FETCH_HR_SLC = 'FETCH_HR_SLC';
export const CLEAR_HR_SLC = 'CLEAR_HR_SLC';
export const FETCH_YANDEX_MAP = 'FETCH_YANDEX_MAP';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

export const fetchHrSlc = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`srls`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_HR_SLC,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearHrSlc() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_HR_SLC,
    });
  };
}

export const fetchYandexMap = param => {
  return function(dispatch) {
    axios
      .get(
        `https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=2d3f0fe3-34b2-40fb-bb05-cb559a74d6d6`,
      )

      .then(({ data }) => {
        dispatch({
          type: FETCH_YANDEX_MAP,
          data: data,
        });
      })
      .catch(error => {
        console.log('ERROR Yandex MAP', error);
      });
  };
};

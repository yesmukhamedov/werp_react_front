import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';
import axios from 'axios';

export const FETCH_STAFF_HRSLC_LIST = 'FETCH_STAFF_HRSLC_LIST';
export const CLEAR_STAFF_HRSLC_LIST = 'CLEAR_STAFF_HRSLC_LIST';
export const FETCH_WORK_STATUS_LIST = 'FETCH_WORK_STATUS_LIST';
export const CLEAR_WORK_STATUS_LIST = 'CLEAR_WORK_STATUS_LIST';
export const FETCH_BUSINESS_PROCESS_LIST = 'FETCH_BUSINESS_PROCESS_LIST';
export const CLEAR_BUSINESS_PROCESS_LIST = 'CLEAR_BUSINESS_PROCESS_LIST';
export const FETCH_YANDEX_MAP = 'FETCH_YANDEX_MAP';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

export const fetchStaffHrSlcList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/report/hrslc/list`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_STAFF_HRSLC_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearStaffHrSlcList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_STAFF_HRSLC_LIST,
    });
  };
}

export const fetchWorkStatusList = () => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/report/hrslc/mobile_track_steps`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_WORK_STATUS_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearWorkStatusList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_WORK_STATUS_LIST,
    });
  };
}
export const fetchBusinessProcessList = () => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/report/hrslc/mobile_tracked_bps`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_BUSINESS_PROCESS_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearBusinessProcessList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_BUSINESS_PROCESS_LIST,
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

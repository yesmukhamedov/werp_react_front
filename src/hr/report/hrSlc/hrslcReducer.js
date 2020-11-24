import {
  FETCH_STAFF_HRSLC_LIST,
  CLEAR_STAFF_HRSLC_LIST,
  FETCH_WORK_STATUS_LIST,
  CLEAR_WORK_STATUS_LIST,
  FETCH_BUSINESS_PROCESS_LIST,
  CLEAR_BUSINESS_PROCESS_LIST,
  FETCH_YANDEX_MAP,
} from './hrslcAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_STAFF_HRSLC_LIST:
      return {
        ...state,
        staffHrslcList: [...action.data.data],
      };
    case CLEAR_STAFF_HRSLC_LIST:
      return {
        ...state,
        staffHrslcList: [],
      };

    case FETCH_WORK_STATUS_LIST:
      return {
        ...state,
        workStatusList: [...action.data.data],
      };
    case CLEAR_WORK_STATUS_LIST:
      return {
        ...state,
        workStatusList: [],
      };
    case FETCH_BUSINESS_PROCESS_LIST:
      return {
        ...state,
        businessProcessList: [...action.data.data],
      };
    case CLEAR_BUSINESS_PROCESS_LIST:
      return {
        ...state,
        businessProcessList: [],
      };
    case FETCH_YANDEX_MAP:
      return {
        ...state,
        yandexMapData: action.data,
      };

    default:
      return state;
  }
}

import { FETCH_HR_SLC, CLEAR_HR_SLC, FETCH_YANDEX_MAP } from './hrslcAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_HR_SLC:
      return {
        ...state,
        hrSlcData: { ...action.data.data },
      };
    case CLEAR_HR_SLC:
      return {
        ...state,
        hrSlcData: {},
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

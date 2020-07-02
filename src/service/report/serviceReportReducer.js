import {
  FETCH_SERVICE_LIST,
  FETCH_SERVICE_LIST_MANAGER,
} from './serviceReportAction';

const INITIAL_STATE = {
  dynamicObject: {},
  srlsmList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_LIST:
      console.log('REDUCER', action.data);
      return {
        ...state,
        srlsList: { ...state.dynamicObject, ...action.data },
      };

    case FETCH_SERVICE_LIST_MANAGER:
      return {
        ...state,
        srlsmList: { ...action.data.data.data },
      };

    default:
      return state;
  }
}

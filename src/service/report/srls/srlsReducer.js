import { FETCH_SRLS, CLEAR_SRLS, FETCH_SERVICE_TYPE_LIST } from './srlsAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRLS:
      return {
        ...state,
        srlsData: { ...action.data.data },
      };
    case CLEAR_SRLS:
      return {
        ...state,
        srlsData: {},
      };
    case FETCH_SERVICE_TYPE_LIST:
      return {
        ...state,
        serviceTypeList: [...action.data.data],
      };

    default:
      return state;
  }
}

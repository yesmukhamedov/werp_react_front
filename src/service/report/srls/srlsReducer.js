import { FETCH_SERVICE_LIST, FETCH_SERVICE_TYPE_LIST } from './srlsAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_LIST:
      return {
        ...state,
        srlsData: [...action.data.data.data],
        srlsTotalPages: action.data.data.totalPages,
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

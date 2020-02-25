import {
  FETCH_SERVICE_PACKET_PLAN,
  FETCH_TRANSFER_APPLICATION,
  FETCH_ASSIGNED_CALLS,
  FETCH_MY_APPLICATION,
} from './smopspAction';

const INITIAL_STATE = {
  dynamicObject: {},
  srlsmList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_PACKET_PLAN:
      return {
        ...state,
        dynamicObject: { ...action.data },
      };

    case FETCH_TRANSFER_APPLICATION:
      return {
        ...state,
        dynamicObject: { ...action.data },
      };
    case FETCH_ASSIGNED_CALLS:
      return {
        ...state,
        dynamicObject: { ...action.data },
      };

    case FETCH_MY_APPLICATION:
      return {
        ...state,
        dynamicObject: { ...action.data },
      };

    default:
      return state;
  }
}

import {
  FETCH_SERVICE_FILTER_PLAN,
  FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS,
  FETCH_SERVICE_ASSIGNED_CALLS,
  FETCH_SERVICE_MY_APPLICATION_EXODUS,
} from './smopccocAction';

const INITIAL_STATE = {
  dynamicObject: [],
  transfer: [],
  assignedCalls: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_FILTER_PLAN:
      return {
        ...state,
        serviceFilterPlan: [...action.data.data.data],
      };

    case FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS:
      return {
        ...state,
        transfer: [...action.data.data.content],
      };
    case FETCH_SERVICE_ASSIGNED_CALLS:
      return {
        ...state,
        assignedCalls: [...action.data.data],
      };

    case FETCH_SERVICE_MY_APPLICATION_EXODUS:
      return {
        ...state,
        myApplication: [...action.data.data],
      };

    default:
      return state;
  }
}

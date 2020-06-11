import {
  FETCH_SERVICE_FILTER_PLAN,
  FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS,
  FETCH_SERVICE_CRMSchedule,
  FETCH_SERVICE_MY_APPLICATION_EXODUS,
  POST_TO_CANCEL_PLAN,
} from './smopccocAction';

const INITIAL_STATE = {
  dynamicObject: [],
  transfer: [],
  CRMSchedule: [],
  toCancelPlan: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_FILTER_PLAN:
      return {
        ...state,
        serviceFilterPlan: { ...action.payload.data },
      };

    case FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS:
      return {
        ...state,
        transfer: { ...action.payload.data },
      };
    case FETCH_SERVICE_CRMSchedule:
      return {
        ...state,
        CRMSchedule: { ...action.payload.data },
      };

    case FETCH_SERVICE_MY_APPLICATION_EXODUS:
      return {
        ...state,
        myApplication: { ...action.payload.data },
      };

    case POST_TO_CANCEL_PLAN:
      return {
        ...state,
        toCancelPlan: { ...action.payload.data },
      };

    default:
      return state;
  }
}

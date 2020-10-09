import {
  FETCH_SERVICE_PACKET_PLAN,
  FETCH_RESCHEDULED_APPLICATION,
  FETCH_ASSIGNED_CALLS,
  FETCH_MY_APPLICATION,
  POST_TO_CANCEL_PLAN_VC,
  CLEAR_SMOPSP_MY_APPLICATION,
} from './smopspAction';

const INITIAL_STATE = {
  servicePacket: {},
  rescheduledApp: {},
  assignedCalls: {},
  myApplication: {},
  toCancelPlanVc: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_PACKET_PLAN:
      return {
        ...state,
        servicePacket: { ...action.payload.data },
      };

    case FETCH_RESCHEDULED_APPLICATION:
      return {
        ...state,
        rescheduledApp: { ...action.payload.data },
      };
    case FETCH_ASSIGNED_CALLS:
      return {
        ...state,
        assignedCalls: { ...action.payload.data },
      };

    case FETCH_MY_APPLICATION:
      return {
        ...state,
        myApplication: { ...action.payload.data },
      };
    case CLEAR_SMOPSP_MY_APPLICATION:
      return {
        ...state,
        myApplication: {},
      };

    case POST_TO_CANCEL_PLAN_VC:
      return {
        ...state,
        toCancelPlanVc: [],
      };

    default:
      return state;
  }
}

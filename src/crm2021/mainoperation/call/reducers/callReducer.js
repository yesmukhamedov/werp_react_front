import { CALL_CREATED, CALLING_FLAG, CALL_STATUS } from '../actions/callAction';
import { CALL_STATUS_NOTHING } from '../callConstant';
const INITIAL_STATE = {
  calling: false,
  createdCallData: {},
  callStatus: CALL_STATUS_NOTHING,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CALL_CREATED:
      return { ...state, calling: false, createdCallData: action.payload };

    case CALLING_FLAG:
      return { ...state, calling: action.payload };

    case CALL_STATUS:
      return { ...state, callStatus: action.payload };

    default:
      return state;
  }
}

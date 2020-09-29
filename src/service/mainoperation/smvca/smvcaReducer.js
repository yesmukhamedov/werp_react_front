import { FETCH_SMVCA } from './smvcaAction';

const INITIAL_STATE = {
  smvcaData: {},
  smvcaHistory: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMVCA: {
      console.log('REDUCER', action);
      return {
        ...state,
        smvcaData: { ...action.payload.application },
        smvcaHistory: [...action.payload.applicationAudit],
      };
    }

    default:
      return state;
  }
}

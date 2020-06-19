import { FETCH_SMECA, EDIT_SMECA } from './smecaAction';

const INITIAL_STATE = {
  smvcaData: {},
  smvcaHistory: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMECA: {
      console.log('REDUCER', action);
      return {
        ...state,
        smecaData: { ...action.payload.data.application },
        smecaHistory: [...action.payload.data.audit],
      };
    }

    case EDIT_SMECA:
      return {
        ...state,
        smecaData: { ...action.payload.data },
        smecaEditStatus: action.payload,
      };
      break;

    default:
      return state;
  }
}

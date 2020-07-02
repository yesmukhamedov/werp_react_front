import { FETCH_SMECAM, EDIT_SMECAM } from './smecamAction';

const INITIAL_STATE = {
  smvcamData: {},
  smvcamHistory: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMECAM: {
      console.log('REDUCER', action);
      return {
        ...state,
        smecamData: action.payload.data.application,
        smecamHistory: action.payload.data.applicationAudit,
      };
    }

    case EDIT_SMECAM:
      return {
        ...state,
        smecamEdit: action.payload.data,
        smecamEditStatus: action.payload,
      };
      break;

    default:
      return state;
  }
}

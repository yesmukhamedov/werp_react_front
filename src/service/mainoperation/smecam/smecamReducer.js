import {
  FETCH_SMECAM,
  EDIT_SMECAM,
  CLEAR_DYNOBJ_SERVICE,
} from './smecamAction';

const INITIAL_STATE = {
  smecamData: {},
  smecamHistory: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMECAM: {
      return {
        ...state,
        smecamData: { ...action.payload.application },
        smecamHistory: [...action.payload.applicationAudit],
      };
    }
    case EDIT_SMECAM: {
      return {
        ...state,
        smecamData: { ...action.payload.application },
        smecamHistory: [...action.payload.applicationAudit],
      };
    }

    default:
      return state;
  }
}

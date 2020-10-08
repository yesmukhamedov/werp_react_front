import {
  FETCH_SRKPISO,
  FETCH_SRKPISO_DETAL,
  CLEAR_SRKPISO,
  CLEAR_SRKPISO_DETAL,
} from './srkpisoAction';

const INITIAL_STATE = {
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRKPISO:
      return {
        ...state,
        srkpisoData: [...action.data.data],
      };
    case CLEAR_SRKPISO:
      return {
        ...state,
        srkpisoData: [],
      };

    case FETCH_SRKPISO_DETAL:
      return {
        ...state,
        srkpisoDetal: [...action.data.data],
      };
    case CLEAR_SRKPISO_DETAL:
      return {
        ...state,
        srkpisoDetal: [],
      };

    default:
      return state;
  }
}

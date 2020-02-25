import { FETCH_SRKPISO } from './srkpisoAction';

const INITIAL_STATE = {
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRKPISO:
      return {
        ...state,
        dynamicObject: { ...action.data },
      };

    default:
      return state;
  }
}

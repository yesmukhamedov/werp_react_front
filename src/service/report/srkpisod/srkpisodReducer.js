import { FETCH_SRKPISOD } from './srkpisodAction';

const INITIAL_STATE = {
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRKPISOD:
      return {
        ...state,
        srkpisodData: { ...action.data },
      };

    default:
      return state;
  }
}

import { FETCH_SRKPISO } from './srkpisoAction';

const INITIAL_STATE = {
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRKPISO:
      console.log('REDUCER action srkpiso', action);
      return {
        ...state,
        srkpisoData: [...action.data.data],
      };

    default:
      return state;
  }
}

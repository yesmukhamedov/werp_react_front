import { ACTION_TYPE } from './focurAction';

const INITIAL_STATE = {
  //srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE:
      return {
        ...state,
        srlsData: { ...action.data.data },
      };
    default:
      return state;
  }
}

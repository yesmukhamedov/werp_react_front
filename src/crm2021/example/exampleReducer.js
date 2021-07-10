import { EXAMPLE_ACTION_TYPE } from './exampleAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXAMPLE_ACTION_TYPE:
      return {
        ...state,
        exampleData: { ...action },
      };

    default:
      return state;
  }
}

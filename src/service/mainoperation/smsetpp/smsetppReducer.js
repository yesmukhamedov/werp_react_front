import { FETCH_DYNOBJ_HR } from './smsetppAction';

const INITIAL_STATE = {
  persons: [],
  info: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADDINFO':
      return {
        ...state,
        persons: [...state.persons, action.payload.info],
      };
    case 'PERSONS':
      console.log(action.payload);
      return {
        ...state,
        persons: [action.payload, ...state.persons],
      };

    default:
      return state;
  }
};
export default reducer;

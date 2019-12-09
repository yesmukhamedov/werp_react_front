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
    case 'ADDPERSON':
      return {
        ...state,
        persons: action.payload.person,
      };
    case 'LENGTH':
      return {
        ...state,
        length: state.length + 1,
      };
    default:
      return state;
  }
};
export default reducer;

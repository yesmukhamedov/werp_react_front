import FETCH_SERVICE_LIST from './srlsAction';

const INITIAL_STATE = {
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_LIST:
      console.log('REDUCER', action.data);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };

    default:
      return state;
  }
}

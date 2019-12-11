import {
  FETCH_DYNOBJ_SERVICE,
  CHANGE_DYNOBJ_SERVICE,
  CLEAR_DYNOBJ_SERVICE,
  TEST_DATA,
} from './serviceAction';

const INITIAL_STATE = { dynamicObject: {}, data: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DYNOBJ_SERVICE:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };

    case CHANGE_DYNOBJ_SERVICE:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };

    case CLEAR_DYNOBJ_SERVICE:
      return {
        ...state,
        dynamicObject: {},
      };

    case TEST_DATA:
      console.log('reducer ', action.data);
      return {
        ...state,
        data: [...state.data, ...action.data],
      };

    default:
      return state;
  }
}

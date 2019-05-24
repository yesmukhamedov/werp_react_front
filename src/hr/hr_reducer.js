import {
  FETCH_DYNOBJ_HR,
  CHANGE_DYNOBJ_HR,
  CLEAR_DYNOBJ_HR,
} from './hr_action';
// import moment from 'moment';
const INITIAL_STATE = { dynamicObject: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DYNOBJ_HR:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };
    case CHANGE_DYNOBJ_HR:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };
    case CLEAR_DYNOBJ_HR:
      return { ...state, dynamicObject: {} };

    default:
      return state;
  }
}

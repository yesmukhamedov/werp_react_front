import {
  FETCH_DYNOBJ_HR,
  CHANGE_DYNOBJ_HR,
  CLEAR_DYNOBJ_HR,
  TS_REP_1,
  TS_REP_2,
  TS_REP_3,
  TS_REP_4,
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

    case TS_REP_1:
      return {
        ...state,
        dynamicObject: [...action.payload],
      };

    case TS_REP_2:
      return {
        ...state,
        dynamicObject: [...action.payload],
      };

    case TS_REP_3:
      return {
        ...state,
        dynamicObject: [...action.payload],
      };

    case TS_REP_4:
      return {
        ...state,
        dynamicObject: [...action.payload],
      };

    case CLEAR_DYNOBJ_HR:
      return {
        ...state,
        dynamicObject: {},
      };

    default:
      return state;
  }
}

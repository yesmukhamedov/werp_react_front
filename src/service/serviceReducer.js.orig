import {
  FETCH_DYNOBJ_SERVICE,
  CHANGE_DYNOBJ_SERVICE,
  CLEAR_DYNOBJ_SERVICE,
  ADD_SMSETCT,
  SEARCH_SMSETCT,
  EDIT_SMSETCT,
  FETCH_SMSETPP,
  FETCH_SMSETPP_TYPE,
  FETCH_SMSETPP_POST,
  FETCH_SRLS,
  FETCH_PHONE,
  FETCH_PHONE_TYPE,
} from './serviceAction';

const INITIAL_STATE = {
  dynamicObject: {},
  dynObjectPhoneType: {},
  data: {
    service: [],
    type: [],
  },
};

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
    case ADD_SMSETCT:
      console.log('in reducer ', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.payload },
      };
    case SEARCH_SMSETCT:
      console.log('in reducer ', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.payload },
      };
    case EDIT_SMSETCT:
      console.log('in reducer ', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.payload },
      };

    case FETCH_SMSETPP:
      return {
        ...state,
        data: {
          ...state.data,
          service: [...action.payload.data.data],
        },
      };
    case FETCH_SMSETPP_TYPE:
      return {
        ...state,
        data: {
          ...state.data,
          type: [...action.payload.data],
        },
      };

    case FETCH_SMSETPP_POST:
      console.log('object', action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          service: [...state.data.service, action.payload.data],
        },
      };

    case FETCH_SRLS:
      console.log('SRLS REDUCER', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.payload },
      };
    case FETCH_PHONE:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.payload },
      };

    case FETCH_PHONE_TYPE:
      return {
        ...state,
        dynObjectPhoneType: { ...state.dynamicObject, ...action.payload },
      };

    default:
      return state;
  }
}

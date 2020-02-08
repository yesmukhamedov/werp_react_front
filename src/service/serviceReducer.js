import {
  FETCH_DYNOBJ_SERVICE,
  CHANGE_DYNOBJ_SERVICE,
  CLEAR_DYNOBJ_SERVICE,
  POST_SMSETCT,
  FETCH_SMSETCT,
  EDIT_SMSETCT,
  FETCH_SMSETPP,
  FETCH_SMSETPP_TYPE,
  FETCH_SMSETPP_POST,
  FETCH_SMSETPP_SEARCH,
  FETCH_SMSETPP_PUT,
  FETCH_SRLS,
  FETCH_SMSETPP_PREMIUM_PRICE_TYPE,
  FETCH_SMPLB,
  FETCH_SMPLB_ADD,
  HISTORY_EDITING_SMSETCT,
} from './serviceAction';

const INITIAL_STATE = {
  dynamicObject: {},
  historyDynamicObject: {},
  data: {
    service: [],
    type: [],
    addedRequest: [],
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
      console.log('in reducer ', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };

    case CLEAR_DYNOBJ_SERVICE:
      return {
        ...state,
        dynamicObject: {},
        historyDynamicObject: {},
      };
    case POST_SMSETCT:
      console.log('post IN reducer', action.payload);
      if (
        Object.keys(state.dynamicObject).length === 0 ||
        state.dynamicObject === undefined
      ) {
        return { ...state, dynamicObject: [] };
      } else {
        return {
          ...state,
          dynamicObject: [...state.dynamicObject, action.payload],
        };
      }

    case FETCH_SMSETCT:
      console.log('in reducer ', action.payload);
      return {
        ...state,
        dynamicObject: [...action.payload],
      };
    case EDIT_SMSETCT:
      console.log('in reducer edit', action.payload);
      return {
        ...state,
        dynamicObject: [...state.dynamicObject, action.payload],
      };
    case HISTORY_EDITING_SMSETCT:
      console.log('in reducer editingHistory', action.payload);
      return {
        ...state,
        historyDynamicObject: [...action.payload],
      };

    case FETCH_SMSETPP:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          service: [...action.payload.data],
        },
      };

    case FETCH_SMSETPP_PREMIUM_PRICE_TYPE:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          premiumPriceTypeId: [...action.payload],
        },
      };
    case FETCH_SMSETPP_TYPE:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          type: [...action.payload.data],
        },
      };

    case FETCH_SMSETPP_POST:
      console.log('object', action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          service: [...state.data.service, action.payload],
        },
      };
    case FETCH_SMSETPP_SEARCH:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          service: [...action.payload.data],
        },
      };
    case FETCH_SMSETPP_PUT:
      return {
        ...state,
        data: {
          ...state.data,
          service: [...action.payload.data],
        },
      };

    // case FETCH_SMSETPP_POST:
    //   console.log('object', action.payload);
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       service: [...state.data.service, action.payload.data],
    //     },
    //   };

    case FETCH_SRLS:
      console.log('SRLS REDUCER', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.payload },
      };
    case FETCH_SMPLB: {
      console.log('in reducer');
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, data: [...action.payload] },
      };
    }
    default:
      return state;
  }
}

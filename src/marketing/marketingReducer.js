import {
  GET_PRLIST,
  GET_MATNRS,
  NEW_PRICE,
  UPD_PRLIST,
  CONT_DMSC_LIST,
  GET_CONT_DMSC_SEAR_OPTS,
  FETCH_DYNOBJ_MARKETING,
  CHANGE_DYNOBJ_MARKETING,
  CLEAR_DYNOBJ_MARKETING,
} from './marketingAction';

const INITIAL_STATE = {
  pritms: [],
  lazyitems: [],
  lazymeta: {
    prtotRws: 0,
    perPage: 0,
    page: 0,
  },
  dynObjDmsc: [],
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /******************************************************************        PRICE        */
    case GET_PRLIST:
      return { ...state, pritms: action.pritms, prtotRws: action.prtotRws };
    case GET_MATNRS:
      return { ...state, matrn: action.payload };
    case NEW_PRICE:
      const newPrice = Object.assign([], state.pritms);
      if (newPrice.length > 0) {
        const price = action.payload;
        price['price_list_id'] = Math.random();
        price['from_date'] = '';
        price['active'] = 'true';
        newPrice.push(price);
      }
      return { ...state, pritms: newPrice };
    case UPD_PRLIST:
      const updPrRow = [];
      for (const key in state.pritms) {
        if (state.pritms[key].price_list_id === action.payload.price_list_id) {
          updPrRow[key] = action.payload;
        } else {
          updPrRow[key] = state.pritms[key];
        }
      }
      return { ...state, pritms: updPrRow };

    /************************************************     CONTRACT LIST        */
    case GET_CONT_DMSC_SEAR_OPTS:
    case CONT_DMSC_LIST:
      return {
        ...state,
        dynObjDmsc: { ...state.dynObjDmsc, ...action.payload },
      };

    /************************************************  END CONTRACT LIST        */
    case FETCH_DYNOBJ_MARKETING:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };
    case CHANGE_DYNOBJ_MARKETING:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };
    case CLEAR_DYNOBJ_MARKETING:
      return { ...state, dynamicObject: {} };

    default:
      return state;
  }
}

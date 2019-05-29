import {
  ALL_PRLIST,
  UPD_PRLIST,
  FETCH_BUKRS_BRANCHES,
  ALL_MATNR,
  NEW_PRICE,
  CONT_LIST,
  FETCH_DEALER_SECR,
  ALL_LAZY_CUST,
} from './pricelistAction';

const INITIAL_STATE = {
  items: [],
  totalRows: 0,
  contlist: [],
  lazyitems: [],
  lazymeta: {
    totalRows: 0,
    perPage: 0,
    page: 0,
  },
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_LAZY_CUST:
      return {
        ...state,
        lazyitems: action.lazyitems,
        lazymeta: action.lazymeta,
      };
    case CONT_LIST:
      return { ...state, contlist: action.payload };
    case ALL_PRLIST:
      return { ...state, items: action.items, totalRows: action.totalRows };
    case UPD_PRLIST:
      const updatedRow = action.payload;
      const newRow = [];
      for (const k in state.items) {
        if (state.items[k].price_list_id === updatedRow.price_list_id) {
          newRow.push(updatedRow);
        } else {
          newRow.push(state.items[k]);
        }
      }
      return { ...state, items: newRow };
    case FETCH_BUKRS_BRANCHES:
      return { ...state, bukrsBranches: action.payload };
    case ALL_MATNR:
      return { ...state, matrn: action.payload };
    case NEW_PRICE:
      const newItems = Object.assign([], state.items);
      if (newItems.length > 0) {
        const price = action.payload;
        price['price_list_id'] = Math.random();
        price['from_date'] = '';
        price['active'] = 'true';
        newItems.push(price);
      }
      return { ...state, items: newItems };
    /************************************************     CONTRACT LIST        */
    case FETCH_DEALER_SECR:
      return {
        ...state,
        dealers: action.dealers,
        demosec: action.demosec,
        collectors: action.collectors,
        contstatus: action.contstatus,
        contlaststate: action.contlaststate,
      };
    default:
      return state;
  }
}

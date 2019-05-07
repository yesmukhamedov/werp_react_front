import {
  ALL_PRLIST,
  UPD_PRLIST,
  FETCH_BUKRS_BRANCHES,
  ALL_MATNR,
  NEW_PRICE,
} from './pricelistAction';

const INITIAL_STATE = {
  items: [],
  totalRows: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

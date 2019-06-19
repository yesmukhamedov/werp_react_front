import {
  GET_PRLIST,
  GET_MATNRS,
  NEW_PR,
  UPD_PRLIST,
  CONT_DMSC_LIST,
  GET_CONT_DMSC_SEAR_OPTS,
  FETCH_DYNOBJ_MARKETING,
  CHANGE_DYNOBJ_MARKETING,
  CLEAR_DYNOBJ_MARKETING,
} from './marketingAction';

const INITIAL_STATE = {
  dynObjLpList: [],
  dynObjDmsc: [],
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /******************************************************************        PRICE        */
    case GET_PRLIST:
      return {
        ...state,
        dynObjLpList: { ...state.dynObjLpList, ...action.payload },
      };
    case GET_MATNRS:
      return {
        ...state,
        dynObjLpList: { ...state.dynObjLpList, ...action.payload },
      };
    case NEW_PR:
      if (Object.keys(state.dynObjLpList).length > 0) {
        const price = { ...action.payload };
        const trow = state.dynObjLpList.prtotRws + 1;
        price['price_list_id'] = Math.random();
        price['from_date'] = '';
        price['active'] = 'true';
        return {
          ...state,
          dynObjLpList: {
            pritms: [...state.dynObjLpList.pritms, price],
            prtotRws: trow,
          },
        };
      }
      return { ...state, dynObjLpList: { ...state.dynObjLpList } };
    case UPD_PRLIST:
      const updPrlst = { ...action.payload };
      const idx = [...state.dynObjLpList.pritms].findIndex(
        el => el.price_list_id === updPrlst.price_list_id,
      );
      const { prtotRws } = { ...state.dynObjLpList };
      return {
        ...state.dynObjLpList,
        dynObjLpList: {
          pritms: [
            ...state.dynObjLpList.pritms.slice(0, idx),
            updPrlst,
            ...state.dynObjLpList.pritms.slice(idx + 1),
          ],
          prtotRws: prtotRws,
        },
      };

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

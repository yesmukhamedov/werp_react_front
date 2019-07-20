import {
  GET_LPLST,
  GET_LPLST_MATNRS,
  NEW_LPLST,
  UPD_LPLST,
  GET_DMSCLST,
  DMSCLST_DEF_OPTS,
  FETCH_DYNOBJ_MARKETING,
  CHANGE_DYNOBJ_MARKETING,
  CLEAR_DYNOBJ_MARKETING,
  ALL_DMSPLST,
  GET_DMSPLST_MATNRS,
} from './marketingAction';

const INITIAL_STATE = {
  dynObjLpList: [],
  dynObjDmsc: [],
  dynamicObject: {},
  dynDmsplst: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /******************************************************************        LPLIST        */
    case GET_LPLST:
      return {
        ...state,
        dynObjLpList: { ...state.dynObjLpList, ...action.payload },
      };
    case GET_LPLST_MATNRS:
      return {
        ...state,
        dynObjLpList: { ...state.dynObjLpList, ...action.payload },
      };
    case NEW_LPLST:
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
    case UPD_LPLST:
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
    case DMSCLST_DEF_OPTS:
    case GET_DMSCLST:
      return {
        ...state,
        dynObjDmsc: { ...state.dynObjDmsc, ...action.payload },
      };

    /************************************************  END CONTRACT LIST        */

    /********************************************************   DMSPLST        */
    case ALL_DMSPLST:
      return {
        ...state,
        dynDmsplst: { ...state.dynDmsplst, ...action.payload },
      };
    case GET_DMSPLST_MATNRS:
      return {
        ...state,
        dynDmsplst: { ...state.dynDmsplst, ...action.payload },
      };

    /********************************************************  END DMSPLST    */
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

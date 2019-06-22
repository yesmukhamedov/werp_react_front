import {
  GET_LPLST,
  GET_MATNRS,
  NEW_LPLST,
  UPD_LPLST,
  GET_CONT_DMSC_LST,
  GET_CONT_DMSC_DEF,
  FETCH_DYNOBJ_MARKETING,
  CHANGE_DYNOBJ_MARKETING,
  CLEAR_DYNOBJ_MARKETING,
  ALL_DMSP_LST,
} from './marketingAction';

const INITIAL_STATE = {
  dynObjLpList: [],
  dynObjDmsc: [],
  dynamicObject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /******************************************************************        LPLIST        */
    case GET_LPLST:
      return {
        ...state,
        dynObjLpList: { ...state.dynObjLpList, ...action.payload },
      };
    case GET_MATNRS:
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
    case GET_CONT_DMSC_DEF:
    case GET_CONT_DMSC_LST:
      return {
        ...state,
        dynObjDmsc: { ...state.dynObjDmsc, ...action.payload },
      };

    /************************************************  END CONTRACT LIST        */

    /********************************************************   DMSP_LST        */
    case ALL_DMSP_LST:
      return { ...state, dynDmsplst: [...state.dynDmsplst, ...action.payload] };

    /********************************************************  END DMSP_LST    */
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

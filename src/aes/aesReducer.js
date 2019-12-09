import {
  AES_BLANK,
  /**********save item */
  NEW_AES,
  NEW_OS,
  NEW_TYPE1,
  NEW_TYPE2,
  NEW_TYPE3,
  NEW_DETAIL,
  NEW_RNUM,
  NEW_STATUS,
  CURRENT_AES,
  CCBRANCH_AES,
  APPR_REJ,
  COMP_BR,
  CURRENT_ALL,
  /**********find items */
  DIS_OS,
  DIS_TYPE1,
  DIS_TYPE2,
  DIS_TYPE3,
  DIS_DET,
  CLEAR_ALL,
  UNMOUNT_ALL,
  CLEAR_T3_OSDET,
} from './aesAction';

const INITIAL_STATE = {
  listAll: {},
  listBranches: [],
  compBrAes: [],
  listAes: [],
  queryParams: {},
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_ALL:
      return {
        ...state,
        listAll: {
          ...state.listAll,
          listType2: action.payload,
          listType3: action.payload,
          listDetail: action.payload,
        },
      };
    case CLEAR_T3_OSDET:
      return {
        ...state,
        listAll: {
          ...state.listAll,
          listType3: action.payload,
          listDetail: action.payload,
        },
      };
    case CURRENT_ALL:
      return { ...state, listAll: { ...state.listAll, ...action.payload } };
    case CCBRANCH_AES:
      return { ...state, listBranches: action.payload };
    case COMP_BR:
      return { ...state, compBrAes: action.payload };
    case CURRENT_AES:
      return { ...state, listAes: action.payload };
    case AES_BLANK:
      return { ...state, queryParams: action.payload };
    case NEW_AES:
      return { ...state, queryParams: action.payload, compBrAes: [] };
    case APPR_REJ:
      return { ...state, listAes: action.payload };
    case UNMOUNT_ALL:
      console.log('reducer ');
      return { ...state, listAll: {}, listAes: [] };

    /************************************************************************** SAVING ITEMS */
    case NEW_OS:
      let newOs = Object.assign([], state.listAll.listOs);
      newOs.push(action.payload);
      return { ...state, listAll: { ...state.listAll, listOs: newOs } };
    case NEW_TYPE1:
      let newType1 = Object.assign([], state.listAll.listType1);
      newType1.push(action.payload);
      return { ...state, listAll: { ...state.listAll, listType1: newType1 } };
    case NEW_TYPE2:
      let newType2 = Object.assign([], state.listAll.listType2);
      newType2.push(action.payload);
      return { ...state, listAll: { ...state.listAll, listType2: newType2 } };
    case NEW_TYPE3:
      let newType3 = Object.assign([], state.listAll.listType3);
      newType3.push(action.payload);
      return { ...state, listAll: { ...state.listAll, listType3: newType3 } };
    case NEW_DETAIL:
      let newD = Object.assign([], state.listAll.listDetail);
      newD.push(action.payload);
      return { ...state, listAll: { ...state.listAll, listDetail: newD } };
    case NEW_RNUM:
      let newR = Object.assign([], state.listAll.listRoom);
      newR.push(action.payload);
      return { ...state, listAll: { ...state.listAll, listRoom: newR } };
    case NEW_STATUS:
      let newS = Object.assign([], state.listAll.listStatus);
      newS.push(action.payload);
      return { ...state, listAll: { ...state.listAll, listStatus: newS } };
    /**************************************************************************DISABLE ITEMS */
    case DIS_OS:
      const disOs = action.payload;
      const newOss = [];
      for (const k in state.listAll.listOs) {
        if (state.listAll.listOs[k].id !== disOs.key) {
          newOss.push(state.listAll.listOs[k]);
        }
      }
      return { ...state, listAll: { ...state.listAll, listOs: newOss } };
    case DIS_TYPE1:
      const disT1 = action.payload;
      const newT1 = [];
      for (const k in state.listAll.listType1) {
        if (state.listAll.listType1[k].id !== disT1.key) {
          newT1.push(state.listAll.listType1[k]);
        }
      }
      return { ...state, listAll: { ...state.listAll, listType1: newT1 } };
    case DIS_TYPE2:
      const disT2 = action.payload;
      const newT2 = [];
      for (const k in state.listAll.listType2) {
        if (state.listAll.listType2[k].id !== disT2.key) {
          newT2.push(state.listAll.listType2[k]);
        }
      }
      return { ...state, listAll: { ...state.listAll, listType2: newT2 } };
    case DIS_TYPE3:
      const disT3 = action.payload;
      const newT3 = [];
      for (const k in state.listAll.listType3) {
        if (state.listAll.listType3[k].id !== disT3.key) {
          newT3.push(state.listAll.listType3[k]);
        }
      }
      return { ...state, listAll: { ...state.listAll, listType3: newT3 } };
    case DIS_DET:
      const disDet = action.payload;
      const newDet = [];
      for (const k in state.listAll.listDetail) {
        if (state.listAll.listDetail[k].id !== disDet.key) {
          newDet.push(state.listAll.listDetail[k]);
        }
      }
      return { ...state, listAll: { ...state.listAll, listDetail: newDet } };
    default:
      return state;
  }
}

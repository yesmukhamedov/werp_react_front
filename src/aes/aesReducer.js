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
  NEW_COMP_BR,
  CURRENT_AES,
  CCBRANCH_AES,
  APPR_REJ,
  COMP_BR,
  CURRENT_ALL,
} from './aesAction';

const INITIAL_STATE = {
  listBranches: [],
  compBrAes: [],
  listAes: [],
  queryParams: {},
  listAll: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_ALL:
      return { ...state, listAll: action.payload };
    case CCBRANCH_AES:
      console.log('action payload2 ', action.payload);
      return { ...state, listBranches: action.payload };
    case NEW_COMP_BR:
      let newCB = Object.assign([], state.listAll.listCompBranches);
      newCB.push(action.payload);
      return {
        ...state,
        listAll: { ...state.listAll, listCompBranches: newCB },
      };
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
    default:
      return state;
  }
}

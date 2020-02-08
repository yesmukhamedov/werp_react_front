import {
  FETCH_SERVICE_SMCS,
  FETCH_SERVICE_MATNR_LIST,
  CLEAR_DYNOBJ_MARKETING,
  FETCH_TOVAR_ID,
  FETCH_SERVICE_TYPE_ID,
  FETCH_SMCS_MATNR_PRICELIST,
  FETCH_SMCS_SERVICE_PACKET,
  FETCH_POSITION_SUMM,
  CHECK_SMCS_WITHOUT_REQUEST,
} from './smcsAction';

const INITIAL_STATE = {
  dynamicObject: {},
  contract: {},
  matnr: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_SMCS:
      return {
        ...state,
        contract: { ...action.data },
      };

    case FETCH_SERVICE_MATNR_LIST:
      return {
        ...state,
        matnr: { ...action.data },
      };

    case FETCH_TOVAR_ID:
      return {
        ...state,
        tovar: { ...action.data.data },
      };

    case CLEAR_DYNOBJ_MARKETING:
      return { ...state, contract: {} };

    case FETCH_SERVICE_TYPE_ID:
      return { ...state, serviceTypeId: [...action.data.data] };

    case FETCH_SMCS_MATNR_PRICELIST:
      return { ...state, smcsMatnrPriceList: [...action.data.data] };

    case FETCH_SMCS_SERVICE_PACKET:
      console.log('SERVICE PACKET REDUCER');
      return { ...state, smcsServicePacket: [...action.data.data] };

    case FETCH_POSITION_SUMM:
      console.log('FETCH POSITION SUMM REDUCER');
      return { ...state, smcsFetchPositionSumm: { ...action.data.data } };

    case CHECK_SMCS_WITHOUT_REQUEST:
      console.log('CHECK_SMCS_WITHOUT_REQUEST REDUCER');
      return { ...state, checkSmcs: { ...action.data.data } };
    default:
      return state;
  }
}

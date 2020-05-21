import {
  FETCH_SERVICE_SMCS,
  FETCH_SERVICE_MATNR_LIST,
  CLEAR_DYNOBJ_MARKETING,
  FETCH_TOVAR_ID,
  FETCH_SERVICE_TYPE_ID,
  FETCH_MATNR_PRICE_SPARE_PART,
  FETCH_MATNR_PRICE_CARTRIDGE,
  FETCH_SMCS_SERVICE_PACKET,
  FETCH_OPERATOR_LIST,
  FETCH_POSITION_SUMM,
  CHECK_SMCS_WITHOUT_REQUEST,
  SAVE_SMCS_WITHOUT_REQUEST,
  FETCH_MATNR_PRICE_SERVICE_PACKAGE,
  FETCH_SERVICE_PACKAGE_DETAILS,
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

    case FETCH_MATNR_PRICE_SPARE_PART:
      return { ...state, matnrPriceSparePart: [...action.data.data] };

    case FETCH_MATNR_PRICE_CARTRIDGE:
      return { ...state, matnrPriceCartridge: [...action.data.data] };

    case FETCH_MATNR_PRICE_SERVICE_PACKAGE:
      return { ...state, matnrServicePackage: [...action.data.data] };

    case FETCH_SERVICE_PACKAGE_DETAILS:
      return { ...state, servicePacketDetails: [...action.data.data] };

    case FETCH_POSITION_SUMM:
      return { ...state, smcsFetchPositionSumm: { ...action.data.data } };

    case CHECK_SMCS_WITHOUT_REQUEST:
      return { ...state, checkSmcs: { ...action.data.data } };

    case SAVE_SMCS_WITHOUT_REQUEST:
      return { ...state, saveSmcs: { ...action.data.data } };

    case FETCH_OPERATOR_LIST:
      return { ...state, operatorList: [...action.data.data] };

    default:
      return state;
  }
}

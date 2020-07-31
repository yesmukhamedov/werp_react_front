import {
  FETCH_SERVICE_SMCS,
  FETCH_SERVICE_MATNR_LIST,
  CLEAR_DYNOBJ_MARKETING,
  FETCH_TOVAR_ID,
  FETCH_SERVICE_TYPE_ID,
  //Запчасть
  FETCH_MATNR_PRICE_SPARE_PART1,
  FETCH_MATNR_PRICE_SPARE_PART2,
  FETCH_MATNR_PRICE_SPARE_PART3,
  CLEAR_MATNR_PRICE_SPARE_PART,
  //Картридж
  FETCH_MATNR_PRICE_CARTRIDGE1,
  FETCH_MATNR_PRICE_CARTRIDGE2,
  FETCH_MATNR_PRICE_CARTRIDGE3,
  CLEAR_MATNR_PRICE_CARTRIDGE,
  //
  FETCH_OPERATOR_LIST,
  FETCH_OPERATOR_LIST_APP,
  FETCH_POSITION_SUMM,
  CHECK_SMCS_WITHOUT_REQUEST_1,
  CHECK_SMCS_WITHOUT_REQUEST_2,
  CHECK_SMCS_WITHOUT_REQUEST_3,
  SAVE_SMCS_WITHOUT_REQUEST,
  //Сервис пакет
  FETCH_MATNR_PRICE_SERVICE_PACKAGE1,
  FETCH_MATNR_PRICE_SERVICE_PACKAGE2,
  FETCH_MATNR_PRICE_SERVICE_PACKAGE3,
  CLEAR_MATNR_PRICE_SERVICE_PACKAGE,
  //
  FETCH_SMCS_SERVICE_PACKET,
  //
  FETCH_SERVICE_PACKAGE_DETAILS,
  CLEAR_SERVICE_PACKAGE_DETAILS,
  //
  FETCH_SMCS_BY_APP_NUMBER,
  FETCH_MASTER_LIST,
  FETCH_CHECK_WARRANTY,
  FETCH_PAYMENT_OPTIONS,
  FETCH_SMCS_BY_CONTRACT_NUMBER,
  FETCH_MASTER_LIST_APP,
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
    case FETCH_MASTER_LIST:
      return {
        ...state,
        masterList: [...action.data.data],
      };
    case FETCH_MASTER_LIST_APP:
      return {
        ...state,
        masterListApp: [...action.data.data],
      };

    case FETCH_SERVICE_MATNR_LIST:
      return {
        ...state,
        matnr: { ...action.data },
      };

    case FETCH_TOVAR_ID:
      return {
        ...state,
        tovar: [...action.data.data],
      };

    case CLEAR_DYNOBJ_MARKETING:
      return { ...state, contract: {} };

    case FETCH_SERVICE_TYPE_ID:
      return { ...state, serviceTypeId: [...action.data.data] };
    //Запчасть
    case FETCH_MATNR_PRICE_SPARE_PART1:
      return { ...state, matnrPriceSparePart1: [...action.data.data] };
    case FETCH_MATNR_PRICE_SPARE_PART2:
      return { ...state, matnrPriceSparePart2: [...action.data.data] };
    case FETCH_MATNR_PRICE_SPARE_PART3:
      return { ...state, matnrPriceSparePart3: [...action.data.data] };

    case CLEAR_MATNR_PRICE_SPARE_PART:
      return { ...state, matnrPriceSparePart: [] };
    //Картридж
    case FETCH_MATNR_PRICE_CARTRIDGE1:
      return { ...state, matnrPriceCartridge1: [...action.data.data] };
    case FETCH_MATNR_PRICE_CARTRIDGE2:
      return { ...state, matnrPriceCartridge2: [...action.data.data] };
    case FETCH_MATNR_PRICE_CARTRIDGE3:
      return { ...state, matnrPriceCartridge3: [...action.data.data] };

    case CLEAR_MATNR_PRICE_CARTRIDGE:
      return { ...state, matnrPriceCartridge: [] };

    //Сервис пакет
    case FETCH_MATNR_PRICE_SERVICE_PACKAGE1:
      return { ...state, matnrServicePackage1: [...action.data.data] };
    case FETCH_MATNR_PRICE_SERVICE_PACKAGE2:
      return { ...state, matnrServicePackage2: [...action.data.data] };
    case FETCH_MATNR_PRICE_SERVICE_PACKAGE3:
      return { ...state, matnrServicePackage3: [...action.data.data] };
    case FETCH_SMCS_SERVICE_PACKET:
      return { ...state, servicePackageListProps: [...action.data.data] };

    case CLEAR_MATNR_PRICE_SERVICE_PACKAGE:
      return { ...state, matnrServicePackage: [] };

    case FETCH_SERVICE_PACKAGE_DETAILS:
      return { ...state, servicePacketDetails: [...action.data.data] };
    case CLEAR_SERVICE_PACKAGE_DETAILS:
      return { ...state, servicePacketDetails: [] };

    case FETCH_POSITION_SUMM:
      return { ...state, smcsFetchPositionSumm: { ...action.data.data } };

    case CHECK_SMCS_WITHOUT_REQUEST_1:
      return { ...state, checkSmcs1: { ...action.data.data } };

    case CHECK_SMCS_WITHOUT_REQUEST_2:
      return { ...state, checkSmcs2: { ...action.data.data } };

    case CHECK_SMCS_WITHOUT_REQUEST_3:
      return { ...state, checkSmcs3: { ...action.data.data } };

    case SAVE_SMCS_WITHOUT_REQUEST:
      return { ...state, saveSmcs: { ...action.data } };

    case FETCH_OPERATOR_LIST:
      return { ...state, operatorList: [...action.data.data] };
    case FETCH_OPERATOR_LIST_APP:
      return { ...state, operatorListApp: [...action.data.data] };

    case FETCH_SMCS_BY_APP_NUMBER:
      return { ...state, smcsAppNumberData: { ...action.data.data } };

    case FETCH_SMCS_BY_CONTRACT_NUMBER:
      return { ...state, contract: { ...action.data.data } };
    case FETCH_CHECK_WARRANTY:
      return { ...state, checkWarranty: { ...action.data.data } };
    case FETCH_PAYMENT_OPTIONS:
      return {
        ...state,
        paymentOptions: [...action.data.hkontOptions],
      };
    default:
      return state;
  }
}

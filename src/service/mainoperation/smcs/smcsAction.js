import { doGet, doPost } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

//SMCS - создание сервиса
export const FETCH_SERVICE_SMCS = 'FETCH_SERVICE_SMCS';
export const FETCH_SERVICE_MATNR_LIST = 'FETCH_SERVICE_MATNR_LIST';
export const CLEAR_DYNOBJ_MARKETING = 'CLEAR_DYNOBJ_MARKETING';
export const FETCH_TOVAR_ID = 'FETCH_TOVAR_ID';
export const FETCH_SERVICE_TYPE_ID = 'FETCH_SERVICE_TYPE_ID';
export const FETCH_MATNR_PRICE_SPARE_PART = 'FETCH_MATNR_PRICE_SPARE_PART';
export const FETCH_MATNR_PRICE_CARTRIDGE = 'FETCH_MATNR_PRICE_CARTRIDGE';
//Сервис пакет
export const FETCH_MATNR_PRICE_SERVICE_PACKAGE =
  'FETCH_MATNR_PRICE_SERVICE_PACKAGE';
export const FETCH_SERVICE_PACKAGE_DETAILS = 'FETCH_SERVICE_PACKAGE_DETAILS';
export const FETCH_SMCS_SERVICE_PACKET = 'FETCH_SMCS_SERVICE_PACKET';
export const FETCH_POSITION_SUMM = 'FETCH_POSITION_SUMM';
export const CHECK_SMCS_WITHOUT_REQUEST = 'CHECK_SMCS_WITHOUT_REQUEST';
export const SAVE_SMCS_WITHOUT_REQUEST = 'SAVE_SMCS_WITHOUT_REQUEST';
export const FETCH_OPERATOR_LIST = 'FETCH_OPERATOR_LIST';
export const FETCH_SMCS_BY_APP_NUMBER = 'FETCH_SMCS_BY_APP_NUMBER';
export const FETCH_MASTER_LIST = 'FETCH_MASTER_LIST';
//--END
// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//SMCS ACTIONS
//---Получить договор
export const fetchServiceSmcs = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getContractByTovarSn`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_SMCS,
          data: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchTovarId = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getTovarList`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_TOVAR_ID,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchMasterList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getMasterList`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_MASTER_LIST,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchServiceTypeId = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServiceTypeList`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_TYPE_ID,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchMatnrPriceSparePart = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getMatnrPriceList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_MATNR_PRICE_SPARE_PART,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchMatnrPriceCartridge = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getMatnrPriceList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_MATNR_PRICE_CARTRIDGE,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchMatnrPriceServicePackage = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServicePackageList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_MATNR_PRICE_SERVICE_PACKAGE,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchServicePackageDetails = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServicePackageDetails`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_PACKAGE_DETAILS,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchSmcsServicePacket = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServicePackageList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCS_SERVICE_PACKET,
          data: data,
        });
      })
      .catch(error => {
        // dispatch(modifyLoader(false));
        // handleError(error, dispatch);
      });
  };
};

export const fetchOperatorList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getOperatorList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_OPERATOR_LIST,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchPositionSumm = (branchId, bukrs, position) => {
  return function(dispatch) {
    doPost(`smcs/getPositionSum?branchId=${branchId}&bukrs=${bukrs}`, position)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_POSITION_SUMM,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
//Проверка сервиса и получение суммы
export const checkSmcsWithoutReques = body => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smcs/check`, body)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CHECK_SMCS_WITHOUT_REQUEST,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
//Создать сервис
export const saveSmcsWithoutReques = body => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smcs/create`, body)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: SAVE_SMCS_WITHOUT_REQUEST,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Поиск по application Number
export const fetchSmcsByAppNumber = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServiceApplication`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCS_BY_APP_NUMBER,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

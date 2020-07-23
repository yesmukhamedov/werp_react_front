import { doGet, doPost } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { errorTableText } from '../../../utils/helpers';
import { modifyLoader } from '../../../general/loader/loader_action';

//SMCS - создание сервиса
export const FETCH_SERVICE_SMCS = 'FETCH_SERVICE_SMCS';
export const FETCH_SERVICE_MATNR_LIST = 'FETCH_SERVICE_MATNR_LIST';
export const CLEAR_DYNOBJ_MARKETING = 'CLEAR_DYNOBJ_MARKETING';
export const FETCH_TOVAR_ID = 'FETCH_TOVAR_ID';
export const FETCH_SERVICE_TYPE_ID = 'FETCH_SERVICE_TYPE_ID';

//Запчасти
export const FETCH_MATNR_PRICE_SPARE_PART1 = 'FETCH_MATNR_PRICE_SPARE_PART1';
export const FETCH_MATNR_PRICE_SPARE_PART2 = 'FETCH_MATNR_PRICE_SPARE_PART2';
export const FETCH_MATNR_PRICE_SPARE_PART3 = 'FETCH_MATNR_PRICE_SPARE_PART3';
export const CLEAR_MATNR_PRICE_SPARE_PART = 'CLEAR_MATNR_PRICE_SPARE_PART';

//Картридж
export const FETCH_MATNR_PRICE_CARTRIDGE1 = 'FETCH_MATNR_PRICE_CARTRIDGE1';
export const FETCH_MATNR_PRICE_CARTRIDGE2 = 'FETCH_MATNR_PRICE_CARTRIDGE2';
export const FETCH_MATNR_PRICE_CARTRIDGE3 = 'FETCH_MATNR_PRICE_CARTRIDGE3';
export const CLEAR_MATNR_PRICE_CARTRIDGE = 'CLEAR_MATNR_PRICE_CARTRIDGE';
//Сервис пакет
export const FETCH_MATNR_PRICE_SERVICE_PACKAGE1 =
  'FETCH_MATNR_PRICE_SERVICE_PACKAGE1';
export const FETCH_MATNR_PRICE_SERVICE_PACKAGE2 =
  'FETCH_MATNR_PRICE_SERVICE_PACKAGE2';
export const FETCH_MATNR_PRICE_SERVICE_PACKAGE3 =
  'FETCH_MATNR_PRICE_SERVICE_PACKAGE3';
export const CLEAR_MATNR_PRICE_SERVICE_PACKAGE =
  'CLEAR_MATNR_PRICE_SERVICE_PACKAGE';
//
export const FETCH_SERVICE_PACKAGE_DETAILS = 'FETCH_SERVICE_PACKAGE_DETAILS';
export const CLEAR_SERVICE_PACKAGE_DETAILS = 'CLEAR_SERVICE_PACKAGE_DETAILS';
//
export const FETCH_SMCS_SERVICE_PACKET = 'FETCH_SMCS_SERVICE_PACKET';
export const FETCH_POSITION_SUMM = 'FETCH_POSITION_SUMM';
export const CHECK_SMCS_WITHOUT_REQUEST_1 = 'CHECK_SMCS_WITHOUT_REQUEST_1';
export const CHECK_SMCS_WITHOUT_REQUEST_2 = 'CHECK_SMCS_WITHOUT_REQUEST_2';
export const CHECK_SMCS_WITHOUT_REQUEST_3 = 'CHECK_SMCS_WITHOUT_REQUEST_3';
export const SAVE_SMCS_WITHOUT_REQUEST = 'SAVE_SMCS_WITHOUT_REQUEST';
export const SAVE_SMCS_PAYMENT = 'SAVE_SMCS_PAYMENT';
export const FETCH_OPERATOR_LIST = 'FETCH_OPERATOR_LIST';
export const FETCH_SMCS_BY_APP_NUMBER = 'FETCH_SMCS_BY_APP_NUMBER';
export const FETCH_MASTER_LIST = 'FETCH_MASTER_LIST';
export const FETCH_CHECK_WARRANTY = 'FETCH_CHECK_WARRANTY';
export const FETCH_PAYMENT_OPTIONS = 'FETCH_PAYMENT_OPTIONS';

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

export const fetchMatnrPriceSparePart = (param, trans) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getMatnrPriceList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (trans == 1) {
          dispatch({
            type: FETCH_MATNR_PRICE_SPARE_PART1,
            data: data,
          });
        } else if (trans == 2) {
          dispatch({
            type: FETCH_MATNR_PRICE_SPARE_PART2,
            data: data,
          });
        } else if (trans == 3) {
          dispatch({
            type: FETCH_MATNR_PRICE_SPARE_PART3,
            data: data,
          });
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export const clearMatnrPriceSparePart = () => {
  console.log('clearMatnrPriceSparePart');
  return function(dispatch) {
    dispatch({
      type: CLEAR_MATNR_PRICE_SPARE_PART,
    });
  };
};

export const fetchMatnrPriceCartridge = (param, trans) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getMatnrPriceList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));

        if (trans == 1) {
          dispatch({
            type: FETCH_MATNR_PRICE_CARTRIDGE1,
            data: data,
          });
        } else if (trans == 2) {
          dispatch({
            type: FETCH_MATNR_PRICE_CARTRIDGE2,
            data: data,
          });
        } else if (trans == 3) {
          dispatch({
            type: FETCH_MATNR_PRICE_CARTRIDGE3,
            data: data,
          });
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export const clearMatnrPriceCartridge = () => {
  console.log('clearMatnrPriceCartridge');
  return function(dispatch) {
    dispatch({
      type: CLEAR_MATNR_PRICE_CARTRIDGE,
    });
  };
};

export const fetchMatnrPriceServicePackage = (param, trans) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServicePackageList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (trans == 1) {
          dispatch({
            type: FETCH_MATNR_PRICE_SERVICE_PACKAGE1,
            data: data,
          });
        } else if (trans == 2) {
          dispatch({
            type: FETCH_MATNR_PRICE_SERVICE_PACKAGE2,
            data: data,
          });
        } else if (trans == 3) {
          dispatch({
            type: FETCH_MATNR_PRICE_SERVICE_PACKAGE3,
            data: data,
          });
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export const clearMatnrPriceServicePackage = () => {
  return function(dispatch) {
    dispatch({
      type: CLEAR_MATNR_PRICE_SERVICE_PACKAGE,
    });
  };
};

export const fetchServicePackageDetails = param => {
  return function(dispatch) {
    doGet(`smcs/getServicePackageDetails`, param)
      .then(({ data }) => {
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

export const clearServicePackageDetails = param => {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SERVICE_PACKAGE_DETAILS,
    });
  };
};

export const fetchSmcsServicePacket = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServicePackageList`, param)
      .then(({ data }) => {
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

export const fetchPositionSumm = (branchId, bukrs, productId, position) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(
      `smcs/getPositionSum?branchId=${branchId}&bukrs=${bukrs}&productId=${productId}`,
      position,
    )
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
export const checkSmcsWithoutReques = (body, successCheck, trans) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smcs/check`, body)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (trans == 1) {
          dispatch({
            type: CHECK_SMCS_WITHOUT_REQUEST_1,
            data: data,
          });
        } else if (trans == 2) {
          dispatch({
            type: CHECK_SMCS_WITHOUT_REQUEST_2,
            data: data,
          });
        } else if (trans == 3) {
          dispatch({
            type: CHECK_SMCS_WITHOUT_REQUEST_3,
            data: data,
          });
        }

        successCheck();
        dispatch(notify('success', 'Успешно проверено'));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
//Создать сервис
export const saveSmcsWithoutReques = (body, toSmvs) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smcs/create`, body)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        // dispatch({
        //   type: SAVE_SMCS_WITHOUT_REQUEST,
        //   data: data,
        // });
        dispatch(notify('success', errorTableText(101)));
        toSmvs(data);
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
//Создать сервис с оплатой
export const saveSmcsPayment = (body, hcont, toSmvs) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smcs/create_and_accept_payment?hkontS=${hcont}`, body)
      .then(({ data }) => {
        dispatch(modifyLoader(false));

        dispatch(notify('success', errorTableText(101)));
        toSmvs(data);
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchPaymentOptions = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`finance/mainoperation/fetchCashBankHkontsByBranch`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_PAYMENT_OPTIONS,
          data,
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
//Проверка гарантии
export const fetchCheckWarranty = (param, funcWarranty, value) => {
  return function(dispatch) {
    doGet(`smcs/checkWarranty`, param)
      .then(({ data }) => {
        if (data.status == 'OK') {
          funcWarranty(param, data, value);
        }
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

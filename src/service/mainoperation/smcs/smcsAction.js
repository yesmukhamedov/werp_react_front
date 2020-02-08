import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

//SMCS - создание сервиса
export const FETCH_SERVICE_SMCS = 'FETCH_SERVICE_SMCS'; //Договор

export const FETCH_SERVICE_MATNR_LIST = 'FETCH_SERVICE_MATNR_LIST';

export const CLEAR_DYNOBJ_MARKETING = 'CLEAR_DYNOBJ_MARKETING';

export const FETCH_TOVAR_ID = 'FETCH_TOVAR_ID';

export const FETCH_SERVICE_TYPE_ID = 'FETCH_SERVICE_TYPE_ID';

export const FETCH_SMCS_MATNR_PRICELIST = 'FETCH_SMCS_MATNR_PRICELIST';

export const FETCH_SMCS_SERVICE_PACKET = 'FETCH_SMCS_SERVICE_PACKET';

export const FETCH_POSITION_SUMM = 'FETCH_POSITION_SUMM';

export const CHECK_SMCS_WITHOUT_REQUEST = 'CHECK_SMCS_WITHOUT_REQUEST';
//--END
const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//SMCS ACTIONS
//---Получить договор
export const fetchServiceSmcs = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/tovarSn`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
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

export const fetchServiceMatnrList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/matnr_pricelist`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_MATNR_LIST,
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
    doGet(`smcs/tovarId`, param)
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

export const fetchServiceTypeId = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/serviceTypeId`, param)
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

export const fetchSmcsMatnrPriceList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/matnr_pricelist`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCS_MATNR_PRICELIST,
          data: data,
        });
      })
      .catch(error => {
        // dispatch(modifyLoader(false));
        // handleError(error, dispatch);
      });
  };
};

export const fetchSmcsServicePacket = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/servicePackageId`, param)
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

export const fetchPositionSumm = body => {
  return function(dispatch) {
    doPost(`smcs/position_sum`, body)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        console.log(data);
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

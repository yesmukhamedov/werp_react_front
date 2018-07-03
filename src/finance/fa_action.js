import axios from 'axios';
import {ROOT_URL} from '../utils/constants';
import { handleError, notify } from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';

export const CHANGE_FA_BKPF = 'CHANGE_FA_BKPF';
export const CLEAR_FA_BKPF = 'CLEAR_FA_BKPF';
export const FETCH_CASHBANKHKONTS_BY_BRANCH = 'FETCH_CASHBANKHKONTS_BY_BRANCH';
export const CLEAR_CASHBANKHKONTS_BY_BRANCH = 'CLEAR_CASHBANKHKONTS_BY_BRANCH';
export const FETCH_FMCP = 'FETCH_FMCP';
export const CLEAR_FMCP = 'CLEAR_FMCP';
export const CHANGE_FMCP = 'CHANGE_FMCP';

export function fetchCashBankHkontsByBranch(a_bukrs,a_brnch) {
    
    

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/finance/mainoperation/fetchCashBankHkontsByBranch`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs: a_bukrs,
                brnch: a_brnch
            }
        })
        .then(({data}) => {
            dispatch({
                type: FETCH_CASHBANKHKONTS_BY_BRANCH,
                hkontOptions:data.hkontOptions
            });
    
        })
        .catch(error => {
            handleError(error,dispatch);               
                 
        });
    }    


}



export function changefaBkpf(bkpf) {
    const obj = {
        type: CHANGE_FA_BKPF,
        bkpf:bkpf
    };
    return obj;
}
export function clearfaBkpf() {
    const obj = {
        type: CLEAR_FA_BKPF
    };
    return obj;
}



export function fmcpFetch(a_zregOrConNum) {
    
    
    return function(dispatch) {
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/finance/mainoperation/fmcp/fetch`, {
            headers: 
            {
                authorization: localStorage.getItem('token')
            },
            params:
            {
                zregOrConNum: a_zregOrConNum
            }
        })
        .then(({data}) => {
            
            dispatch(modifyLoader(false));
            dispatch({
                type: FETCH_FMCP,
                data:data
            });
    
        })
        .catch(error => {
            handleError(error,dispatch);
            dispatch(modifyLoader(false));
        });
    }


}
export function fmcpChange(a_obj) {
    const obj = {
        type: CHANGE_FMCP,
        data: a_obj
    };
    return obj;
}


export function fmcpClear() {
    const obj = {
        type: CLEAR_FMCP
    };
    return obj;
}

export function fmcpSave(a_contract) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        
        axios.post(`${ROOT_URL}/api/finance/mainoperation/fmcp/save`,
            {           
                ...a_contract
            },       
            {            
                headers: 
                {                            
                    // 'Content-Type': 'application/json;charset=UTF-8',
                    authorization: localStorage.getItem('token')
                }
            }        
        ) 
        
        .then(({data}) => {
            dispatch(modifyLoader(false));
            if(data)
            {
                dispatch(notify('success','Сохранен.','Успешно'));
                dispatch(fmcpFetch(a_contract.zregOrConNum));
            }
            else
            {
                dispatch(notify('info','Не сохранен.','Ошибка'));
            }
                
        })
        .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error,dispatch); 
        });
    }    


}
import axios from 'axios';
import {ROOT_URL} from '../utils/constants';
import { handleError, notify } from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';

export const CHANGE_FA_BKPF = 'CHANGE_FA_BKPF';
export const CLEAR_FA_BKPF = 'CLEAR_FA_BKPF';
export const FETCH_CASHBANKHKONTS_BY_BRANCH = 'FETCH_CASHBANKHKONTS_BY_BRANCH';
export const CLEAR_CASHBANKHKONTS_BY_BRANCH = 'CLEAR_CASHBANKHKONTS_BY_BRANCH';

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
// export function saveBonusData(a_bukrs, a_branchId, a_date, a_table) {
    
    
//     let year = a_date.format('YYYY');
//     let month = a_date.format('MM');

//     // console.log(a_table,'table');

//     return function(dispatch) {
//         dispatch(modifyLoader(true));

//         axios.post(`${ROOT_URL}/api/hr/hrb02/save`, 
//                     {
//                         bukrs:a_bukrs,
//                         branchId:a_branchId,
//                         year,
//                         month: month,
//                         // ,
//                         table:a_table

//                     },       
//                     {            
//                         headers: 
//                         {                            
// 				            // 'Content-Type': 'application/json;charset=UTF-8',
//                             authorization: localStorage.getItem('token')
//                         }
//                     }
//         )
//         .then(({data}) => {
//             dispatch(modifyLoader(false));
//             if (data.saved)
//             {
//                 dispatch(notify('success','Сохранен.','Успешно'));
//                 dispatch({
//                     type: SAVE_BONUS_DATA,
//                     table:data.table
//                 });
//             }            
    
//         })
//         .catch(error => {
//             // console.log(error);
//             dispatch(modifyLoader(false));
//             handleError(error,dispatch);               
                 
//         });
//     }    


// }


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
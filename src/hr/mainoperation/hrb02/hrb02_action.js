import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';
import { handleError, notify } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_BONUS_DATA = 'FETCH_BONUS_DATA';
export const CLEAR_STATE = 'CLEAR_STATE';
export const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';
export const ON_DELETE_ROW = 'ON_DELETE_ROW';
export const ON_ADD_ROW = 'ON_ADD_ROW';
export const SAVE_BONUS_DATA = 'SAVE_BONUS_DATA';

export function updateF4All() {
    
    

    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/reference/updateF4All`, 
        {

        },     
        {            
            headers: 
            {                            
                // 'Content-Type': 'application/json;charset=UTF-8',
                authorization: localStorage.getItem('token')
            }
        })
        .then(({data}) => {    
            dispatch(notify('success','Сохранен.','Успешно'));
        })
        .catch(error => {
            console.log(error);
            handleError(error,dispatch);               
                 
        });
    }    


}
export function fetchBonusData(a_bukrs, a_branchId, a_date) {
    
    
    let year = a_date.format('YYYY');
    let month = a_date.format('MM');

    // console.log(a_branchId);

    return function(dispatch) {
        dispatch(modifyLoader(true));

        axios.get(`${ROOT_URL}/api/hr/hrb02/fetchBonusData`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:a_bukrs,
                branchId: a_branchId,
                year:year,
                month:month
            }
        })
        .then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type: FETCH_BONUS_DATA,
                table:data.table,
                blankObject:data.blankObject,
                current:data.current,
                businessAreaId:data.businessAreaId
            });
    
        })
        .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error,dispatch);               
                 
        });
    }    


}

export function saveBonusData(a_bukrs, a_branchId, a_date, a_table) {
    
    
    let year = a_date.format('YYYY');
    let month = a_date.format('MM');

    // console.log(a_table,'table');

    return function(dispatch) {
        dispatch(modifyLoader(true));

        axios.post(`${ROOT_URL}/api/hr/hrb02/save`, 
                    {
                        bukrs:a_bukrs,
                        branchId:a_branchId,
                        year,
                        month: month,
                        // ,
                        table:a_table

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
            if (data.saved)
            {
                dispatch(notify('success','Сохранен.','Успешно'));
                dispatch({
                    type: SAVE_BONUS_DATA,
                    table:data.table
                });
            }            
    
        })
        .catch(error => {
            // console.log(error);
            dispatch(modifyLoader(false));
            handleError(error,dispatch);               
                 
        });
    }    


}
export function onAddRow() {
    const obj = {
        type: ON_ADD_ROW
    };
    return obj;
}

export function onInputChange(index,bonus){
    const obj = {
        type: ON_INPUT_CHANGE,
        bonus:bonus,
        index:index
    };
    return obj;
}

export function onDeleteRow(index){
    const obj = {
        type: ON_DELETE_ROW,
        index:index
    };
    return obj;
}



export function clearRedStateHrb02() {
    const obj = {
        type: CLEAR_STATE
    };
    return obj;
}
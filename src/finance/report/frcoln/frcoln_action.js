import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';
import { notify } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FRCOLN_SAVE_DATA = 'FRCOLN_SAVE_DATA';
export const FRCOLN_SEARCH_DATA = 'FRCOLN_SEARCH_DATA';
export const FRCOLN_FETCH_BRANCH_DATA = 'FRCOLN_FETCH_BRANCH_DATA';
export const FRCOLN_FETCH_COLLECTOR_DATA = 'FRCOLN_FETCH_COLLECTOR_DATA';
export const CHANGE_ACTIVE_INDEX = 'CHANGE_ACTIVE_INDEX';
export const CLEAR_STATE = 'CLEAR_STATE';


export function frcolnSearchData(a_bukrs, a_branchList, a_status, a_date) {
    
    
    let year = a_date.format('YYYY');
    let month = a_date.format('MM');

    return function(dispatch) {
        dispatch(modifyLoader(true));

        axios.get(`${ROOT_URL}/api/finance/reports/frcoln/searchByBranches`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:a_bukrs,
                branchIds: a_branchList.join(),
                year:year,
                month:month,
                status: a_status
            }
        })
        .then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type: FRCOLN_SEARCH_DATA,
                tab2OutputTable:data.tab2OutputTable,
                tab2TotalTable:data.tab2TotalTable
            });
    
        })
        .catch(error => {
            handleError(error);               
                 
        });
    }    


}
export function frcolnFetchBranchData(a_bukrs, a_branchId, a_status, a_date, a_waers) {
    let year = a_date.format('YYYY');
    let month = a_date.format('MM');
    console.log(222);
    return function(dispatch) {
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/finance/reports/frcoln/searchByBranch`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:a_bukrs,
                branchId:a_branchId,
                waers: a_waers,
                year:year,
                month:month,
                status:a_status
            }
        })
        .then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type: FRCOLN_FETCH_BRANCH_DATA,
                tab3OutputTable:data.tab3OutputTable,
                tab3TotalTable:data.tab3TotalTable,
            });
    
        })
        .catch(error => {
            handleError(error,dispatch); 
        });
    }    


}

export function frcolnFetchCollectorData(a_bukrs, a_branchId, a_status, a_date, a_waers,a_staff_id, a_ps) {
    let year = a_date.format('YYYY');
    let month = a_date.format('MM');

    return function(dispatch) {
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/finance/reports/frcoln/searchByCollector`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:a_bukrs,
                branchId:a_branchId,
                waers: a_waers,
                year:year,
                month:month,
                ps:a_ps,
                staff_id:a_staff_id,
                status:a_status
            }
        })
        .then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type: FRCOLN_FETCH_COLLECTOR_DATA,
                tab4OutputTable:data.tab4OutputTable
            });
    
        })
        .catch(error => {
            handleError(error,dispatch); 
        });
    }    


}

export function frcolnSaveData(a_bukrs, a_date) {
    let year = a_date.format('YYYY');
    let month = a_date.format('MM');

    return function(dispatch) {
        dispatch(modifyLoader(true));
        axios.post(`${ROOT_URL}/api/finance/reports/frcoln/saveFrcolStatistics`,{
            
            
        },        
        {          
            params:{
                bukrs:a_bukrs,
                year:year,
                month:month 
            },  
            headers: {
                authorization: localStorage.getItem('token')
            }
        }) 
        
        .then(({data}) => {
            dispatch(modifyLoader(false));
            if(data)
            {
                dispatch(notify('success','Сохранен.','Успешно'));
            }
            else
            {
                dispatch(notify('info','Не сохранен.','Ошибка'));
            }
                
        })
        .catch(error => {
            handleError(error,dispatch); 
        });
    }    


}

export function handleError(error,dispatch) {
    if(error.response) {                
        console.log(error);
        if (error.response.status && error.response.status===403)
        {
            //blog post has been created, navigate the user to the index
            //We navigate by calling this.context.router.push with the new path to navigate to
            this.context.router.push('/forbidden');
        }
        else if (error.response.status && error.response.status===500)
        {
            //blog post has been created, navigate the user to the index
            //We navigate by calling this.context.router.push with the new path to navigate to
            this.context.router.push('/forbidden');
        }
        dispatch(notify('error',error.response.data.message,'Ошибка'));
        
    } else {                
        Promise.resolve({ error }).then(response => dispatch(notify('error',error.response.data.message,'Ошибка')));  
    }
}

export function changeTab(idx) {
    const obj = {
        type: CHANGE_ACTIVE_INDEX,
        activeIndex: idx
    };
    return obj;
}

export function clearState() {
    const obj = {
        type: CLEAR_STATE
    };
    return obj;
}
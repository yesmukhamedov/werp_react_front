import axios from 'axios';
import {ROOT_URL} from '../utils/constants';
import { handleError, notify } from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';
import {clearfaBkpf} from '../finance/fa_action';


export function amsgSave(a_bkpf, a_rows, a_rowsPs, a_lifnr) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        
        axios.post(`${ROOT_URL}/api/accounting/mainoperation/amsg/save`,{
            
            bkpf:a_bkpf,
            l_bseg:a_rows,
            l_payment_schedule:a_rowsPs,
            lifnr: a_lifnr

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
                dispatch(clearfaBkpf());
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
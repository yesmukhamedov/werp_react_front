import axios from 'axios';
import {ROOT_URL} from '../../utils/constants';
import { notify } from '../../general/notification/notification_action';

export const FETCH_USER_INFO = 'FETCH_USER_INFO';

export function fetchUserInfo() {

    return function(dispatch) {

        let url = `${ROOT_URL}/api/reference/userInfo`;
        axios.get(url, {
            headers: {
                authorization: localStorage.getItem('token')}
        })
        .then(({data}) => {
            const newCompanyOptions = data.bukrs.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    text: item.name
                }
            });

            dispatch({
                type: FETCH_USER_INFO,
                bukrs: newCompanyOptions,
                all: data.all,
                marketing: data.marketing,
                service: data.service 
            });
    
        })
        .catch(error => {

            if(error.response) {                
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
                    this.context.router.push('');
                }
                dispatch(notify('error',error.response.data.message,'Ошибка'));
                
            } else {
                
                Promise.resolve({ error }).then(response => dispatch(notify('error',error.response.data.message,'Ошибка')));  
            }
                
                 
        });
    }    


}
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { notify } from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';

/**
 * Страница Текущие рекомендации
 */
export const CRM_RECO_FETCH_CURRENT_USED = 'CRM_RECO_FETCH_CURRENT_USED';
export const CRM_RECO_FETCH_CURRENT_NEW = 'CRM_RECO_FETCH_CURRENT_NEW';
export const CRM_RECO_FETCH_CURRENT_DEMO_DONE = 'CRM_RECO_FETCH_CURRENT_DEMO_DONE';
export const CRM_RECO_FETCH_CURRENT_MOVED = 'CRM_RECO_FETCH_CURRENT_MOVED';

/**
 *
 */
export const CRM_RECO_FETCH_ARCHIVE = 'CRM_RECO_FETCH_ARCHIVE';

export const CRM_RECO_FETCH_STATUSES = 'CRM_RECO_FETCH_STATUSES';

export const CRM_CALL_FETCH_RESULTS = 'CRM_CALL_FETCH_RESULTS';
export const CRM_FETCH_REASONS = 'CRM_FETCH_REASONS';

export const CRM_RECO_CLEAR_STATE = 'CRM_RECO_CLEAR_STATE';



export function fetchRecoCurrentData(type){

    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/reco/current/` + type, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            let actionType;
            switch (type){
                case 'new':
                    actionType = CRM_RECO_FETCH_CURRENT_NEW
                    break

                case 'demo-done':
                    actionType = CRM_RECO_FETCH_CURRENT_DEMO_DONE
                    break

                case 'moved':
                    actionType = CRM_RECO_FETCH_CURRENT_MOVED
                    break

                default:
                    actionType = CRM_RECO_FETCH_CURRENT_USED
                    break
            }
            dispatch(modifyLoader(false));
            dispatch({
                type: actionType,
                items:data
            });

        })
        .catch(error => {
            //handleError(error);
            console.log(error)
        });
    }
}

export function fetchCallResults(){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/crm/call/results`, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            let loaded = Object.keys(data).map((k) => {
                return {
                    key: k,
                    text: data[k],
                    value: k
                }
            })

            dispatch({
                type: CRM_CALL_FETCH_RESULTS,
                items:loaded
            });

        }).catch((e) => {
            console.log(e)
        })
    }
}

export function fetchRecoArchive(params){

    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/reco/archive`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:params
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type:CRM_RECO_FETCH_ARCHIVE,
                items:data['items'],
                meta:data['meta']
            })
        }).catch((e) => {
            console.log(e);
        })
    }
}

export function fetchRecoStatuses(){
    return function (dispatch){
        axios.get(`${ROOT_URL}/api/crm/reco/statuses`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            let loaded = Object.keys(res.data).map((k) => {
                return {
                    key:k,
                    text:res.data[k],
                    value:k
                }
            });
            dispatch({
                type:CRM_RECO_FETCH_STATUSES,
                statuses:loaded
            })
        }).catch((e) => {
            console.log(e);
        })
    }
}

export function fetchReasons(typeId){
    return function (dispatch){
        axios.get(`${ROOT_URL}/api/reference/reasons/` + typeId, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            let loaded = data.map((item) => {
                return {
                    key: item.id,
                    text: item.name,
                    value: item.id
                }
            })

            dispatch({
                type: CRM_FETCH_REASONS,
                items:loaded
            });
        }).catch((e) => {
            console.log(e)
        })
    }
}

export function handleError(error,dispatch) {
    if(error.response) {
        // console.log(error);
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
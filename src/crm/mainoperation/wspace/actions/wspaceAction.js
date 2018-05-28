import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError,notify } from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';
import browserHistory from '../../../../utils/history';

export const WSP_RECO_LIST_MODAL_OPENED = 'WSP_RECO_LIST_MODAL_OPENED'
export const WSP_SET_CURRENT_RECOMMENDER = 'WSP_SET_CURRENT_RECOMMENDER'
export const WSP_FETCH_RECOS_BY_RECO = 'WSP_FETCH_RECOS_BY_RECO'

export function toggleRecoListModal (flag){
    return {
        type: WSP_RECO_LIST_MODAL_OPENED,
        payload: flag
    }
}

export function setCurrentRecommender(recommender){

    return {
        type: WSP_SET_CURRENT_RECOMMENDER,
        payload: recommender
    }
}

export function fetchRecosByReco(staffId){
    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/wspace/by-reco/` + staffId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type: WSP_FETCH_RECOS_BY_RECO,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(false));
            handleError(e,dispatch)
        })
    }
}
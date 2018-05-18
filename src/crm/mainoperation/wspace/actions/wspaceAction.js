import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError,notify } from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';
import browserHistory from '../../../../utils/history';

export const WSP_RECO_LIST_MODAL_OPENED = 'WSP_RECO_LIST_MODAL_OPENED'
export const WSP_SET_CURRENT_RECOMMENDER = 'WSP_SET_CURRENT_RECOMMENDER'

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
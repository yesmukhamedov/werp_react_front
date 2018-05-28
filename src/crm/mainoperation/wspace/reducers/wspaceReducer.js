import {
        WSP_RECO_LIST_MODAL_OPENED,WSP_SET_CURRENT_RECOMMENDER,WSP_FETCH_RECOS_BY_RECO
} from '../actions/wspaceAction'

import {MENU_BY_RECO} from '../wspaceUtil'

const INITIAL_STATE={

    //RecoList By Reco
    byRecoItems:[],
    recoItems: [],
    phoneCode: '',
    phonePattern: '',
    recoListModalOpened: false,
    currentRecommender:{},
    staffRecoData: {}
};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case WSP_SET_CURRENT_RECOMMENDER:
            return {...state,currentRecommender:action.payload}

        case WSP_RECO_LIST_MODAL_OPENED:
            return {...state,recoListModalOpened:action.payload}

        case WSP_FETCH_RECOS_BY_RECO:
            let stfData = Object.assign({},state.staffRecoData)
            stfData[MENU_BY_RECO] = action.payload
            return {...state,staffRecoData: stfData}

        default:
            return state;
    }
}


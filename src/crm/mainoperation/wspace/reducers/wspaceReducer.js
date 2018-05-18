import {WSP_RECO_LIST_MODAL_OPENED,WSP_SET_CURRENT_RECOMMENDER} from '../actions/wspaceAction'

const INITIAL_STATE={

    //RecoList By Reco
    recoItems: [],
    phoneCode: '',
    phonePattern: '',
    recoListModalOpened: false,
    currentRecommender:{}
};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case WSP_SET_CURRENT_RECOMMENDER:
            return {...state,currentRecommender:action.payload}

        case WSP_RECO_LIST_MODAL_OPENED:
            return {...state,recoListModalOpened:action.payload}

        default:
            return state;
    }
}


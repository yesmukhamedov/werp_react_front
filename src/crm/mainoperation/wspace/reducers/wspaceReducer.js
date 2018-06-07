import {
        WSP_RECO_LIST_MODAL_OPENED,
        WSP_SET_CURRENT_RECOMMENDER,
        WSP_FETCH_RECOS_BY_RECO,
        WSP_FETCH_RECOS_BY_DATE,
        WSP_FETCH_RECOS_MOVED,
        WSP_FETCH_DEMO_RECOS,
        WSP_LOADER_CHANGED
} from '../actions/wspaceAction'


const INITIAL_STATE={

    //RecoList By Reco
    byRecoItems:[],
    recoItems: [],
    phoneCode: '',
    phonePattern: '',
    recoListModalOpened: false,
    currentRecommender:{},
    currentRecommenderRecos:[],
    staffRecoData: {},
    loaders:{}
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
        case WSP_FETCH_RECOS_BY_DATE:
        case WSP_FETCH_RECOS_MOVED:
            console.log(action.key)
            let stfData = Object.assign({},state.staffRecoData)
            stfData[action.key] = action.payload
            return {...state,staffRecoData: stfData}


        case WSP_FETCH_DEMO_RECOS:
            return {...state,currentRecommenderRecos: action.payload}

        case WSP_LOADER_CHANGED:
            let loaders = Object.assign({},state.loaders)
            loaders[action.key] = action.payload
            return {...state,loaders: loaders}


        default:
            return state;
    }
}


import {
        WSP_RECO_LIST_MODAL_OPENED,
        WSP_SET_CURRENT_RECOMMENDER,
        WSP_FETCH_RECOS_BY_RECO,
        WSP_FETCH_RECOS_BY_DATE,
        WSP_FETCH_RECOS_MOVED,
        WSP_FETCH_DEMO_RECOS,
        WSP_LOADER_CHANGED,
        WSP_FETCH_TODAY_CALLS,
        WSP_FETCH_TODAY_DEMOS,
        WSP_FETCH_PHONE_NUMBER_HISTORY,
        WSP_TOGGLE_PHONE_MODAL,
        WSP_SET_CURRENT_PHONE
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
    loaders:{},
    todayCallsByResult:{},
    dashboardCallMenus:[],
    todayDemos: [],
    currentPhone:{},
    phoneModalOpened: false,
    phoneNumberHistory: [],
    phoneNumberReco:{}

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case WSP_SET_CURRENT_PHONE:
            return {...state,currentPhone:action.payload}

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

        case WSP_FETCH_TODAY_DEMOS:
            return {...state,todayDemos: action.payload}

        case WSP_FETCH_PHONE_NUMBER_HISTORY:

            return {...state,
                    phoneNumberHistory: action.payload.calls,
                    phoneNumberReco: action.payload.reco,
                    currentRecommender:action.payload.recommender,
                    phoneModalOpened:true
            }

        case WSP_FETCH_TODAY_CALLS:
            let todayCalls = action.payload
            let callsByResult = {}
            let dashboardCallMenus = []
            for(let k in todayCalls){
                let temp = todayCalls[k]
                if(!callsByResult[temp['resultName']]){
                    callsByResult[temp['resultName']] = []
                }

                callsByResult[temp['resultName']].push(temp)
            }

            dashboardCallMenus.push({
                'name': 'all',
                'label': 'Все звонки',
                'count': todayCalls.length
            })

            for(let res in callsByResult){
                dashboardCallMenus.push({
                    'name': res,
                    'label': res,
                    'count': callsByResult[res].length
                })
            }

            callsByResult['all'] = todayCalls

            return {...state,todayCallsByResult: callsByResult,dashboardCallMenus:dashboardCallMenus}

        case WSP_TOGGLE_PHONE_MODAL:
            return {...state,phoneModalOpened:action.payload}


        default:
            return state;
    }
}


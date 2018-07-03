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
        WSP_SET_CURRENT_PHONE,
        WSP_SAVED_CALL,
        WSP_FETCH_CURRENT_DEMOS,
        WSP_FETCH_CURRENT_VISITS,WSP_FETCH_VISIT_RECOS,
        WSP_HANDLE_FILTER
} from '../actions/wspaceAction'
import _ from 'lodash'


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
    phoneNumberReco:{},
    callForm: {},
    filters: {}

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
        case WSP_FETCH_CURRENT_DEMOS:
        case WSP_FETCH_CURRENT_VISITS:
            let stfData = Object.assign({},state.staffRecoData)
            stfData[action.key] = action.payload
            return {...state,staffRecoData: stfData}


        case WSP_FETCH_DEMO_RECOS:
        case WSP_FETCH_VISIT_RECOS:
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
                    phoneModalOpened:true,
                    callForm: action.payload.callForm
            }

        case WSP_FETCH_TODAY_CALLS:
            let todayCalls = action.payload
            let callsByResult = {}
            let dashboardCallMenus = []
            let resultsMap = {}
            for(let k in todayCalls){
                let temp = todayCalls[k]
                if(!callsByResult[temp['resultName']]){
                    callsByResult[temp['resultName']] = []
                }

                resultsMap[temp['resultName']] = temp['resultId']

                callsByResult[temp['resultName']].push(temp)
            }

            dashboardCallMenus.push({
                'name': 'all',
                'label': 'Все звонки',
                'count': todayCalls.length,
                'resultId': 0
            })

            for(let res in callsByResult){
                dashboardCallMenus.push({
                    'name': res,
                    'label': res,
                    'count': callsByResult[res].length,
                    'resultId': resultsMap[res]
                })
            }

            callsByResult['all'] = todayCalls

            return {...state,todayCallsByResult: callsByResult,dashboardCallMenus:dashboardCallMenus}

        case WSP_TOGGLE_PHONE_MODAL:
            return {...state,phoneModalOpened:action.payload}

        case WSP_SAVED_CALL:
            let demoDto = Object.assign({},action.payload.demo)
            let callDto = Object.assign({},action.payload.call)
            let todCalls = Object.assign({},state.todayCallsByResult)
            let dashbCallMenu = Object.assign([],state.dashboardCallMenus)
            let todDemos = Object.assign([],state.todayDemos)

            if(demoDto && demoDto['id']){
                todDemos.push(demoDto)
            }
            if(callDto){
                if(!todCalls[callDto['resultName']]){
                    todCalls[callDto['resultName']] = []
                }

                if(!todCalls['all']){
                    todCalls['all'] = []
                }

                let tempDashb = _.find(dashbCallMenu,{name: callDto['resultName']})
                let allDashb = _.find(dashbCallMenu,{name: 'all'})
                if(tempDashb){
                    tempDashb['count'] = tempDashb['count']+1
                }else{
                    tempDashb = {
                        'name': callDto['resultName'],
                        'label': callDto['resultName'],
                        'count': 1
                    }
                    dashbCallMenu.push(tempDashb)
                }

                allDashb['count'] = allDashb['count']+1

                todCalls[callDto['resultName']].push(callDto)
                todCalls['all'].push(callDto)

                //todCalls.push(callDto)
            }

            return {...state, phoneModalOpened: false, todayCallsByResult: todCalls, dashboardCallMenus:dashbCallMenu, todayDemos: todDemos}

        case WSP_HANDLE_FILTER:
            let {key,name,value} = action
            let filters = Object.assign({},state.filters)
            if(!filters[key]){
                filters[key] = {}
            }

            filters[key][name] = value

            return {...state, filters: filters}

        default:
            return state;
    }
}


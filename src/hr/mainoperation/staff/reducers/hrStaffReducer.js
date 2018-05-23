import {
        HR_STAFF_CURRENT_STAFFS,
    HR_STAFF_CLEAR_STATE,
    HR_STAFF_SINGLE_STAFF,
    HR_STAFF_FETCH_STAFF_SALARIES,
    HR_STAFF_FETCH_STAFF_EXPENCES,
    HR_STAFF_LIST_MODAL_OPENED,
    HR_STAFF_ALL_STAFFS,
    HR_SALARY_FORM_MODAL_OPENED,
    HR_SALARY_CREATED,
    HR_PYRAMID_FETCH_BRANCH_PYRAMIDS,
    HR_PYRAMID_FETCH_PYRAMIDS,
    HR_SET_SALARY_FOR_UPDATE,
    HR_STAFF_FETCH_BLANK,
    HR_SALARY_UPDATED,
    HR_STAFF_DATA_FORM_MODAL_FLAG,
    HR_STAFF_DATA_BLANKED,
    HR_STAFF_DATA_CREATED,
    HR_STAFF_DATA_FETCHED_LIST,
    HR_STAFF_FETCH_MANAGERS
} from '../actions/hrStaffAction';

import {OFF_DATA} from '../../../hrUtil'

const INITIAL_STATE={
                    currentStaffs:[],
                    staff:{},
                    allStaffs:[],
                    staffSalaries:[],
                    staffExpences:[],
                    staffOffData:[],
                    items:[],
                    statuses:[],
                    meta:{
                        totalRows:0,
                        perPage:0,
                        page:0
                    },
                    staffListModalOpened:false,
                    salaryFormModalOpened:false,
                    salary:{},
                    branchPyramids:[],
                    pyramids: [],
                    staffFormErrors:{},
                    staffDataFormModalOpened: false,
                    staffData:{},
                    staffDataList:{},

                    //
                    managers: [],
                    managersByBranchOptions: []

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case HR_STAFF_CURRENT_STAFFS:
            return {...state,currentStaffs:action.items,meta:action.meta};

        case HR_STAFF_ALL_STAFFS:
            return {...state,allStaffs:action.payload};

        case HR_STAFF_SINGLE_STAFF:
            return {...state,staff:action.payload};

        case HR_STAFF_FETCH_BLANK:
            return {...state,staff:action.payload}

        case HR_STAFF_FETCH_STAFF_SALARIES:
            return {...state,staffSalaries:action.payload};

        case HR_STAFF_FETCH_STAFF_EXPENCES:
            return {...state,staffExpences:action.payload};

        case HR_STAFF_LIST_MODAL_OPENED:
            return {...state,staffListModalOpened:action.payload};

        case HR_SALARY_FORM_MODAL_OPENED:
            return {...state,salaryFormModalOpened:action.payload};

        case HR_SALARY_CREATED:
             let salaries = [...state.staffSalaries];
             salaries.push(action.payload)
            return {...state,staffSalaries:salaries,salaryFormModalOpened:false};

        case HR_SALARY_UPDATED:
            let stfSalaries = []
            let sal = action.payload
            for(let k in state.staffSalaries){
                if(state.staffSalaries[k]['id'] === sal['id']){
                    stfSalaries.push(sal)
                }else{
                    stfSalaries.push(state.staffSalaries[k])
                }
            }

            return {...state,staffSalaries:stfSalaries,salaryFormModalOpened:false}

        case HR_STAFF_CLEAR_STATE:
            return {...state,doneItems:[],movedItems:[],newItems:[],usedItems:[] };

        case HR_PYRAMID_FETCH_BRANCH_PYRAMIDS:
            return {...state,branchPyramids:action.payload};

        case HR_PYRAMID_FETCH_PYRAMIDS:
            return {...state,pyramids:action.payload}

        case HR_SET_SALARY_FOR_UPDATE:
            return {...state,salary:action.payload}

        case HR_STAFF_DATA_FORM_MODAL_FLAG:
            return {...state,staffDataFormModalOpened:action.payload}

        case HR_STAFF_DATA_BLANKED:
            return {...state,staffData: action.payload}

        case HR_STAFF_DATA_CREATED:
            let staffDataList = Object.assign({},state.staffDataList)
            let tempData = staffDataList[action.activeData] || []
            tempData.push(action.payload)
            staffDataList[action.activeData] = tempData
            return {...state,staffDataList:staffDataList,staffDataFormModalOpened: false}

        case HR_STAFF_DATA_FETCHED_LIST:
            let stfDataList = Object.assign({},state.staffDataList)
            stfDataList[action.activeData] = action.payload
            return {...state,staffDataList:stfDataList}

        case HR_STAFF_FETCH_MANAGERS:
            let managersByBranch = {}
            for(let key in action.payload){
                let current = action.payload[key]
                if(!managersByBranch[current['branchId']]){
                    managersByBranch[current['branchId']] = []
                }

                managersByBranch[current['branchId']].push({
                    text: current.staffName,
                    key: current.staffId,
                    value: current.staffId
                })
            }

            return {...state,managers: action.payload,managersByBranchOptions: managersByBranch}

        default:
            return state;
    }
}


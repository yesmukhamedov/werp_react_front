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
    HR_SET_SALARY_FOR_UPDATE
} from '../actions/hrStaffAction';

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
                    pyramids: []

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
            return {...state,staffSalaries:salaries};

        case HR_STAFF_CLEAR_STATE:
            return {...state,doneItems:[],movedItems:[],newItems:[],usedItems:[] };

        case HR_PYRAMID_FETCH_BRANCH_PYRAMIDS:
            return {...state,branchPyramids:action.payload};

        case HR_PYRAMID_FETCH_PYRAMIDS:
            return {...state,pyramids:action.payload}

        case HR_SET_SALARY_FOR_UPDATE:
            return {...state,salary:action.payload}

        default:
            return state;
    }
}


import {
        HR_STAFF_CURRENT_STAFFS,
    HR_STAFF_CLEAR_STATE,
    HR_STAFF_SINGLE_STAFF,
    HR_STAFF_FETCH_STAFF_SALARIES,
    HR_STAFF_FETCH_STAFF_EXPENCES
} from '../actions/hrStaffAction';

const INITIAL_STATE={
                    currentStaffs:[],
                    staff:{},
                    staffSalaries:[],
                    staffExpences:[],
                    staffOffData:[],
                    items:[],
                    statuses:[],
                    meta:{
                        totalRows:0,
                        perPage:0,
                        page:0
                    }

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case HR_STAFF_CURRENT_STAFFS:
            return {...state,currentStaffs:action.items,meta:action.meta};

        case HR_STAFF_SINGLE_STAFF:
            return {...state,staff:action.payload};

        case HR_STAFF_FETCH_STAFF_SALARIES:
            return {...state,staffSalaries:action.payload};

        case HR_STAFF_FETCH_STAFF_EXPENCES:
            return {...state,staffExpences:action.payload};

        case HR_STAFF_CLEAR_STATE:
            return {...state,doneItems:[],movedItems:[],newItems:[],usedItems:[] };

        default:
            return state;
    }
}


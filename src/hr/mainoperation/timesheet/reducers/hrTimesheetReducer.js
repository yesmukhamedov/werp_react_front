import {
    HR_TIMESHEET_FETCH_ITEMS
} from '../actions/hrTimesheetAction';

const INITIAL_STATE={
                    items:[]

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case HR_TIMESHEET_FETCH_ITEMS:
            return {...state,items:action.payload};

        default:
            return state;
    }
}


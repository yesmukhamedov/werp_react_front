import {LOG_WERKS_REQUEST_LIST_FETCHED} from '../actions/logisticsActionTypes';

const INITIAL_STATE={
    werksRequests: []
};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case LOG_WERKS_REQUEST_LIST_FETCHED:
            return {...state,werksRequests:action.payload}

        default:
            return state;
    }
}


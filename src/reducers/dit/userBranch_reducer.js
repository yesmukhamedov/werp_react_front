import { FETCH_USERS, FIND_USERS } from '../../actions/dit/userBranch_action';
const INITIAL_STATE={ allUsers: [], foundUsers:[], selectedUser:null, userBranches: [], userSearchTerm: null};

export default function (state=INITIAL_STATE, action)
{
    // console.log("in the reducer");
    // console.log(action);
    switch(action.type)
    {
        case FETCH_USERS:
            return {...state,allUsers:action.payload.data,foundUsers:action.payload.data};
        case FIND_USERS:
            return {...state,foundUsers:action.payload.data};    
        default:
            return state;
    }
}
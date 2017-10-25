import { FETCH_USERS, FIND_USERS, FETCH_USER_BRANCHES, MARK_BRANCH, EDIT_USER_BRANCHES, ERROR, FETCH_USER_BRANCH_CUSTOMERS } from '../actions/userBranch_action';
const INITIAL_STATE={ allUsers: [], foundUsers:[], userBranchList: [],userBranchCustomerList: [],error:""};

export default function (state=INITIAL_STATE, action)
{
    // console.log("in the reducer");
    // console.log(action);
    switch(action.type)
    {
        case FETCH_USERS:
            return {...state,allUsers:action.payload.data,foundUsers:action.payload.data};
        case FIND_USERS:
            return {...state,foundUsers:action.payload.data,userBranchList:[]};    
        case FETCH_USER_BRANCHES:
            return {...state,userBranchList:action.payload.data};   
        case EDIT_USER_BRANCHES:
            return {...state,userBranchList:action.payload.data}; 
        case MARK_BRANCH:
            const waUserBranchList = JSON.parse(JSON.stringify(state.userBranchList));
            const index = action.payload;
            waUserBranchList[index].flagExists = !state.userBranchList[index].flagExists;
            return {...state, userBranchList: waUserBranchList};
        case FETCH_USER_BRANCH_CUSTOMERS:
            return {...state,userBranchCustomerList:action.payload.data};     
        case ERROR:
            return {...state,error:action.payload.data};
        default:
            return state;
    }
}


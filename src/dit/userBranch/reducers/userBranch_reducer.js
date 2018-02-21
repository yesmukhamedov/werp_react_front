import { FETCH_USERS, FIND_USERS, FETCH_USER_BRANCHES, MARK_BRANCH,
  EDIT_USER_BRANCHES, ERROR, FETCH_USER_BRANCH_CUSTOMERS, ADD_UBC, CHANGE_UBC, REMOVE_UBC,
  CHANGE_ACCESS_UBC, SAVE_USER_BRANCH_CUSTOMERS } from '../actions/userBranch_action'

const INITIAL_STATE = { allUsers: [], foundUsers: [], userBranchList: [], userBranchCustomerList: []}

export default function (state = INITIAL_STATE, action) {
  // console.log("in the reducer");
  // console.log(action);
  var index
  var wa_userBranchCustomerList
  var wa_ubc
  switch (action.type) {
    case FETCH_USERS:
      return {...state, allUsers: action.payload.data, foundUsers: action.payload.data}
    case FIND_USERS:
      return {...state, foundUsers: action.payload.data, userBranchList: []}
    case FETCH_USER_BRANCHES:
      return {...state, userBranchList: action.payload.data, userBranchCustomerList: []}
    case EDIT_USER_BRANCHES:
      return {...state, userBranchList: action.payload.data}
    case MARK_BRANCH:
      const waUserBranchList = JSON.parse(JSON.stringify(state.userBranchList))
      index = action.payload
      waUserBranchList[index].flagExists = !state.userBranchList[index].flagExists
      return {...state, userBranchList: waUserBranchList}
    case FETCH_USER_BRANCH_CUSTOMERS:
      return {...state, userBranchCustomerList: action.payload.data}
    case SAVE_USER_BRANCH_CUSTOMERS:
      return {...state, userBranchCustomerList: action.payload.data}

    case REMOVE_UBC:
      wa_userBranchCustomerList = JSON.parse(JSON.stringify(state.userBranchCustomerList))
      index = action.payload
      wa_userBranchCustomerList[index].remove = !state.userBranchCustomerList[index].remove
      return {...state, userBranchCustomerList: wa_userBranchCustomerList}
    case CHANGE_UBC:
      wa_userBranchCustomerList = JSON.parse(JSON.stringify(state.userBranchCustomerList))
      index = action.idx
      wa_ubc = action.ubc
      wa_userBranchCustomerList[index] = wa_ubc
      return {...state, userBranchCustomerList: wa_userBranchCustomerList}

    case ADD_UBC:
      wa_userBranchCustomerList = JSON.parse(JSON.stringify(state.userBranchCustomerList))
      var newUbc = action.payload
      wa_userBranchCustomerList.push(newUbc)
      return {...state, userBranchCustomerList: wa_userBranchCustomerList}
    case CHANGE_ACCESS_UBC:
      wa_userBranchCustomerList = JSON.parse(JSON.stringify(state.userBranchCustomerList))
      index = action.idx
      var access = action.access
      wa_userBranchCustomerList[index].ubcAccess = access
      wa_userBranchCustomerList[index].change = true
      return {...state, userBranchCustomerList: wa_userBranchCustomerList}
    case ERROR:
      return {...state, error: action.payload.data}
    default:
      return state
  }
}

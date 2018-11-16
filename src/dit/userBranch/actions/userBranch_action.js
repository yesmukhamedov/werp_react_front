import axios from 'axios'
import {ROOT_URL} from '../../../utils/constants'
import { notify } from '../../../general/notification/notification_action'

export const FETCH_USERS = 'FETCH_USERS'
export const FIND_USERS = 'FIND_USERS'
export const FETCH_USER_BRANCHES = 'FETCH_USER_BRANCHES'
export const MARK_BRANCH = 'MARK_BRANCH'
export const EDIT_USER_BRANCHES = 'EDIT_USER_BRANCHES'
export const ERROR = 'ERROR'
export const FETCH_USER_BRANCH_CUSTOMERS = 'FETCH_USER_BRANCH_CUSTOMERS'
export const SAVE_USER_BRANCH_CUSTOMERS = 'SAVE_USER_BRANCH_CUSTOMERS'
export const ADD_UBC = 'ADD_UBC'
export const CHANGE_UBC = 'CHANGE_UBC'
export const REMOVE_UBC = 'REMOVE_UBC'
export const CHANGE_ACCESS_UBC = 'CHANGE_ACCESS_UBC'

export function fetchUsers () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/dit/userBranch/FETCH_USERS`)
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response
        })
      })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'))
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')))
        }
      })
  }
}

export function findUsers (userList, userSearchTerm) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/dit/userBranch/FIND_USERS`,
      {userList, userSearchTerm}

    ).then(response => {
      dispatch({
        type: FIND_USERS,
        payload: response
      })
    })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'))
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')))
        }
      })
  }
}

export function editUserBranches (selectedUserId, userBranchList) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/dit/userBranch/EDIT_USER_BRANCHES`,
      {selectedUserId, userBranchList}

    ).then(response => {
      dispatch({
        type: EDIT_USER_BRANCHES,
        payload: response
      })
      dispatch(notify('success', 'Сохранен.', 'Успешно'))
    })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'))
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')))
        }
      })
  }
}

export function fethcUserBranches (selectedUserId) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/dit/userBranch/FETCH_USER_BRANCHES`,
      {selectedUserId}

    ).then(response => {
      dispatch({
        type: FETCH_USER_BRANCHES,
        payload: response
      })
    })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'))
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')))
        }
      })
  }
}

export function fethcUserBranchCustomers (selectedUserBranchId) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/dit/userBranch/FETCH_USER_BRANCH_CUSTOMERS`,
      {selectedUserBranchId}

    ).then(response => {
      dispatch({
        type: FETCH_USER_BRANCH_CUSTOMERS,
        payload: response
      })
    })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'))
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')))
        }
      })
  }
}
export function saveUserBranchCustomers (ubcList) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/dit/userBranch/SAVE_USER_BRANCH_CUSTOMERS`,
      {ubcList}

    ).then(response => {
      dispatch({
        type: SAVE_USER_BRANCH_CUSTOMERS,
        payload: response
      })
      dispatch(notify('success', 'Сохранен.', 'Успешно'))
    })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'))
          // dispatch(errorMessage(msg + error.response.data.message));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')))
        }
      })
  }
}

export function sendTestSms () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/dit/userBranch/testSms`, {
      headers: 
      {
          authorization: localStorage.getItem('token')
      }
  })
      .then(response => {        
        dispatch(notify('success', 'Сохранен.', 'Успешно'))
      })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'))
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')))
        }
      })
  }
}


export function markBranch (idx) {
  const obj = {
    type: MARK_BRANCH,
    payload: idx
  }
  return obj
}
export function addUbc (ubc) {
  const obj = {
    type: ADD_UBC,
    payload: ubc
  }
  return obj
}
export function removeUbc (idx) {
  const obj = {
    type: REMOVE_UBC,
    payload: idx
  }
  return obj
}
export function changeUbc (idx, ubc) {
  const obj = {
    type: CHANGE_UBC,
    ubc: ubc,
    idx: idx
  }
  return obj
}

export function changeAccessUbc (idx, access) {
  // console.log(idx,access,"action");
  const obj = {
    type: CHANGE_ACCESS_UBC,
    idx: idx,
    access: access
  }

  return obj
}

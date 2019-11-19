import { doGet, doPost, doPut } from '../../../utils/apiActions';

export const blankSubCompany = () => {
  return dispatch => doGet(`reference/blank-sub-company`);
};

export const fetchSubCompany = id => {
  return dispatch => doGet(`reference/sub-company/` + id);
};

export const createSubCompany = o => {
  return dispatch => doPost(`reference/sub-company`, o);
};

export const updateSubCompany = o => {
  return dispatch => doPut(`reference/sub-company`, o);
};

export const saveNationality = o => {
  if (o.new) {
    return dispatch => doPost(`reference/nationalities`, o);
  }
  return dispatch => doPut(`reference/nationalities`, o);
};

export const blankLeaveReason = () => {
  return dispatch => doGet(`reference/leave-reasons/blank`);
};

export const fetchLeaveReasons = params => {
  return dispatch => doGet(`reference/leave-reasons`, params);
};

export const blankDemoPrice = () => {
  return dispatch => doGet(`reference/demo-prices/blank`);
};

export const fetchDemoPrices = params => {
  return dispatch => doGet(`reference/demo-prices`, params);
};

export const fetchLeaveReason = id => {
  return dispatch => doGet(`reference/leave-reasons/` + id);
};

export const createLeaveReason = o => {
  return dispatch => doPost(`reference/leave-reasons`, o);
};

export const updateLeaveReason = o => {
  return dispatch => doPut(`reference/leave-reasons`, o);
};

export const fetchDemoPrice = id => {
  return dispatch => doGet(`reference/demo-prices/` + id);
};

export const createDemoPrice = o => {
  return dispatch => doPost(`reference/demo-prices`, o);
};

export const updateDemoPrice = o => {
  return dispatch => doPut(`reference/demo-prices`, o);
};

export const blankStaffProblem = () => {
  return dispatch => doGet(`reference/staff-problems/blank`);
};

export const fetchStaffProblems = params => {
  return dispatch => doGet(`reference/staff-problems`, params);
};

export const fetchStaffProblem = id => {
  return dispatch => doGet(`reference/staff-problems/` + id);
};

export const createStaffProblem = o => {
  return dispatch => doPost(`reference/staff-problems`, o);
};

export const updateStaffProblem = o => {
  return dispatch => doPut(`reference/staff-problems`, o);
};

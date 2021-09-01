import { doGet, doPost, doPut } from '../../../utils/apiActions';

export const blankSubCompany = () => {
    return dispatch => doGet(`core/reference/blank-sub-company`);
};

export const fetchSubCompany = id => {
    return dispatch => doGet(`core/reference/sub-company/` + id);
};

export const createSubCompany = o => {
    return dispatch => doPost(`core/reference/sub-company`, o);
};

export const updateSubCompany = o => {
    return dispatch => doPut(`core/reference/sub-company`, o);
};

export const saveNationality = o => {
    if (o.new) {
        return dispatch => doPost(`core/reference/nationalities`, o);
    }
    return dispatch => doPut(`core/reference/nationalities`, o);
};

export const blankLeaveReason = () => {
    return dispatch => doGet(`core/reference/leave-reasons/blank`);
};

export const fetchLeaveReasons = params => {
    return dispatch => doGet(`core/reference/leave-reasons`, params);
};

export const blankDemoPrice = () => {
    return dispatch => doGet(`core/reference/demo-prices/blank`);
};

export const fetchDemoPrices = params => {
    return dispatch => doGet(`core/reference/demo-prices`, params);
};

export const fetchLeaveReason = id => {
    return dispatch => doGet(`core/reference/leave-reasons/` + id);
};

export const createLeaveReason = o => {
    return dispatch => doPost(`core/reference/leave-reasons`, o);
};

export const updateLeaveReason = o => {
    return dispatch => doPut(`core/reference/leave-reasons`, o);
};

export const fetchDemoPrice = id => {
    return dispatch => doGet(`core/reference/demo-prices/` + id);
};

export const createDemoPrice = o => {
    return dispatch => doPost(`core/reference/demo-prices`, o);
};

export const updateDemoPrice = o => {
    return dispatch => doPut(`core/reference/demo-prices`, o);
};

export const blankStaffProblem = () => {
    return dispatch => doGet(`core/reference/staff-problems/blank`);
};

export const fetchStaffProblems = params => {
    return dispatch => doGet(`core/reference/staff-problems`, params);
};

export const fetchStaffProblem = id => {
    return dispatch => doGet(`core/reference/staff-problems/` + id);
};

export const createStaffProblem = o => {
    return dispatch => doPost(`core/reference/staff-problems`, o);
};

export const updateStaffProblem = o => {
    return dispatch => doPut(`core/reference/staff-problems`, o);
};

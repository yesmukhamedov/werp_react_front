import { modifyLoader } from '../../../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../../../general/notification/notification_action';
import browserHistory from '../../../../utils/history';
import {
  getStaffDataPostUri,
  getStaffDataFetchUri,
  getStaffDataBlankUri,
} from '../../../hrUtil';
import { doGet, doPost, doPut, doDelete } from '../../../../utils/apiActions';

export const HR_STAFF_CURRENT_STAFFS = 'HR_STAFF_CURRENT_STAFFS';
export const HR_STAFF_SINGLE_STAFF = 'HR_STAFF_SINGLE_STAFF';
export const HR_STAFF_ALL_CURRENT_STAFFS = 'HR_STAFF_ALL_CURRENT_STAFFS';
export const HR_STAFF_ALL_STAFFS = 'HR_STAFF_ALL_STAFFS';
export const HR_STAFF_FETCH_BLANK = 'HR_STAFF_FETCH_BLANK';

export const HR_STAFF_FETCH_STAFF_SALARIES = 'HR_STAFF_FETCH_STAFF_SALARIES';
export const HR_STAFF_FETCH_STAFF_EXPENCES = 'HR_STAFF_FETCH_STAFF_EXPENCES';
export const HR_STAFF_FETCH_STAFF_OFF_DATA = 'HR_STAFF_FETCH_STAFF_OFF_DATA';

export const HR_STAFF_LIST_MODAL_OPENED = 'HR_STAFF_LIST_MODAL_OPENED';

export const HR_STAFF_CLEAR_STATE = 'HR_STAFF_CLEAR_STATE';

export const HR_SALARY_FORM_MODAL_OPENED = 'HR_SALARY_FORM_MODAL_OPENED';
export const HR_SALARY_CREATED = 'HR_SALARY_CREATED';
export const HR_SALARY_UPDATED = 'HR_SALARY_UPDATED';

export const HR_PYRAMID_FETCH_BRANCH_PYRAMIDS =
  'HR_PYRAMID_FETCH_BRANCH_PYRAMIDS';

export const HR_PYRAMID_FETCH_PYRAMIDS = 'HR_PYRAMID_FETCH_PYRAMIDS';

export const HR_SET_SALARY_FOR_UPDATE = 'HR_SET_SALARY_FOR_UPDATE';

export const HR_STAFF_DATA_BLANKED = 'HR_STAFF_DATA_BLANKED';
export const HR_STAFF_DATA_CREATED = 'HR_STAFF_DATA_CREATED';
export const HR_STAFF_DATA_UPDATED = 'HR_STAFF_DATA_UPDATED';
export const HR_STAFF_DATA_DELETED = 'HR_STAFF_DATA_DELETED';
export const HR_STAFF_DATA_FETCHED_LIST = 'HR_STAFF_DATA_FETCHED_LIST';
export const HR_STAFF_SET_STAFF_DATA_FOR_UPDATE =
  'HR_STAFF_SET_STAFF_DATA_FOR_UPDATE';

export const HR_STAFF_DATA_FORM_MODAL_FLAG = 'HR_STAFF_DATA_FORM_MODAL_FLAG';

export const HR_STAFF_FETCH_MANAGERS = 'HR_STAFF_FETCH_MANAGERS';
export const HR_STAFF_FETCH_DIRECTORS = 'HR_STAFF_FETCH_DIRECTORS';
export const HR_STAFF_FILE_UPLOADED = 'HR_STAFF_FILE_UPLOADED';
export const HR_STAFF_FILE_DELETED = 'HR_STAFF_FILE_DELETED';
export const HR_STAFF_MARITAL_STATUSES = 'HR_STAFF_MARITAL_STATUSES';
export const HR_STAFF_MARITAL_STATUS_OPTIONS =
  'HR_STAFF_MARITAL_STATUS_OPTIONS';

export const HR_EXIT_INTERVIEWS = 'HR_EXIT_INTERVIEWS';

export function fetchCurrentStaffs(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_CURRENT_STAFFS,
          items: data.items,
          meta: data.meta,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchExitInterviews(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('hr/exit-interviews', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_EXIT_INTERVIEWS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function blankExitInterview(staffId) {
  return dispatch => doGet(`hr/exit-interviews/blank/` + staffId);
}

export function fetchAllCurrentStaffs(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/current-all`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_ALL_CURRENT_STAFFS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

// Только сотрудники, без должностей
export function fetchAllStaffs() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/all`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_ALL_STAFFS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function saveStaff(staff) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    const uri = 'hr/staff';
    let prom = staff.new ? doPost(uri, staff) : doPut(uri, staff);
    prom
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        browserHistory.push(`/hr/staff/view/${data.id}`);
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      });
  };
}

export function saveExitInterview(model) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    const uri = 'hr/exit-interviews';
    let prom = model.new ? doPost(uri, model) : doPut(uri, model);
    prom
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        //browserHistory.push(`/hr/exitinterviews/view/${data.id}`);
        browserHistory.push(`/hr/exitinterviews`);
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      });
  };
}

export function fetchSingleStaff(staffId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/${staffId}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_SINGLE_STAFF,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchBlankStaff() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/blank`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_FETCH_BLANK,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchBranchPyramids(branchId) {
  return function(dispatch) {
    doGet(`hr/pyramid/tree/by-branch/${branchId}`)
      .then(({ data }) => {
        dispatch({
          type: HR_PYRAMID_FETCH_BRANCH_PYRAMIDS,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function toggleStaffListModal(flag) {
  return {
    type: HR_STAFF_LIST_MODAL_OPENED,
    payload: flag,
  };
}

export function toggleSalaryFormModal(flag) {
  return {
    type: HR_SALARY_FORM_MODAL_OPENED,
    payload: flag,
  };
}

export function toggleStaffDataFormModal(flag) {
  return {
    type: HR_STAFF_DATA_FORM_MODAL_FLAG,
    payload: flag,
  };
}

export function blankStaffData(staffId, activeData) {
  const uri = `${getStaffDataBlankUri(activeData)}${staffId}`;

  return function(dispatch) {
    doGet(uri)
      .then(({ data }) => {
        dispatch({
          type: HR_STAFF_DATA_BLANKED,
          payload: data,
        });
      })
      .catch(error => {
        console.log('error', error);
        handleError(error, dispatch);
      });
  };
}

export function createStaffData(postData, activeData) {
  const uri = `${getStaffDataPostUri(activeData)}`;
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(uri, postData)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_DATA_CREATED,
          payload: data,
          activeData,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updateStaffData(postData, activeData) {
  const uri = `${getStaffDataPostUri(activeData)}/${postData.id}`;
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(uri, postData)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_DATA_UPDATED,
          payload: data,
          activeData,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function deleteStaffData(id, activeData) {
  const uri = `${getStaffDataPostUri(activeData)}/${id}`;
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doDelete(uri)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_STAFF_DATA_DELETED,
          payload: data,
          activeData,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchStaffData(staffId, activeData) {
  const uri = `${getStaffDataFetchUri(activeData, staffId)}`;
  return function(dispatch) {
    doGet(uri)
      .then(({ data }) => {
        dispatch({
          type: HR_STAFF_DATA_FETCHED_LIST,
          payload: data,
          activeData,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function downloadFile(fileId) {
  return function(dispatch) {
    doPost(`hr/file/download/'}${fileId}`, {})
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function deleteFile(staffId, fileId) {
  return function(dispatch) {
    doDelete(`hr/file/'}${staffId}/${fileId}`)
      .then(({ data }) => {
        dispatch({
          type: HR_STAFF_FILE_DELETED,
          payload: fileId,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function addUploadedFile(file) {
  return {
    type: HR_STAFF_FILE_UPLOADED,
    payload: file,
  };
}

export function fetchAllManagers() {
  return function(dispatch) {
    doGet(`hr/salary/managers`)
      .then(({ data }) => {
        dispatch({
          type: HR_STAFF_FETCH_MANAGERS,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchAllDirectors() {
  return function(dispatch) {
    doGet(`hr/salary/directors`)
      .then(({ data }) => {
        dispatch({
          type: HR_STAFF_FETCH_DIRECTORS,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function setStaffDataForUpdate(data) {
  return {
    type: HR_STAFF_SET_STAFF_DATA_FOR_UPDATE,
    payload: data,
  };
}

export function blankStaffExperience() {
  return dispatch => doGet(`hr/staff/blank-experience`);
}

export function fetchMaritalStatuses() {
  return function(dispatch) {
    doGet(`hr/staff/marital-statuses`)
      .then(({ data }) => {
        dispatch({
          type: HR_STAFF_MARITAL_STATUSES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchMaritalStatusOptions() {
  return function(dispatch) {
    doGet(`hr/staff/marital-statuses?dto-type=options`)
      .then(({ data }) => {
        dispatch({
          type: HR_STAFF_MARITAL_STATUS_OPTIONS,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

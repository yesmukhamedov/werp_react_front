import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../../../../../utils/constants';
import { notify } from '../../../../../general/notification/notification_action';

export const DEPT_TASK_LIST_DIRECTORIES = 'dept_task_list_directories';
export const CLEAR_DEPT_TASK_LIST = 'clear_dept_task_list';
export const FOUND_DEPT_TASKS = 'found_dept_tasks';
export const EDIT_TASK_RECIPIENT = 'edit_task_recipient';

export function searchTasks(params, resolve) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/dtskl/tasks?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: FOUND_DEPT_TASKS,
          payload: data,
        });
        resolve();
      })
      .catch((error) => {
        console.log('ERROR in DEPT task list search', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка...'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', response, 'Ошибка')));
        }
        resolve();
      });
  };
}

export function clearDeptTaskListStore() {
  return (dispatch) => {
    dispatch({ type: DEPT_TASK_LIST_DIRECTORIES });
  };
}

export function getDeptTaskListDirectoriesOld(lang) {
  return (dispatch) => {
    const directories = {
      departmentOptions: [
        { key: 1, value: 1, text: 'First dept' },
        { key: 2, value: 2, text: 'Second dept' },
        { key: 3, value: 3, text: 'Third dept' },
      ],
      typeOptions: [
        { key: 1, value: 1, text: 'First type' },
        { key: 2, value: 2, text: 'Second type' },
        { key: 3, value: 3, text: 'Third type' },
      ],
    };
    setTimeout(function(){
      dispatch({
        type: DEPT_TASK_LIST_DIRECTORIES,
        payload: directories,
      });
    }, 1000);
  };
}

function getTaskDirectory(name) {
  return axios.get(`${ROOT_URL}/api/tasks/${name}`, {
    headers: { authorization: localStorage.getItem('token') },
  });
}

function getRefDirectory(name) {
  return axios.get(`${ROOT_URL}/api/reference/${name}`, {
    headers: { authorization: localStorage.getItem('token') },
  });
}

export function getDeptTaskListDirectories(lang) {
  return (dispatch) => {
    axios.all([getTaskDirectory('types'), getRefDirectory('departments')])
      .then(axios.spread((
        { data: typeList }, { data: deptList },
      ) => {
        const typeOpts = typeList.map(item => ({
          key: item.code,
          value: item.code,
          text: item[lang],
        }));
        const deptOpts = deptList.map(item => ({
          key: item.dep_id,
          value: item.dep_id,
          text: (lang === 'ru') ? item.name_ru : (lang === 'en' ? item.name_en : item.name_tr),
        }));
        const directories = {
          typeOptions: _.mapKeys(typeOpts, 'key'),
          deptOptions: _.mapKeys(deptOpts, 'key'),
        };
        dispatch({
          type: DEPT_TASK_LIST_DIRECTORIES,
          payload: directories,
        });
      }))
      .catch((error) => {
        console.log('Error in department task list directories', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', response, 'Ошибка')));
        }
      });
  };
}

export function editRecipient(taskId) {
  const r = {
    id: taskId,
  };
  console.log(r);
  // return (dispatch) => {
  //   axios.put(
  //     `${ROOT_URL}/api/call-center/out-calls/operator/${contractNumber}`,
  //     { operator: o },
  //     { headers: { authorization: localStorage.getItem('token') } },
  //   ).then(({ data }) => {
  //     dispatch({
  //       type: EDIT_TASK_RECIPIENT,
  //       payload: data,
  //     });
  //   })
  //     .catch((error) => {
  //       console.log('ERROR in operator edit', error);
  //       if (error.response) {
  //         dispatch(notify('error', error.response.data.message, 'Ошибка'));
  //       } else {
  //         Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
  //       }
  //     });
  // };
}

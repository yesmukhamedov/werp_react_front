import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../../../../../utils/constants';
import { notify } from '../../../../../general/notification/notification_action';

export const MONITOR_TASK_LIST_DIRECTORIES = 'monitor_task_list_directories';
export const CLEAR_MONITOR_TASK_LIST = 'clear_monitor_task_list';
export const FOUND_MONITOR_TASKS = 'found_monitor_tasks';

export function searchTasks(params, resolve) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/tasks/monitor?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: FOUND_MONITOR_TASKS,
          payload: data,
        });
        resolve();
      })
      .catch((error) => {
        console.log('ERROR in general task list search', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', response, 'Ошибка')));
        }
      });
  };
}

export function clearTaskMonitorStore() {
  return (dispatch) => {
    dispatch({ type: CLEAR_MONITOR_TASK_LIST });
  };
}

export function getTaskMonitorDirectoriesOld(lang) {
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
        type: MONITOR_TASK_LIST_DIRECTORIES,
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

export function getTaskMonitorDirectories(lang) {
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
          type: MONITOR_TASK_LIST_DIRECTORIES,
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

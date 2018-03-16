/* jshint esversion: 6 */
import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';

export const TASK_LIST_DIRECTORIES = 'task_list_directories';
export const CLEAR_TASK_LIST_STORE = 'clear_task_list_store';
export const FOUND_TASKS = 'found_tasks';

// function getDirectory(name) {
//   return axios.get(`${ROOT_URL}/api/reference/${name}`, {
//     headers: { authorization: localStorage.getItem('token') },
//   });
// }

export function getDirectories() {
  return (dispatch) => {
    const directories = {
      statusOptions: [{ key: 1, value: 1, text: 'Status1' },
        { key: 2, value: 2, text: 'Status2' },
        { key: 3, value: 3, text: 'Status3' }],
      priorityOptions: [{ key: 1, value: 1, text: 'Priority1' },
        { key: 2, value: 2, text: 'Priority2' },
        { key: 3, value: 3, text: 'Priority3' }],
    };
    dispatch({
      type: TASK_LIST_DIRECTORIES,
      payload: directories,
    });
    // axios.all([getDirectory('countries'), getDirectory('companies')])
    //   .then(axios.spread(({ data: countryList }, { data: companyList }) => {
    //     const newCompanyOptions = companyList.map(item => ({
    //       key: item.id,
    //       value: item.id,
    //       text: item.name,
    //     }));
    //     const directories = {
    //       companyOptions: newCompanyOptions,
    //       operatorOptions: [{ key: 0, value: 0, text: 'Nagima' },
    //       { key: 1, value: 1, text: 'Raushan' },
    //       { key: 2, value: 2, text: 'Assel' }],
    //       branchOptions: [{ key: 1, value: 1, text: 'Branch1' },
    //       { key: 2, value: 2, text: 'Branch2' },
    //       { key: 3, value: 3, text: 'Branch3' }],
    //       stateOptions: [{ key: 1, value: 1, text: 'State1' },
    //       { key: 2, value: 2, text: 'State2' },
    //       { key: 3, value: 3, text: 'State3' }],
    //       // result: makeData();
    //     };
    //     dispatch({
    //       type: CONTRACT_LIST_DIRECTORIES,
    //       payload: directories,
    //     });
    //   }))
    //   .catch((err) => {
    //     console.log('Error in ContractListPage', err);
    //   });
  };
}

export function clearTaskListStore() {
  return (dispatch) => {
    dispatch({ type: CLEAR_TASK_LIST_STORE });
  };
}

export function searchTasks(params) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/tasks?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        // console.log(data);
        dispatch({
          type: FOUND_TASKS,
          payload: data,
        });
      })
      .catch(err => console.log('ERROR in task list search', err));
  };
}

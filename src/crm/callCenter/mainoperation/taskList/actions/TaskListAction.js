/* jshint esversion: 6 */
import axios from 'axios';
import _ from 'lodash';
import { notify } from '../../../../../general/notification/notification_action';
import { doGet } from '../../../../../utils/apiActions';

export const TASK_LIST_DIRECTORIES = 'TASK_LIST_DIRECTORIES';
export const CLEAR_TASK_LIST_STORE = 'clear_task_list_store';
export const FOUND_TASKS = 'found_tasks';

function getTaskDirectory(name) {
    return doGet(`core/tasks/${name}`);
}

function getRefDirectory(name) {
    return doGet(`core/reference/${name}`);
}

function getPositions() {
    return doGet(`core/call-center/out-calls/positions`);
}

export function getTaskDirectories(lang) {
    return dispatch => {
        axios
            .all([
                getTaskDirectory('status'),
                getTaskDirectory('priorities'),
                getRefDirectory('branches/all'),
                getRefDirectory('departments'),
                getPositions(),
            ])
            .then(
                axios.spread(
                    (
                        { data: statusList },
                        { data: priorityList },
                        { data: branchList },
                        { data: deptList },
                        { data: positionList },
                    ) => {
                        const statusOpts = statusList.map(item => ({
                            key: item.id,
                            value: item.id,
                            text: item[lang],
                        }));
                        const priorityOpts = priorityList.map(item => ({
                            key: item.id,
                            value: item.id,
                            text: item[lang],
                        }));
                        const branchOpts = branchList.map(item => ({
                            key: item.branch_id,
                            value: item.branch_id,
                            text: item.text45,
                            bukrs: item.bukrs,
                        }));
                        const deptOpts = deptList.map(item => ({
                            key: item.dep_id,
                            value: item.dep_id,
                            text:
                                lang === 'ru'
                                    ? item.name_ru
                                    : lang === 'en'
                                    ? item.name_en
                                    : item.name_tr,
                        }));
                        const positionOpts = positionList.map(item => ({
                            key: item.position_id,
                            value: item.position_id,
                            text: item.text,
                        }));
                        const directories = {
                            statusOptions: _.mapKeys(statusOpts, 'key'),
                            priorityOptions: _.mapKeys(priorityOpts, 'key'),
                            branchOptions: _.mapKeys(branchOpts, 'key'),
                            deptOptions: _.mapKeys(deptOpts, 'key'),
                            posOptions: _.mapKeys(positionOpts, 'key'),
                        };
                        dispatch({
                            type: TASK_LIST_DIRECTORIES,
                            payload: directories,
                        });
                    },
                ),
            )
            .catch(error => {
                console.log('Error in task list directories', error);
                if (error.response) {
                    dispatch(
                        notify('error', error.response.data.message, 'Ошибка'),
                    );
                } else {
                    Promise.resolve({ error }).then(response =>
                        dispatch(
                            notify(
                                'error',
                                error.response.data.message,
                                'Ошибка',
                            ),
                        ),
                    );
                }
            });
    };
}

export function clearTaskListStore() {
    return dispatch => {
        dispatch({ type: CLEAR_TASK_LIST_STORE });
    };
}

export function searchTasks(params, resolve) {
    return dispatch => {
        doGet(`core/tasks?${params}`)
            .then(({ data }) => {
                // console.log(data);
                dispatch({
                    type: FOUND_TASKS,
                    payload: data,
                });
                resolve();
            })
            .catch(error => {
                console.log('ERROR in task list search', error);
                if (error.response) {
                    dispatch(
                        notify('error', error.response.data.message, 'Ошибка'),
                    );
                } else {
                    Promise.resolve({ error }).then(response =>
                        dispatch(
                            notify(
                                'error',
                                error.response.data.message,
                                'Ошибка',
                            ),
                        ),
                    );
                }
            });
    };
}

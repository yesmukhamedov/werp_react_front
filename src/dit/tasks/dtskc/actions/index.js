import axios from 'axios';
import { doGet } from '../../../../utils/apiActions';
import _ from 'lodash';
import { constructFullName } from '../../../../utils/helpers';
import { notify } from '../../../../general/notification/notification_action';
import {
    DTSKC_FETCH_REFERENCES,
    DTSKC_FETCH_ASSIGNEES,
    DTSKC_ASSIGNEE_MODAL_TOGGLE,
    DTSKC_ADD_ASSIGNEE_GROUP,
    DTSKC_ADD_ASSIGNEE_PERSON,
    DTSKC_REMOVE_ASSIGNEE_GROUP,
    DTSKC_REMOVE_ASSIGNEE_PERSON,
    CLEAR_TRANSACTION,
} from './actionTypes';
import api from './api';

const statusUrl = `core/tasks/status`;
const departmentsUrl = `core/reference/departments`;
const assigneesUrl = `core/users?active=true`;
const taskTypesUrl = `core/tasks/types`;
const managersUrl = `core/task-admins/all?ref=ext`;
const groupsUrl = `core/messgr?ref=ext`;

export function fetchUsers(args) {
    const { branchId, bukrs } = args;
    return dispatch => {
        doGet(`${assigneesUrl}&branchId=${branchId}&bukrs=${bukrs}`)
            .then(({ data }) => {
                const assigneesOpts = data.users.map(item => ({
                    key: item.id,
                    value: item.id,
                    text: constructFullName(item),
                }));

                dispatch({
                    type: DTSKC_FETCH_ASSIGNEES,
                    payload: { ...assigneesOpts },
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch(
                        notify('error', error.response.data.message, 'Ошибка'),
                    );
                }
            });
    };
}

export function fetchReferences(lang) {
    return dispatch => {
        axios
            .all([
                doGet(departmentsUrl),
                doGet(statusUrl),
                doGet(taskTypesUrl),
                doGet(managersUrl),
                doGet(groupsUrl),
            ])
            .then(
                axios.spread(
                    (
                        { data: deptList },
                        { data: statusList },
                        { data: taskTypeList },
                        { data: managersList },
                        { data: groupList },
                    ) => {
                        const deptOpts = deptList.map(item => ({
                            key: item.dep_id,
                            value: {
                                depId: item.dep_id,
                                id: item.id,
                                ru: item.name_ru,
                                en: item.name_en,
                                tr: item.name_tr,
                            },
                            text:
                                lang === 'ru'
                                    ? item.name_ru
                                    : lang === 'en'
                                    ? item.name_en
                                    : item.name_tr,
                        }));

                        const statusOpts = statusList.map(item => ({
                            key: item.id,
                            value: item.id,
                            text: item[lang],
                        }));

                        const taskTypeOpts = taskTypeList.map(item => ({
                            key: item.code,
                            value: item.code,
                            text:
                                lang === 'ru'
                                    ? item.ru
                                    : lang === 'en'
                                    ? item.en
                                    : item.tr,
                        }));

                        const managerOpts = managersList.map(
                            ({ id, department, user }) => ({
                                key: id,
                                departmentId: department.id,
                                value: user,
                                text: `${constructFullName(user)} - ${
                                    department[lang]
                                }`,
                            }),
                        );

                        const groupOpts = groupList.map(
                            ({ groupId, groupName }) => ({
                                key: groupId,
                                value: groupId,
                                text: groupName,
                            }),
                        );

                        const directories = {
                            deptOptions: _.mapKeys(deptOpts, 'key'),
                            statusOptions: _.mapKeys(statusOpts, 'key'),
                            taskTypeOptions: _.mapKeys(taskTypeOpts, 'key'),
                            managerOptions: _.mapKeys(managerOpts, 'key'),
                            groupOptions: _.mapKeys(groupOpts, 'key'),
                        };

                        dispatch({
                            type: DTSKC_FETCH_REFERENCES,
                            payload: directories,
                        });
                    },
                ),
            )
            .catch(error => {
                if (error.response) {
                    dispatch(
                        notify('error', error.response.data.message, 'Ошибка'),
                    );
                    console.log(error.response, 'Ошибка');

                    // } else {
                    //   Promise.resolve({ error })
                    //     .then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
                }
            });
    };
}

export const createTask = newTask => dispatch =>
    api.task
        .create(newTask)
        .then(data => {
            dispatch(notify('success', 'Задача успешно создана.', 'Успешно'));
            return data;
        })
        .catch(error => {
            dispatch(notify('error', error.response.data.message, 'Ошибка'));
            return new Promise((res, rej) => rej(error));
        });

export function toggleAssigneeModal() {
    return {
        type: DTSKC_ASSIGNEE_MODAL_TOGGLE,
    };
}

export const addAssigneeGroup = group => ({
    type: DTSKC_ADD_ASSIGNEE_GROUP,
    payload: group,
});

export const addAssigneePerson = person => ({
    type: DTSKC_ADD_ASSIGNEE_PERSON,
    payload: person,
});

export const removeAssigneeGroup = id => ({
    type: DTSKC_REMOVE_ASSIGNEE_GROUP,
    payload: id,
});

export const removeAssigneePerson = id => ({
    type: DTSKC_REMOVE_ASSIGNEE_PERSON,
    payload: id,
});

export const clearTransaction = () => ({
    type: CLEAR_TRANSACTION,
});

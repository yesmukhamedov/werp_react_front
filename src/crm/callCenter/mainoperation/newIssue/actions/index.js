import {
    FETCH_CONTRACT_DETAILS,
    CREATE_NEW_TASK,
    FETCH_TASKS,
    OUTCALL_STATUS_COMMENT_UPDATED,
    CREATE_OUTCALL,
} from './actionTypes';
import { notify } from '../../../../../general/notification/notification_action';
import { doGet, doPut, doPost } from '../../../../../utils/apiActions';

export function fetchContractById(contractNumber) {
    const req = doGet(`core/call-center/out-calls/${contractNumber}`);
    return dispatch => {
        req.then(({ data }) => {
            dispatch({
                type: FETCH_CONTRACT_DETAILS,
                payload: data,
            });
        }).catch(({ response = {} }) => {
            const { status } = response;
            if (status === 403) {
                dispatch(
                    notify(
                        'error',
                        `Не удалось получить детали контракта! Нет доступа. ${response}`,
                        'Ошибка',
                    ),
                );
            } else {
                dispatch(
                    notify(
                        'error',
                        `Не удалось получить детали контракта! ${response}`,
                        'Ошибка',
                    ),
                );
            }
        });
    };
}

export function createOutCallFromContract({ contractNumber }) {
    const req = doPost(`core/call-center/out-calls/${contractNumber}`, {});
    return dispatch => {
        req.then(({ data }) => {
            dispatch({
                type: CREATE_OUTCALL,
                payload: data,
            });
            dispatch(notify('success', 'Заявка успешно привязана.', 'Успешно'));
        }).catch(({ response = {} }) => {
            const { status } = response;
            if (status === 403) {
                dispatch(
                    notify(
                        'error',
                        `Не удалось привязать заявку! Нет доступа. ${response}`,
                        'Ошибка',
                    ),
                );
            } else {
                dispatch(
                    notify(
                        'error',
                        `Не удалось привязать заявку! ${response}`,
                        'Ошибка',
                    ),
                );
            }
        });
    };
}

export function createNewTask(contractNumber, params) {
    const req = doPost(`core/call-center/out-calls/${contractNumber}/tasks`, {
        title: params.title,
        description: params.description,
        status: {
            id: params.status,
        },
        priority: {
            id: params.priority,
        },
        recipient: {
            branch: {
                id: params.branch,
            },
            department: {
                id: params.department,
            },
            position: {
                id: params.position,
            },
        },
    });
    return dispatch => {
        req.then(({ data }) => {
            dispatch({
                type: CREATE_NEW_TASK,
                payload: data,
            });
            dispatch(notify('success', 'Задача успешно создана.', 'Успешно'));
        }).catch(({ response = {} }) => {
            const { status } = response;
            if (status === 403) {
                dispatch(
                    notify(
                        'error',
                        `Не удалось создать задачу! Нет доступа. ${response}`,
                        'Ошибка',
                    ),
                );
            } else {
                dispatch(
                    notify(
                        'error',
                        `Не удалось создать задачу! ${response}`,
                        'Ошибка',
                    ),
                );
            }
        });
    };
}

export function fetchTasks(contractNumber) {
    const req = doGet(`core/call-center/out-calls/${contractNumber}/tasks`);
    return dispatch => {
        req.then(({ data }) => {
            dispatch({
                type: FETCH_TASKS,
                payload: data,
            });
        }).catch(({ response = {} }) => {
            const { status } = response;
            if (status === 403) {
                dispatch(
                    notify(
                        'error',
                        `Не удалось получть список задач! Нет доступа. ${response}`,
                        'Ошибка',
                    ),
                );
            } else {
                dispatch(
                    notify(
                        'error',
                        `Не удалось получть список задач! ${response}`,
                        'Ошибка',
                    ),
                );
            }
        });
    };
}

export function updateOutCall(newOutCallParams) {
    const req = doPut(`core/call-center/out-calls/${newOutCallParams.id}`, {
        id: newOutCallParams.id,
        status: {
            id: newOutCallParams.status,
        },
        newComment: newOutCallParams.text,
    });
    return dispatch => {
        req.then(({ data }) => {
            dispatch({
                type: OUTCALL_STATUS_COMMENT_UPDATED,
                payload: data,
            });
            dispatch(notify('success', 'Заявка успешно обновлена.', 'Успешно'));
        }).catch(({ response = {} }) => {
            const { status } = response;
            if (status === 403) {
                dispatch(
                    notify(
                        'error',
                        `Не удалось обновить заявку! Нет доступа. ${response}`,
                        'Ошибка',
                    ),
                );
            } else {
                dispatch(
                    notify(
                        'error',
                        `Не удалось обновить заявку! ${response}`,
                        'Ошибка',
                    ),
                );
            }
        });
    };
}

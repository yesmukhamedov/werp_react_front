import { clearUserAuth, signoutUser } from '../../actions/auth';
import { resetLocalStorage } from '../../utils/helpers';
import browserHistory from '../../utils/history';
// import { address } from 'faker';

export const NOTIFY = 'NOTIFY';

export function notify(a_notify_type, a_notify_text, a_notify_header) {
    const obj = {
        type: NOTIFY,
        notifyType: a_notify_type,
        notifyText: a_notify_text,
        notifyHeader: a_notify_header,
    };
    return obj;
}

export function handleError(error, dispatch) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');

    if (error.response) {
        // Status 403: Запрещено
        let message =
            error.response.data.message || error.response.data.messages;
        if (error.response.status && error.response.status === 403) {
            dispatch(notify('error', message, errorTable[`132${language}`]));
        }
        // Status 500: Внутренняя ошибка сервера
        else if (error.response.status && error.response.status === 500) {
            let message =
                error.response.data.message || error.response.data.messages;
            dispatch(notify('error', message, 'Внутренняя ошибка сервера!'));
        }
        // Status 400: Плохой запрос
        else if (error.response.status && error.response.status === 400) {
            let message =
                error.response.data.message || error.response.data.messages;
            if (message) {
                dispatch(notify('error', message, 'Плохой запрос!'));
            } else {
                dispatch(notify('error', 'Плохой запрос.', 'Плохой запрос!'));
            }
        }
        // Status 404: Не найден
        else if (error.response.status && error.response.status === 404) {
            let message =
                error.response.data.message || error.response.data.messages;
            if (message) {
                dispatch(notify('error', message, 'Не найден!'));
            } else {
                dispatch(
                    notify(
                        'error',
                        'Сервер не может найти запрашиваемый ресурс.',
                        'Не найден!',
                    ),
                );
            }
        }
        // Status 406: Не найден
        else if (error.response.status && error.response.status === 406) {
            let message =
                error.response.data.message || error.response.data.messages;
            if (message) {
                dispatch(notify('error', message, 'Недопустимо!'));
            } else {
                dispatch(
                    notify('error', '406 Not Acceptable!', 'Недопустимо!'),
                );
            }
        }
        // Status 401: Неавторизованно
        else if (error.response.status && error.response.status === 401) {
            let message =
                error.response.data.message || error.response.data.messages;
            if (message) {
                signoutUser();
                browserHistory.push('/');
                dispatch(notify('error', message, 'Неавторизованно!'));
            } else {
                resetLocalStorage();
                signoutUser();
                browserHistory.push('/');
                dispatch(
                    notify(
                        'error',
                        'Для получения запрашиваемого ответа нужна аутентификация.',
                        'Неавторизованно!',
                    ),
                );
            }
        }
    } else {
        // const name = getNestedObject(error, ['error', 'response']);

        const get = function(obj, key) {
            return key
                .split('.')
                .reduce(
                    (o, x) =>
                        typeof o === 'undefined' || o === null ? o : o[x],
                    obj,
                );
        };

        let message = '';
        if (get(error, 'error.response.data.message') !== undefined) {
            message = error.response.data.message;
        } else if (get(error, 'error.response.data') !== undefined) {
            message = error.response.data;
        } else if (get(error, 'error.response') !== undefined) {
            message = error.response;
        } else if (get(error, 'error') !== undefined) {
            message = error;
        } else {
            message = 'TypeError, check console ' + '(' + error.message + ')';
        }

        Promise.resolve({ error }).then(response =>
            dispatch(notify('error', message, errorTable[`132${language}`])),
        );
    }
}

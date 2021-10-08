import { modifyLoader } from '../../general/loader/loader_action';
import {
    handleError,
    notify,
} from '../../general/notification/notification_action';

import { doGet, doPost, doPut, doDelete } from '../../utils/apiActions';

export const FETCH_INBOX_MESSAGES = 'FETCH_INBOX_MESSAGES';
export const CLEAR_INBOX_MESSAGES = 'CLEAR_INBOX_MESSAGES';
export const FETCH_UNREAD_MESSAGES_COUNT = 'FETCH_UNREAD_MESSAGES_COUNT';
export const FETCH_SENT_MESSAGES = 'FETCH_SENT_MESSAGES';
export const CLEAR_SENT_MESSAGES = 'CLEAR_SENT_MESSAGES';
export const FETCH_ONE_MESSAGE = 'FETCH_ONE_MESSAGE';

// Получит входящие сообщения
export const fetchInboxMessages = () => {
    return function(dispatch) {
        // dispatch(modifyLoader(true));
        doGet(`core/mail/inbox`)
            .then(({ data }) => {
                // dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_INBOX_MESSAGES,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Очистить входящие сообщения
export const clearInboxMessages = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_INBOX_MESSAGES,
        });
    };
};

// Получить непрочитанные сообщения
export const fetchUnreadMessagesCount = () => {
    return function(dispatch) {
        doGet(`core/mail/unreads`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_UNREAD_MESSAGES_COUNT,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Получить отправленные сообщения
export const fetchSentMessages = () => {
    return function(dispatch) {
        doGet(`core/mail/sent`)
            .then(({ data }) => {
                console.log('SENT', data);
                dispatch({
                    type: FETCH_SENT_MESSAGES,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Очистить отправленные сообщения
export const clearSentMessages = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_SENT_MESSAGES,
        });
    };
};

// Пометить прочитанным
export const toggleMarkMessage = (markType, messageIds, callBackFunc) => {
    return function(dispatch) {
        doPut(
            `core/mail/markMessage?markType=${markType}&messageIds=${messageIds}`,
        )
            .then(({ data }) => {
                callBackFunc();
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
};

// Получить одно сообщение
export const fetchOneMessage = messageId => {
    return function(dispatch) {
        doGet(`core/mail/message?MessageId=${messageId}`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_ONE_MESSAGE,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

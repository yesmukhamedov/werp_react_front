import {
    FETCH_INBOX_MESSAGES,
    CLEAR_INBOX_MESSAGES,
    FETCH_UNREAD_MESSAGES_COUNT,
    FETCH_SENT_MESSAGES,
    CLEAR_SENT_MESSAGES,
    FETCH_ONE_MESSAGE,
} from './messageAction';

const INITIAL_STATE = {
    inboxMessages: [],
    unreadMessagesCount: 0,
    sentMessages: [],
    oneMessage: {},
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_INBOX_MESSAGES:
            return {
                ...state,
                inboxMessages: [...state.inboxMessages, ...action.data],
            };
        case CLEAR_INBOX_MESSAGES:
            return {
                ...state,
                inboxMessages: [],
            };
        case FETCH_UNREAD_MESSAGES_COUNT:
            return {
                ...state,
                unreadMessagesCount: action.data,
            };
        case FETCH_SENT_MESSAGES:
            return {
                ...state,
                sentMessages: [...state.sentMessages, ...action.data],
            };
        case CLEAR_SENT_MESSAGES:
            return {
                ...state,
                sentMessages: [],
            };
        case FETCH_ONE_MESSAGE:
            return {
                ...state,
                oneMessage: action.data,
            };
        default:
            return state;
    }
}

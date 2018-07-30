import { INBOX_UNREAD } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case INBOX_UNREAD:
      return { ...state, unread: action.payload };
    default:
      return state;
  }
}

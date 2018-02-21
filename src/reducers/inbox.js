import {
  INBOX_UNREAD
} from '../actions/types'

export default function (state = {}, action) {
  // eslint-disable-next-line
    switch(action.type) {
      case INBOX_UNREAD:
        return {...state, unread: action.payload}
      default:
        return state
    }
}

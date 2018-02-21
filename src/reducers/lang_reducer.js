import localeData from './../locales/data.json'
import {
  CHANGE_LANGUAGE
} from '../actions/types'

export default function (state = {lang: 'en'}, action) {
  // Try full locale, fallback to locale without region code, fallback to en
  const messages = localeData[action.payload] || localeData.en

  // eslint-disable-next-line
    switch(action.type) {
      case CHANGE_LANGUAGE:
        return {...state, lang: action.payload, messages: messages }
    }

  return state
}

import messagesEn from './../locales/en.json';
import messagesRu from './../locales/ru.json';
import messagesTr from './../locales/tr.json';
import { CHANGE_LANGUAGE } from '../actions/types';

export default function(state = { lang: 'ru' }, action) {
  const messagesAll = {
    en: messagesEn,
    ru: messagesRu,
    tr: messagesTr,
  };

  const messages = messagesAll[action.payload] || messagesAll.en;

  // eslint-disable-next-line
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, lang: action.payload, messages };
  }

  return state;
}

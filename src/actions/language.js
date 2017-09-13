import {
    CHANGE_LANGUAGE
} from './types';

export function changeLanguage(lang) {
    return function(dispatch) {
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: lang
        });
    }
}
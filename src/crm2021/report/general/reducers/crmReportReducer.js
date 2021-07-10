import {
  CRM_REP_FETCH_META,
  CRM_REP_FETCH_ITEMS,
  CRM_REP_MODAL_TOGGLE,
  CRM_REP_UPDATE_DIRECTOR_NOTE,
  CRM_REP_CLEAR_STATE,
} from '../actions/crmReportAction';

const INITIAL_STATE = {
  meta: {},
  items: [],
  repModalOpened: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CRM_REP_FETCH_META:
      return { ...state, meta: action.payload };

    case CRM_REP_FETCH_ITEMS:
      return { ...state, items: action.payload };

    case CRM_REP_MODAL_TOGGLE:
      return { ...state, repModalOpened: action.payload };

    case CRM_REP_UPDATE_DIRECTOR_NOTE:
      const newItems = [];
      for (const k in state.items) {
        const current = state.items[k];
        if (current.id === action.id) {
          current.directorNote = action.note;
        }

        newItems.push(current);
      }
      return { ...state, items: newItems };

    case CRM_REP_CLEAR_STATE:
      return {
        ...state,
        meta: {},
        items: [],
        repModalOpened: false,
      };

    default:
      return state;
  }
}

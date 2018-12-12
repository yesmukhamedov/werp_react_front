import {
  HR_REP_FETCH_META,
  HR_REP_FETCH_ITEMS,
  HR_REP_MODAL_TOGGLE,
  HR_REP_UPDATE_DIRECTOR_NOTE,
  HR_REP_CLEAR_STATE,
} from '../actions/hrReportAction';

const INITIAL_STATE = {
  meta: {},
  items: [],
  repModalOpened: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HR_REP_FETCH_META:
      return { ...state, meta: action.payload };

    case HR_REP_FETCH_ITEMS:
      return { ...state, items: action.payload };

    case HR_REP_MODAL_TOGGLE:
      return { ...state, repModalOpened: action.payload };

    case HR_REP_UPDATE_DIRECTOR_NOTE:
      const newItems = [];
      for (const k in state.items) {
        const current = state.items[k];
        if (current.id === action.id) {
          current.directorNote = action.note;
        }

        newItems.push(current);
      }
      return { ...state, items: newItems };

    case HR_REP_CLEAR_STATE:
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

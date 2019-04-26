import { ALL_EVETNT } from './eventLogAction';

const INITIAL_STATE = {
  items: {},
  meta: {
    totalRows: 0,
    perPage: 0,
    page: 0,
  },
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_EVETNT:
      return { ...state, items: action.items, meta: action.meta };
    default:
      return state;
  }
}

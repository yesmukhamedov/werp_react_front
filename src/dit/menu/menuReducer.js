import { REF_CURRENT_MENU } from './menuAction';

const INITIAL_STATE = {
  currentMenu: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REF_CURRENT_MENU:
      return { ...state, currentMenu: action.payload };
    default:
      return state;
  }
}

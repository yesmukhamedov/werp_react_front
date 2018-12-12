import { MODIFY_LOADER } from './loader_action';

const INITIAL_STATE = { active: false };
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MODIFY_LOADER:
      return { ...state, active: action.payload };
    default:
      return state;
  }
}

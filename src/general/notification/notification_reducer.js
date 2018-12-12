import { NOTIFY } from './notification_action';
// import { NOTIFY } from '../../dit/userBranch/actions/userBranch_action';
const INITIAL_STATE = {
  type: '',
  text: '',
  header: '',
  number: 0,
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTIFY:
      const nextNum = state.number + 1;
      return {
        ...state,
        type: action.notifyType,
        text: action.notifyText,
        header: action.notifyHeader,
        number: nextNum,
      };
    default:
      return state;
  }
}

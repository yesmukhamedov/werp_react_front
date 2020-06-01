import { FETCH_SMSRCUS_LIST } from './smsrcusAction';

const INITIAL_STATE = {
  dynamicObject: [],
  transfer: [],
  CRMSchedule: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMSRCUS_LIST:
      return {
        ...state,
        smsrcusData: { ...action.payload.data },
      };

    default:
      return state;
  }
}

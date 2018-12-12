import {
  HR_TIMESHEET_FETCH_ITEMS,
  HR_TIMESHEET_FETCH_STATUSES,
} from '../actions/hrTimesheetAction';

const INITIAL_STATE = {
  items: [],
  statuses: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HR_TIMESHEET_FETCH_ITEMS:
      return { ...state, items: action.payload };

    case HR_TIMESHEET_FETCH_STATUSES:
      return { ...state, statuses: action.payload };

    default:
      return state;
  }
}

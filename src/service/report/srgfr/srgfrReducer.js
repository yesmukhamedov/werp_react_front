import {
  CLEAR_ALL,
  COEFFICIENT_TYPE_MONEY_RATE,
  FETCH_REPORT_BY_BRANCHES,
  FETCH_REPORT_BY_CATEGORIES,
} from './srgfrAction';

const INITIAL_STATE = {
  reportByCategories: [],
  reportByBranches: [],
  exhangeRate: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REPORT_BY_CATEGORIES:
      return {
        ...state,
        reportByCategories: [...action.payload],
      };
    case FETCH_REPORT_BY_BRANCHES:
      return {
        ...state,
        reportByBranches: [...action.payload],
      };
    case COEFFICIENT_TYPE_MONEY_RATE:
      return {
        ...state,
        exhangeRate: [...action.payload],
      };
    case CLEAR_ALL:
      return {
        reportByCategories: [],
        reportByBranches: [],
      };

    default:
      return state;
  }
}

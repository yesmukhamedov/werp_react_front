import {
  FRCOLN_SEARCH_DATA,
  CHANGE_ACTIVE_INDEX,
  FRCOLN_FETCH_BRANCH_DATA,
  FRCOLN_FETCH_COLLECTOR_DATA,
  CLEAR_STATE,
} from './frcoln_action';

const INITIAL_STATE = {
  tab2OutputTable: [],
  tab3OutputTable: [],
  tab4OutputTable: [],
  tab2TotalTable: [],
  tab3TotalTable: [],
  activeIndex: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_INDEX:
      return { ...state, activeIndex: action.activeIndex };
    case FRCOLN_SEARCH_DATA:
      return {
        ...state,
        tab2OutputTable: action.tab2OutputTable,
        tab2TotalTable: action.tab2TotalTable,
        activeIndex: 1,
      };
    case FRCOLN_FETCH_BRANCH_DATA:
      return {
        ...state,
        tab3OutputTable: action.tab3OutputTable,
        tab3TotalTable: action.tab3TotalTable,
        activeIndex: 2,
      };
    case FRCOLN_FETCH_COLLECTOR_DATA:
      return {
        ...state,
        tab4OutputTable: action.tab4OutputTable,
        activeIndex: 3,
      };
    case CLEAR_STATE:
      return {
        ...state,
        tab2OutputTable: [],
        tab3OutputTable: [],
        tab4OutputTable: [],
        tab2TotalTable: [],
        tab3TotalTable: [],
        activeIndex: 0,
      };
    default:
      return state;
  }
}

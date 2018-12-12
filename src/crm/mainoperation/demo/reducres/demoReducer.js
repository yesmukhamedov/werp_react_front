import {
  CRM_DEMO_FETCH_CURRENT,
  CRM_DEMO_FETCH_ARCHIVE,
  CRM_DEMO_CLEAR_STATE,
  CRM_DEMO_FETCH_RESULTS,
  CRM_DEMO_FETCH_GROUP_DEALERS,
  CRM_DEMO_FETCH_REASONS,
  CRM_DEMO_FETCH_SINGLE,
  CRM_DEMO_UPDATE,
  CRM_DEMO_UPDATE_MODAL_TOGGLE,
  CRM_DEMO_CREATE_MODAL_TOGGLE,
  CRM_DEMO_FETCH_CHILD_RECOS,
} from '../actions/demoAction';

const INITIAL_STATE = {
  demo: {},
  recommender: {},
  childRecos: [],
  childDemos: [],
  demoResults: [],
  callResults: [],
  reasons: [],
  items: [],
  meta: {
    totalRows: 0,
    perPage: 0,
    page: 0,
  },
  dealers: [],
  openDemoUpdateModal: false,
  openDemoCreateModal: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CRM_DEMO_FETCH_CURRENT:
      return { ...state, items: action.items };

    case CRM_DEMO_FETCH_ARCHIVE:
      return { ...state, items: action.items, meta: action.meta };

    case CRM_DEMO_FETCH_RESULTS:
      return { ...state, demoResults: action.items };

    case CRM_DEMO_FETCH_GROUP_DEALERS:
      return { ...state, dealers: action.items };

    case CRM_DEMO_FETCH_REASONS:
      return { ...state, reasons: action.items };

    case CRM_DEMO_FETCH_SINGLE:
      return { ...state, demo: action.demo, recommender: action.recommender };

    case CRM_DEMO_UPDATE_MODAL_TOGGLE:
      return { ...state, openDemoUpdateModal: action.payload };

    case CRM_DEMO_UPDATE:
      return { ...state, demo: action.item, openDemoUpdateModal: false };

    case CRM_DEMO_CREATE_MODAL_TOGGLE:
      return { ...state, openDemoCreateModal: action.payload };

    case CRM_DEMO_CLEAR_STATE:
      return { ...state, INITIAL_STATE };

    case CRM_DEMO_FETCH_CHILD_RECOS:
      return { ...state, childRecos: action.payload };

    default:
      return state;
  }
}

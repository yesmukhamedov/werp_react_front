import {
  WSP_RECO_LIST_MODAL_OPENED,
  WSP_SET_CURRENT_RECOMMENDER,
  WSP_FETCH_RECOS_BY_RECO,
  WSP_FETCH_RECOS_BY_DATE,
  WSP_FETCH_RECOS_MOVED,
  WSP_FETCH_DEMO_RECOS,
  WSP_LOADER_CHANGED,
  WSP_FETCH_TODAY_CALLS,
  WSP_FETCH_TODAY_DEMOS,
  WSP_FETCH_PHONE_NUMBER_HISTORY,
  WSP_TOGGLE_PHONE_MODAL,
  WSP_SET_CURRENT_PHONE,
  WSP_SAVED_CALL,
  WSP_FETCH_CURRENT_DEMOS,
  WSP_FETCH_CURRENT_VISITS,
  WSP_FETCH_VISIT_RECOS,
  WSP_HANDLE_FILTER,
  WSP_FETCH_KPI,
  WSP_CLEAR_STATE,
  WSP_RECO_ARCHIVED,
} from '../actions/wspaceAction';

import { CRM_VISIT_CREATE } from '../../visit/actions/visitAction';
import { MENU_CURRENT_VISIT, MENU_BY_DATE } from '../wspaceUtil';
import _ from 'lodash';

const INITIAL_STATE = {
  // RecoList By Reco
  byRecoItems: [],
  recoItems: [],
  phoneCode: '',
  phonePattern: '',
  recoListModalOpened: false,
  currentRecommender: {},
  currentRecommenderRecos: [],
  staffRecoData: {},
  loaders: {},
  todayCallsByResult: {},
  dashboardCallMenus: [],
  todayDemos: [],
  currentPhone: {},
  phoneModalOpened: false,
  phoneNumberHistory: [],
  phoneNumberReco: {},
  callForm: {},
  filters: {},
  kpiData: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CRM_VISIT_CREATE:
      const stfRecoData = Object.assign({}, state.staffRecoData);
      if (!stfRecoData[MENU_CURRENT_VISIT]) {
        stfRecoData[MENU_CURRENT_VISIT] = [];
      }

      stfRecoData[MENU_CURRENT_VISIT].push(action.payload);

      return { ...state, staffRecoData: stfRecoData };

    case WSP_FETCH_KPI:
      return { ...state, kpiData: action.payload };

    case WSP_SET_CURRENT_PHONE:
      return { ...state, currentPhone: action.payload };

    case WSP_SET_CURRENT_RECOMMENDER:
      return { ...state, currentRecommender: action.payload };

    case WSP_RECO_LIST_MODAL_OPENED:
      return { ...state, recoListModalOpened: action.payload };

    case WSP_FETCH_RECOS_BY_RECO:
    case WSP_FETCH_RECOS_BY_DATE:
    case WSP_FETCH_RECOS_MOVED:
    case WSP_FETCH_CURRENT_DEMOS:
    case WSP_FETCH_CURRENT_VISITS:
      const stfData = Object.assign({}, state.staffRecoData);
      stfData[action.key] = action.payload;
      return { ...state, staffRecoData: stfData };

    case WSP_FETCH_DEMO_RECOS:
    case WSP_FETCH_VISIT_RECOS:
      return { ...state, currentRecommenderRecos: action.payload };

    case WSP_LOADER_CHANGED:
      const loaders = Object.assign({}, state.loaders);
      loaders[action.key] = action.payload;
      return { ...state, loaders };

    case WSP_FETCH_TODAY_DEMOS:
      return { ...state, todayDemos: action.payload };

    case WSP_FETCH_PHONE_NUMBER_HISTORY:
      return {
        ...state,
        phoneNumberHistory: action.payload.calls,
        phoneNumberReco: action.payload.reco,
        currentRecommender: action.payload.recommender,
        phoneModalOpened: true,
        callForm: action.payload.callForm,
      };

    case WSP_FETCH_TODAY_CALLS:
      const todayCalls = action.payload;
      const callsByResult = {};
      const dashboardCallMenus = [];
      const resultsMap = {};
      for (const k in todayCalls) {
        const temp = todayCalls[k];
        if (!callsByResult[temp.resultName]) {
          callsByResult[temp.resultName] = [];
        }

        resultsMap[temp.resultName] = temp.resultId;

        callsByResult[temp.resultName].push(temp);
      }

      dashboardCallMenus.push({
        name: 'all',
        label: 'All calls',
        count: todayCalls.length,
        resultId: 0,
      });

      for (const res in callsByResult) {
        dashboardCallMenus.push({
          name: res,
          label: res,
          count: callsByResult[res].length,
          resultId: resultsMap[res],
        });
      }

      callsByResult.all = todayCalls;

      return {
        ...state,
        todayCallsByResult: callsByResult,
        dashboardCallMenus,
      };

    case WSP_TOGGLE_PHONE_MODAL:
      return { ...state, phoneModalOpened: action.payload };

    case WSP_RECO_ARCHIVED:
      const stfRecoDataTemp = Object.assign({}, state.staffRecoData);
      stfRecoDataTemp[MENU_BY_DATE] = removeRecoFromListById(
        action.payload,
        stfRecoDataTemp[MENU_BY_DATE],
      );
      return {
        ...state,
        currentRecommenderRecos: removeRecoFromListById(
          action.payload,
          state.currentRecommenderRecos,
        ),
        staffRecoData: stfRecoDataTemp,
      };

    case WSP_SAVED_CALL:
      const demoDto = Object.assign({}, action.payload.demo);
      const callDto = Object.assign({}, action.payload.call);
      const todCalls = Object.assign({}, state.todayCallsByResult);
      const dashbCallMenu = Object.assign([], state.dashboardCallMenus);
      const todDemos = Object.assign([], state.todayDemos);

      let currentRecommenderRecos = state.currentRecommenderRecos;
      if (action.payload.reco && action.payload.reco.id) {
        currentRecommenderRecos = [];
        for (const k in state.currentRecommenderRecos) {
          if (state.currentRecommenderRecos[k].id === action.payload.reco.id) {
            currentRecommenderRecos[k] = action.payload.reco;
          } else {
            currentRecommenderRecos[k] = state.currentRecommenderRecos[k];
          }
        }
      }

      if (demoDto && demoDto.id) {
        todDemos.push(demoDto);
      }
      if (callDto) {
        if (!todCalls[callDto.resultName]) {
          todCalls[callDto.resultName] = [];
        }

        if (!todCalls.all) {
          todCalls.all = [];
        }

        let tempDashb = _.find(dashbCallMenu, { name: callDto.resultName });
        const allDashb = _.find(dashbCallMenu, { name: 'all' });
        if (tempDashb) {
          tempDashb.count += 1;
        } else {
          tempDashb = {
            name: callDto.resultName,
            label: callDto.resultName,
            count: 1,
          };
          dashbCallMenu.push(tempDashb);
        }

        allDashb.count += 1;

        todCalls[callDto.resultName].push(callDto);
        todCalls.all.push(callDto);

        // todCalls.push(callDto)
      }

      return {
        ...state,
        phoneModalOpened: false,
        todayCallsByResult: todCalls,
        dashboardCallMenus: dashbCallMenu,
        todayDemos: todDemos,
        currentRecommenderRecos,
      };

    case WSP_HANDLE_FILTER:
      const { key, name, value } = action;
      const filters = Object.assign({}, state.filters);
      if (!filters[key]) {
        filters[key] = {};
      }

      filters[key][name] = value;
      console.log('filter reducer: ', filters);

      return { ...state, filters };

    case WSP_CLEAR_STATE:
      return {
        ...state,
        byRecoItems: [],
        recoItems: [],
        phoneCode: '',
        phonePattern: '',
        recoListModalOpened: false,
        currentRecommender: {},
        currentRecommenderRecos: [],
        staffRecoData: {},
        loaders: {},
        todayCallsByResult: {},
        dashboardCallMenus: [],
        todayDemos: [],
        currentPhone: {},
        phoneModalOpened: false,
        phoneNumberHistory: [],
        phoneNumberReco: {},
        callForm: {},
        filters: {},
        kpiData: {},
      };

    default:
      return state;
  }
}

const removeRecoFromListById = (recoId, recoList) => {
  const out = [];
  for (const k in recoList) {
    if (recoList[k].id === recoId) {
      continue;
    }

    out.push(recoList[k]);
  }

  return out;
};

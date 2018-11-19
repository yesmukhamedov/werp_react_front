import { groupBy } from 'lodash';
import { FETCH_USER_INFO } from './userInfo_action';

const INITIAL_STATE = {
  branchOptionsAll: [],
  branchOptionsMarketing: [],
  branchOptionsService: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_INFO:
      const { all } = action;
      const branchMap = {};
      Object.keys(all).forEach(key => {
        const valueMap = all[key];
        const map = groupBy(Object.values(valueMap), 'key');
        branchMap[key] = map;
      });
      return {
        ...state,
        branchOptionsNormalized: branchMap,
        branchOptionsAll: action.all,
        branchOptionsMarketing: action.marketing,
        branchOptionsService: action.service,
        companyOptions: action.bukrs,
      };
    default:
      return state;
  }
}

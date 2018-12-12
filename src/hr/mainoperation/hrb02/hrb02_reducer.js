import {
  FETCH_BONUS_DATA,
  CLEAR_STATE,
  ON_INPUT_CHANGE,
  ON_DELETE_ROW,
  ON_ADD_ROW,
  SAVE_BONUS_DATA,
} from './hrb02_action';

const INITIAL_STATE = {
  table: [],
  blankObject: {},
  current: false,
  businessAreaId: null,
};

export default function(state = INITIAL_STATE, action) {
  let waTable = [];

  switch (action.type) {
    case FETCH_BONUS_DATA:
      return {
        ...state,
        table: action.table,
        blankObject: action.blankObject,
        current: action.current,
        businessAreaId: action.businessAreaId,
      };
    case SAVE_BONUS_DATA:
      return { ...state, table: action.table };
    case CLEAR_STATE:
      return {
        ...state,
        table: [],
        blankObject: {},
        current: false,
        businessAreaId: null,
      };

    case ON_INPUT_CHANGE:
      waTable = JSON.parse(JSON.stringify(state.table));
      let waBonus = action.bonus;
      waBonus = action.bonus;
      if (waBonus.rowStatus !== 'del' && waBonus.rowStatus !== 'new') {
        waBonus.rowStatus = 'mod';
      }
      waTable[action.index] = waBonus;
      return { ...state, table: waTable };
    case ON_DELETE_ROW:
      waTable = JSON.parse(JSON.stringify(state.table));
      waTable[action.index].rowStatus = 'del';
      return { ...state, table: waTable };
    case ON_ADD_ROW:
      waTable = JSON.parse(JSON.stringify(state.table));
      const waBlankObject = Object.assign({}, state.blankObject);
      waTable.push(waBlankObject);
      return { ...state, table: waTable };

    default:
      return state;
  }
}

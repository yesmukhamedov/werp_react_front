import {
  CURRENT_POSITIONS,
  NEW_POSITION,
  POSITION_UPDATE,
} from './positionAction';

const INITIAL_STATE = {
  currentPosition: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_POSITIONS:
      return { ...state, currentPosition: action.items };
    case NEW_POSITION:
      const newPos = Object.assign([], state.currentPosition);
      newPos.push(action.payload);
      return { ...state, currentPosition: newPos };
    case POSITION_UPDATE:
      const updatedItem = action.payload;
      const newItems = [];
      console.log(updatedItem);
      for (const k in state.currentPosition) {
        if (state.currentPosition[k].position_id === updatedItem.position_id) {
          newItems.push(updatedItem);
        } else {
          newItems.push(state.currentPosition[k]);
        }
      }
      return { ...state, currentPosition: newItems };
    default:
      return state;
  }
}

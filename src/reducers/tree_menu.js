import {
    TREE_MENU
} from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case TREE_MENU:
            return {...state, tree: action.payload};
        default:
            return state;
    }
}
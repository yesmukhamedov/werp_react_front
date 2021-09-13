import { CLEAR_ALL } from './action';

let INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CLEAR_ALL:
            return {};
        default:
            return state;
    }
}

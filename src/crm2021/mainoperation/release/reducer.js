import { GET_ALL_RELEASES } from './action';

let INITIAL_STATE = {
    allReleases: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_RELEASES:
            return {
                ...state,
                allReleases: action.payload,
            };
        default:
            return state;
    }
}

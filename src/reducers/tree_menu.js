import {
    TREE_MENU, AUTH_USER, BREADCRUMB, ROUTES
} from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case TREE_MENU:
            return {...state, tree: action.payload, refetch: false};
        case AUTH_USER:
            return {...state, refetch: true};
        case BREADCRUMB:
            return {...state, breadcrumb: action.payload};
        case ROUTES:
            return {...state, routes: action.payload};    
        default:
            return state;
    }
}

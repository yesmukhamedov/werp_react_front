import {BREADCRUMB, TREE_MENU} from "./types";
import axios from 'axios';
import {ROOT_URL} from "../utils/constants";

export function fetchTreeMenu(userId) {
    return (dispatch) => {
        // const url = `https://private-876aa-auraerpapi.apiary-mock.com/api/v1/menu-tree`;
        const url = `${ROOT_URL}/users/${userId}/menu-tree`;
        axios
            .get(url)
            .then(response => {
                // If request is good...
                // - TODO check whether response is successful

                dispatch({
                    type: TREE_MENU,
                    payload: response.data
                });
            })
            .catch(err => console.log('Error fetching tree menu', err)
            );
    }
}

/**
 * Broadcasts an action with a new breadcrumb items.
 * @param breadcrumb - array of menu item node names in user's selected language.
 */
export function breadcrumbChanged(breadcrumb) {
    return (dispatch) => {
        dispatch({
            type: BREADCRUMB,
            payload: breadcrumb
        });
    }
}

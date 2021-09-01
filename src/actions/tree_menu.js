import { doGet } from '../utils/apiActions';
import { BREADCRUMB, TREE_MENU, ROUTES } from './types';

export function fetchTreeMenu(userId) {
    return dispatch => {
        // const url = `https://private-876aa-auraerpapi.apiary-mock.com/api/v1/menu-tree`;
        const url = `core/users/${userId}/menu-tree`;

        // .get(url)

        doGet(url)
            .then(response => {
                // If request is good...

                dispatch({
                    type: TREE_MENU,
                    payload: response.data,
                });
            })
            .catch(err => console.log('Error fetching tree menu', err));
    };
}

export function fetchAvailableRoutes() {
    return dispatch => {
        // .get(`${ROOT_URL}/api/routes`, {
        //   headers: {
        //     authorization: localStorage.getItem('token'),
        //   },
        // })

        doGet(`core/routes`)
            .then(response => {
                // If request is good...
                dispatch({
                    type: ROUTES,
                    payload: response.data,
                });
            })
            .catch(err => console.log('Error fetching available routes', err));
    };
}

/**
 * Broadcasts an action with a new breadcrumb items.
 * @param breadcrumb - array of menu item node names in user's selected language.
 */
export function breadcrumbChanged(breadcrumb) {
    try {
        localStorage.setItem('breadcrumb', JSON.stringify(breadcrumb));
    } catch (error) {
        console.log('Could not persist breadcrumbs to local storage');
    }
    return dispatch => {
        dispatch({
            type: BREADCRUMB,
            payload: breadcrumb,
        });
    };
}

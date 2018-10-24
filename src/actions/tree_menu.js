import axios from 'axios';
import { BREADCRUMB, TREE_MENU, ROUTES } from './types';
import { ROOT_URL } from '../utils/constants';

export function fetchTreeMenu(userId) {
  return (dispatch) => {
    // const url = `https://private-876aa-auraerpapi.apiary-mock.com/api/v1/menu-tree`;
    const url = `${ROOT_URL}/users/${userId}/menu-tree`;
    axios
      .get(url)
      .then((response) => {
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
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/routes`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
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
  return (dispatch) => {
    dispatch({
      type: BREADCRUMB,
      payload: breadcrumb,
    });
  };
}

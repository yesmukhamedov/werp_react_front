import {TREE_MENU} from "./types";
import axios from 'axios';
import {ROOT_URL} from "../utils/constants";

export function fetchTreeMenu() {
    return (dispatch) => {
        // const url = `https://private-876aa-auraerpapi.apiary-mock.com/api/v1/menu-tree`;
        const url = `${ROOT_URL}/menu-tree`;
        axios
            .get(url)
            .then(response => {
                //console.log(`fetchTreeMenu(): ${JSON.stringify(response)}`);
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

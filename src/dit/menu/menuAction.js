import axios from 'axios';
import { ROOT_URL } from '../../utils/constants';
import { modifyLoader } from '../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';

export const REF_CURRENT_MENU = 'REF_CURRENT_MENU';
export const HR_PYRAMID_TREE_CHANGED = 'HR_PYRAMID_TREE_CHANGED';
export const BLANK_ITEM = 'BLANK_ITEM';
export const NEW_PYR = 'NEW_PYR';
export const DELETE_ITEM = 'DELETE_ITEM';
export const NODE_UPDATE = 'NODE_UPDATE';

export function fetchCurrentMenu() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .get(`${ROOT_URL}/api/dit/menu/list`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        console.log(data);
        dispatch({
          type: REF_CURRENT_MENU,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function onMoveNode(node, changeNode) {
  console.log('in action ', node);
  console.log('in action ', changeNode);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(
        `${ROOT_URL}/api/dit/menu/move`,
        { node, changeNode },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function updateNodeItem(node) {
  return function(dispatch) {
    axios
      .put(`${ROOT_URL}/api/dit/menu/update/${node.id}`, node, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: NODE_UPDATE,
          payload: node,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function pyramidTreeChanged(treeData) {
  return {
    type: HR_PYRAMID_TREE_CHANGED,
    payload: treeData,
  };
}

export function fetchBlank(parentId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .get(`${ROOT_URL}/api/dit/menu/blank/${parentId}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        console.log(data);
        dispatch({
          type: BLANK_ITEM,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function newPyramid(newNode) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(`${ROOT_URL}/api/dit/menu/save`, newNode, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: NEW_PYR,
            payload: data,
          });
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function deletePyramid(node) {
  console.log('node ', node);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .delete(`${ROOT_URL}/api/dit/menu/delete/${node.id}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(() => {
        dispatch(modifyLoader(false));
        dispatch({
          type: DELETE_ITEM,
          payload: node,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

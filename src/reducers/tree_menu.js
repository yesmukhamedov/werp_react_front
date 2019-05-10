import { TREE_MENU, AUTH_USER, BREADCRUMB, ROUTES } from '../actions/types';

/**
 * Recursively adds parent links to child fields
 * @param data - array of menu nodes returned from the back-end
 * @returns {*} - the same array of menu nodes with parent links set.
 */
const addParentLinks = data => {
  const setParent = node => {
    if (!node.leaf) {
      for (let i = 0; i < node.children.length; i++) {
        node.children[i].parent = node;
        setParent(node.children[i]);
      }
    }
  };
  for (const node of data) {
    setParent(node);
  }
  return data;
};

const prepareTransactions = data => {
  const queue = [];
  for (const node of data) {
    queue.push(node);
  }

  const map = {};
  while (queue.length > 0) {
    const top = queue.shift();
    if (top.leaf) {
      map[top.transactionCode] = top;
    } else {
      for (const child of top.children) {
        queue.push(child);
      }
    }
  }
  return map;
};

const initialState = {
  breadcrumb: JSON.parse(localStorage.getItem('breadcrumb')),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TREE_MENU:
      return {
        ...state,
        tree: action.payload,
        refetch: false,
        transactions: prepareTransactions(addParentLinks(action.payload)),
      };
    case AUTH_USER:
      return { ...state, refetch: true };
    case BREADCRUMB:
      return { ...state, breadcrumb: action.payload };
    case ROUTES:
      return { ...state, routes: action.payload };
    default:
      return state;
  }
}

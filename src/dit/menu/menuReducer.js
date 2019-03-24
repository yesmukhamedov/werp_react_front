import {
  REF_CURRENT_MENU,
  HR_PYRAMID_TREE_CHANGED,
  BLANK_ITEM,
  DELETE_ITEM,
  NEW_PYR,
  NODE_UPDATE,
  ALL_TRANSACTIONS,
  ON_MOVE,
} from './menuAction';

import {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
} from 'react-sortable-tree';
const getNodeKey = ({ node: { id } }) => id;
const INITIAL_STATE = {
  treeData: [],
  item: [],
  allTransaction: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ON_MOVE:
      const { node, changeNode } = action.payload;
      const x = node.sort_order;
      const y = changeNode.sort_order;
      node.sort_order = y;
      changeNode.sort_order = x;
      return { ...state };
    case NODE_UPDATE:
      const item = action.payload;
      const a = changeNodeAtPath({
        treeData: state.treeData,
        path: item.path,
        getNodeKey,
        newNode: item,
      });
      return { ...state, treeData: a };
    case REF_CURRENT_MENU:
    case HR_PYRAMID_TREE_CHANGED:
      return { ...state, treeData: action.payload };
    case BLANK_ITEM:
      return { ...state, item: action.payload };
    case NEW_PYR:
      const nodeItem = action.payload;
      const treeNode = {};
      treeNode.id = nodeItem.id;
      treeNode.expanded = false;
      treeNode.children = [];
      treeNode.parentKey = nodeItem.parent_id;
      treeNode.title = nodeItem.name_ru;
      treeNode.subtitle = [nodeItem.name_en + ' ', nodeItem.name_tr];
      let newTree = addNodeUnderParent({
        treeData: state.treeData,
        newNode: treeNode,
        parentKey: treeNode.parentKey,
        getNodeKey: getNodeKey,
      });

      return { ...state, treeData: newTree.treeData };
    case DELETE_ITEM:
      const delItem = action.payload;
      let del = removeNodeAtPath({
        treeData: state.treeData,
        path: delItem.path,
        getNodeKey,
      });
      return { ...state, treeData: del };
    case ALL_TRANSACTIONS:
      return { ...state, allTransaction: action.payload };
    default:
      return state;
  }
}

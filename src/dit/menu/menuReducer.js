import {
  REF_CURRENT_MENU,
  HR_PYRAMID_TREE_CHANGED,
  BLANK_ITEM,
  DELETE_ITEM,
  NEW_PYR,
  NODE_UPDATE,
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
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NODE_UPDATE:
      const node = action.payload;
      const a = changeNodeAtPath({
        treeData: state.treeData,
        path: node.path,
        getNodeKey,
        newNode: node,
      });
      return { ...state, treeData: a };
    case REF_CURRENT_MENU:
    case HR_PYRAMID_TREE_CHANGED:
      return { ...state, treeData: action.payload };
    case BLANK_ITEM:
      return { ...state, item: action.payload };
    case NEW_PYR:
      const nodeItem = action.payload;
      const newNode2 = {};
      newNode2.id = nodeItem.id;
      newNode2.expanded = false;
      newNode2.children = [];
      newNode2.parentKey = nodeItem.parent_id;
      newNode2.title = nodeItem.name_ru;
      newNode2.subtitle = [nodeItem.name_en + ' ', nodeItem.name_tr];
      console.log('nodeItem ', nodeItem);
      console.log('newNode2 ', newNode2);
      let newTree = addNodeUnderParent({
        treeData: state.treeData,
        newNode: newNode2,
        parentKey: newNode2.parentKey,
        getNodeKey: getNodeKey,
      });
      console.log(' newTree ', newTree.treeData);
      return { ...state, treeData: newTree.treeData };
    case DELETE_ITEM:
      const delItem = action.payload;
      let del = removeNodeAtPath({
        treeData: state.treeData,
        path: delItem.path,
        getNodeKey,
      });
      return { ...state, treeData: del };
    default:
      return state;
  }
}

import {
  /***************************  EVENT  */
  ALL_EVETNT,

  /***************************  SYSTEM USER  */
  ALL_SYSTEM_USERS,
  NEW_SYS_USER,
  STAFF_FOR_SYS_USER,
  UPDATE_SYS_USER,
  BRANCHES_FOR_SYS_USER,
  SHOW_SYS_USER,
  SHOW_SYS_USER_UPDATE,

  /***************************  MENU */
  ALL_MENU_NODES,
  NEW_MENU_NODE,
  ON_MENU_NODE_MOVE,
  TREE_MENU_CHANGED,
  BLANK_MENU_NODE,
  MENU_NODE_UPD,
  DELETE_MENU_NODE,

  /***************************  ROLES  */
  ALL_ROLE,
  ROLE_ACCESS,
  ROLE_NAME_UPDATE,
  ROLE_NEW,

  /***************************  ROLES  */
  ALL_CURRENT_TRANSACTIONS,
  NEW_TRANSACTION,
  TRANSACTION_UPDATE,
} from './transactionAction';

import {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  insertNode,
} from 'react-sortable-tree';

const getNodeKey = ({ node: { id } }) => id;

const INITIAL_STATE = {
  events: {},
  lSUsers: {},
  evRowPr: {
    totalRows: 0,
    perPage: 0,
    page: 0,
  },
  treeData: [],
  listRoles: [],
  accessTypes: [],
  currTrans: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /******************************************************************        EVENT        */
    case ALL_EVETNT:
      return { ...state, events: action.events, evRowPr: action.evRowPr };

    /******************************************************************        SYSTEM USER        */

    case ALL_SYSTEM_USERS:
      return { ...state, lSUsers: { ...state.lSUsers, ...action.payload } };
    case STAFF_FOR_SYS_USER:
      return { ...state, staffs: action.payload };
    case NEW_SYS_USER:
      const newUser = Object.assign([], state.lSUsers.users);
      const user = {};
      const userActiveChange = action.payload;
      user['active'] = userActiveChange.active;
      user['id'] = Math.random();
      user['username'] = userActiveChange.username;
      user['bukrsname'] = userActiveChange.bukrsname;
      user['branchname'] = userActiveChange.branchname;
      user['is_root'] = userActiveChange.is_root;
      user['rids'] = userActiveChange.rids;
      user['rname'] = userActiveChange.rname;
      user['internal_number'] = userActiveChange.internal_number;
      newUser.push(user);
      return {
        ...state,
        lSUsers: { ...state.lSUsers, users: newUser },
        addModalOpened: false,
      };
    case UPDATE_SYS_USER:
      const updatedRow = action.payload;
      const newRows = [];
      for (const r in state.lSUsers.users) {
        if (state.lSUsers.users[r].id === updatedRow.id) {
          newRows.push(updatedRow);
        } else {
          newRows.push(state.lSUsers.users[r]);
        }
      }
      return {
        ...state,
        lSUsers: { ...state.lSUsers, users: newRows },
        updateModalOpened: false,
      };
    case BRANCHES_FOR_SYS_USER:
      return { ...state, bukrsBranches: action.payload };
    case SHOW_SYS_USER:
      return { ...state, addModalOpened: action.payload };
    case SHOW_SYS_USER_UPDATE:
      return { ...state, updateModalOpened: action.payload };

    /******************************************************************        MENU       */

    case ON_MENU_NODE_MOVE:
      const { node, changeNode } = action.payload;
      const x = node.sort_order;
      const y = changeNode.sort_order;
      node.sort_order = y;
      changeNode.sort_order = x;
      return { ...state };
    case MENU_NODE_UPD:
      const nMenuUpd = action.payload;
      const menuTreeUpd = changeNodeAtPath({
        treeData: state.treeData,
        path: nMenuUpd.path,
        getNodeKey,
        newNode: nMenuUpd,
      });
      return { ...state, treeData: menuTreeUpd };
    case ALL_MENU_NODES:
    case TREE_MENU_CHANGED:
      return { ...state, treeData: action.payload };
    case BLANK_MENU_NODE:
      return { ...state, blankMenuNode: action.payload };
    case NEW_MENU_NODE:
      const mnuNode = action.payload;
      const newMenuN = {};
      newMenuN.id = mnuNode.id;
      newMenuN.expanded = false;
      newMenuN.children = [];
      newMenuN.parentKey = mnuNode.parent_id;
      newMenuN.title = mnuNode.name_ru;
      newMenuN.subtitle = [mnuNode.name_en + ' ', mnuNode.name_tr];

      let newTree;
      if (mnuNode.parent_id === 0) {
        newTree = insertNode({
          treeData: state.treeData,
          newNode: newMenuN,
          depth: 0,
          minimumTreeIndex: 1, //node sirasini belirler
          expandParent: true,
          getNodeKey: getNodeKey,
        });
      } else {
        newTree = addNodeUnderParent({
          treeData: state.treeData,
          newNode: newMenuN,
          parentKey: newMenuN.parentKey,
          getNodeKey: getNodeKey,
        });
      }
      return { ...state, treeData: newTree.treeData };
    case DELETE_MENU_NODE:
      const delNode = action.payload;
      let delMenuN = removeNodeAtPath({
        treeData: state.treeData,
        path: delNode.path,
        getNodeKey,
      });
      return { ...state, treeData: delMenuN };

    /******************************************************************        ROLES       */

    case ALL_ROLE:
      return { ...state, listRoles: { ...state.listRoles, ...action.payload } };
    case ROLE_ACCESS:
      return { ...state, accessTypes: action.payload };
    case ROLE_NAME_UPDATE:
      const updatedRole = action.payload;
      const newRoles = [];
      for (const k in state.listRoles.roles) {
        if (state.listRoles.roles[k].role_id === updatedRole.role_id) {
          newRoles.push(updatedRole);
        } else {
          newRoles.push(state.listRoles.roles[k]);
        }
      }
      return { ...state, listRoles: { ...state.listRoles, roles: newRoles } };
    case ROLE_NEW:
      const allRoles = Object.assign([], state.listRoles.roles);
      allRoles.push(action.payload);
      return { ...state, listRoles: { ...state.listRoles, roles: allRoles } };

    /******************************************************************        TRANSACTIONS       */

    case ALL_CURRENT_TRANSACTIONS:
      return { ...state, currTrans: action.payload };
    case NEW_TRANSACTION:
      const newTr = Object.assign([], state.currTrans);
      newTr.push(action.payload);
      return { ...state, currTrans: newTr };
    case TRANSACTION_UPDATE:
      const updatedItem = action.payload;
      const newItems = [];
      for (const k in state.currTrans) {
        if (state.currTrans[k].transaction_id === updatedItem.transaction_id) {
          newItems.push(updatedItem);
        } else {
          newItems.push(state.currTrans[k]);
        }
      }
      return { ...state, currTrans: newItems };
    default:
      return state;
  }
}

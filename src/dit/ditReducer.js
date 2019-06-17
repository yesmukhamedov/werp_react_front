import {
  /***************************  DIT_ELLST  */
  DIT_ELLST,

  /***************************  DIT_USER_LST  */
  ALL_DIT_USR_LST,
  NEW_DIT_USR_LST,
  STAFF_FOR_DIT_USR_LST,
  UPD_DIT_USR_LST,
  BRNCHS_FOR_DIT_USR_LST,
  SHOW_DIT_USER_LST,
  SHOW_DIT_USR_UPD,

  /***************************  D_MU_LST */
  ALL_DMU_LST,
  NEW_DMU_LST,
  ON_DMU_LST_MOVE,
  TREE_DMU_LST_CHANGED,
  BLANK_DMU_LST_NODE,
  DMU_LST_NODE_UPD,
  DEL_DMU_LST_NODE,

  /***************************  DRLST  */
  ALL_DR_LIST,
  DR_ACCESS,
  DR_NAME_UPD,
  DR_NEW,

  /***************************  DRLST  */
  ALL_CURR_DTR,
  NEW_DTR,
  UPD_DTR,
} from './ditAction';

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
    /******************************************************************        DIT_ELLST        */
    case DIT_ELLST:
      return { ...state, events: action.events, evRowPr: action.evRowPr };

    /******************************************************************        DIT_USER_LST        */

    case ALL_DIT_USR_LST:
      return { ...state, lSUsers: { ...state.lSUsers, ...action.payload } };
    case STAFF_FOR_DIT_USR_LST:
      return { ...state, staffs: action.payload };
    case NEW_DIT_USR_LST:
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
    case UPD_DIT_USR_LST:
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
    case BRNCHS_FOR_DIT_USR_LST:
      return { ...state, bukrsBranches: action.payload };
    case SHOW_DIT_USER_LST:
      return { ...state, addModalOpened: action.payload };
    case SHOW_DIT_USR_UPD:
      return { ...state, updateModalOpened: action.payload };

    /******************************************************************        DMULST       */

    case ON_DMU_LST_MOVE:
      const { node, changeNode } = action.payload;
      const x = node.sort_order;
      const y = changeNode.sort_order;
      node.sort_order = y;
      changeNode.sort_order = x;
      return { ...state };
    case DMU_LST_NODE_UPD:
      const nMenuUpd = action.payload;
      const menuTreeUpd = changeNodeAtPath({
        treeData: state.treeData,
        path: nMenuUpd.path,
        getNodeKey,
        newNode: nMenuUpd,
      });
      return { ...state, treeData: menuTreeUpd };
    case ALL_DMU_LST:
    case TREE_DMU_LST_CHANGED:
      return { ...state, treeData: action.payload };
    case BLANK_DMU_LST_NODE:
      return { ...state, blankMenuNode: action.payload };
    case NEW_DMU_LST:
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
    case DEL_DMU_LST_NODE:
      const delNode = action.payload;
      let delMenuN = removeNodeAtPath({
        treeData: state.treeData,
        path: delNode.path,
        getNodeKey,
      });
      return { ...state, treeData: delMenuN };

    /******************************************************************        DRLIST       */

    case ALL_DR_LIST:
      return { ...state, listRoles: { ...state.listRoles, ...action.payload } };
    case DR_ACCESS:
      return { ...state, accessTypes: action.payload };
    case DR_NAME_UPD:
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
    case DR_NEW:
      const allRoles = Object.assign([], state.listRoles.roles);
      allRoles.push(action.payload);
      return { ...state, listRoles: { ...state.listRoles, roles: allRoles } };

    /******************************************************************        DTRLST       */

    case ALL_CURR_DTR:
      return { ...state, currTrans: action.payload };
    case NEW_DTR:
      const newTr = Object.assign([], state.currTrans);
      newTr.push(action.payload);
      return { ...state, currTrans: newTr };
    case UPD_DTR:
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

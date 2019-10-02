import {
  DIT_CLEAR_DYN_OBJ,
  /***************************  DITELLST  */
  ALL_DITELLST,

  /***************************  DITUSERLST  */
  ALL_DITUSRLST,
  NEW_DITUSRLST,
  STAFF_FOR_DITUSRLST,
  UPD_DITUSRLST,
  BRNCHS_FOR_DITUSRLST,
  SHOW_DITUSERLST,
  SHOW_DITUSR_UPD,

  /***************************  DMULST */
  ALL_DMULST,
  NEW_DMULST,
  ON_DMULST_MOVE,
  TREE_DMULST_CHANGED,
  BLANK_DMULST_NODE,
  DMU_LST_NODE_UPD,
  DEL_DMULST_NODE,

  /***************************  DRLST  */
  ALL_DRLIST,
  ACCESS_DRLST,
  UPD_DR_LST_NAME,
  NEW_DR_LST,

  /***************************  DRLST  */
  ALL_CURR_DTR,
  NEW_DTR,
  UPD_DTR,

  /***************************  DRLST  */
  GET_PHONEBOOK,
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
  dynObjTrLst: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DIT_CLEAR_DYN_OBJ:
      return { ...state, dynObjTrLst: [] };
    /******************************************************************        DIT_ELLST        */
    case ALL_DITELLST:
      return { ...state, events: action.events, evRowPr: action.evRowPr };

    /******************************************************************        DIT_USER_LST        */

    case ALL_DITUSRLST:
      return { ...state, lSUsers: { ...state.lSUsers, ...action.payload } };
    case STAFF_FOR_DITUSRLST:
      return { ...state, staffs: action.payload };
    case NEW_DITUSRLST:
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
    case UPD_DITUSRLST:
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
    case BRNCHS_FOR_DITUSRLST:
      return { ...state, bukrsBranches: action.payload };
    case SHOW_DITUSERLST:
      return { ...state, addModalOpened: action.payload };
    case SHOW_DITUSR_UPD:
      return { ...state, updateModalOpened: action.payload };

    /******************************************************************        DMULST       */

    case ON_DMULST_MOVE:
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
    case ALL_DMULST:
    case TREE_DMULST_CHANGED:
      return { ...state, treeData: action.payload };
    case BLANK_DMULST_NODE:
      return { ...state, blankMenuNode: action.payload };
    case NEW_DMULST:
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
    case DEL_DMULST_NODE:
      const delNode = action.payload;
      let delMenuN = removeNodeAtPath({
        treeData: state.treeData,
        path: delNode.path,
        getNodeKey,
      });
      return { ...state, treeData: delMenuN };

    /******************************************************************        DRLIST       */

    case ALL_DRLIST:
      return { ...state, listRoles: { ...state.listRoles, ...action.payload } };
    case ACCESS_DRLST:
      return { ...state, accessTypes: action.payload };
    case UPD_DR_LST_NAME:
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
    case NEW_DR_LST:
      const allRoles = Object.assign([], state.listRoles.roles);
      allRoles.push(action.payload);
      return { ...state, listRoles: { ...state.listRoles, roles: allRoles } };

    /******************************************************************        DTRLST       */
    case ALL_CURR_DTR:
      return {
        ...state,
        dynObjTrLst: [...state.dynObjTrLst, ...action.payload],
      };
    case NEW_DTR:
      return {
        ...state,
        dynObjTrLst: [...state.dynObjTrLst, { ...action.payload }],
      };
    case UPD_DTR:
      const updDtr = { ...action.payload };
      const idx = [...state.dynObjTrLst].findIndex(
        el => el.transaction_id === updDtr.transaction_id,
      );
      return {
        ...state,
        dynObjTrLst: [
          ...state.dynObjTrLst.slice(0, idx),
          updDtr,
          ...state.dynObjTrLst.slice(idx + 1),
        ],
      };

    /***************************************************************  DPHBOOK ACTIONCALLS        */
    case GET_PHONEBOOK:
      return {
        ...state,
        dynObjTrLst: [...state.dynObjTrLst, ...action.payload],
      };
    default:
      return state;
  }
}

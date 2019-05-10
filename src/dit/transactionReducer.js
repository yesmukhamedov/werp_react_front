import {
  REF_CURRENT_TRANSACTIONS,
  NEW_TRANSACTION,
  TRANSACTION_UPDATE,
  ALL_SYSTEM_USERS,
  NEW_USER,
  STAFF_SEARCH,
  ROW_UPDATE,
  FETCH_BUKRS_BRANCHES,
  SHOW_MODAL,
  SHOW_UPDATE_MODAL,
  ALL_ROLE,
  ROLE_ACCESS,
  ROLE_NAME_UPDATE,
  ROLE_NEW,
  ALL_EVETNT,
} from './transactionAction';

const INITIAL_STATE = {
  lSUsers: {},
  currentTransactions: [],
  transaction: {},
  items: {},
  meta: {
    totalRows: 0,
    perPage: 0,
    page: 0,
  },
  listRoles: [],
  accessTypes: [],
  treeData: [],
  item: [],
  allTransaction: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REF_CURRENT_TRANSACTIONS:
      return { ...state, currentTransactions: action.items };
    case NEW_TRANSACTION:
      const newTr = Object.assign([], state.currentTransactions);
      newTr.push(action.payload);
      return { ...state, currentTransactions: newTr };
    case TRANSACTION_UPDATE:
      const updatedItem = action.payload;
      const newItems = [];
      for (const k in state.currentTransactions) {
        if (
          state.currentTransactions[k].transaction_id ===
          updatedItem.transaction_id
        ) {
          newItems.push(updatedItem);
        } else {
          newItems.push(state.currentTransactions[k]);
        }
      }
      return { ...state, currentTransactions: newItems };
    /***********************************************************        SYSTEM USER  */
    case ALL_SYSTEM_USERS:
      return { ...state, lSUsers: { ...state.lSUsers, ...action.payload } };
    case STAFF_SEARCH:
      return { ...state, staffs: action.payload };
    case NEW_USER:
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
    case ROW_UPDATE:
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
    case FETCH_BUKRS_BRANCHES:
      return { ...state, bukrsBranches: action.payload };
    case SHOW_MODAL:
      return { ...state, addModalOpened: action.payload };
    case SHOW_UPDATE_MODAL:
      return { ...state, updateModalOpened: action.payload };

    /***********************************************************        ROLES        */
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

    /***********************************************************        EVENT        */
    case ALL_EVETNT:
      return { ...state, items: action.items, meta: action.meta };
    default:
      return state;
  }
}

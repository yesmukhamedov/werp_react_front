import {
  ALL_SYSTEM_USERS,
  NEW_USER,
  STAFF_SEARCH,
  ROW_UPDATE,
  FETCH_BUKRS_BRANCHES,
} from './systemUserAction';

const INITIAL_STATE = {
  listAll: {},
  staffs: [],
  userBlank: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_SYSTEM_USERS:
      return { ...state, listAll: { ...state.listAll, ...action.payload } };
    case STAFF_SEARCH:
      return { ...state, staffs: action.payload };
    case NEW_USER:
      const newUser = Object.assign([], state.listAll.users);
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
      return { ...state, listAll: { ...state.listAll, users: newUser } };
    case ROW_UPDATE:
      const updatedRow = action.payload;
      const newRows = [];
      for (const r in state.listAll.users) {
        if (state.listAll.users[r].id === updatedRow.id) {
          newRows.push(updatedRow);
        } else {
          newRows.push(state.listAll.users[r]);
        }
      }
      return { ...state, listAll: { ...state.listAll, users: newRows } };
    case FETCH_BUKRS_BRANCHES:
      return { ...state, bukrsBranches: action.payload };
    default:
      return state;
  }
}

import {
  ALL_ROLE,
  ROLE_ACCESS,
  ROLE_NAME_UPDATE,
  ROLE_NEW,
} from './roleAction';

const INITIAL_STATE = {
  listAll: [],
  accessTypes: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_ROLE:
      return { ...state, listAll: { ...state.listAll, ...action.payload } };
    case ROLE_ACCESS:
      return { ...state, accessTypes: action.payload };
    case ROLE_NAME_UPDATE:
      const updatedRole = action.payload;
      const newRoles = [];
      for (const k in state.listAll.roles) {
        if (state.listAll.roles[k].role_id === updatedRole.role_id) {
          newRoles.push(updatedRole);
        } else {
          newRoles.push(state.listAll.roles[k]);
        }
      }
      return { ...state, listAll: { ...state.listAll, roles: newRoles } };
    case ROLE_NEW:
      const allRoles = Object.assign([], state.listAll.roles);
      allRoles.push(action.payload);
      return { ...state, listAll: { ...state.listAll, roles: allRoles } };
    default:
      return state;
  }
}

import { omit } from 'lodash';
import {
  DTSKC_FETCH_REFERENCES,
  DTSKC_FETCH_ASSIGNEES,
  DTSKC_ASSIGNEE_MODAL_TOGGLE,
  DTSKC_ADD_ASSIGNEE_GROUP,
  DTSKC_ADD_ASSIGNEE_PERSON,
  DTSKC_REMOVE_ASSIGNEE_GROUP,
  DTSKC_REMOVE_ASSIGNEE_PERSON,
  CLEAR_TRANSACTION,
} from '../actions/actionTypes';

const initialState = {
  reference: {
    deptOpts: [],
    groupOpts: [],
  },
  assigneeModal: false,
  assigneeGroups: {},
  assignees: {},
};

const DtskcReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case DTSKC_FETCH_ASSIGNEES:
      return {
        ...prevState,
        assigneeOpts: action.payload,
      };
    case DTSKC_FETCH_REFERENCES:
      return {
        ...prevState,
        reference: action.payload,
      };
    case DTSKC_ASSIGNEE_MODAL_TOGGLE:
      return {
        ...prevState,
        assigneeModal: !prevState.assigneeModal,
      };
    case DTSKC_ADD_ASSIGNEE_GROUP: {
      const { id } = action.payload;
      return {
        ...prevState,
        assigneeGroups: {
          ...prevState.assigneeGroups,
          [id]: action.payload,
        },
      };
    }
    case DTSKC_REMOVE_ASSIGNEE_GROUP: {
      const id = action.payload;
      return {
        ...prevState,
        assigneeGroups: omit(prevState.assigneeGroups, id),
      };
    }
    case DTSKC_ADD_ASSIGNEE_PERSON: {
      const { id } = action.payload;
      return {
        ...prevState,
        assignees: {
          ...prevState.assignees,
          [id]: action.payload,
        },
      };
    }
    case DTSKC_REMOVE_ASSIGNEE_PERSON: {
      const id = action.payload;
      return {
        ...prevState,
        assignees: omit(prevState.assignees, id),
      };
    }
    case CLEAR_TRANSACTION:
      return initialState;
    default:
      break;
  }
  return prevState;
};

export default DtskcReducer;

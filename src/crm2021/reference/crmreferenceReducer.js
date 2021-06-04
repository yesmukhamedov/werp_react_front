import {
  FETCH_SUBJECT_APPEAL,
  CREATE_SUBJECT_APPEAL,
  UPDATE_SUBJECT_APPEAL,
} from './crmreferenceAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUBJECT_APPEAL:
      return {
        ...state,
        subjectAppealList: [...action.payload],
      };
    case CREATE_SUBJECT_APPEAL:
      return {
        ...state,
        subjectAppealPost: { ...action.payload },
      };
    case UPDATE_SUBJECT_APPEAL:
      return {
        ...state,
        subjectAppealPost: { ...action.data },
      };
    default:
      return state;
  }
}

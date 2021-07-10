import {
  FETCH_SUBJECT_APPEAL,
  CREATE_SUBJECT_APPEAL,
  UPDATE_SUBJECT_APPEAL,
  //
  FETCH_SOURCE_REQUESTS,
  CREATE_SOURCE_REQUESTS,
  UPDATE_SOURCE_REQUESTS,
  //
  FETCH_SOURCE_VACANCIES,
  CREATE_SOURCE_VACANCIES,
  UPDATE_SOURCE_VACANCIES,
  //
  FETCH_REASON_CONTRACT,
  CREATE_REASON_CONTRACT,
  UPDATE_REASON_CONTRACT,
  //
  FETCH_PRESENT,
  CREATE_PRESENT,
  UPDATE_PRESENT,
  //
  FETCH_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  //
  FETCH_VACANCY,
  CREATE_VACANCY,
  UPDATE_VACANCY,
  FETCH_TASK_CATEGORIES,
} from './crmreferenceAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    //
    case FETCH_TASK_CATEGORIES:
      return {
        ...state,
        taskCategories: [...action.payload],
      };
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
        subjectAppealPut: { ...action.data },
      };
    //
    case FETCH_SOURCE_REQUESTS:
      return {
        ...state,
        sourceRequestsList: [...action.payload],
      };
    case CREATE_SOURCE_REQUESTS:
      return {
        ...state,
        sourceRequestsPost: { ...action.payload },
      };
    case UPDATE_SOURCE_REQUESTS:
      return {
        ...state,
        sourceRequestsPut: { ...action.data },
      };
    //
    case FETCH_SOURCE_VACANCIES:
      return {
        ...state,
        sourceVacanciesList: [...action.payload],
      };
    case CREATE_SOURCE_VACANCIES:
      return {
        ...state,
        sourceVacanciesPost: { ...action.payload },
      };
    case UPDATE_SOURCE_VACANCIES:
      return {
        ...state,
        sourceVacanciesPut: { ...action.data },
      };
    //
    case FETCH_REASON_CONTRACT:
      return {
        ...state,
        reasonContractList: [...action.payload],
      };
    case CREATE_REASON_CONTRACT:
      return {
        ...state,
        reasonContractPost: { ...action.payload },
      };
    case UPDATE_REASON_CONTRACT:
      return {
        ...state,
        reasonContractPut: { ...action.data },
      };
    //
    case FETCH_PRESENT:
      return {
        ...state,
        presentList: [...action.payload],
      };
    case CREATE_PRESENT:
      return {
        ...state,
        presentPost: { ...action.payload },
      };
    case UPDATE_PRESENT:
      return {
        ...state,
        presentPut: { ...action.data },
      };
    //
    case FETCH_CATEGORY:
      return {
        ...state,
        categoryList: [...action.payload],
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categoryPost: { ...action.payload },
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categoryPut: { ...action.data },
      };
    //
    case FETCH_VACANCY:
      return {
        ...state,
        vacancyList: [...action.payload],
      };
    case CREATE_VACANCY:
      return {
        ...state,
        vacancyPost: { ...action.payload },
      };
    case UPDATE_VACANCY:
      return {
        ...state,
        vacancyPut: { ...action.data },
      };
    default:
      return state;
  }
}

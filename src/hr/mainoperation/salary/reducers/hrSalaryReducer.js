import {
        HR_FETCHED_CURRENT_SALARIES,
    HR_SALARY_LIST_MODAL_OPENED,
    HR_SALARY_LIST_MODAL_LOADING
} from '../actions/hrSalaryAction';


const INITIAL_STATE={
                    currentSalaries:[],
    salaryListModalOpened: false,
    salaryListModalLoading: false

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case HR_FETCHED_CURRENT_SALARIES:
            return {...state,currentSalaries: action.payload, salaryListModalLoading: false}

        case HR_SALARY_LIST_MODAL_OPENED:
            return {...state, salaryListModalOpened: action.payload}

        case HR_SALARY_LIST_MODAL_LOADING:
            return {...state, salaryListModalLoading: action.payload}

        default:
            return state;
    }
}


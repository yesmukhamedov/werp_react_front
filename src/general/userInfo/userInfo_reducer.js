import { FETCH_USER_INFO  } from './userInfo_action';

const INITIAL_STATE={ branchOptionsAll: [],branchOptionsMarketing: [],branchOptionsService: []};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case FETCH_USER_INFO:
            return {...state,branchOptionsAll:action.all,branchOptionsMarketing:action.marketing,branchOptionsService:action.service,companyOptions:action.bukrs};
        default:
            return state;
    }
}


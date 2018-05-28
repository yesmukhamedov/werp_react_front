import { CHANGE_FA_BKPF, CLEAR_FA_BKPF, FETCH_CASHBANKHKONTS_BY_BRANCH , CLEAR_CASHBANKHKONTS_BY_BRANCH  } from './fa_action';
const INITIAL_STATE={ faForm:{bkpf:{},hkontOptions:[]}};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case CHANGE_FA_BKPF:
            return {...state, faForm:{...state.faForm,bkpf:action.bkpf}};    
        case CLEAR_FA_BKPF:            
            return {...state, faForm:{...state.faForm,bkpf:{}}};  
        case FETCH_CASHBANKHKONTS_BY_BRANCH:
            return {...state, faForm:{...state.faForm,hkontOptions:action.hkontOptions}};   
        case CLEAR_CASHBANKHKONTS_BY_BRANCH:            
                return {...state, faForm:{...state.faForm,hkontOptions:[]}};   

        default:
            return state;
    }
}
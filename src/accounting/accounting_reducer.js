import {  } from './accounting_action';
// import moment from 'moment';
const INITIAL_STATE=    { 
                        
                        };

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        // case CHANGE_FA_BKPF:
        //     return {...state, faForm:{...state.faForm,bkpf:action.bkpf}};    
        // case CLEAR_FA_BKPF:            
        //     return {...state, faForm:{...state.faForm,bkpf:{...this.state.faForm.initialBkpf}}};  

        default:
            return state;
    }
}
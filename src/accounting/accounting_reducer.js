import { FETCH_AMCDD, CLEAR_AMCDD, CHANGE_AMCDD } from './accounting_action';
// import moment from 'moment';
const INITIAL_STATE=    { dynamicObject:{}
                        };

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case FETCH_AMCDD:
            return {...state, dynamicObject: action.data};  
        case CHANGE_AMCDD:            
                return {...state, dynamicObject: action.data};  
        case CLEAR_AMCDD:            
            return {...state, dynamicObject: {}};  

        default:
            return state;
    }
}
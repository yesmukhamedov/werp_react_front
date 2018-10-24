import { 
    REF_CURRENT_TRANSACTIONS,
    CREATE_TRANSACTION,
    TRANSACTION_UPDATE

} from '../actions/transactionAction';

const INITIAL_STATE={
    currentTransactions:[],
    transaction:{},
 };

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case REF_CURRENT_TRANSACTIONS:
            return {...state, currentTransactions: action.items};
        case CREATE_TRANSACTION:
            let newTr = Object.assign([], state.currentTransactions);
            newTr.push(action.payload);
            return {...state, currentTransactions: newTr};
        case TRANSACTION_UPDATE:
            let updatedItem = action.payload;
            let newItems = [];
            console.log(updatedItem);
            for(let k in state.currentTransactions){
                if(state.currentTransactions[k]['transaction_id'] === updatedItem['transaction_id']){
                    newItems.push(updatedItem)
                } else {
                    newItems.push(state.currentTransactions[k])
                }
            }
            return {...state,currentTransactions: newItems};
        default:
            return state;
    }
}

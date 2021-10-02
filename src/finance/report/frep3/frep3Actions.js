import { doGet, doPost, doPut } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_RESULT = 'FETCH_RESULT';

export const fetchFrep3List = param => {
    alert('pong in Action');
    console.log('param in action: ', param);
    return function(dispatch) {};
};

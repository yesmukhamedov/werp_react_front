import browserHistory from '../../utils/history';

export const NOTIFY = 'NOTIFY'

export function notify (a_notify_type, a_notify_text, a_notify_header) {
  const obj = {
    type: NOTIFY,
    notifyType: a_notify_type,
    notifyText: a_notify_text,
    notifyHeader: a_notify_header
  }
  return obj
}

export function handleError(error,dispatch) {
    if(error.response) {
        // console.log(error);
        if (error.response.status && error.response.status===403)
        {
            //blog post has been created, navigate the user to the index
            //We navigate by calling this.context.router.push with the new path to navigate to
            //this.context.router.push('/forbidden');
            browserHistory.push('/forbidden')
        }
        else if (error.response.status && error.response.status===500)
        {
            //blog post has been created, navigate the user to the index
            //We navigate by calling this.context.router.push with the new path to navigate to
            //this.context.router.push('/forbidden');
            browserHistory.push('/forbidden')
        }
        dispatch(notify('error',error.response.data.message,'Ошибка'));

    } else {
        // const name = getNestedObject(error, ['error', 'response']);

        const get = function(obj, key) {
            return key.split(".").reduce(function(o, x) {
                return (typeof o == "undefined" || o === null) ? o : o[x];
            }, obj);
        }
        
        let message = "";
        if (get(error, 'error.response.data.message')!==undefined){
            message = error.response.data.message;
        }
        else if (get(error, 'error.response.data')!==undefined){
            message = error.response.data;
        }
        else if (get(error, 'error.response')!==undefined){
            message = error.response;
        }
        else if (get(error, 'error')!==undefined){
            message = error;
        }
        else 
        {            
            message = "TypeError, check console";
            console.log(error);
        }
        
        Promise.resolve({ error }).then(response => dispatch(notify('error',message,'Ошибка')));
    }
    
}

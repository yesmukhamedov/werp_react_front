import browserHistory from '../../utils/history';

export const NOTIFY = 'NOTIFY';

export function notify(a_notify_type, a_notify_text, a_notify_header) {
  const obj = {
    type: NOTIFY,
    notifyType: a_notify_type,
    notifyText: a_notify_text,
    notifyHeader: a_notify_header,
  };
  return obj;
}

export function handleError(error, dispatch) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  if (error.response) {
    // console.log(error);
    if (error.response.status && error.response.status === 403) {
      browserHistory.push('/forbidden');
    } else if (error.response.status && error.response.status === 500) {
      browserHistory.push('/forbidden');
    } else if (error.response.status && error.response.status === 400) {
      dispatch(
        notify(
          'error',
          error.response.data.message,
          errorTable[`132${language}`],
        ),
      );
    } else
      dispatch(
        notify(
          'error',
          error.response.data.message,
          errorTable[`132${language}`],
        ),
      );
  } else {
    // const name = getNestedObject(error, ['error', 'response']);

    const get = function(obj, key) {
      return key
        .split('.')
        .reduce(
          (o, x) => (typeof o === 'undefined' || o === null ? o : o[x]),
          obj,
        );
    };

    let message = '';
    if (get(error, 'error.response.data.message') !== undefined) {
      message = error.response.data.message;
    } else if (get(error, 'error.response.data') !== undefined) {
      message = error.response.data;
    } else if (get(error, 'error.response') !== undefined) {
      message = error.response;
    } else if (get(error, 'error') !== undefined) {
      message = error;
    } else {
      message = 'TypeError, check console';
      console.log(error);
    }

    Promise.resolve({ error }).then(response =>
      dispatch(notify('error', message, errorTable[`132${language}`])),
    );
  }
}

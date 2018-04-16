import axios from 'axios';
import {
  FETCH_CONTRACT_DETAILS,
  CREATE_NEW_TASK,
  FETCH_TASKS,
  OUTCALL_STATUS_COMMENT_UPDATED,
  CREATE_OUTCALL,
} from './actionTypes';
import { ROOT_URL } from '../../../../../utils/constants';
import { notify } from '../../../../../general/notification/notification_action';

// .then((response) => {
//   this.props.notify('success', 'Сервис пакет сохранен.', 'Успешно');
// })
// .catch((err) => {
//   this.props.notify('error', `Не удалось сохранить новый сервис пакет! ${err}`, 'Ошибка');
// });

export function fetchContractById(contractNumber) {
  const req = axios.get(
    `${ROOT_URL}/api/call-center/out-calls/${contractNumber}`,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: FETCH_CONTRACT_DETAILS,
          payload: data,
        });
      })
      .catch(err => dispatch(notify('error', `Не удалось получить детали контракта! ${err}`, 'Ошибка')));
  };
}

export function createOutCallFromContract({ contractNumber }) {
  const req = axios.post(
    `${ROOT_URL}/api/call-center/out-calls/${contractNumber}`, {},
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: CREATE_OUTCALL,
          payload: data,
        });
        dispatch(notify('success', 'Заявка успешно привязана.', 'Успешно'));
      })
      .catch(err => dispatch(notify('error', `Не удалось привязать заявку! ${err}`, 'Ошибка')));
  };
}

export function createNewTask(contractNumber, params) {
  const req = axios.post(
    `${ROOT_URL}/api/call-center/out-calls/${contractNumber}/tasks`,
    {
      title: params.title,
      description: params.description,
      status: {
        id: params.status,
      },
      priority: {
        id: params.priority,
      },
      recipient: {
        branch: {
          id: params.branch,
        },
        department: {
          id: params.department,
        },
        position: {
          id: params.position,
        },
      },
    },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: CREATE_NEW_TASK,
          payload: data,
        });
        dispatch(notify('success', 'Задача успешно создана.', 'Успешно'));
      })
      .catch(err => dispatch(notify('error', `Не удалось создать задачу! ${err}`, 'Ошибка')));
  };
}

export function fetchTasks(contractNumber) {
  const req = axios.get(
    `${ROOT_URL}/api/call-center/out-calls/${contractNumber}/tasks`,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: FETCH_TASKS,
          payload: data,
        });
      })
      .catch(err => dispatch(notify('error', `Не удалось получть список задач! ${err}`, 'Ошибка')));
  };
}

export function updateOutCall(newOutCallParams) {
  const req = axios.put(
    `${ROOT_URL}/api/call-center/out-calls/${newOutCallParams.id}`,
    {
      id: newOutCallParams.id,
      status: {
        id: newOutCallParams.status,
      },
      newComment: newOutCallParams.text,
    },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: OUTCALL_STATUS_COMMENT_UPDATED,
          payload: data,
        });
        dispatch(notify('success', 'Заявка успешно обновлена.', 'Успешно'));
      })
      .catch(err => dispatch(notify('error', `Не удалось обновить заявку! ${err}`, 'Ошибка')));
  };
}

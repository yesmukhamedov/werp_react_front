import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';

const createTaskUrl = `${ROOT_URL}/api/tasks`;

export default {
  task: {
    create: task =>
      axios
        .post(createTaskUrl, task, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        })
        .then(res => res.data),
  },
};

import { doPost } from '../../../../utils/apiActions';

const createTaskUrl = `tasks`;

export default {
  task: {
    create: task => doPost(createTaskUrl, task).then(res => res.data),
  },
};

import { doPost } from '../../../../utils/apiActions';

const createTaskUrl = `core/tasks`;

export default {
    task: {
        create: task => doPost(createTaskUrl, task).then(res => res.data),
    },
};

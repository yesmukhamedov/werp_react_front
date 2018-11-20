import React from 'react';
import { injectIntl } from 'react-intl';
import TaskInfoComponent from '../../../../../../../dit/tasks/dtskedit/components/TaskInfo/TaskInfoComponent';
import TaskEditContainer from './TaskEditContainer';
import { messages } from '../../../../../../../locales/defineMessages';

const TaskInfoWrapper = props => (
  <TaskInfoComponent
    messages={messages}
    TaskEditContainer={TaskEditContainer}
    {...props}
  />
);

export default injectIntl(TaskInfoWrapper);

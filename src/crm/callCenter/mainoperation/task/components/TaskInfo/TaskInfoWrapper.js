import React from 'react';
import { injectIntl } from 'react-intl';
import TaskInfoComponent from './TaskInfoComponent';
import TaskEditContainer from '../TaskEdit/TaskEditContainer';
import { messages } from '../../../../../../locales/defineMessages';

const TaskInfoWrapper = props => (
  <TaskInfoComponent
    messages={messages}
    TaskEditContainer={TaskEditContainer}
    {...props}
    uploadble="true"
  />
);

export default injectIntl(TaskInfoWrapper);

import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Segment, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDMYMS, constructFullName } from '../../../../../utils/helpers';

import TaskHistoryItemDisplay from './TaskHistoryContainer';

const TaskHistoryDisplay = (props) => {
  const { history, messages } = props;
  return (
    <Segment padded color="grey">
      <Comment.Group style={{ maxWidth: '100%' }}>
        <Header as="h3" dividing>{messages.H__HISTORY}</Header>
        {
          history &&
          history.map((item, idx) => (
            <Comment key={idx}>
              <Comment.Content>
                <Comment.Author as="a">
                  {item.author && constructFullName(item.author)}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{ formatDMYMS(item.createdAt)}</div>
                </Comment.Metadata>
                <TaskHistoryItemDisplay text={item.text} history={item.historyItem} messages={messages} />
              </Comment.Content>
            </Comment>
          ))
        }
      </Comment.Group>
    </Segment>
  );
};

TaskHistoryDisplay.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskHistoryDisplay;

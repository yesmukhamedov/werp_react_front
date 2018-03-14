/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Segment, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const TaskHistoryDisplay = (props) => {
  const { comments } = props;
  return (
    <Segment padded color="grey">
      <Comment.Group style={{ maxWidth: '100%' }}>
        <Header as="h3" dividing>История</Header>
        {
          comments &&
          comments.map((item, idx) => (
            <Comment key={idx}>
              <Comment.Content>
                <Comment.Author as="a">
                  {item.author && `${item.author.lastName} ${item.author.firstName} ${item.author.patronymic}`}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{moment(item.createdAt, 'YYYY-MM-DDTHH:mm:ssZ').utc().format('DD.MM.YYYY, hh:mm:ss')}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{item.text}</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))
        }
      </Comment.Group>
    </Segment>
  );
};

TaskHistoryDisplay.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskHistoryDisplay;

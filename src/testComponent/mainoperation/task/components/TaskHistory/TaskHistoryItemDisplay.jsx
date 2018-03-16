/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Segment, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const TaskHistoryItemDisplay = (props) => {
  let diff = {};
  const { history, text } = props;
  try {
    diff = JSON.parse(props.history);
  } catch (e) {
    diff = {};
  }
  const {
    title,
    description,
    status,
    priority,
    branch,
    department,
    position,
  } = diff;
  return (
    <div>
      <Comment.Text>
        <p>{text}</p>
      </Comment.Text>
      {
        diff.touched &&
        <div>
          <Comment.Text>
            <p>{title && `${title.from} -> ${title.to}`}</p>
          </Comment.Text>
          <Comment.Text>
            <p>{description && `${description.from} -> ${description.to}`}</p>
          </Comment.Text>
          <Comment.Text>
            <p>{status && `${status.from} -> ${status.to}`}</p>
          </Comment.Text>
          <Comment.Text>
            <p>{priority && `${priority.from} -> ${priority.to}`}</p>
          </Comment.Text>
          <Comment.Text>
            <p>{branch && `${branch.from} -> ${branch.to}`}</p>
          </Comment.Text>
          <Comment.Text>
            <p>{department && `${department.from} -> ${department.to}`}</p>
          </Comment.Text>
          <Comment.Text>
            <p>{position && `${position.from} -> ${position.to}`}</p>
          </Comment.Text>
        </div>
      }
    </div>
  );
};

TaskHistoryItemDisplay.propTypes = {
  history: PropTypes.object,
  text: PropTypes.string,
};

export default TaskHistoryItemDisplay;

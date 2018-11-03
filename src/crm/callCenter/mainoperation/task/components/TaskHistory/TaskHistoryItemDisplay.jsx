/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';
import { Comment, List } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDMY } from '../../../../../../utils/helpers';

const TaskHistoryItemDisplay = (props) => {
  let diff = {};
  try {
    diff = JSON.parse(props.history);
  } catch (e) {
    diff = {};
  }
  const { dir, messages } = props;
  return (
    <div>
      {
        diff &&
        <div>
          <Comment.Text>
            <List as="ol">
              {diff.title &&
                <List.Item as="li" value="-">
                  <i>{`${messages.TX__TITLE_CHANGED} ${diff.title.from} ${messages.TX__TO} ${diff.title.to}`}</i>
                </List.Item>}
              {diff.description &&
                <List.Item as="li" value="-">
                  <i>{`${messages.TX__DESCRIPTION_CHANGED} ${diff.description.from} ${messages.TX__TO} ${diff.description.to}`}</i>
                </List.Item>}
              {diff.status &&
                <List.Item as="li" value="-">
                  <i>
                    {`${messages.TX__STATUS_CHANGED} ${dir.statusOptions[diff.status.from].text} 
                                                ${messages.TX__TO} ${dir.statusOptions[diff.status.to].text}`}
                  </i>
                </List.Item>}
              {diff.priority &&
                <List.Item as="li" value="-">
                  <i>
                    {`${messages.TX__PRIORITY_CHANGED} ${dir.priorityOptions[diff.priority.from].text} 
                                                   ${messages.TX__TO} ${dir.priorityOptions[diff.priority.to].text}`}
                  </i>
                </List.Item>}
              {diff.branch &&
                <List.Item as="li" value="-">
                  <i>
                    {`${messages.TX__BRANCH_CHANGED} ${dir.branchOptions[diff.branch.from] && dir.branchOptions[diff.branch.from].text} 
                                            ${messages.TX__TO} ${dir.branchOptions[diff.branch.to] && dir.branchOptions[diff.branch.to].text}`}
                  </i>
                </List.Item>}
              {diff.department &&
                <List.Item as="li" value="-">
                  <i>
                    {`${messages.TX__DEPARTMENT_CHANGED} ${dir.deptOptions[diff.department.from].text} 
                                                     ${messages.TX__TO} ${dir.deptOptions[diff.department.to].text}`}
                  </i>
                </List.Item>}
              {diff.position &&
                <List.Item as="li" value="-">
                  <i>
                    {`${messages.TX__POSITION_CHANGED} ${dir.posOptions[diff.position.from] && dir.posOptions[diff.position.from].text} 
                                                   ${messages.TX__TO} ${dir.posOptions[diff.position.to].text}`}
                  </i>
                </List.Item>}
              {diff.estimatedAt &&
                <List.Item as="li" value="-">
                  <i>
                    {`${messages.TX__ENDDATE_CHANGED} ${diff.estimatedAt.from !== 'null' ? formatDMY(diff.estimatedAt.from) : '---'} ${messages.TX__TO} ${formatDMY(diff.estimatedAt.to)}`}
                  </i>
                </List.Item>}
              {diff.assignee &&
                <List.Item as="li" value="-">
                  <i>
                    {`${messages.TX__ASSIGNEE_CHANGED} ${diff.assignee.from} ${messages.TX__TO} ${diff.assignee.to}`}
                  </i>
                </List.Item>}
            </List>
          </Comment.Text>
        </div>
      }
      <Comment.Text>
        <p>{props.text}</p>
      </Comment.Text>
    </div>
  );
};

TaskHistoryItemDisplay.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  text: PropTypes.string,
  dir: PropTypes.object,
};

export default TaskHistoryItemDisplay;

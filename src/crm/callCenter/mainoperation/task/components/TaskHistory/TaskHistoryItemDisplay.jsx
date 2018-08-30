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
  const { dir } = props;
  return (
    <div>
      {
        diff &&
        <div>
          <Comment.Text>
            <List as="ol">
              {diff.title &&
                <List.Item as="li" value="-">
                  <i>{`Параметр Тема изменился с ${diff.title.from} на ${diff.title.to}`}</i>
                </List.Item>}
              {diff.description &&
                <List.Item as="li" value="-">
                  <i>{`Параметр Описание изменился с ${diff.description.from} на ${diff.description.to}`}</i>
                </List.Item>}
              {diff.status &&
                <List.Item as="li" value="-">
                  <i>
                    {`Параметр Статус изменился с ${dir.statusOptions[diff.status.from].text} 
                                                на ${dir.statusOptions[diff.status.to].text}`}
                  </i>
                </List.Item>}
              {diff.priority &&
                <List.Item as="li" value="-">
                  <i>
                    {`Параметр Приоритет изменился с ${dir.priorityOptions[diff.priority.from].text} 
                                                   на ${dir.priorityOptions[diff.priority.to].text}`}
                  </i>
                </List.Item>}
              {diff.branch &&
                <List.Item as="li" value="-">
                  <i>
                    {`Параметр Филиал изменился с ${dir.branchOptions[diff.branch.from] && dir.branchOptions[diff.branch.from].text} 
                                            на ${dir.branchOptions[diff.branch.to] && dir.branchOptions[diff.branch.to].text}`}
                  </i>
                </List.Item>}
              {diff.department &&
                <List.Item as="li" value="-">
                  <i>
                    {`Параметр Департамент изменился с ${dir.deptOptions[diff.department.from].text} 
                                                     на ${dir.deptOptions[diff.department.to].text}`}
                  </i>
                </List.Item>}
              {diff.position &&
                <List.Item as="li" value="-">
                  <i>
                    {`Параметр Должность изменился с ${dir.posOptions[diff.position.from] && dir.posOptions[diff.position.from].text} 
                                                   на ${dir.posOptions[diff.position.to].text}`}
                  </i>
                </List.Item>}
              {diff.estimatedAt &&
                <List.Item as="li" value="-">
                  <i>
                    {`Параметр Дата завершения изменился с ${diff.estimatedAt.from !== 'null' ? formatDMY(diff.estimatedAt.from) : '---'} на ${formatDMY(diff.estimatedAt.to)}`}
                  </i>
                </List.Item>}
              {diff.assignee &&
                <List.Item as="li" value="-">
                  <i>
                    {`Параметр Исполнитель изменился с ${diff.assignee.from} на ${diff.assignee.to}`}
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

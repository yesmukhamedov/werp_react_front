import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';
import { constructFullName } from '../../../../utils/helpers';

const DtskcSummary = (props) => {
  const { location = {} } = props;
  const { state = {} } = location;

  console.log('LOCATION', location);
  return (
    <Container
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Номер задачи</Table.HeaderCell>
            <Table.HeaderCell>Тема</Table.HeaderCell>
            <Table.HeaderCell>Исполнитель</Table.HeaderCell>
            <Table.HeaderCell>Начальник исполнитея</Table.HeaderCell>
            <Table.HeaderCell>Филиал</Table.HeaderCell>
            <Table.HeaderCell>Отдел</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {state.createdTasks ? (
            state.createdTasks.map(task => renderTaskAssignee(task))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="6" textAlign="center">
                Нет зачач для отображения
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

const renderTaskAssignee = (task) => {
  const { recipient } = task;
  const {
    assignee,
    assigneesManager,
    branch,
    department,
  } = recipient;
  return (
    <Table.Row>
      <Table.Cell>
        {/* <Link to={`/dit/task/dtskedit/${task.id}`}>{task.id}</Link> */}
        {task.id}
      </Table.Cell>
      <Table.Cell>{task.title}</Table.Cell>
      <Table.Cell>{(assignee ? constructFullName(assignee) : <span>&mdash;</span>)}</Table.Cell>
      <Table.Cell>{(assigneesManager ? assigneesManager.value : <span>&mdash;</span>)}</Table.Cell>
      <Table.Cell>{(branch ? branch.value : <span>&mdash;</span>)}</Table.Cell>
      <Table.Cell>{(department ? department.value : <span>&mdash;</span>)}</Table.Cell>
    </Table.Row>
  );
};
export default DtskcSummary;

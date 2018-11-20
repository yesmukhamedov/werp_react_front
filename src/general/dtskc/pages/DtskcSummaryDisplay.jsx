import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';

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
            <Table.HeaderCell>Назначена</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {state.createdTasks ? (
            state.createdTasks.map(task => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/general/dtskedit/${task.id}`}>{task.id}</Link>
                </Table.Cell>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell textAlign="right">{JSON.stringify(task)}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="3">
                Нет зачач для отображения
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};
export default DtskcSummary;

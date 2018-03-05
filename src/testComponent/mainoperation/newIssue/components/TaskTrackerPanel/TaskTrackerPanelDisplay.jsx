import React from 'react';
import PropTypes from 'prop-types';
import { Table, Segment, Header } from 'semantic-ui-react';

const TaskTrackerPanelDisplay = props => (
  <Segment>
    <Header size="large">Задачи</Header>
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Номер</Table.HeaderCell>
          <Table.HeaderCell>Статус</Table.HeaderCell>
          <Table.HeaderCell>Приоритет</Table.HeaderCell>
          <Table.HeaderCell>Тема</Table.HeaderCell>
          <Table.HeaderCell>Назнчена</Table.HeaderCell>
          <Table.HeaderCell>Обновлено</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row onClick={() => console.log(this)}>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
          <Table.Cell>Requires call</Table.Cell>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill</Table.Cell>
          <Table.Cell>Denied</Table.Cell>
          <Table.Cell>None</Table.Cell>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
        <Table.Row warning>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie</Table.Cell>
          <Table.Cell positive>Approved</Table.Cell>
          <Table.Cell warning>Requires call</Table.Cell>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill</Table.Cell>
          <Table.Cell negative>Denied</Table.Cell>
          <Table.Cell>None</Table.Cell>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>No Action</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Segment>
);

TaskTrackerPanelDisplay.propTypes = {

};

export default TaskTrackerPanelDisplay;

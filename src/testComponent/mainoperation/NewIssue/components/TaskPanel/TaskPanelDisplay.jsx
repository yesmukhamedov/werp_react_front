import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Segment, Header } from 'semantic-ui-react';
import { OutCallDetailsPanelDisplay } from '../OutCallDetailsPanel';

const TaskPanelDisplay = props => (
  <Segment>
    <Header as='h3' dividing>Задачи</Header>
    <Table structured celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Номер задачи</Table.HeaderCell>
          <Table.HeaderCell>Статус</Table.HeaderCell>
          <Table.HeaderCell>Приоритет</Table.HeaderCell>
          <Table.HeaderCell>Тема</Table.HeaderCell>
          <Table.HeaderCell>Назначена</Table.HeaderCell>
          <Table.HeaderCell>Обновлена</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>John Lilki</Table.Cell>
          <Table.Cell>September 14, 2013</Table.Cell>
          <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
          <Table.Cell>No</Table.Cell>
          <Table.Cell>No</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie Harington</Table.Cell>
          <Table.Cell>January 11, 2014</Table.Cell>
          <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
          <Table.Cell>No</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill Lewis</Table.Cell>
          <Table.Cell>May 11, 2014</Table.Cell>
          <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
          <Table.Cell>No</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="6">
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="file text" /> Новая задача
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </Segment>
);

TaskPanelDisplay.propTypes = {
  // taskList: PropTypes.arrayOf(Object).isRequired,
};

export default TaskPanelDisplay;

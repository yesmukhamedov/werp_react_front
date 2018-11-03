import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

const AssigneePanelDisplay = (props) => {
  const { toggleModal, modalState } = props;
  return (
    <Table color="grey">
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Assignee Panel</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>John Lilki</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie Harington</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill Lewis</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell>
            <Button
              onClick={() => toggleModal(modalState)}
              floated="right"
              labelPosition="left"
              size="small"
              primary
              icon
            >
              <Icon name="user" /> Add Assignee
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default AssigneePanelDisplay;

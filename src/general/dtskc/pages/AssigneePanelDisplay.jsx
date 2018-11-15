import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

const AssigneePanelDisplay = props => {
  const {
    toggleModal,
    groups,
    persons,
    removeGroup,
    removePerson,
  } = props;

  return (
    <Table color="grey">
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Assignee Panel</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {groups.map(({ id, groupDetail }) => (
          <Table.Row key={id}>
            <Table.Cell>{JSON.stringify(groupDetail)}</Table.Cell>
            <Table.Cell>
              <Button icon="delete" onClick={() => removeGroup(id)} />
            </Table.Cell>
          </Table.Row>
        ))}
        {persons.map(({ id, recipient }) => (
          <Table.Row key={(id, recipient)}>
            <Table.Cell>{JSON.stringify(recipient)}</Table.Cell>
            <Table.Cell>
              <Button icon="delete" onClick={() => removePerson(id)} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell>
            <Button
              onClick={toggleModal}
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

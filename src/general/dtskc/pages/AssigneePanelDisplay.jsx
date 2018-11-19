import React from 'react';
import { Table, Button, Icon, Segment, List, Label } from 'semantic-ui-react';

const renderGroup = recipientList => (
  <Segment>
    <List divided selection>
      {recipientList.map((member) => {
        const { id, meta } = member;
        return (
          <List.Item key={id}>
            <List.Content>
              <List.Header>{meta.user}</List.Header>
              <Label color="yellow" horizontal>
                {meta.branch}
              </Label>
              <Label color="blue" horizontal>
                {meta.department}
              </Label>
              - {meta.supervisor}
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  </Segment>
);

const AssigneePanelDisplay = (props) => {
  const {
 toggleModal, groups, persons, removeGroup, removePerson 
} = props;

  return (
    <Table fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="left" width="1">Тип</Table.HeaderCell>
          <Table.HeaderCell fullWidth>Исполнитель</Table.HeaderCell>
          <Table.HeaderCell fullWidth>Менеджер исполнителя</Table.HeaderCell>
          <Table.HeaderCell fullWidth>Филиал</Table.HeaderCell>
          <Table.HeaderCell fullWidth>Департамент</Table.HeaderCell>
          <Table.HeaderCell textAlign="right" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {groups.map(({ id, groupDetail }) => (
          <Table.Row>
            <Table.Cell>
              <Icon name="group" />
            </Table.Cell>
            <Table.Cell colSpan="4">{groupDetail.text}</Table.Cell>
            <Table.Cell textAlign="right">
              <Button icon="delete" onClick={() => removeGroup(id)} />
            </Table.Cell>
          </Table.Row>
        ))}
        {persons.map(({ id, recipient }) => (
          <Table.Row key={id}>
            <Table.Cell>
              <Icon name="user" />
            </Table.Cell>
            <Table.Cell>
              {recipient.meta.user}
            </Table.Cell>
            <Table.Cell>
              {recipient.meta.supervisor}
            </Table.Cell>
            <Table.Cell>
              {recipient.meta.branch}
            </Table.Cell>
            <Table.Cell>
              {recipient.meta.department}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button icon="delete" onClick={() => removePerson(id)} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row fullWidth>
          <Table.HeaderCell colSpan="6">
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

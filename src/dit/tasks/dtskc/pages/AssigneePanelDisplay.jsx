import React from 'react';
import { Table, Button, Icon, Segment, List, Label } from 'semantic-ui-react';

const AssigneePanelDisplay = (props) => {
  const {
    messages,
    toggleModal,
    groups,
    persons,
    removeGroup,
    removePerson,
    lang,
  } = props;

  return (
    <Table fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="left" width="1">
            Тип
          </Table.HeaderCell>
          <Table.HeaderCell fullWidth>{messages.TBL_H__ASSIGNEE}</Table.HeaderCell>
          <Table.HeaderCell fullWidth>{messages.TBL_H__ASSIGNEE_MANAGER}</Table.HeaderCell>
          <Table.HeaderCell fullWidth>{messages.TBL_H__BRANCH}</Table.HeaderCell>
          <Table.HeaderCell fullWidth>{messages.TBL_H__DEPARTMENT}</Table.HeaderCell>
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
            <Table.Cell>{recipient.meta.user}</Table.Cell>
            <Table.Cell>{recipient.meta.supervisor}</Table.Cell>
            <Table.Cell>{recipient.meta.branch.text}</Table.Cell>
            <Table.Cell>{recipient.meta.department[lang]}</Table.Cell>
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
              <Icon name="user" />{messages.BTN__ADD}
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default AssigneePanelDisplay;

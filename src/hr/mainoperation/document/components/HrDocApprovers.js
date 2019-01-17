import React from 'react';
import { Segment, Label, Table, Button, Icon } from 'semantic-ui-react';

export default function HrDocApprovers(props) {
  const { items, showRemoveButtons } = props;
  if (!items) {
    return null;
  }

  const removeApprover = id => {
    if (!window.confirm('Действительно хотите удалить согласующего?')) {
      return false;
    }

    props.removeApprover(id);
  };
  return (
    <Segment raised>
      <Label color="blue" ribbon>
        Согласующие
      </Label>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>ФИО</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Действие</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, idx) => (
            <Table.Row key={item.id}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.positionName}</Table.Cell>
              <Table.Cell>{item.statusName}</Table.Cell>
              <Table.Cell>
                {showRemoveButtons ? (
                  <Button
                    negative
                    size="mini"
                    icon={true}
                    onClick={() => removeApprover(item.id)}
                  >
                    <Icon name="trash" />
                  </Button>
                ) : (
                  ''
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
}

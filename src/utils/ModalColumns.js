import React from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Checkbox,
  Table,
} from 'semantic-ui-react';

const ModalColumns = props => {
  const { columns = [] } = props;
  return (
    <Modal
      size="mini"
      trigger={<Button color="teal">Столбцы</Button>}
      closeIcon
    >
      <Header icon="columns" content="Столбцы" />
      <Modal.Content>
        <Table celled>
          {columns.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Checkbox label={item.Header} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red">
          <Icon name="remove" /> Отменить
        </Button>
        <Button color="green">
          <Icon name="checkmark" /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalColumns;

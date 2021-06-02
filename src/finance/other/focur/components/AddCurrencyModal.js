import React from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Table,
  Form,
  Dropdown,
  Input,
} from 'semantic-ui-react';

const AddCurrencyModal = props => {
  const { messages, open, onClose, saveNewCourse } = props;

  return (
    <Modal closeIcon open={open} onClose={onClose}>
      <Header content="Добавить новый курс" />
      <Modal.Content>
        <Form>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Валюта</Table.HeaderCell>
                <Table.HeaderCell>1 USD</Table.HeaderCell>
                <Table.HeaderCell>Вид</Table.HeaderCell>
                <Table.HeaderCell>Компания</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Dropdown
                    placeholder="Валюта"
                    search
                    selection
                    options={[]}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input focus placeholder="0" />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown placeholder="Вид" search selection options={[]} />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder="Компания"
                    search
                    selection
                    options={[]}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onClose}>
          <Icon name="remove" /> Отмена
        </Button>
        <Button color="green" onClick={saveNewCourse}>
          <Icon name="checkmark" /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddCurrencyModal;

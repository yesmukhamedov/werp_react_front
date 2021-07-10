import React, { useEffect } from 'react';
import {
  Modal,
  Button,
  Header,
  Icon,
  Table,
  Input,
  Dropdown,
} from 'semantic-ui-react';

const ModalCreate = props => {
  const {
    open,
    closeCrudModal,
    crudData = {},
    saveCrudModal,
    createFormData,
    tempData = {},
    trans = '',
    getCategory = () => {},
    options = [],
  } = props;

  const { headerText, data = [] } = crudData;

  useEffect(() => {
    if (trans === 'ReasonsContact') {
      getCategory();
    }
  }, [trans]);

  return (
    <Modal closeIcon open={open} onClose={closeCrudModal}>
      <Header content={headerText} />
      <Modal.Content>
        <Table celled size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Наименование</Table.HeaderCell>
              <Table.HeaderCell>English</Table.HeaderCell>
              <Table.HeaderCell>Türk</Table.HeaderCell>
              {trans === 'ReasonsContact' ? (
                <Table.HeaderCell>Категория</Table.HeaderCell>
              ) : (
                ''
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Input
                  value={tempData.name}
                  onChange={(e, { value }) => createFormData('name', value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  value={tempData.nameEn}
                  onChange={(e, { value }) => createFormData('nameEn', value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  value={tempData.nameTr}
                  onChange={(e, { value }) => createFormData('nameTr', value)}
                />
              </Table.Cell>
              {trans === 'ReasonsContact' ? (
                <Table.Cell>
                  <Dropdown
                    selection
                    options={options}
                    onChange={(e, { value }) =>
                      createFormData('category', value)
                    }
                  />
                </Table.Cell>
              ) : (
                ''
              )}
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={closeCrudModal}>
          <Icon name="remove" />
          Отмена
        </Button>
        <Button color="green" onClick={saveCrudModal}>
          <Icon name="checkmark" /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalCreate;

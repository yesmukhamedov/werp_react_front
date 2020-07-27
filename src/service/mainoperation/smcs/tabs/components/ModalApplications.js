import React, { useState, useEffect } from 'react';
import { Table, Modal, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ModalApplications = props => {
  const { open, closeModal, applications = [] } = props;
  return (
    <Modal open={open} closeIcon>
      <Header content="Выберите доступные заявки" />
      <Modal.Content>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>CN</Table.HeaderCell>
              <Table.HeaderCell>ФИО клиента</Table.HeaderCell>
              <Table.HeaderCell>Мастер</Table.HeaderCell>
              <Table.HeaderCell>Оператор</Table.HeaderCell>
              <Table.HeaderCell>Вид заявки</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>3</Table.Cell>
              <Table.Cell>4</Table.Cell>
              <Table.Cell>5</Table.Cell>
              <Table.Cell>
                <Link
                  target="_blank"
                  to={`../mainoperation/smcs?applicationNumber=`}
                >
                  <Button color="green" fluid>
                    Перейти
                    <Icon name="angle right"></Icon>
                  </Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={closeModal}>
          <Icon name="remove" /> Отмена
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalApplications;

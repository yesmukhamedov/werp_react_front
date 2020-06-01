import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Checkbox,
  Table,
} from 'semantic-ui-react';

const ModalColumns = props => {
  const { columns = [], transaction, finishColumns } = props;
  const [modal, setModal] = useState(false);
  const [state, setState] = useState([]);
  const [stateColumns, setStateColumns] = useState([...columns]);

  console.log('state columns', stateColumns);

  const changeChekcbox = value => {
    if (value.checked === true) {
      setStateColumns(
        stateColumns.map(item =>
          item.accessor === value.accessor
            ? {
                ...item,
                checked: false,
              }
            : item,
        ),
      );
    } else {
      setStateColumns(
        stateColumns.map(item =>
          item.accessor === value.accessor
            ? {
                ...item,
                checked: true,
              }
            : item,
        ),
      );
    }
  };

  const saveColumns = () => {
    let columnsFilter = stateColumns.filter(item => item.checked === true);
    setState([...columnsFilter]);
    finishColumns(columnsFilter);
    setModal(false);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Modal
      open={modal}
      size="mini"
      trigger={
        <Button color="teal" onClick={() => setModal(true)}>
          Столбцы
        </Button>
      }
      closeIcon
      onClose={closeModal}
    >
      <Header icon="columns" content="Столбцы" />
      <Modal.Content>
        <Table celled>
          <Table.Body>
            {stateColumns.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell key={index}>
                  <Checkbox
                    key={index}
                    checked={item.checked}
                    label={item.Header}
                    onChange={() => changeChekcbox(item)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={closeModal}>
          <Icon name="remove" /> Отменить
        </Button>
        <Button color="green" onClick={saveColumns}>
          <Icon name="checkmark" /> Применить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalColumns;

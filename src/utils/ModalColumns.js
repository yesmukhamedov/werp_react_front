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
  const { columns = [], transaction } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    if (
      localStorage.transaction === null ||
      localStorage.transaction === undefined
    ) {
      setState([...columns]);
    } else {
      let ls = localStorage.getItem(transaction);
      let lsParse = JSON.parse(ls);
      setState([...lsParse]);
    }
  }, []);

  const changeChekcbox = value => {
    if (value.checked === true) {
      setState(
        state.map(item =>
          item.accessor === value.accessor
            ? {
                ...item,
                checked: false,
              }
            : item,
        ),
      );
    } else {
      setState(
        state.map(item =>
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

  useEffect(() => {
    let myJSON = JSON.stringify(state, ['Header', 'accessor', 'checked']);
    localStorage.setItem(transaction, myJSON);
  }, [state]);

  const saveColumns = () => {};
  return (
    <Modal
      size="mini"
      trigger={<Button color="teal">Столбцы</Button>}
      closeIcon
    >
      <Header icon="columns" content="Столбцы" />
      <Modal.Content>
        <Table celled>
          {state.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Checkbox
                  checked={item.checked}
                  label={item.Header}
                  onChange={() => changeChekcbox(item)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red">
          <Icon name="remove" /> Отменить
        </Button>
        <Button color="green" onClick={saveColumns}>
          <Icon name="checkmark" /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalColumns;

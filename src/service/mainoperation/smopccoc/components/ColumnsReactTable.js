import React, { useState, useEffect } from 'react';
import { Button, Modal, Header, Icon, Checkbox } from 'semantic-ui-react';

const ColumnsReactTable = props => {
  const { transactionName = 'Smopccoc', columns = [] } = props;

  const [col, setCol] = useState([...columns]);
  console.log('col', col);

  useEffect(() => {
    let colJson = JSON.stringify(col);
    localStorage.setItem(`columns${transactionName}`, colJson);
  }, [col]);

  return (
    <Modal trigger={<Button>Столбцы</Button>} closeIcon>
      <Header content="Столбцы" />
      <Modal.Content>
        {col.map((item, index) => (
          <div key={index}>
            <Checkbox label={item.Header} checked={item.checked} />
          </div>
        ))}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red">
          <Icon name="remove" /> Отмена
        </Button>
        <Button color="green">
          <Icon name="checkmark" /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ColumnsReactTable;

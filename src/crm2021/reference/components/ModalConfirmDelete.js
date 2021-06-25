import React, { useEffect } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalConfirmDelete = props => {
  const {} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Show Modal</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content>
        <p>Вы действительно хотите удалить эту запись?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Нет
        </Button>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Да
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalConfirmDelete;

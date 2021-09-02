import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ConfirmModal = props => {
  const { open, onClose, text = '', noButton, yesButton, data = {} } = props;
  return (
    <Modal closeIcon open={open} onClose={onClose}>
      <Header content={`№ договора ${data.contractNumber}`} />
      <Modal.Content>
        <h4>{text}</h4>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={yesButton}>
          <Icon name="checkmark" /> Да
        </Button>
        <Button color="red" onClick={noButton}>
          <Icon name="remove" /> Нет
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default ConfirmModal;

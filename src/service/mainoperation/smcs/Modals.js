import React from 'react';
import { Segment, Modal, Button, Icon, Header, Form } from 'semantic-ui-react';

const AddSparePartModal = props => {
  const { opened, closed } = props;
  return (
    <Modal open={opened}>
      <Header content="Добавить услуги" />
      <Modal.Content></Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={closed}>
          Применить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default AddSparePartModal;

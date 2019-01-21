import React from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';

import ProblemDocForm from '../forms/ProblemDocForm';

export default function SalaryFormModal(props) {
  return (
    <Modal
      open={props['open']}
      closeOnEscape={false}
      closeOnRootNodeClick={false}
      dimmer="blurring"
      closeIcon
    >
      <Header content={'Добавление документа "Проблемный сотрудник"'} />
      <Modal.Content>
        <Modal.Description>
          <ProblemDocForm document={props.document} model={props['model']} />
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          color="blue"
          onClick={props.handleFormSubmit}
          floated="right"
          type="submit"
          inverted
        >
          <Icon name="checkmark" /> Сохранить
        </Button>
        <Button
          color="red"
          floated="right"
          onClick={props.handleFormClose}
          inverted
        >
          <Icon name="remove" /> Отмена
        </Button>
        <br />
        <br />
      </Modal.Actions>
    </Modal>
  );
}

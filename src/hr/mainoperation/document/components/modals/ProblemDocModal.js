import React from 'react';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';

import ProblemDocItemForm from '../forms/ProblemDocItemForm';

export default function ProblemDocModal(props) {
  return (
    <Modal
      open={props['open']}
      closeOnEscape={false}
      closeOnRootNodeClick={false}
    >
      <Header content={'Добавление документа "Проблемный сотрудник"'} />
      <Modal.Content>
        <Modal.Description>
          <ProblemDocItemForm
            problemOptions={props.problemOptions}
            items={props.document.items}
            handleItemChange={props.handleItemChange}
          />
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

import React from 'react';
import { Modal, Form, Input, Button } from 'semantic-ui-react';

export default function EditMenuNode(props) {
  return (
    <div>
      <Modal size={'small'} open={props.showUpdateModal}>
        <Modal.Header>Изменение меню в иерархии</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              required
              onChange={(e, o) => props.handleChange('name', o)}
              defaultValue={props.nodeForEdit.title}
              control={Input}
              label="RU"
            />
            <Form.Field
              required
              onChange={(e, o) => props.handleChange('en', o)}
              defaultValue={
                props.nodeForEdit.subtitle ? props.nodeForEdit.subtitle[0] : ''
              }
              control={Input}
              label="English"
            />
            <Form.Field
              required
              onChange={(e, o) => props.handleChange('tr', o)}
              defaultValue={
                props.nodeForEdit.subtitle ? props.nodeForEdit.subtitle[1] : ''
              }
              control={Input}
              label="TR"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={props.close}>
            Отмена
          </Button>
          <Button
            positive
            icon="checkmark"
            onClick={props.submitUpdate}
            labelPosition="right"
            content="Сохранить"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

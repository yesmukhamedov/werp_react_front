import React from 'react';
import { Header, Button, Modal, Radio, Form, Input } from 'semantic-ui-react';

export default function Update(props) {
  const { messages, updRow } = props;
  return (
    <Modal open={props.showUpdateModal} size={'small'}>
      <Header>{messages['Crm.DeleteWarningHeader']} !</Header>
      <Modal.Content>
        <Form>
          <Form.Field
            readOnly
            required
            defaultValue={updRow.name}
            control={Input}
            label={messages['nomination']}
          />
          <Form.Field>
            <Radio
              toggle
              defaultValue={updRow.active}
              onChange={(e, o) => props.inputChange('active', o)}
              label={messages['L__STATUS']}
              checked={updRow.active}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.resetUpdate}>{messages['BTN__NO']}</Button>
        <Button color="red" onClick={props.saveUpdate}>
          {messages['BTN__YES']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

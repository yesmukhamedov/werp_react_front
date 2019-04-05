import React from 'react';
import { Modal, Form, Input, Button, Icon } from 'semantic-ui-react';

export default function EditMenuNode(props) {
  return (
    <div>
      <Modal
        size={'small'}
        open={props.showUpdateModal}
        onClose={() => props.close()}
      >
        <Modal.Header>{props.messages['change']}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
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
                  props.nodeForEdit.subtitle
                    ? props.nodeForEdit.subtitle[0]
                    : ''
                }
                control={Input}
                label="English"
              />
              <Form.Field
                required
                onChange={(e, o) => props.handleChange('tr', o)}
                defaultValue={
                  props.nodeForEdit.subtitle
                    ? props.nodeForEdit.subtitle[1]
                    : ''
                }
                control={Input}
                label="TR"
              />

              <Button onClick={props.submitUpdate} floated="right" color="teal">
                <Icon name="checkmark" />
                {props.messages['save']}
              </Button>

              <Button floated="right" negative onClick={props.close}>
                {' '}
                {props.messages['cancel']}
              </Button>
            </Form>
            <br />
            <br />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

import React, { PureComponent } from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';

export default class NewTaskModalComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: undefined,
      priority: undefined,
      assigneeBranch: undefined,
      assigneeDepartment: undefined,
      assigneePosition: undefined,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(field, value) {
    this.setState(
      {
        ...this.state,
        [field]: value,
      },
      () => {
        console.log('NewTaskModal', this.state);
      },
    );
  }

  render() {
    return (
      <Modal dimmer="inverted" open="true">
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.close}>
            Nope
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yep, that's me"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

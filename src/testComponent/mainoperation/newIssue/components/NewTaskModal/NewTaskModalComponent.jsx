import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

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
        <Modal.Header>Новая задача</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Input fluid label="Тема" />
              <Form.TextArea
                label="Описание"
                placeholder="Описание задачи"
                style={{ minHeight: 200 }}
              />
              <Form.Group widths="equal">
                <Form.Select label="Статус" />
                <Form.Select label="Приоритет" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select label="Филиал" />
                <Form.Select label="Департамент" />
                <Form.Select label="Должность" />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="youtube" onClick={this.close}>
            Отменить
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Создать"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

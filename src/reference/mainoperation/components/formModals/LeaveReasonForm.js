import React from 'react';
import { Header, Modal, Icon, Button, Form, Input } from 'semantic-ui-react';

const LeaveReasonForm = props => {
  const { model, open } = props;
  return (
    <Modal
      open={open}
      closeOnEscape={false}
      closeOnRootNodeClick={false}
      dimmer="blurring"
      closeIcon
      size="tiny"
    >
      <Header
        content={model.new ? 'Добавление причины' : 'Редактирование причины'}
      />
      <Modal.Content>
        <Modal.Description>{renderForm(props)}</Modal.Description>
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
};

const renderForm = props => {
  const { model, errors } = props;
  return (
    <Form>
      <Form.Field
        error={errors['name']}
        value={model.name || ''}
        control={Input}
        label="Название"
        placeholder="Название"
        name="name"
        onChange={e => props.handleChange('name', e.target.value)}
      />

      <Form.Field
        value={model.nameEn || ''}
        control={Input}
        label="Name"
        placeholder="Name"
        name="nameEn"
        onChange={e => props.handleChange('nameEn', e.target.value)}
      />

      <Form.Field
        value={model.nameTr || ''}
        control={Input}
        label="Название (TR)"
        placeholder="Название (TR)"
        name="nameTr"
        onChange={e => props.handleChange('nameTr', e.target.value)}
      />
    </Form>
  );
};

export default LeaveReasonForm;

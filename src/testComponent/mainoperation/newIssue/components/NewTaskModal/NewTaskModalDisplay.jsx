import React from 'react';
import {
  Modal,
  Button,
  Form,
  Dropdown,
  TextArea,
  Input,
  Label,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
} from '../../../../../utils/formFields';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  if (!values.status) {
    errors.status = 'Required';
  }
  if (!values.priority) {
    errors.priority = 'Required';
  }
  if (!values.branch) {
    errors.branch = 'Required';
  }
  if (!values.position) {
    errors.position = 'Required';
  }
  if (!values.department) {
    errors.department = 'Required';
  }
  return errors;
};

const submit = () => {
  console.log('submitting form');
};

const NewTaskModalDisplay = (props) => {
  const { isOpen, open, close } = props;
  return (
    <Modal open={isOpen} onClose={close}>
      <Modal.Header>Новая задача</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={submit}>
            <Field
              name="title"
              component={TextInputFormField}
              label="Тема"
              errorText="Объязательное поле для заполнения"
            />
            <Field
              name="description"
              component={TextAreaFormField}
              label="Описание задачи"
              errorText="Объязательное поле для заполнения"
            />
            <Form.Group widths="equal">
              <Field
                name="status"
                component={DropdownFormField}
                label="Статус"
                errorText="Объязательное поле для заполнения"
                opts={[
                  { key: 'NEW', value: 'NEW', text: 'NEW' },
                  {
                    key: 'IN PROGRESS',
                    value: 'IN PROGRESS',
                    text: 'IN PROGRESS',
                  },
                ]}
              />
              <Field
                name="priority"
                component={DropdownFormField}
                label="Приоритет"
                // validate={[required, maxLength15, minLength2]}
                // warn={alphaNumeric}
                opts={[
                  { key: 'LOW', value: 'LOW', text: 'LOW' },
                  { key: 'NORMAL', value: 'NORMAL', text: 'NORMAL' },
                  { key: 'HIGH', value: 'HIGH', text: 'HIGH' },
                ]}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                // validate={[required, maxLength15, minLength2]}
                // warn={alphaNumeric}
              />
              <Field
                name="department"
                component={DropdownFormField}
                label="Департамент"
                // validate={[required, maxLength15, minLength2]}
                // warn={alphaNumeric}
              />
              <Field
                name="position"
                component={DropdownFormField}
                label="Должность"
                // validate={[required, maxLength15, minLength2]}
                // warn={alphaNumeric}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="youtube" onClick={close}>
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
};

export default reduxForm({
  form: 'outCallsNewTaskForm',
  validate,
})(NewTaskModalDisplay);

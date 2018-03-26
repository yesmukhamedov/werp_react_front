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
  // if (!values.status) {
  //   errors.status = 'Required';
  // }
  // if (!values.priority) {
  //   errors.priority = 'Required';
  // }
  // if (!values.branch) {
  //   errors.branch = 'Required';
  // }
  // if (!values.position) {
  //   errors.position = 'Required';
  // }
  // if (!values.department) {
  //   errors.department = 'Required';
  // }
  return errors;
};

const submit = (props) => {
  console.log('submitting form', props);
};

const clearForm = (props) => {

}

const NewTaskModalDisplay = (props) => {
  const {
    isOpen,
    open,
    close,
    handleSubmit,
    reset,
    statusOptions,
    priorityOptions,
    branchOptions,
    deptOptions,
    posOptions,
  } = props;
  console.log("MODAL PROPS", props)
  return (
    <Modal open={isOpen} onClose={close}>
      <Modal.Header>Новая задача</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit(submit)}>
            <Field
              name="title"
              component={TextInputFormField}
              label="Тема"
            />
            <Field
              name="description"
              component={TextAreaFormField}
              label="Описание задачи"
            />
            <Form.Group widths="equal">
              <Field
                name="status"
                component={DropdownFormField}
                label="Статус"
                opts={statusOptions}
              />
              <Field
                name="priority"
                component={DropdownFormField}
                label="Приоритет"
                opts={priorityOptions}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                opts={branchOptions}
              />
              <Field
                name="department"
                component={DropdownFormField}
                label="Департамент"
                opts={deptOptions}
              />
              <Field
                name="position"
                component={DropdownFormField}
                label="Должность"
                opts={posOptions}
              />
            </Form.Group>
            <Button color="youtube" onClick={() => { reset(); close(); }}>
              Отменить
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Создать"
              type="submit"
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default reduxForm({
  form: 'outCallsNewTaskForm',
  validate,
})(NewTaskModalDisplay);

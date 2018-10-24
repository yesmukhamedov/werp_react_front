import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
} from '../../../../../../utils/formFields';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Объязательное поле для заполнения';
  }
  if (!values.description) {
    errors.description = 'Объязательное поле для заполнения';
  }
  if (!values.status) {
    errors.status = 'Объязательное поле для заполнения';
  }
  if (!values.priority) {
    errors.priority = 'Объязательное поле для заполнения';
  }
  if (!values.branch) {
    errors.branch = 'Объязательное поле для заполнения';
  }
  if (!values.department) {
    errors.department = 'Объязательное поле для заполнения';
  }
  if (!values.position) {
    errors.position = 'Объязательное поле для заполнения';
  }
  return errors;
};

class NewTaskModalComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(values, dispatch, props) {
    const { 
      contractNumber,
      createNewTask,
    } = this.props;

    createNewTask(contractNumber, values);

    this.props.close();
    this.clear();
  }

  handleFormClose() {
    this.props.close();
    this.clear();
  }

  clear() {
    const { reset } = this.props;
    reset();
  }

  render() {
    const {
      isOpen,
      handleSubmit,
      reset,
      statusOptions,
      priorityOptions,
      branchOptions = [],
      deptOptions,
      posOptions,
      bukrs,
    } = this.props;
    const filteredBranchOpts =
      Object.values(branchOptions).filter(b => b.bukrs === bukrs);
    return (
      <Modal open={isOpen} onClose={this.handleFormClose}>
        <Modal.Header>Новая задача</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field name="title" component={TextInputFormField} label="Тема" />
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
                  opts={filteredBranchOpts}
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
              <Button color="youtube" onClick={this.handleFormClose}>
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
  }
}

export default reduxForm({
  form: 'outCallsNewTaskForm',
  validate,
})(NewTaskModalComponent);

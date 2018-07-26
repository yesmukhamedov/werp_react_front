import React, { PureComponent } from 'react';
import {
  Modal,
  Button,
  Form,
  Divider,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  DropdownFormField,
  SearchableSingleDropdownFormField
} from '../../../../utils/formFields';


const validate = (values) => {
  const errors = {};
  if (!values.user) {
    errors.user = 'Объязательное поле для заполнения';
  }
  if (!values.department) {
    errors.department = 'Объязательное поле для заполнения';
  }
  return errors;
};

const clearForm = (props) => {};

class AddTaskAdminModalComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(formValues) {
    const { createTaskAdmin, fetchTaskAdmins } = this.props;
    createTaskAdmin(formValues, () => fetchTaskAdmins());
    this.handleFormClose();
  }

  handleFormClose() {
    this.props.close();
    this.props.reset();
  }

  render() {
    const {
      isOpen,
      close,
      handleSubmit,
      deptOptions,
      userOptions,
      lang,
    } = this.props;
    return (
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>Add task admin</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="user"
                component={SearchableSingleDropdownFormField}
                label="Пользователь"
                opts={userOptions}
              />
              <Field
                name="department"
                component={DropdownFormField}
                label="Департамент"
                opts={deptOptions}
              />
              
              <Divider />

              <Button
                color="youtube"
                float="right"
                content="Отменить"
                onClick={this.handleFormClose}
              />
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Создать"
                type="submit"
                float="left"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'DtskdepAddTaskAdminForm',
  validate,
})(AddTaskAdminModalComponent);

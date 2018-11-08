import React, { PureComponent } from 'react';
import {
  Modal,
  Button,
  Form,
  Divider,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { TextInputFormField, DropdownFormField } from '../../../../../utils/formFields';


const validate = (values) => {
  const errors = {};
  if (!values.groupName) {
    errors.groupName = 'Объязательное поле для заполнения';
  }
  return errors;
};

class AddMessageGroupUserModalDisplay extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(formValues) {
    const { createMessageGroupUser, updateMessageGroupUser, fetchMessageGroupUsers, modalType, modalData } = this.props;
    if (modalType === 'add') {
      createMessageGroupUser(formValues, () => fetchMessageGroupUsers());
    } else if (modalType === 'edit') {
      updateMessageGroupUser(modalData.groupId, formValues, () => fetchMessageGroupUsers());
    }
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
      modalType,
      handleSubmit,
      pristine, 
      submitting 
    } = this.props;
    return (
      <Modal size="tiny" open={isOpen} onClose={close}>
        <Modal.Header>{modalType === 'add' ? 'Add' : 'Edit'} message group user</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="messageGroup"
                component={DropdownFormField}
                label="Группа"
                opts={[]}
              />
              <Field
                name="userName"
                component={TextInputFormField}
                label="Пользователь"
              />
              <Field
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                opts={[]}
              />
              <Field
                name="department"
                component={DropdownFormField}
                label="Отдел"
                opts={[]}
              />
              <Field
                name="supervisor"
                component={DropdownFormField}
                label="Начальник отдела"
                opts={[]}
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
                content="OK"
                type="submit"
                float="left"
                disabled={pristine || submitting}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'MgruAddMessageGroupUserForm',
  validate,
  enableReinitialize: true,
})(AddMessageGroupUserModalDisplay);

import React, { PureComponent } from 'react';
import {
  Modal,
  Button,
  Form,
  Divider,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { 
  TextInputFormField, 
  DropdownFormField,
  SearchableSingleDropdownFormField
} from '../../../../../utils/formFields';

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
      updateMessageGroupUser(modalData.mguId, formValues, () => fetchMessageGroupUsers());
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
      selectedCompany,
      selectedDepartment,
      branchOptions,
      companyOptions,
      reference,
      pristine, 
      submitting 
    } = this.props;
    return (
      <Modal size="tiny" open={isOpen} onClose={this.handleFormClose}>
        <Modal.Header>{modalType === 'add' ? 'Add' : 'Edit'} message group user</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                required
                name="messageGroup"
                component={DropdownFormField}
                label="Группа"
                opts={reference && reference.messgrOptions}
              />
              {/* <Field
                name="user"
                component={TextInputFormField}
                label="Пользователь"
              /> */}
              <Field
                name="user"
                component={SearchableSingleDropdownFormField}
                label="Пользователь"
                opts={reference && reference.userOptions}
              />
              <Field
                required
                name="company"
                component={DropdownFormField}
                label="Компания"
                opts={companyOptions}
              />
              <Field
                required
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                disabled={!selectedCompany}
                opts={selectedCompany && branchOptions[selectedCompany]}
              />
              <Field
                required
                name="department"
                component={DropdownFormField}
                label="Отдел"
                opts={reference && reference.deptOptions}
              />
              <Field
                required
                name="supervisor"
                component={DropdownFormField}
                label="Начальник отдела"
                // disabled={!selectedDepartment}
                opts={reference && reference.taskAdminOptions}
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

const validate = props => {
  const errors = {}
  const fields = ['messageGroup', 'branch', 'department', 'supervisor'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors
}

export default reduxForm({
  form: 'MgruAddMessageGroupUserForm',
  validate,
  enableReinitialize: true,
})(AddMessageGroupUserModalDisplay);

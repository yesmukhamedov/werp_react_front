import React, { PureComponent } from 'react';
import {
  Modal,
  Button,
  Form,
  Divider,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { TextInputFormField } from '../../../../../utils/formFields';


const validate = (values) => {
  const errors = {};
  if (!values.groupName) {
    errors.groupName = 'Объязательное поле для заполнения';
  }
  return errors;
};

class AddMessageGroupModalDisplay extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(formValues) {
    const { createMessageGroup, updateMessageGroup, fetchMessageGroups, modalType, modalData } = this.props;
    if (modalType === 'add') {
      createMessageGroup(formValues, () => fetchMessageGroups());
    } else if (modalType === 'edit') {
      updateMessageGroup(modalData.groupId, formValues, () => fetchMessageGroups());
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
        <Modal.Header>{modalType === 'add' ? 'Add' : 'Edit'} message group</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="groupName"
                component={TextInputFormField}
                label="Название"
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
  form: 'MessgrAddMessageGroupForm',
  validate,
  enableReinitialize: true,
})(AddMessageGroupModalDisplay);

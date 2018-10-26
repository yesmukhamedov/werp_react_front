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
  if (!values.user) {
    errors.user = 'Объязательное поле для заполнения';
  }
  if (!values.department) {
    errors.department = 'Объязательное поле для заполнения';
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
    const { createMessageGroup, fetchMessageGroups } = this.props;
    createMessageGroup(formValues, () => fetchMessageGroups());
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
    } = this.props;
    return (
      <Modal size="tiny" open={isOpen} onClose={close}>
        <Modal.Header>Add message group</Modal.Header>
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
  form: 'MessgrAddMessageGroupForm',
  validate,
})(AddMessageGroupModalDisplay);

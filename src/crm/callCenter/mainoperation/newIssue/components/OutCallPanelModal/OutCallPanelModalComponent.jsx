import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  DropdownFormField,
  TextAreaFormField,
} from '../../../../../../utils/formFields';

const validate = values => {
  const errors = {};
  if (!values.status) {
    errors.status = 'Объязательное поле для заполнения';
  }
  if (!values.description) {
    errors.description = 'Объязательное поле для заполнения';
  }
  return errors;
};

class OutCallPanelModalComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(values, dispatch, props) {
    const { contractNumber, updateOutCall } = this.props;
    const params = {
      id: contractNumber,
      text: values.description,
      status: values.status,
    };
    updateOutCall(params);
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
      open,
      close,
      handleSubmit,
      reset,
      statusOptions,
      selectedStatus,
      messages,
    } = this.props;
    return (
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>{messages.H__ORDER_EDIT}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="status"
                component={DropdownFormField}
                label={messages.L__STATUS}
                opts={statusOptions}
                value={selectedStatus}
              />
              <Field
                name="description"
                component={TextAreaFormField}
                label={messages.L__EDIT_DESCRIPTION}
              />

              <Button
                color="youtube"
                float="right"
                content={messages.BTN__CANCEL}
                onClick={this.handleFormClose}
              />
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content={messages.BTN__CREATE}
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
  form: 'outCallsEditForm',
  validate,
  enableReinitialize: true,
})(OutCallPanelModalComponent);

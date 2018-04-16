import React, { PureComponent } from 'react';
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
} from '../../../../../../utils/formFields';


const validate = (values) => {
  const errors = {};
  if (!values.status) {
    errors.status = 'Объязательное поле для заполнения';
  }
  if (!values.description) {
    errors.description = 'Объязательное поле для заполнения';
  }
  return errors;
};

const clearForm = (props) => {};

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
    } = this.props;
    return (
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>Изменения заявки</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="status"
                component={DropdownFormField}
                label="Статус"
                opts={statusOptions}
                value={selectedStatus}
              />
              <Field
                name="description"
                component={TextAreaFormField}
                label="Описание изменения"
              />

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
  form: 'outCallsEditForm',
  validate,
  enableReinitialize: true,
})(OutCallPanelModalComponent);

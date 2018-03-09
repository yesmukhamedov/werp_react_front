import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal, Form, TextArea, Segment, Dropdown } from 'semantic-ui-react';
// import * as actions from '../../actions/auth';
import './settings.css';

const inputField = ({
  input, label, disabled, meta: { touched, error, warning },
}) => (
  <div className="marginField">
      <label>
        <strong>{label}</strong>
      </label>
      <div>
        <input {...input} placeholder={label} disabled={disabled} />
        {touched && (error && <span className="error"> {error} </span>)}
      </div>
    </div>
);

const textArea = ({
  input, label, disabled, meta: { touched, error, warning },
}) => (
  <div className="marginField">
      <label>
        <strong>{label}</strong>
      </label>
      <div>
        <TextArea {...input} placeholder={label} disabled={disabled} autoHeight />
        {touched && (error && <span className="error"> {error} </span>)}
      </div>
    </div>
);

const DropdownFormField = props => (
  <Form.Field>
    <label>{props.label}</label>
    <Dropdown
      selection
      options={props.options}
      {...props.input}
      value={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      placeholder={props.label}
    />
  </Form.Field>
);

class TaskEditModal extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(props) {
    // if (this.props.modalType === 'add') {
    //   this.props.addUser(props);
    // } else if (this.props.modalType === 'edit') {
    //   const id = this.props.modalData.user.userID;
    //   const contactId = this.props.modalData.user.contactId;
    //   this.props.updateUser(props, id, contactId);
    // }
    console.log('What: ', props.status);
    this.props.handleClose();
    this.clear();
  }

  handleFormClose() {
    this.props.handleClose();
    this.clear();
  }

  clear() {
    const { reset } = this.props;
    reset();
  }

  render() {
    const { handleSubmit, directories } = this.props;
    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.handleFormClose}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        dimmer="blurring"
        closeIcon
      // size="tiny"
      >
        <Header
          icon="edit"
          content="Редактировать задачу"
        />
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="title"
                label="Тема"
                // disabled={this.props.userType === 'operator'}
                component={inputField}
              />
              <Form.Group widths="equal">
                <Field
                  name="status"
                  component={DropdownFormField}
                  label="Статус"
                  options={directories.statusOptions}
                />
                <Field
                  name="priority"
                  component={DropdownFormField}
                  label="Приоритет"
                  options={directories.priorityOptions}
                />
              </Form.Group>
              <Segment>
                <Header as="h5" > Назначена </Header>
                <Form.Group widths="equal">
                  <Field
                    name="branch"
                    component={DropdownFormField}
                    label="Филиал"
                    options={directories.priorityOptions}
                  />
                  <Field
                    name="department"
                    component={DropdownFormField}
                    label="Департамент"
                    options={directories.priorityOptions}
                  />
                  <Field
                    name="position"
                    component={DropdownFormField}
                    label="Должность"
                    options={directories.priorityOptions}
                  />
                </Form.Group>
              </Segment>
              <Field
                name="description"
                label="Description"
                component={textArea}
              />
              <Field
                name="comment"
                label="Comments"
                component={textArea}
              />
              <div className="buttonGroup">
                <Button color="blue" floated="right" type="submit" inverted>
                  <Icon name="checkmark" /> Yes
                </Button>
                <Button
                  color="red"
                  floated="right"
                  onClick={this.handleFormClose}
                  inverted
                >
                  <Icon name="remove" /> No
                </Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function validate(formProps, props) {
  const error = {};

  if (!formProps.title) {
    error.title = 'Please enter the title';
  }

  if (!formProps.description) {
    error.description = 'Please enter the description';
  }

  // if (props.modalType === 'add') {
  //   if (!formProps.password) {
  //     error.password = 'Please enter a password';
  //   }

  //   if (!formProps.passwordConfirm) {
  //     error.passwordConfirm = 'Please enter a passwordConfirm';
  //   }
  // }

  return error;
}

function mapStateToProps(state, props) {
  // if (props.modalData !== null) {
  const initialData = {
    status: 2,
    priority: 1,
  };
  //   return {
  //     initialValues: initialData,
  //   };
  // }
  return {
    directories: state.taskList.directories,
    initialValues: initialData,
  };
}

TaskEditModal = reduxForm({
  form: 'editTask',
  validate,
  enableReinitialize: true,
})(TaskEditModal);

export default connect(mapStateToProps)(TaskEditModal);

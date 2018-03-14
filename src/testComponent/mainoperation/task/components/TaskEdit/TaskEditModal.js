import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form, Segment } from 'semantic-ui-react';
// import * as actions from '../../actions/auth';
import './settings.css';
import { difference } from '../../../../../utils/helpers';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
} from '../../../../../utils/formFields';

class TaskEditModal extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(values, dispatch, props) {
    // if (this.props.modalType === 'add') {
    //   this.props.addUser(props);
    // } else if (this.props.modalType === 'edit') {
    //   const id = this.props.modalData.user.userID;
    //   const contactId = this.props.modalData.user.contactId;
    //   this.props.updateUser(props, id, contactId);
    // }
    console.log('Props: ', props);
    console.log('finalValues: ', values);
    console.log('initialValues: ', props.initialValues);
    // const dirty_fields_only = values.filter((value, key) => !(value === props.initialValues.get(key)))
    const dirty_fields_only = difference(values, props.initialValues);
    console.log("dirty: ", dirty_fields_only);
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
    const {
      handleSubmit, directories, modalOpen, pristine, submitting 
    } = this.props;
    return (
      <Modal
        open={modalOpen}
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
                disabled
                component={TextInputFormField}
              />
              <Form.Group widths="equal">
                <Field
                  name="status"
                  component={DropdownFormField}
                  label="Статус"
                  opts={directories.statusOptions}
                />
                <Field
                  name="priority"
                  component={DropdownFormField}
                  label="Приоритет"
                  opts={directories.priorityOptions}
                />
              </Form.Group>
              <Segment>
                <Header as="h5" > Назначена </Header>
                <Form.Group widths="equal">
                  <Field
                    name="branch"
                    component={DropdownFormField}
                    label="Филиал"
                    opts={directories.priorityOptions}
                  />
                  <Field
                    name="department"
                    component={DropdownFormField}
                    label="Департамент"
                    opts={directories.priorityOptions}
                  />
                  <Field
                    name="position"
                    component={DropdownFormField}
                    label="Должность"
                    opts={directories.priorityOptions}
                  />
                </Form.Group>
              </Segment>
              <Field
                name="description"
                label="Описание"
                component={TextAreaFormField}
              />
              <Field
                name="comment"
                label="Примечания"
                component={TextAreaFormField}
              />
              <div className="buttonGroup">
                <Button color="teal" floated="right" type="submit" disabled={pristine || submitting}>
                  <Icon name="checkmark" /> Yes
                </Button>
                <Button
                  color="youtube"
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

function validate(formProps) {
  const error = {};

  if (!formProps.title) {
    error.title = 'Please enter the title';
  }

  if (!formProps.description) {
    error.description = 'Please enter the description';
  }

  return error;
}

function mapStateToProps(state, props) {
  const initialData = {
    title: props.title,
    status: 2,
    priority: 1,
    branch: 1,
    department: 1,
    position: 1,
    description: props.description,
  };
  return {
    directories: state.taskList.directories,
    initialValues: initialData,
  };
}

TaskEditModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  directories: PropTypes.object,
  modalOpen: PropTypes.bool,
};

TaskEditModal = reduxForm({
  form: 'editTask',
  validate,
  enableReinitialize: true,
})(TaskEditModal);

export default connect(mapStateToProps)(TaskEditModal);

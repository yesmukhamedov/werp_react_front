import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form, Segment } from 'semantic-ui-react';
import './settings.css';
import { difference } from '../../../../../../utils/helpers';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
  DatePickerFormField,
} from '../../../../../../utils/formFields';

class TaskEditModal extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(values, dispatch, props) {
    const dirtyFields = difference(values, props.initialValues);
    this.props.editTask(props.id, dirtyFields);
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
                readOnly={this.props.fieldState.title}
                component={TextInputFormField}
              />
              <Form.Group widths="equal">
                <Field
                  name="status"
                  component={DropdownFormField}
                  label="Статус"
                  disabled={this.props.fieldState.status}
                  opts={directories && Object.values(directories.statusOptions)}
                />
                <Field
                  name="priority"
                  component={DropdownFormField}
                  label="Приоритет"
                  disabled={this.props.fieldState.priority}
                  opts={directories && Object.values(directories.priorityOptions)}
                />
                <Field
                  name="estimatedAt"
                  component={DatePickerFormField}
                  label="Предполагаемая дата закрытия"
                  dateFormat="DD.MM.YYYY"
                  autoComplete="off"
                  disabled={this.props.fieldState.estimatedAt}
                />
              </Form.Group>
              <Segment>
                <Header as="h5" > Назначена </Header>
                <Form.Group widths="equal">
                  <Field
                    name="branch"
                    component={DropdownFormField}
                    label="Филиал"
                    disabled={this.props.fieldState.branch}
                    opts={directories && Object.values(directories.branchOptions)}
                  />
                  <Field
                    name="department"
                    component={DropdownFormField}
                    label="Департамент"
                    disabled={this.props.fieldState.department}
                    opts={directories && Object.values(directories.deptOptions)}
                  />
                  <Field
                    name="position"
                    component={DropdownFormField}
                    label="Должность"
                    disabled={this.props.fieldState.position}
                    opts={directories && Object.values(directories.posOptions)}
                  />
                </Form.Group>
              </Segment>
              <Field
                name="description"
                label="Описание"
                readOnly={this.props.fieldState.description}
                component={TextAreaFormField}
              />
              <Field
                name="comment"
                label="Примечания"
                readOnly={this.props.fieldState.comment}
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

TaskEditModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  directories: PropTypes.object,
  modalOpen: PropTypes.bool,
  fieldState: PropTypes.object,
};

TaskEditModal = reduxForm({
  form: 'editTask',
  validate,
  enableReinitialize: true,
})(TaskEditModal);

export default TaskEditModal;

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import { editRecipient } from '../../../actions/DeptTaskListAction';
import './settings.css';
import { DropdownFormField } from '../../../../../../../utils/formFields';

class RecipientEditModal extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(values) {
    this.props.editRecipient(values.recipient);
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
      handleSubmit, directories, modalOpen, pristine, submitting,
    } = this.props;
    return (
      <Modal
        open={modalOpen}
        onClose={this.handleFormClose}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        dimmer="blurring"
        closeIcon
        size="tiny"
      >
        <Header>
          <Icon name="edit" />
          <Header.Content>
            Назначить исполнителя
            <Header.Subheader>
              Задача # <a>{this.props.taskId}</a>
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="recipient"
                component={DropdownFormField}
                label="ФИО"
                opts={directories ? directories.operatorOptions : []}
              />
              <div className="buttonGroup">
                <Button color="teal" floated="right" type="submit" disabled={pristine || submitting}>
                  <Icon name="checkmark" /> Да
                </Button>
                <Button
                  color="youtube"
                  floated="right"
                  onClick={this.handleFormClose}
                  inverted
                >
                  <Icon name="remove" /> Нет
                </Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state, props) {
  const initialData = {
    operator: props.operatorId,
  };
  return {
    directories: state.contractList.directories,
    initialValues: initialData,
  };
}

RecipientEditModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  editRecipient: PropTypes.func.isRequired,
  directories: PropTypes.object,
  modalOpen: PropTypes.bool,
  taskId: PropTypes.number,
};

RecipientEditModal = reduxForm({
  form: 'editRecipient',
  enableReinitialize: true,
})(RecipientEditModal);

export default connect(mapStateToProps, { editRecipient })(RecipientEditModal);

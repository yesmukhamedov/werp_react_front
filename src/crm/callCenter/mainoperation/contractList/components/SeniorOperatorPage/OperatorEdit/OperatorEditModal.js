import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import { editOperator } from '../../../actions/ContractListAction';
import './settings.css';
import { DropdownFormField } from '../../../../../../../utils/formFields';

class OperatorEditModal extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(values) {
    this.props.editOperator(this.props.contractNumber, values.operator);
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
            Назначить оператора
            <Header.Subheader>
              Договор # <a>{this.props.contractNumber}</a>
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="operator"
                component={DropdownFormField}
                label="ФИО"
                opts={directories ? directories.operatorOptions : []}
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

function mapStateToProps(state, props) {
  const initialData = {
    operator: props.operatorId,
  };
  return {
    directories: state.contractList.directories,
    initialValues: initialData,
  };
}

OperatorEditModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  editOperator: PropTypes.func.isRequired,
  directories: PropTypes.object,
  modalOpen: PropTypes.bool,
  contractId: PropTypes.number,
  contractNumber: PropTypes.number,
};

OperatorEditModal = reduxForm({
  form: 'editOperator',
  enableReinitialize: true,
})(OperatorEditModal);

export default connect(mapStateToProps, { editOperator })(OperatorEditModal);

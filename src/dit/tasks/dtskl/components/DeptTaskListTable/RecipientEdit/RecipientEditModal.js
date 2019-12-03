import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jwt-simple';
import { FormattedMessage } from 'react-intl';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import { editRecipient } from '../../../actions/DeptTaskListAction';
import { TOKEN_PASSWORD } from '../../../../../../utils/constants';
import './settings.css';

class RecipientEditModal extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = jwt.decode(token, TOKEN_PASSWORD);
      const field = { recipient: payload.userId };
      this.props.editRecipient(this.props.taskId, field);
      this.props.handleClose();
    }
  }

  handleFormClose() {
    this.props.handleClose();
  }

  render() {
    const { handleSubmit, modalOpen } = this.props;
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
              <h4>
                <FormattedMessage
                  id="Recipient.Edit.Content"
                  defaultMessage="Are you sure you want to assign yourself as a recipient ?"
                />
              </h4>
              <div className="buttonGroup">
                <Button color="teal" floated="right" type="submit">
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

RecipientEditModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  editRecipient: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool,
  taskId: PropTypes.number,
};

RecipientEditModal = reduxForm({
  form: 'editRecipient',
})(RecipientEditModal);

export default connect(null, { editRecipient })(RecipientEditModal);

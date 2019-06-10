import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import OutputErrors from '../../general/error/outputErrors';

class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalForm: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(fieldName, o) {
    let modalForm = Object.assign({}, this.state.modalForm);
    if (o) {
      modalForm[fieldName] = o.value;
    } else {
      modalForm[fieldName] = null;
    }

    this.setState({
      ...this.state,
      modalForm: modalForm,
    });
  }

  submitForm() {
    let modalForm = Object.assign({}, this.state.modalForm);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.newRole(modalForm);
      this.props.handleClose();
    }
    this.setState({ errors });
  }
  validate() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const { text45 } = this.state.modalForm;
    if (text45 === null || text45 === undefined || !text45) {
      errors.push(errorTable['134' + language]);
    }
    return errors;
  }

  renderForm() {
    const { messages } = this.props;
    return (
      <Form>
        <div className="ui segments">
          <div className="ui secondary segment">
            <Form.Field
              required
              onChange={(e, o) => this.handleChange('text45', o)}
              control={Input}
              label={messages['nomination']}
            />
          </div>
        </div>
        <OutputErrors errors={this.state.errors} />
        <Button onClick={this.submitForm} floated="right" color="teal">
          <Icon name="checkmark" />
          {messages['save']}
        </Button>
        <Button
          floated="right"
          onClick={() => this.props.handleClose()}
          negative
        >
          <Icon name="remove" />
          {messages['cancel']}
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <div className="new_Form_Transaction">
        <div className="ui grid">
          <div className="one wide column" />
          <div className="fourteen wide column">{this.renderForm()}</div>
          <div className="one wide column" />
        </div>
      </div>
    );
  }
}

export default AddRole;

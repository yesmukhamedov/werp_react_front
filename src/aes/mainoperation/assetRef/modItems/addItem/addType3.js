import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import OutputErrors from '../../../../../general/error/outputErrors';

class AddType3 extends Component {
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
    modalForm['type2_id'] = this.props.type2_id;
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
      this.newType3(modalForm);
      this.props.handleClose();
    }
    this.setState({ errors });
  }
  validate() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const { type3_name, type3_code } = this.state.modalForm;
    if (
      type3_name === null ||
      type3_name === undefined ||
      !type3_name ||
      type3_code === null ||
      type3_code === undefined ||
      !type3_code
    ) {
      errors.push(errorTable['134' + language]);
    }
    return errors;
  }
  newType3(newType3) {
    this.props.newType3(newType3);
  }

  renderForm() {
    const { messages } = this.props;
    return (
      <Form>
        <div className="ui segments">
          <div className="ui secondary segment">
            <Form.Group widths="equal">
              <Form.Field
                required
                onChange={(e, o) => this.handleChange('type3_name', o)}
                control={Input}
                label={messages['type3']}
              />

              <Form.Field
                required
                onChange={(e, o) => this.handleChange('type3_code', o)}
                control={Input}
                label={messages['code']}
              />
            </Form.Group>
          </div>
        </div>
        <OutputErrors errors={this.state.errors} />
        <Button
          onClick={this.submitForm}
          floated="right"
          className={this.state.sendingData ? 'loading' : ''}
          color="teal"
        >
          <Icon name="checkmark" />
          {messages['save']}
        </Button>
        <Button
          floated="right"
          onClick={() => this.props.handleClose()}
          negative
        >
          {' '}
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

export default AddType3;

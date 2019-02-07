import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import OutputErrors from '../../../../general/error/outputErrors';

class AddType1 extends Component {
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
      this.newType1(modalForm);
      this.props.handleClose();
    }
    this.setState({ errors });
  }
  validate() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const { type1_name, type1_code } = this.state.modalForm;
    if (type1_name === null || type1_name === undefined || !type1_name) {
      errors.push(errorTable['139' + language]);
    }
    if (type1_code === null || type1_code === undefined || !type1_code) {
      errors.push(errorTable['137' + language]);
    }
    return errors;
  }
  newType1(newType1) {
    this.props.newType1(newType1);
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
                onChange={(e, o) => this.handleChange('type1_name', o)}
                control={Input}
                label={messages['type1']}
              />

              <Form.Field
                required
                onChange={(e, o) => this.handleChange('type1_code', o)}
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
          Сохранить
        </Button>
        <Button
          floated="right"
          onClick={() => this.props.handleClose()}
          negative
        >
          {' '}
          <Icon name="remove" />
          Отмена
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

export default AddType1;

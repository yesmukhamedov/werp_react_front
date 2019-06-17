import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import OutputErrors from '../../general/error/outputErrors';

class NewTransaction extends Component {
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
    const modalForm = Object.assign({}, this.state.modalForm);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.newTransaction(modalForm);
      this.props.handleClose();
    }
    this.setState({ errors });
  }
  validate() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const {
      transaction_code,
      name_ru,
      url,
      front_component,
    } = this.state.modalForm;
    if (
      transaction_code === null ||
      transaction_code === undefined ||
      !transaction_code ||
      name_ru === null ||
      name_ru === undefined ||
      !name_ru ||
      url === null ||
      url === undefined ||
      !url ||
      front_component === null ||
      front_component === undefined ||
      !front_component
    ) {
      errors.push(errorTable['134' + language]);
    }

    return errors;
  }
  newTransaction(transaction) {
    this.props.newTransaction(transaction);
  }

  renderForm() {
    const { messages } = this.props;
    return (
      <Form>
        <div className="ui segments">
          <div className="ui segment">
            <h3>{messages['mainInfos']}</h3>
          </div>
          <div className="ui secondary segment">
            <Form.Group widths="equal">
              <Form.Field
                required
                onChange={(e, o) => this.handleChange('transaction_code', o)}
                control={Input}
                label={messages['code']}
              />
              <Form.Field
                required
                onChange={(e, o) => this.handleChange('name_ru', o)}
                control={Input}
                label={messages['L__TITLE'] + ' (ru)'}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                onChange={(e, o) => this.handleChange('name_en', o)}
                control={Input}
                label={messages['L__TITLE'] + ' (en)'}
              />
              <Form.Field
                onChange={(e, o) => this.handleChange('name_tr', o)}
                control={Input}
                label={messages['L__TITLE'] + ' (tr)'}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                required
                onChange={(e, o) => this.handleChange('url', o)}
                control={Input}
                label="URL"
              />
              <Form.Field
                onChange={(e, o) => this.handleChange('front_url', o)}
                control={Input}
                label="FRONT URL"
              />
            </Form.Group>
            <Form.Field
              required
              onChange={(e, o) => this.handleChange('front_component', o)}
              control={Input}
              label={messages['parDir']}
            />
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
          {messages['Form.Save']}
        </Button>
        <Button
          floated="right"
          onClick={() => this.props.handleClose()}
          negative
        >
          {' '}
          <Icon name="remove" />
          {messages['BTN__CANCEL']}
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

export default NewTransaction;

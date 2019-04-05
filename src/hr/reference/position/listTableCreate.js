import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import OutputErrors from '../../../general/error/outputErrors';

class ListTableCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        text: '',
        text_en: '',
        text_tr: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e, data) {
    const position = Object.assign({}, this.state.position);
    const { name, value } = data;
    if (position.hasOwnProperty(name)) {
      position[name] = value;
    }

    this.setState({
      ...this.state,
      position,
    });
  }

  validateForm() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const { text, text_en, text_tr } = this.state.position;
    if (text === null || text === undefined || !text) {
      errors.push(errorTable['139' + language] + ' (ru)');
    }
    if (text_en === null || text_en === undefined || !text_en) {
      errors.push(errorTable['139' + language] + ' (en)');
    }
    if (text_tr === null || text_tr === undefined || !text_tr) {
      errors.push(errorTable['139' + language] + ' (tr)');
    }
    return errors;
  }

  submitForm() {
    let errors = [];
    errors = this.validateForm();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.newPosition(this.state.position);
      this.props.handleClose();
    }
    this.setState({ errors });
  }

  renderForm() {
    const { position } = this.state;
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
                name="text"
                onChange={this.handleChange}
                value={position.text}
                control={Input}
                required
                label="Название (рус)"
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                name="text_en"
                onChange={this.handleChange}
                value={position.text_en}
                control={Input}
                label="Название (En)"
              />

              <Form.Field
                name="text_tr"
                onChange={this.handleChange}
                value={position.text_tr}
                control={Input}
                label="Название (Tr)"
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

export default ListTableCreate;

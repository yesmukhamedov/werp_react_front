import React, { Component } from 'react';
import { Icon, Form, Button, Input } from 'semantic-ui-react';

class ListTableUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  handleChange(fieldName, o) {
    const position = Object.assign({}, this.state.position);
    if (o) {
      position[fieldName] = o.value;
    } else {
      position[fieldName] = null;
    }

    this.setState({
      ...this.state,
      position,
    });
  }

  saveForm() {
    const position = Object.assign({}, this.state.position);
    const { pos } = this.props;
    const text = 'text';
    const text_en = 'text_en';
    const text_tr = 'text_tr';

    if (!position.text) {
      position[text] = pos.text;
    }
    if (!position.text_en) {
      position[text_en] = pos.text_en;
    }

    if (!position.text_tr) {
      position[text_tr] = pos.text_tr;
    }

    const position_id = 'position_id';
    position[position_id] = pos.position_id;
    this.props.updatePosition(position);
    this.props.handleClose();
  }

  renderForm() {
    const { pos, messages } = this.props;
    return (
      <Form>
        <div className="ui segments">
          <div className="ui segment">
            <h3>{messages['mainInfos']}</h3>
          </div>
          <div className="ui secondary segment">
            <Form.Group widths="equal">
              <Form.Field
                onChange={(e, o) => this.handleChange('text', o)}
                defaultValue={pos.text}
                control={Input}
                required
                label={messages['name'] + ' (ru)'}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                onChange={(e, o) => this.handleChange('text_en', o)}
                defaultValue={pos.text_en}
                control={Input}
                label={messages['name'] + ' (en)'}
              />

              <Form.Field
                onChange={(e, o) => this.handleChange('text_tr', o)}
                defaultValue={pos.text_tr}
                control={Input}
                label={messages['name'] + ' (tr)'}
              />
            </Form.Group>
          </div>
        </div>

        <Button
          onClick={this.saveForm}
          floated="right"
          className={this.state.sendingData ? 'loading' : ''}
          color="teal"
        >
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
          <div className="two wide column" />
          <div className="twelve wide column">{this.renderForm()}</div>
          <div className="two wide column" />
        </div>
      </div>
    );
  }
}

export default ListTableUpdate;

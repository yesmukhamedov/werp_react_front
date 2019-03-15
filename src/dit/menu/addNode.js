import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'semantic-ui-react';

class AddNode extends Component {
  constructor(props) {
    super(props);
    this.state = { modalForm: {} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(fieldName, o) {
    let modalForm = Object.assign({}, this.state.modalForm);
    if (o) {
      modalForm[fieldName] = o.value;
    } else {
      modalForm[fieldName] = null;
    }
    modalForm['parent_id'] = this.props.item.id;
    modalForm['sort_order'] = this.props.item.max_sort_order + 1;
    modalForm['transaction_id'] = 0;
    this.setState({
      ...this.state,
      modalForm: modalForm,
    });
  }

  submitForm() {
    let modalForm = Object.assign({}, this.state.modalForm);
    console.log('modalForm ', modalForm);
    this.props.newNode(modalForm);
  }

  renderForm() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            required
            onChange={(e, o) => this.handleChange('name_ru', o)}
            control={Input}
            label={'name_ru'}
          />
          <Form.Field
            required
            onChange={(e, o) => this.handleChange('name_en', o)}
            control={Input}
            label={'name_en'}
          />
          <Form.Field
            required
            onChange={(e, o) => this.handleChange('name_tr', o)}
            control={Input}
            label={'name_tr'}
          />
        </Form.Group>
      </Form>
    );
  }
  render() {
    return (
      <div>
        <Modal size={'small'} open={this.props.addModalOpened}>
          <Modal.Header>Добавление меню в иерархию</Modal.Header>
          <Modal.Content>{this.renderForm()}</Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.props.addFormModal(false)}>
              Отмена
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={this.submitForm.bind(this)}
              labelPosition="right"
              content="Сохранить"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AddNode;

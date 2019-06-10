import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'semantic-ui-react';
import TransactionSelect from './transactionSelect';

class AddNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalForm: {},
      transaction: {},
      openTransactionModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
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
  selectedTrId(tr) {
    let modalForm = Object.assign({}, this.state.modalForm);
    modalForm['transaction_id'] = tr.transaction_id;
    modalForm['name_ru'] = tr.name_ru;
    modalForm['name_en'] = tr.name_en;
    modalForm['name_tr'] = tr.name_tr;
    this.setState({
      ...this.state,
      modalForm: modalForm,
      transaction: tr,
      openTransactionModal: false,
    });
  }
  removeTransaction() {
    this.setState({
      ...this.state,
      transaction: {},
      modalForm: {},
    });
  }

  submitForm() {
    let modalForm = Object.assign({}, this.state.modalForm);
    modalForm['parent_id'] = this.props.blankMenuNode.parent_id;
    modalForm['sort_order'] = this.props.blankMenuNode.sort_order + 1;
    this.props.blankMenuNode.tree_id === null
      ? (modalForm['tree_id'] = this.props.blankMenuNode.parent_id)
      : (modalForm['tree_id'] = this.props.blankMenuNode.tree_id);
    this.props.newNode(modalForm);
    this.props.addFormModal(false);
  }

  transactionModal(trueFalse) {
    this.setState({
      ...this.state,
      openTransactionModal: trueFalse,
    });
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <Modal
          size={'small'}
          open={this.props.showAddModal}
          onClose={() => this.props.addFormModal(false)}
        >
          <Modal.Header>{messages['menuAddhiechy']}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <div className="field">
                  <label>{messages['select_transaction']}</label>
                  <div className="ui action left icon input">
                    <Button
                      onClick={() => {
                        this.transactionModal(true);
                      }}
                      icon="linkify"
                    />
                    <input
                      readOnly
                      placeholder="Транзакция..."
                      type="text"
                      value={this.state.transaction.name_ru || ''}
                    />
                    <Button
                      onClick={() => this.removeTransaction()}
                      icon={'trash'}
                    />
                  </div>
                </div>
              </Form.Group>
              <h3>{messages['enter_nomination']}</h3>
              <Form.Group widths="equal">
                <Form.Field
                  required
                  onChange={(e, o) => this.handleChange('name_ru', o)}
                  defaultValue={this.state.modalForm.name_ru}
                  control={Input}
                  label={messages['L__TITLE'] + ' (ru)'}
                />
                <Form.Field
                  required
                  onChange={(e, o) => this.handleChange('name_en', o)}
                  defaultValue={this.state.modalForm.name_en}
                  control={Input}
                  label={messages['L__TITLE'] + ' (en)'}
                />
                <Form.Field
                  required
                  onChange={(e, o) => this.handleChange('name_tr', o)}
                  defaultValue={this.state.modalForm.name_tr}
                  control={Input}
                  label={messages['L__TITLE'] + ' (tr)'}
                />
              </Form.Group>
            </Form>

            <TransactionSelect
              openTr={this.state.openTransactionModal}
              transactionModal={this.transactionModal.bind(this)}
              currentTransactions={this.props.currentTransactions}
              selectedTrId={this.selectedTrId.bind(this)}
              messages={this.props.messages}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.props.addFormModal(false)}>
              {messages['BTN__CANCEL']}
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={this.submitForm.bind(this)}
              labelPosition="right"
              content={messages['save']}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AddNode;

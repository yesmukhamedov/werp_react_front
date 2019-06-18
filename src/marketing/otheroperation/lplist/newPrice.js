import React, { Component } from 'react';
import { Form, Button, Input, Icon, Modal, Dropdown } from 'semantic-ui-react';
import Matrn from './matnrList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import OutputErrors from '../../../general/error/outputErrors';

class NewPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalForm: {
        bukrs: '',
      },
      showMatnrModal: false,
      row: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveModal = this.saveModal.bind(this);
  }

  saveModal() {
    let errors = [];
    const modalForm = this.state.modalForm;

    errors = this.validate(modalForm);
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.addNPrice(modalForm);
    }
    this.setState({ errors });
  }

  validate(modalForm) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const { bukrs, country_id, waers, price, from_date } = modalForm;
    if (
      bukrs === null ||
      bukrs === undefined ||
      !bukrs ||
      country_id === null ||
      country_id === undefined ||
      !country_id ||
      waers === null ||
      waers === undefined ||
      !waers ||
      from_date === null ||
      from_date === undefined ||
      !from_date
    ) {
      errors.push(errorTable['138' + language]);
    }
    if (price === null || price === undefined || !price) {
      errors.push(errorTable['61' + language]);
    }
    return errors;
  }

  getAllMatnr() {
    this.props.allMatnr();
    this.setState({
      ...this.state,
      showMatnrModal: true,
    });
  }

  delMatnrRow() {
    const modalForm = Object.assign({}, this.state.modalForm);
    modalForm['matnr'] = '';
    this.setState({
      ...this.state,
      row: '',
      modalForm,
    });
  }

  closeMatnrModal = () => this.setState({ showMatnrModal: false });

  selRowMatnr(row) {
    const modalForm = Object.assign({}, this.state.modalForm);
    modalForm['matnr'] = row.matnr;
    this.setState({
      ...this.state,
      showMatnrModal: false,
      row,
      modalForm,
    });
  }

  handleChange(fieldName, o) {
    let bukrs = this.state.bukrs;
    const modalForm = Object.assign({}, this.state.modalForm);
    switch (fieldName) {
      case 'bukrs':
        modalForm.bukrs = o.value;
        break;
      case 'country_id':
        modalForm['country_id'] = o.value;
        this.props.countryOpts.some(c => {
          if (c.key === o.value) {
            modalForm['waers'] = c.waers;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'waers':
        modalForm['waers'] = o.value;
        break;
      case 'from_date':
        modalForm['from_date'] = o;
        break;
      default:
        modalForm[fieldName] = o.value;
    }
    this.setState({
      ...this.state,
      modalForm,
    });
  }

  render() {
    const { messages, showAddModal, countryOpts, matnr } = this.props;
    return (
      <div>
        <Modal size={'small'} open={showAddModal}>
          <Modal.Header>{'Новый прайс товара'}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {this.renderForm(messages, countryOpts)}
              <OutputErrors errors={this.state.errors} />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.props.close}>
              {messages['BTN__NO']}
            </Button>
            <Button color="teal" onClick={this.saveModal.bind(this)}>
              {messages['BTN__YES']}
            </Button>
          </Modal.Actions>
        </Modal>
        <Matrn
          matnr={matnr}
          messages={messages}
          showMatnrModal={this.state.showMatnrModal}
          selRow={this.selRowMatnr.bind(this)}
          closeMatnrModal={this.closeMatnrModal.bind(this)}
        />
      </div>
    );
  }

  renderForm(messages, countryOpts) {
    const { row, modalForm } = this.state;
    const { getCompanyOptions, branchOptions } = this.props;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <Dropdown
              fluid
              search
              selection
              value={modalForm.text}
              options={getCompanyOptions}
              onChange={(e, o) => this.handleChange('bukrs', o)}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['brnch']}</label>
            <Dropdown
              fluid
              search
              selection
              value={modalForm.text}
              options={modalForm.bukrs ? branchOptions[modalForm.bukrs] : []}
              onChange={(e, o) => this.handleChange('branch_id', o)}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field required>
            <label>{messages['country']}</label>
            <Dropdown
              fluid
              search
              selection
              value={modalForm.country_id}
              options={countryOpts}
              onChange={(e, o) => this.handleChange('country_id', o)}
            />
          </Form.Field>
          <Form.Field required>
            <label>{messages['waers']}</label>
            <Dropdown
              fluid
              search
              selection
              value={modalForm.waers}
              options={countryOpts.map(c => {
                return {
                  key: c.key,
                  text: c.waers,
                  value: c.waers,
                };
              })}
              onChange={(e, o) => this.handleChange('waers', o)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            required
            onChange={(e, o) => this.handleChange('price', o)}
            control={Input}
            label={messages['price']}
          />
          <Form.Field>
            <label>{messages['Form.DateFrom']}</label>
            <DatePicker
              required
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="DD.MM.YYYY"
              selected={
                modalForm.from_date ? moment(modalForm.from_date) : null
              }
              onChange={(e, o) => this.handleChange('from_date', e)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field required>
            <Button onClick={this.delMatnrRow.bind(this)}>
              <Icon name="trash" />
            </Button>
            <Input
              style={{ width: '75%' }}
              value={row == '' ? row : row.text45}
              onChange={(e, o) => this.inputChange('password', o)}
            />
            <Button onClick={this.getAllMatnr.bind(this)}>
              <Icon name="search" />
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}
export default NewPrice;

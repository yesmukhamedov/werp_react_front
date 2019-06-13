import React, { Component } from 'react';
import {
  Modal,
  Form,
  Input,
  Dropdown,
  Button,
  Icon,
  Table,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LazyPagination from '../../../general/pagination/LazyPagination';
import moment from 'moment';

class LazyCustSearch extends Component {
  constructor() {
    super();
    this.state = {
      modalForm: {},
    };
    this.handleLazySearch = this.handleLazySearch.bind(this);
    this.onPaginationItemClick = this.onPaginationItemClick.bind(this);
  }

  handleLazySearch(fieldName, o) {
    const modalForm = Object.assign({}, this.state.modalForm);
    switch (fieldName) {
      case 'firstname':
        modalForm['firstname'] = o.value;
        break;
      case 'iin_bin':
        modalForm['iin_bin'] = o.value;
        break;
      case 'lastname':
        modalForm['lastname'] = o.value;
        break;
      case 'country_id':
        modalForm['country_id'] = o.value;
        break;
      case 'middlename':
        modalForm['middlename'] = o.value;
        break;
      case 'passport_id':
        modalForm['passport_id'] = o.value;
        break;
      case 'birthday':
        modalForm['birthday'] = o.format('YYYY-MM-DD');
        break;

      default:
        modalForm[fieldName] = o.value;
    }

    this.setState({
      ...this.state,
      modalForm,
    });
  }

  onPaginationItemClick(page) {
    this.loadItems(this.state.modalForm, page);
  }

  loadItems(modalForm, page = 0) {
    let temp = [];
    temp.push('page=' + page);
    this.props.searchCustomer(modalForm, temp);
  }

  buttonSearch = () => {
    this.props.searchCustomer(this.state.modalForm);
  };

  selRow(row) {
    this.props.selCustomerRow(row);
  }

  render() {
    const { modalOpen, messages, modalClose } = this.props;
    const { modalForm } = this.state;
    return (
      <div>
        <Modal size={'large'} open={modalOpen} onClose={modalClose}>
          <Modal.Header>{messages['Table.Client']}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field
                    onChange={(e, o) => this.handleLazySearch('firstname', o)}
                    control={Input}
                    label={messages['firstname']}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field
                    onChange={(e, o) => this.handleLazySearch('iin_bin', o)}
                    control={Input}
                    label={messages['iinBin']}
                  />
                  <Form.Field
                    onChange={(e, o) => this.handleLazySearch('lastname', o)}
                    control={Input}
                    label={messages['lastname']}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field required>
                    <label>{messages['country']}</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      value={modalForm.country_id}
                      options={this.getCountryOptions()}
                      onChange={(e, o) =>
                        this.handleLazySearch('country_id', o)
                      }
                    />
                  </Form.Field>
                  <Form.Field
                    required
                    onChange={(e, o) => this.handleLazySearch('middlename', o)}
                    control={Input}
                    label={messages['middlename']}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field
                    onChange={(e, o) => this.handleLazySearch('passport_id', o)}
                    control={Input}
                    label={messages['passportNumber']}
                  />

                  <Form.Field>
                    <label>{messages['dateOfBirth']}</label>
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={
                        modalForm.birthday ? moment(modalForm.birthday) : null
                      }
                      locale="ru"
                      onChange={(e, o) => this.handleLazySearch('birthday', e)}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
              {/***************************************************************************** */}

              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>{messages['iinBin']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['fio']}</Table.HeaderCell>
                    <Table.HeaderCell>
                      {messages['dateOfBirth']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {messages['passportNumber']}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>{this.renderTableBody(messages)}</Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2">
                      {messages['overallSum']}: {this.props.lazymeta.totalRows}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan="6">
                      <LazyPagination
                        onItemClick={this.onPaginationItemClick}
                        totalRows={this.props.lazymeta.totalRows}
                        currentPage={this.props.lazymeta.page}
                        perPage={this.props.lazymeta.perPage}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>

              <Button
                floated="right"
                color={'teal'}
                onClick={this.buttonSearch}
              >
                {messages['Form.Search']}
              </Button>
              <Button
                floated="right"
                negative
                onClick={modalClose}
                type="button"
              >
                {messages['cancel']}
              </Button>
              <br />
              <br />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  renderTableBody(messages) {
    if (
      this.props.lazyitems.length === 0 ||
      this.props.lazyitems.length === undefined
    ) {
      return [];
    }
    return this.props.lazyitems.map(item => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>
            <Button style={style} onClick={this.selRow.bind(this, item)}>
              {item.iin_bin}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button style={style} onClick={this.selRow.bind(this, item)}>
              {item.fullFIO}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button style={style} onClick={this.selRow.bind(this, item)}>
              {item.birthday}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button style={style} onClick={this.selRow.bind(this, item)}>
              {item.passport_id}
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  getCountryOptions() {
    if (!this.props.countryList) {
      return [];
    }
    const { countryList } = this.props;
    let out = countryList.map(c => {
      return {
        key: parseInt(c.countryId, 10),
        text: c.country,
        currency: c.currency,
        value: parseInt(c.countryId, 10),
      };
    });
    return out;
  }
}

export default LazyCustSearch;

const style = { backgroundColor: 'white', color: 'black' };

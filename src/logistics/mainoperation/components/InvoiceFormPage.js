import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Segment,
  Divider,
  Tab,
  Loader,
  Icon,
  Form,
  Input,
  Button,
  Label,
  Grid,
  Table,
  TextArea,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import {
  blankInvoice,
  fetchInvoice,
  fetchInvoices,
  fetchMatnrs,
  saveInvoice,
  setInvoiceModel,
} from '../actions/logisticsActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDoctypeByUri } from '../../logUtil';
import { injectIntl } from 'react-intl';
import EnumFormField from './fields/EnumFormField';
import MatnrsGridModal from './MatnrsGridModal';
import { f4FetchWerksBranchList } from '../../../reference/f4/f4_action';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4WithCreationPage';
import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import _ from 'lodash';
import ActionButtons from './ActionButtons';

require('moment/locale/ru');

class InvoiceFormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctype: null,
      action: null,
      model: {
        items: [],
        new: true,
      },
      matnrsModalOpen: false,
      matnrsSearchModel: {},
      selectedMatnr: {},
      selectedMatnrIdx: null,
      errors: {},
      customerModalOpen: false,
      staffModalOpen: false,
    };

    this.loadItems = this.loadItems.bind(this);
    this.handleDocDate = this.handleDocDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.werksOptions = this.werksOptions.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handleSelectedMatnr = this.handleSelectedMatnr.bind(this);
    this.addRow = this.addRow.bind(this);
    this.handleMatnrsSearchFormHandle = this.handleMatnrsSearchFormHandle.bind(
      this,
    );
    this.handleItemChange = this.handleItemChange.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.generateSerialnumber = this.generateSerialnumber.bind(this);
    this.branchOptions = this.branchOptions.bind(this);
    this.onCustomerSelect = this.onCustomerSelect.bind(this);
    this.onStaffSelect = this.onStaffSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoiceModel.id !== this.state.model.id) {
      let model = Object.assign({}, nextProps.invoiceModel);
      this.setState({
        ...this.state,
        model: model,
      });
    }
  }

  componentDidMount() {
    let doctype = getDoctypeByUri(this.props.match.params.doctype);
    let action = this.props.match.params.action;
    this.setState({
      ...this.state,
      doctype: doctype,
      action: action,
    });
    if ('view' === action) {
      this.props.fetchInvoice(this.props.match.params.id, { mode: 'detail' });
    } else if (action === 'update') {
      this.props.fetchInvoice(this.props.match.params.id, {});
      this.props.f4FetchWerksBranchList();
    } else {
      this.props.blankInvoice(doctype);
      this.props.f4FetchWerksBranchList();
    }
  }

  onCustomerSelect(customer) {
    let model = Object.assign({}, this.state.model);
    if (customer) {
      model['customerName'] = customer['fullFIO'];
      model['customerId'] = customer['id'];
    } else {
      model['customerName'] = null;
      model['customerId'] = null;
    }

    this.setState({
      ...this.state,
      model: model,
      customerModalOpen: false,
    });
  }

  onStaffSelect(staff) {
    let model = Object.assign({}, this.state.model);
    if (staff) {
      model['responsibleName'] = staff['fio'];
      model['responsibleId'] = staff['staffId'];
    } else {
      model['responsibleName'] = '';
      model['responsibleId'] = null;
    }

    this.setState({
      ...this.state,
      model: model,
      staffModalOpen: false,
    });
  }

  loadItems() {
    let params = Object.assign({}, this.state.queryParams);
    params['doctype'] = this.state.doctype;
    this.props.fetchInvoices(params);
  }

  handleDocDate(m) {
    let model = Object.assign({}, this.state.model);
    if (m) {
      model['invoiceDate'] = m.valueOf();
    } else {
      model['invoiceDate'] = null;
    }

    this.setState({
      ...this.state,
      model: model,
    });
  }

  branchOptions(bukrs) {
    const a = this.props.branchOptions || {};
    return a[bukrs] || [];
  }

  werksOptions(branchId) {
    if (!this.props.werksBranchList) {
      return [];
    }

    let out = [];
    let w = this.props.werksBranchList;
    let temp = {};
    for (let k in w) {
      if (w[k]['branch_id'] === branchId && !temp[w[k]['werks']]) {
        out.push({
          key: w[k]['werks'],
          value: w[k]['werks'],
          text: w[k]['werksName'],
        });

        temp[w[k]['werks']] = 1;
      }
    }

    return out;
  }

  handleChange(data) {
    const { name, value } = data;
    let model = Object.assign({}, this.state.model);
    model[name] = value;
    if (name === 'bukrs') {
      model['toWerks'] = null;
      model['branchId'] = null;
      model['responsibleId'] = null;
      model['responsibleName'] = null;
    }

    this.setState({
      ...this.state,
      model: model,
    });
  }

  handleItemChange(fieldName, val, idx) {
    let model = Object.assign({}, this.state.model);
    let items = model['items'];
    let currMatnr = items[idx];
    currMatnr[fieldName] = val;
    items[idx] = currMatnr;
    model['items'] = items;
    this.setState({
      ...this.state,
      model: model,
    });
  }

  handleSelectedMatnr() {
    if (!this.state.selectedMatnr) {
      return;
    }
    let model = Object.assign({}, this.state.model);
    let matnrs = model['items'];
    let temp = _.find(matnrs, ['matnr', this.state.selectedMatnr.matnr]);
    if (temp) {
      alert('Товар уже добавлен!');
      return;
    }

    this.addRow({
      matnr: this.state.selectedMatnr.matnr,
      matnrName:
        this.state.selectedMatnr.text45 +
        '(' +
        this.state.selectedMatnr.code +
        ')',
      quantity: 0,
      barcode: '',
    });
  }

  addRow(item) {
    let model = Object.assign({}, this.state.model);
    model.items.push(item);
    this.setState({
      ...this.state,
      model: model,
      matnrsModalOpen: false,
      selectedMatnr: {},
      selectedMatnrIdx: null,
    });
  }

  removeRow(idx) {
    let model = Object.assign({}, this.state.model);
    let items = model['items'];
    let newItems = [];
    for (let k in items) {
      if (k != idx) {
        newItems.push(items[k]);
      }
    }

    model['items'] = newItems;
    this.setState({
      ...this.state,
      model: model,
    });
  }

  randomNumber() {
    let r = (Math.random() + 1) * 1000;
    let out = (r + '').split('.')[0];
    return out;
  }

  generateSerialnumber(idx) {
    let model = Object.assign({}, this.state.model);
    let items = model['items'];
    let currItem = items[idx];

    currItem['barcode'] =
      this.randomNumber() +
      '-' +
      this.randomNumber() +
      '' +
      this.randomNumber();
    currItem['quantity'] = 1;
    items[idx] = currItem;
    model['items'] = items;

    this.setState({
      ...this.state,
      model: model,
    });
  }

  handleMatnrsSearchFormHandle(e) {
    let searchModel = Object.assign({}, this.state.matnrsSearchModel);
    const { name, value } = e.target;
    searchModel[name] = value;

    this.setState({
      ...this.state,
      matnrsSearchModel: searchModel,
    });
  }

  renderItems(messages) {
    const { model, errors, action } = this.state;
    const matnrs = model.items || [];
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {messages['list_of_goods']}
              {action === 'view' ? (
                ''
              ) : (
                <Button
                  size={'small'}
                  icon
                  floated={'right'}
                  primary
                  onClick={() =>
                    this.setState({ ...this.state, matnrsModalOpen: true })
                  }
                >
                  <Icon name="plus" />
                </Button>
              )}
            </Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>{messages['name_of_goods']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['serial_number']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['count']}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {matnrs.map((m, idx) => {
            let key = 'matnrs[' + idx + '].';
            return (
              <Table.Row key={idx}>
                <Table.Cell>{m.matnrName}</Table.Cell>
                <Table.Cell>
                  {m.barcode}
                  {action === 'view' ? (
                    ''
                  ) : (
                    <Button icon onClick={() => this.generateSerialnumber(idx)}>
                      <Icon name="random" />
                    </Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {action === 'view' ? (
                    m['quantity']
                  ) : (
                    <Form.Input
                      error={errors[key + 'quantity'] ? true : false}
                      onChange={e =>
                        this.handleItemChange('quantity', e.target.value, idx)
                      }
                      value={m.quantity || 0}
                      type="number"
                    />
                  )}
                  <div style={{ color: 'red', fontSize: '11px' }}>
                    {errors[key + 'quantity']}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {action === 'view' ? (
                    ''
                  ) : (
                    <Button
                      icon
                      color="red"
                      onClick={() => this.removeRow(idx)}
                    >
                      <Icon name="trash" />
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  renderViewForm(label, value) {
    return (
      <Form.Field>
        <label>{label}</label>
        <Input value={value || ''} readOnly />
      </Form.Field>
    );
  }

  componentWillUnmount() {
    this.props.setInvoiceModel({});
  }

  render() {
    const { messages } = this.props.intl;
    const { model, action } = this.state;
    const { companyOptions, branchOptions } = this.props;
    let errors = {};
    return (
      <div className="ui segments">
        <div className="ui segment">
          <h3>
            Оприходования Trade In / {model.new ? 'Создание' : 'Редактирование'}
          </h3>
        </div>
        <div className="ui secondary segment">
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={6}>
                <ActionButtons
                  doctype={model.doctype}
                  docId={model.id}
                  actionButtons={model.actionButtons || []}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6}>
                <Form>
                  {action === 'view' ? (
                    this.renderViewForm(messages['bukrs'], model['bukrsName'])
                  ) : (
                    <EnumFormField
                      error={errors['bukrs']}
                      label={messages['bukrs']}
                      fieldName="bukrs"
                      value={model['bukrs'] || ''}
                      handleChange={this.handleChange}
                      options={this.props.companyOptions}
                    />
                  )}

                  {action === 'view' ? (
                    this.renderViewForm(messages['brnch'], model['branchName'])
                  ) : (
                    <EnumFormField
                      error={errors['branchId']}
                      label={messages['brnch']}
                      fieldName="branchId"
                      value={model['branchId']}
                      handleChange={this.handleChange}
                      options={this.branchOptions(model['bukrs'])}
                    />
                  )}

                  {action === 'view' ? (
                    this.renderViewForm(
                      messages['Table.ResponsibleStaff'],
                      model['responsibleName'],
                    )
                  ) : (
                    <Form.Field>
                      <label>{messages['Table.ResponsibleStaff']}</label>
                      <div>
                        <Button
                          icon="trash"
                          color="red"
                          float="left"
                          onClick={() => this.onStaffSelect(null)}
                        />
                        <Input
                          float="right"
                          value={model['responsibleName'] || ''}
                          readOnly
                          icon={
                            <Icon
                              name="search"
                              onClick={() =>
                                this.setState({
                                  ...this.state,
                                  staffModalOpen: true,
                                })
                              }
                              inverted
                              circular
                              link
                            />
                          }
                        />
                      </div>
                    </Form.Field>
                  )}

                  {action === 'view' ? (
                    this.renderViewForm(
                      messages['receiver_whouse'],
                      model['toWerksName'],
                    )
                  ) : (
                    <EnumFormField
                      error={errors['toWerks']}
                      label={messages['receiver_whouse']}
                      fieldName="toWerks"
                      handleChange={this.handleChange}
                      value={model['toWerks']}
                      options={this.werksOptions(model['branchId'])}
                    />
                  )}

                  {action === 'view' ? (
                    this.renderViewForm(
                      messages['customer'],
                      model['customerName'],
                    )
                  ) : (
                    <Form.Field>
                      <label>{messages['customer']}</label>
                      <div>
                        <Button
                          icon="trash"
                          color="red"
                          float="left"
                          onClick={() => this.onCustomerSelect(null)}
                        />
                        <Input
                          float="right"
                          value={model['customerName'] || ''}
                          readOnly
                          icon={
                            <Icon
                              name="search"
                              onClick={() =>
                                this.setState({
                                  ...this.state,
                                  customerModalOpen: true,
                                })
                              }
                              inverted
                              circular
                              link
                            />
                          }
                        />
                      </div>
                    </Form.Field>
                  )}
                  {action === 'view' ? (
                    this.renderViewForm(
                      messages['doc_date'],
                      model['invoiceDate'],
                    )
                  ) : (
                    <Form.Field>
                      <label>{messages['doc_date']}</label>

                      <DatePicker
                        className="date-100-width"
                        autoComplete="off"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" // timezone="UTC"
                        selected={
                          model['invoiceDate']
                            ? moment(model['invoiceDate'])
                            : null
                        }
                        locale="ru"
                        onChange={v => this.handleDocDate(v)}
                        dateFormat="DD.MM.YYYY"
                      />
                    </Form.Field>
                  )}

                  <Form.Field>
                    <label>{messages['bktxt']}</label>
                    <TextArea
                      readOnly={action === 'view'}
                      name="note"
                      onChange={(e, d) => this.handleChange(d)}
                      placeholder={'...'}
                      value={model['note'] || ''}
                    />
                  </Form.Field>

                  {action === 'view' ? (
                    ''
                  ) : (
                    <Button
                      disabled={this.state.saveBtnDisabled}
                      onClick={() => this.props.saveInvoice(this.state.model)}
                      type="submit"
                    >
                      {this.state.saveBtnDisabled ? 'Ждемс...' : 'Сохранить'}
                    </Button>
                  )}

                  {action === 'view'
                    ? this.renderViewForm('Status', model['statusName'])
                    : ''}
                </Form>
              </Grid.Column>

              <Grid.Column width={10}>
                <div style={{ color: 'red' }}>{errors['matnrs']}</div>
                {this.renderItems(messages)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <MatnrsGridModal
          matnrs={this.props.matnrs}
          messages={messages}
          formatMessage={this.props.intl.formatMessage}
          open={this.state.matnrsModalOpen}
          cancel={() =>
            this.setState({ ...this.state, matnrsModalOpen: false })
          }
          matnrsLoading={this.props.matnrsLoading}
          searchData={() =>
            this.props.fetchMatnrs(this.state.matnrsSearchModel)
          }
          handleChange={this.handleMatnrsSearchFormHandle}
          handleSelected={this.handleSelectedMatnr}
          selectedIdx={this.state.selectedMatnrIdx}
          onRowClick={rowInfo =>
            this.setState({
              ...this.state,
              selectedMatnr: rowInfo.original,
              selectedMatnrIdx: rowInfo.index,
            })
          }
        />

        <CustomerF4Modal
          open={this.state.customerModalOpen}
          onCloseCustomerF4={bool => {}}
          onCustomerSelect={this.onCustomerSelect}
        />

        <StaffF4Modal
          open={this.state.staffModalOpen}
          closeModal={bool => {}}
          onStaffSelect={this.onStaffSelect}
          trans="mmcc01"
          brnch={model['branchId']}
          branchOptions={branchOptions}
          bukrs={model['bukrs']}
          companyOptions={companyOptions}
          bukrsDisabledParent
          unemployedDisabledParent
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    werksBranchList: state.f4.werksBranchList,
    matnrs: state.logisticsReducer.matnrs,
    invoiceModel: state.logisticsReducer.invoiceModel,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchInvoices,
    f4FetchWerksBranchList,
    fetchMatnrs,
    blankInvoice,
    saveInvoice,
    fetchInvoice,
    setInvoiceModel,
  },
)(injectIntl(InvoiceFormPage));

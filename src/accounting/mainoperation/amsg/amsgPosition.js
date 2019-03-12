import React, { PureComponent } from 'react';
import {
  Table,
  Button,
  Icon,
  Input,
  Segment,
  Label,
  Dropdown,
} from 'semantic-ui-react';
import MatnrF4Modal from '../../../reference/f4/matnr/matnrF4Modal';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4';
import {
  moneyFormat,
  handleFocus,
  moneyInputHanler,
} from '../../../utils/helpers';

import _ from 'lodash';

class AmsgPosition extends PureComponent {
  constructor(props) {
    super(props);
    this.onInputChangeRows = this.onInputChangeRows.bind(this);
    this.matnrF4ModalOpenHanlder = this.matnrF4ModalOpenHanlder.bind(this);
    this.customerF4ModalOpenHanlder = this.customerF4ModalOpenHanlder.bind(
      this,
    );
    this.removeRow = this.removeRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    this.state = {
      matnrF4ModalOpen: false,
      customerF4ModalOpen: false,
      selectedRowIndex: null,
    };
  }
  componentWillMount() {
    this.addRow();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.brnch !== this.props.brnch) {
      // this.props.fetchCashBankHkontsByBranch(nextProps.bukrs,nextProps.brnch);
      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
      //   this.props.getCashBankByBranch();
    }
    if (nextProps.waers !== this.props.waers) {
      this.props.changeBseg('rows', [Object.assign({}, this.props.emptyRow)]);
    }
  }

  addRow() {
    const newRows = [
      ...this.props.rows,
      Object.assign({}, this.props.emptyRow),
    ];
    this.props.changeBseg('rows', newRows);
  }
  removeRow(idx) {
    const rows = JSON.parse(JSON.stringify(this.props.rows));
    const rows2 = [];
    for (let i = 0; i < rows.length; i++) {
      if (idx !== i) {
        const row = Object.assign({}, rows[i]);
        rows2.push(row);
      }
    }
    this.props.changeBseg('rows', rows2);
  }
  matnrF4ModalOpenHanlder(bool) {
    this.setState({ matnrF4ModalOpen: bool });
  }
  customerF4ModalOpenHanlder(bool) {
    this.setState({ customerF4ModalOpen: bool });
  }

  onInputChangeRows(value, stateFieldName, idx) {
    const rows = [...this.props.rows];
    if (stateFieldName === 'matnr') {
      if (
        this.state.selectedRowIndex === null ||
        this.state.selectedRowIndex === undefined
      ) {
        return;
      }
      const idx = this.state.selectedRowIndex;
      rows[idx].matnr = value.matnr;
      rows[idx].matnrName = value.text45;
      rows[idx].menge = 1;
      rows[idx].summa = value.price;
      rows[idx].minSumma = value.price;
      rows[idx].unitPrice = value.price;
      this.props.changeBseg('rows', rows);
      // this.setState({rows});
    } else if (stateFieldName === 'werks') {
      rows[idx].werks = value;
      this.props.changeBseg('rows', rows);
      // this.setState({rows});
    } else if (stateFieldName === 'menge') {
      value = value.replace(/\s+/g, '');
      const re = /^[0-9\b]+$/;
      if (value === '' || re.test(value)) {
        rows[idx].menge = value;
        rows[idx].summa = value * rows[idx].unitPrice;
        rows[idx].minSumma = value * rows[idx].unitPrice;
        this.props.changeBseg('rows', rows);
        // this.setState({rows});
      }
    } else if (stateFieldName === 'lifnr') {
      const customer = Object.assign({}, this.props.customer);
      customer.lifnr = value.id;
      customer.lifnrName = value.fullFIO;
      this.props.changeBseg('customer', customer);
    } else if (stateFieldName === 'summa') {
      const newVal = moneyInputHanler(value, 2);
      rows[idx].summa = newVal;
      if (newVal !== undefined) {
        this.props.changeBseg('rows', rows);
      }
    }
  }

  renderRows() {
    const werksBranchOptions = this.props.werksBranchList
      .filter(
        wa =>
          wa.bukrs === this.props.bukrs && wa.branch_id === this.props.brnch,
      )
      .map((wa, idx) =>
        // console.log(wa.branch_id,'wa.branch_id', wa.bukrs,'this.props.bukrs',this.props.bukrs,'key',idx);
        ({ key: idx, value: wa.werks, text: wa.werksName }),
      );
    // console.log(this.props.werksBranchList,'this.props.werksBranchList');

    return this.props.rows.map((item, idx) => (
      <Table.Row key={idx}>
        <Table.Cell>
          <span>
            {item.matnrName}{' '}
            <Button
              icon="external"
              onClick={() => {
                this.matnrF4ModalOpenHanlder(true);
                this.setState({ selectedRowIndex: idx });
              }}
            />
          </span>
        </Table.Cell>
        <Table.Cell>
          <Input
            value={new Intl.NumberFormat('ru-RU').format(item.menge)}
            maxLength="10"
            onChange={(e, { value }) =>
              this.onInputChangeRows(value, 'menge', idx)
            }
            onFocus={handleFocus}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            value={moneyFormat(item.summa)}
            onFocus={handleFocus}
            maxLength="18"
            onChange={(e, { value }) =>
              this.onInputChangeRows(value, 'summa', idx)
            }
          />
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            placeholder="Склад"
            search
            selection
            options={werksBranchOptions}
            value={item.werks}
            onChange={(e, { value }) =>
              this.onInputChangeRows(value, 'werks', idx)
            }
          />
        </Table.Cell>
        <Table.Cell>
          <Icon
            name="remove"
            onClick={() => this.removeRow(idx)}
            size="large"
            className="clickableIcon"
            color="red"
          />
        </Table.Cell>
      </Table.Row>
    ));
  }
  renderFooter() {
    return (
      <Table.Row>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell>
          <span>
            <strong>
              {moneyFormat(
                _.sum(_.map(this.props.rows, d => parseFloat(d.summa))),
              )}{' '}
              {this.props.waers}{' '}
            </strong>
          </span>
        </Table.Cell>

        <Table.Cell />
        <Table.Cell>
          <span>
            <Icon
              name="add"
              size="large"
              className="clickableIcon"
              color="green"
              onClick={() => this.addRow()}
            />
          </span>
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    return (
      <Segment padded size="small">
        <Label color="red" ribbon>
          Позиция
        </Label>
        <MatnrF4Modal
          open={this.state.matnrF4ModalOpen}
          closeModal={bool => this.matnrF4ModalOpenHanlder(bool)}
          trans="amsg"
          bukrs={this.props.bukrs}
          waers={this.props.waers}
          selectItem={item => this.onInputChangeRows(item, 'matnr', null)}
        />

        <CustomerF4Modal
          open={this.state.customerF4ModalOpen}
          onCloseCustomerF4={bool => this.customerF4ModalOpenHanlder(bool)}
          onCustomerSelect={item => this.onInputChangeRows(item, 'lifnr', null)}
        />

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Контрагент</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <span>
                  {' '}
                  {this.props.customer.lifnrName}{' '}
                  <Button
                    icon="external"
                    onClick={() => {
                      this.customerF4ModalOpenHanlder(true);
                    }}
                  />
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Материал</Table.HeaderCell>
              <Table.HeaderCell>Количество</Table.HeaderCell>
              <Table.HeaderCell>Сумма</Table.HeaderCell>
              <Table.HeaderCell>Склад</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderRows()}
            {this.renderFooter()}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default AmsgPosition;

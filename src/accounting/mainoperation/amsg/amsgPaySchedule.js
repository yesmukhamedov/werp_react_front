import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, Icon, Segment, Label, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  moneyFormat,
  handleFocus,
  moneyInputHanler,
} from '../../../utils/helpers';
import _ from 'lodash';

require('moment/locale/ru');
require('moment/locale/tr');

class AmsgPaySchedule extends PureComponent {
  constructor(props) {
    super(props);
    this.onInputChangePsRows = this.onInputChangePsRows.bind(this);
    this.addRowPS = this.addRowPS.bind(this);
    this.removeRowPs = this.removeRowPs.bind(this);
    this.renderRowsPS = this.renderRowsPS.bind(this);
    this.renderFooterPS = this.renderFooterPS.bind(this);
    this.addOneMonthToLastRowAndReturnDateString = this.addOneMonthToLastRowAndReturnDateString.bind(
      this,
    );
  }

  onInputChangePsRows(value, stateFieldName, idx) {
    const psRows = JSON.parse(JSON.stringify(this.props.psRows));

    if (stateFieldName === 'payment_date') {
      psRows[idx].payment_date = value.format('YYYY-MM-DD');
      for (let i = idx + 1; i < psRows.length; i++) {
        psRows[i].payment_date = moment(
          psRows[i - 1].payment_date,
          'YYYY-MM-DD',
        )
          .add(1, 'M')
          .format('YYYY-MM-DD');
      }
      this.props.changePaymentSchedule('psRows', psRows);
    } else if (stateFieldName === 'sum2') {
      const newVal = moneyInputHanler(value, 2);
      if (newVal !== undefined) {
        psRows[idx].sum2 = newVal;
        this.props.changePaymentSchedule('psRows', psRows);
      }

      // if (value===''){
      //     value = '0';
      // }
      // value = value.replace(/\s+/g, '');

      // if (value.charAt(value.length-1)==='.'){
      //     psRows[idx].sum2 = value;
      //     this.props.changePaymentSchedule('psRows',psRows);
      //     // this.setState({psRows});
      // }else
      // {
      //     // value = parseFloat(value);
      //     const dec1 = /^\$?[0-9]+(\.[0-9][0-9])?$/; //^[0-9\b]+$/;
      //     const dec2 = /^\$?[0-9]+(\.[0-9])?$/; //^[0-9\b]+$/;
      //     if (value === '' || dec1.test(value) || dec2.test(value)) {
      //         psRows[idx].sum2 = value;
      //         this.props.changePaymentSchedule('psRows',psRows);
      //         // this.setState({psRows});
      //     }
      // }
    }
  }

  addRowPS() {
    if (this.props.psRows.length === 7) {
      return '';
    }
    const row = Object.assign({}, this.props.emptyPsRow);
    const psRows = JSON.parse(JSON.stringify(this.props.psRows));
    row.payment_date = this.addOneMonthToLastRowAndReturnDateString(psRows);
    psRows.push(row);
    this.props.changePaymentSchedule('psRows', psRows);
    // this.setState({psRows});
  }
  removeRowPs(idx) {
    const psRows = JSON.parse(JSON.stringify(this.props.psRows));
    const psRows2 = [];
    for (let i = 0; i < psRows.length; i++) {
      if (idx !== i) {
        const row = Object.assign({}, psRows[i]);
        if (i > 1) {
          row.payment_date = this.addOneMonthToLastRowAndReturnDateString(
            psRows2,
          );
        }
        psRows2.push(row);
      }
    }
    this.props.changePaymentSchedule('psRows', psRows2);
    // this.setState({psRows:psRows2});
  }
  addOneMonthToLastRowAndReturnDateString(a_rows) {
    let date = '';
    if (a_rows !== null && a_rows.length > 0) {
      date = moment(a_rows[a_rows.length - 1].payment_date, 'YYYY-MM-DD')
        .add(1, 'M')
        .format('YYYY-MM-DD');
    }
    return date;
  }
  renderRowsPS() {
    let psName = '';
    return this.props.psRows.map((item, idx) => {
      if (idx === 0) {
        psName = 'Первоначальный взнос';
      } else {
        psName = 'Ежемесячный взнос';
      }
      // if (idx>1){
      return (
        <Table.Row key={idx}>
          <Table.Cell>{psName}</Table.Cell>
          <Table.Cell>
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" // timezone="UTC"
              selected={
                item.payment_date ? moment(item.payment_date, 'YYYY-MM-DD') : ''
              }
              onChange={(e, { value }) =>
                this.onInputChangePsRows(e, 'payment_date', idx)
              }
              locale={this.props.language}
              disabled={idx !== 1}
              dateFormat="DD.MM.YYYY"
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              value={moneyFormat(item.sum2)}
              maxLength="18"
              onChange={(e, { value }) =>
                this.onInputChangePsRows(value, 'sum2', idx)
              }
              onFocus={handleFocus}
            />
          </Table.Cell>
          <Table.Cell>
            {idx > 1 && (
              <Icon
                name="remove"
                onClick={() => this.removeRowPs(idx)}
                size="large"
                className="clickableIcon"
                color="red"
              />
            )}
          </Table.Cell>
        </Table.Row>
      );
      // }
    });
  }
  renderFooterPS() {
    return (
      <Table.Row>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell>
          <span>
            <strong>
              {moneyFormat(
                _.sum(_.map(this.props.psRows, d => parseFloat(d.sum2))),
              )}{' '}
              {this.props.waers}{' '}
            </strong>
          </span>
        </Table.Cell>
        <Table.Cell>
          <span>
            <Icon
              name="add"
              size="large"
              className="clickableIcon"
              color="green"
              onClick={() => this.addRowPS()}
            />
          </span>
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    return (
      <Segment padded size="small">
        <Label color="green" ribbon>
          График платежей
        </Label>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderRowsPS()}
            {this.renderFooterPS()}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state,'state');
  return {
    language: state.locales.lang,
  };
}

export default connect(mapStateToProps, {})(injectIntl(AmsgPaySchedule));

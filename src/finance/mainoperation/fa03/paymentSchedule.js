import React, { PureComponent } from 'react';
import { Table, Segment, Label, Input } from 'semantic-ui-react';
import { moneyFormat } from '../../../utils/helpers';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';

class PaymentSchedule extends PureComponent {
  render() {
    if (!this.props.ps || this.props.ps.length === 0) {
      return '';
    }
    const { formatMessage } = this.props.intl;

    return (
      <Segment padded size="small">
        <Label color="orange" ribbon>
          {formatMessage(messages.paymentSchedule)}
        </Label>
        <Table collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {formatMessage(messages.monthlyPayment)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {formatMessage(messages.paymentDate)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {formatMessage(messages.paymentAmount)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {formatMessage(messages.paid)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.ps.map((item, key) => (
              <Table.Row key={key}>
                <Table.Cell textAlign="center">
                  {key > 0 ? key : ''}
                  {item.is_firstpayment === 1
                    ? formatMessage(messages.firstPayment)
                    : ''}
                </Table.Cell>
                <Table.Cell>{item.payment_date}</Table.Cell>
                <Table.Cell>
                  <Input value={moneyFormat(item.sum2)} readOnly />
                </Table.Cell>
                <Table.Cell>
                  <Input value={moneyFormat(item.paid)} readOnly />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default injectIntl(PaymentSchedule);

//Contract payment schedule creation
import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { moneyFormat } from '../../../utils/helpers';
import { Segment, Table, Input, Label } from 'semantic-ui-react';

import { LinkToFa03AwkeyBukrs } from '../../../utils/outlink';

const MmcvFin = props => {
  const {
    contract = {},
    ps = [],
    intl: { messages },
  } = props;

  const paymentScheduleOutput = () => {
    let count = 0;
    return (
      <Segment padded size="small">
        <Label color="blue" ribbon>
          {messages['paymentSchedule']}
        </Label>
        <Table collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>{messages['date']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['amount']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['paid']}</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {ps &&
              ps.map(item => {
                const {
                  isFirstPayment,
                  paymentDate,
                  sum2,
                  paymentScheduleId,
                  paid,
                } = item;
                count += 1;
                return (
                  <Table.Row key={paymentScheduleId}>
                    <Table.Cell>
                      {isFirstPayment === 1
                        ? messages['firstPayment']
                        : count - 1}
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={paymentDate} />
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={moneyFormat(sum2)} />
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={moneyFormat(paid)} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </Segment>
    );
  };

  return (
    <div>
      <Table collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['termInMonth']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.paymentSchedule} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['price']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.price)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['paid']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.paid)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['remainder']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.price - contract.paid)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['prepayment']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.firstPayment)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['dealerDiscount']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.dealerSubtract)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['awkey']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToFa03AwkeyBukrs
                  awkey={contract.awkey}
                  bukrs={contract.bukrs}
                />
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['registeredTo']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.legalEntityName} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {paymentScheduleOutput()}
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
  };
}

export default connect(
  mapStateToProps,
  {},
)(injectIntl(MmcvFin));

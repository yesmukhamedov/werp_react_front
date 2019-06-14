//Contract payment schedule creation
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PriceListF4Modal from '../contractAdditionaComponents/priceListF4';
import {
  handleFocus,
  moneyFormat,
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import { f4FetchSubCompanies } from '../../../reference/f4/f4_action';
import { fetchDynObjMarketing } from '../../marketingAction';
import {
  Segment,
  Table,
  Icon,
  Dropdown,
  Input,
  Label,
} from 'semantic-ui-react';

import { LinkToFa03 } from '../../../utils/outlink';

const MmcrFin = props => {
  const {
    contract = {},
    bukrs,
    contractTypeId,
    branchId,
    ps = [],
    price,
    firstPayment,
    legalEntityId,
    legalEntityName,
    dealerSubtract,
    tcode,
    contractDate,
    waers,
    paymentSchedule,
    priceList = [],
    language,
    intl: { messages },
    subCompanies = [],
  } = props;

  const paymentScheduleOutput = () => {
    let count = 0;
    // console.log('paymentSchedule',ps)
    return (
      <Segment padded size="small">
        <Label color="blue" ribbon>
          {messages['paymentSchedule']}
        </Label>
        <Table collapsing>
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
                <LinkToFa03 awkey={contract.awkey} bukrs={contract.bukrs} />
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
  {
    f4FetchSubCompanies,
    fetchDynObjMarketing,
  },
)(injectIntl(MmcrFin));

import PropTypes from 'prop-types';
import React from 'react';
import { Grid, Label, List, Loader, Segment, Button } from 'semantic-ui-react';
import PortalComponentDisplay from '../../../../../../general/portal/PortalComponent';
import { LEGACY_URL } from '../../../../../../utils/constants';
import { constructFullName } from '../../../../../../utils/helpers';
import { LinkToMmcvNewTab } from '../../../../../../utils/outlink';
import { PaymentBreakdownTableDisplay } from '../PaymentBreakdownTable';

const FinancialInfoPanelDisplay = props => {
  const { financialDetails = {}, messages } = props;
  const {
    initialPayment,
    installmentPlanDuration,
    residualAmount,
    dealerDiscount,
    recommenderDiscount,
    financialAgent,
    recommender,
    additionalInfo,
    productSerialNumber,
    promotions,
    monthlyPayments,
    otherPurchases,
    currency,
    bankPartner,
  } = financialDetails;
  return (
    <Segment raised>
      <Label color="blue" ribbon>
        {messages.L__CLIENT_FINANCE_INFO}
      </Label>
      {financialDetails ? (
        <Grid columns={3} divided stackable>
          <Grid.Row>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__INITIAL_AMOUNT}:
                  </List.Header>
                  {(initialPayment && `${initialPayment} ${currency}`) || (
                    <span>&mdash;</span>
                  )}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__INSTALLMENT_TERM}:
                  </List.Header>
                  {installmentPlanDuration || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__REMAINING_AMOUNT}:
                  </List.Header>
                  {(residualAmount && `${residualAmount} ${currency}`) || (
                    <span>&mdash;</span>
                  )}
                </List.Item>
              </List>

              <PortalComponentDisplay
                openLabel={messages.H__MONTHLY_INSTALLMENT_SCHEDULE}
                closeLabel={messages.H__MONTHLY_INSTALLMENT_SCHEDULE}
                title={messages.H__MONTHLY_INSTALLMENT_SCHEDULE}
              >
                <PaymentBreakdownTableDisplay
                  monthlyPayments={monthlyPayments}
                  currency={currency}
                />
              </PortalComponentDisplay>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__DEALER_DISCOUNT}:
                  </List.Header>
                  {(dealerDiscount && `${dealerDiscount} ${currency}`) || (
                    <span>&mdash;</span>
                  )}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__RECOMMENDER_DISCOUNT}:
                  </List.Header>
                  {recommenderDiscount || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__PAY_VIA}:
                  </List.Header>
                  {(bankPartner && `${bankPartner.shortName}`) || (
                    <span>&mdash;</span>
                  )}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__FINANCIAL_AGENT}:
                  </List.Header>
                  {financialAgent && constructFullName(financialAgent)}
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__RECOMMENDER}:
                  </List.Header>
                  {(recommender && (
                    <LinkToMmcvNewTab
                      contractNumber={recommender.contractNumber}
                      customerFio={constructFullName(
                        recommender.recommenderName,
                      )}
                    />
                  )) || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__SUPPLEMENTAL_INFO}:
                  </List.Header>
                  {additionalInfo || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__PRODUCT_SERIAL_NUMBER}:
                  </List.Header>
                  {productSerialNumber || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    {messages.L__GIFTS}:
                  </List.Header>
                  {(promotions && promotions.join(', ')) || (
                    <span>&mdash;</span>
                  )}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Loader active />
      )}
    </Segment>
  );
};

FinancialInfoPanelDisplay.propTypes = {
  initialPayment: PropTypes.string.isRequired,
  remainingPayment: PropTypes.string.isRequired,
  dealerDiscount: PropTypes.string.isRequired,
  referalDiscount: PropTypes.string.isRequired,
  bankPartnerName: PropTypes.string.isRequired,
  financialAgent: PropTypes.string.isRequired,
  referrer: PropTypes.string.isRequired,
  serialNumber: PropTypes.string.isRequired,
  promotionName: PropTypes.string.isRequired,
};

export default FinancialInfoPanelDisplay;

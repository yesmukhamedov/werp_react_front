import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form, Grid, Loader, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PortalComponentDisplay from '../../../../../general/portal/PortalComponent';
import { PaymentBreakdownTableDisplay } from '../PaymentBreakdownTable';
import { LEGACY_URL } from '../../../../../utils/constants';

const FinancialInfoPanelDisplay = (props) => {
  const { financialDetails = {} } = props;
  const {
    initialPayment,
    residualAmount,
    dealerDiscount,
    recommenderDiscount,
    financialAgent,
    recommender,
    productSerialNumber,
    promotions,
    monthlyPayments,
    otherPurchases,
    bankPartner,
  } = financialDetails;
  return (
    <Segment raised>
      <Label color="blue" ribbon>
        Финансовые данные клиента
      </Label>
      {financialDetails ? (
        <Grid columns={4} divided stackable>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field
                  label="Первоначальная сумма"
                  control="input"
                  value={initialPayment}
                />
                <Form.Field
                  label="Остаток суммы"
                  control="input"
                  value={residualAmount}
                />
                <PortalComponentDisplay
                  openLabel="Ежемесячный взнос"
                  closeLabel="Скрыть ежемесячный взнос"
                >
                  <PaymentBreakdownTableDisplay
                    monthlyPayments={monthlyPayments}
                  />
                </PortalComponentDisplay>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field
                  label="Скидка от дилера"
                  control="input"
                  value={dealerDiscount}
                />
                <Form.Field
                  label="Скидка от рекомендателя"
                  control="input"
                  value={recommenderDiscount}
                />
                <Form.Field
                  label="Оплата через"
                  control="input"
                  value={
                    bankPartner && `${bankPartner.shortName}`
                  }
                />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field
                  label="Финансовый агент"
                  control="input"
                  value={
                    financialAgent &&
                    `${financialAgent.lastName || ''} ${financialAgent.firstName || ''} ${
                      financialAgent.patronymic || ''}`
                    }
                />
                {TextInputFormField(recommender)}
              </Form>
            </Grid.Column>

            <Grid.Column>
              <Form>
                <Form.Field
                  label="Заводской номер аппарата"
                  control="input"
                  value={productSerialNumber}
                />
                <Form.Field
                  label="Подарки"
                  control="input"
                  value={promotions && promotions.join(', ')}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Loader active />
      )}
    </Segment>
  );
};

function TextInputFormField(recommender) {
  if (recommender && recommender.recommenderName) {
    return (
      <Form.Field>
        <label>Рекомендатель</label>
        <Link target='_blank' to={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_id=` + recommender.contractNumber}>
          {`${recommender.recommenderName.lastName || ''} ${recommender.recommenderName.firstName || ''} ${
            recommender.recommenderName.patronymic || ''}`}
        </Link>
      </Form.Field>
    );
  }
  return (
    <Form.Field
      label="Рекомендатель"
      control="input"
      value=""
    />
  );
}

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

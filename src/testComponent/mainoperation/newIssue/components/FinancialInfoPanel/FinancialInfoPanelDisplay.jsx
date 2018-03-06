import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form, Grid, Loader } from 'semantic-ui-react';
import PortalComponentDisplay from '../../../../../general/portal/PortalComponent';
import { PaymentBreakdownTableDisplay } from '../PaymentBreakdownTable';

const PersonalInfoPanelDisplay = (props) => {
  const { financialDetails = {} } = props;
  const {
    initialPayment,
    residualAmount,
    dealerDiscount,
    recommenderDiscount,
    financialAgent,
    recommender,
    productBarcode,
    promotions,
    monthlyPayments,
    otherPurchases,
  } = financialDetails;
  console.log("PIPD", props)
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
                  <PaymentBreakdownTableDisplay monthlyPayments={monthlyPayments} />
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
                  value="???"
                />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field
                  label="Финансовый агент"
                  control="input"
                  value={financialAgent &&
                    `${financialAgent.lastName} ${financialAgent.firstName} ${financialAgent.patronymic}`}
                />
                <Form.Field
                  label="Рекомендатель"
                  control="input"
                  value={recommender}
                />
              </Form>
            </Grid.Column>

            <Grid.Column>
              <Form>
                <Form.Field
                  label="Заводской номер аппарата"
                  control="input"
                  value={productBarcode}
                />
                <Form.Field
                  label="Подарки"
                  control="input"
                  value={promotions &&
                    promotions.join(', ')}
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

PersonalInfoPanelDisplay.propTypes = {
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

export default PersonalInfoPanelDisplay;

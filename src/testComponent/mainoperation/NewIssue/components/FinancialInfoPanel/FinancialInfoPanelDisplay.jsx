import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form, Grid } from 'semantic-ui-react';
import PortalComponentDisplay from '../../../../../general/portal/PortalComponent';
import { PaymentBreakdownTableDisplay } from '../PaymentBreakdownTable';

const PersonalInfoPanelDisplay = props => (
  <Segment raised>
    <Label color="blue" ribbon>Финансовые данные клиента</Label>
    <Grid columns={4} divided stackable>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Field
              label="Первоначальная сумма"
              control="input"
              defaultValue={props.initialPayment}
            />
            <Form.Field
              label="Остаток суммы"
              control="input"
              defaultValue={props.remainingPayment}
            />
            <PortalComponentDisplay
              openLabel="Ежемесячный взнос"
              closeLabel="Скрыть ежемесячный взнос"
            >
              <PaymentBreakdownTableDisplay />
            </PortalComponentDisplay>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Field
              label="Скидка от дилера"
              control="input"
              defaultValue={props.dealerDiscount}
            />
            <Form.Field
              label="Скидка от рекомендателя"
              control="input"
              defaultValue={props.referalDiscount}
            />
            <Form.Field
              label="Оплата через"
              control="input"
              defaultValue={props.bankPartnerName}
            />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Field
              label="Финансовый агент"
              control="input"
              defaultValue={props.financialAgent}
            />
            <Form.Field
              label="Рекомендатель"
              control="input"
              defaultValue={props.referrer}
            />
          </Form>
        </Grid.Column>

        <Grid.Column>
          <Form>
            <Form.Field
              label="Заводской номер аппарата"
              control="input"
              defaultValue={props.serialNumber}
            />
            <Form.Field
              label="Подарки"
              control="input"
              defaultValue={props.promotionName}
            />
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

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

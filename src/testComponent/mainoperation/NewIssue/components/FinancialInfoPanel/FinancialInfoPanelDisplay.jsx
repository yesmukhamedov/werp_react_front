import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form } from 'semantic-ui-react';

const PersonalInfoPanelDisplay = props => (
  <Segment raised>
    <Label color="blue" ribbon>Финансовые данные клиента</Label>
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          label="Первоначальная сумма"
          control="input"
          value={props.initialPayment}
          width="2"
        />
        <Form.Field
          label="Остаток суммы"
          control="input"
          value={props.remainingPayment}
          width="2"
        />
        <Form.Field
          label="Скидка от дилера"
          control="input"
          value={props.dealerDiscount}
          width="2"
        />
        <Form.Field
          label="Скидка от рекомендателя"
          control="input"
          value={props.referalDiscount}
          width="2"
        />
        <Form.Field
          label="Оплата через"
          control="input"
          value={props.bankPartnerName}
          width="2"
        />
        <Form.Field
          label="Финансовый агент"
          control="input"
          value={props.financialAgent}
          width="2"
        />
        <Form.Field
          label="Рекомендатель"
          control="input"
          value={props.referrer}
          width="2"
        />
        <Form.Field
          label="Заводской номер аппарата"
          control="input"
          value={props.serialNumber}
          width="2"
        />
        <Form.Field
          label="Подарки"
          control="input"
          value={props.promotionName}
          width="2"
        />
      </Form.Group>
    </Form>
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

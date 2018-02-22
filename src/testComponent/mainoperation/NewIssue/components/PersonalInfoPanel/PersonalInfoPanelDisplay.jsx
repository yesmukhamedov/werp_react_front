import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form } from 'semantic-ui-react';

const PersonalInfoPanelDisplay = props => (
  <Segment raised>
    <Label color="red" ribbon>Данные клиента</Label>
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          label="Номер договора"
          control="input"
          value={props.contractId}
          width="2"
        />
        <Form.Field
          label="Филиал"
          control="input"
          value={props.branchName}
          width="2"
        />
        <Form.Field
          label="ФИО клиента"
          control="input"
          value={props.fullName}
          width="2"
        />
        <Form.Field
          label="ИИН клиента"
          control="input"
          value={props.customerIIN}
          width="2"
        />
        <Form.Field
          label="Дилер"
          control="input"
          value={props.dealerName}
          width="2"
        />
        <Form.Field
          label="Статус клиента"
          control="input"
          value={props.customerStatus}
          width="2"
        />
        <Form.Field
          label="Оформлен"
          control="input"
          value={props.filedBy}
          width="2"
        />
      </Form.Group>
    </Form>
  </Segment>
);

PersonalInfoPanelDisplay.propTypes = {
  contractId: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  customerIIN: PropTypes.string.isRequired,
  dealerName: PropTypes.string.isRequired,
  customerStatus: PropTypes.string.isRequired,
  filedBy: PropTypes.string.isRequired,
};

export default PersonalInfoPanelDisplay;

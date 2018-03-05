import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const ContactsPanelDisplay = props => (
  <div style={{ width: '600px' }}>
    <h3>Контактные данные</h3>
    <Form>
      <Form.Group>
        <Form.Field
          label="Адрес домашний"
          control="input"
          defaultValue={props.homeAddress}
          width="11"
        />
        <Form.Field
          label="Телефон"
          control="input"
          defaultValue={props.homePhone}
          width="5"
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          label="Адрес для клиента"
          control="input"
          defaultValue={props.clientAddress}
          width="11"
        />
        <Form.Field
          label="Телефон"
          control="input"
          defaultValue={props.clientPhone}
          width="5"
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          label="Адрес рабочий"
          control="input"
          defaultValue={props.workAddress}
          width="11"
        />
        <Form.Field
          label="Телефон"
          control="input"
          defaultValue={props.phonePhone}
          width="5"
        />
      </Form.Group>
    </Form>
  </div>
);

ContactsPanelDisplay.propTypes = {
  homeAddress: PropTypes.string.isRequired,
  homePhone: PropTypes.string.isRequired,
  clientAddress: PropTypes.string.isRequired,
  clientPhone: PropTypes.string.isRequired,
  workAddress: PropTypes.string.isRequired,
  phonePhone: PropTypes.string.isRequired,
};

export default ContactsPanelDisplay;

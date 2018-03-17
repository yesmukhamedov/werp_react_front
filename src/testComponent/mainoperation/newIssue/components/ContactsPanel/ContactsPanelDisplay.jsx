import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const labels = {
  home: 'Адрес домашний',
  service: 'Адрес для клиента',
  work: 'Адрес рабочий',
};
const renderContactItem = (item, label) =>
  (item ? (
    <Form.Group>
      <Form.Field
        label={label}
        control="input"
        value={item.address}
        width="8"
      />
      <Form.Field
        label="Телефон"
        control="input"
        defaultValue={`${item.telHome || ''} ${item.telMob1 ||
          ''} ${item.telMob2 || ''}`}
        width="10"
      />
    </Form.Group>
  ) : (
    ''
  ));

const ContactsPanelDisplay = (props) => {
  const { contactDetails = {} } = props;
  const { home, service, work } = contactDetails;
  return (
    <div style={{ width: '600px' }}>
      <h3>Контактные данные</h3>
      <Form>
        {renderContactItem(home, 'Адрес домашний')}
        {renderContactItem(service, 'Адрес для клиента')}
        {renderContactItem(work, 'Адрес рабочий')}
      </Form>
    </div>
  );
};

ContactsPanelDisplay.propTypes = {
  homeAddress: PropTypes.string.isRequired,
  homePhone: PropTypes.string.isRequired,
  clientAddress: PropTypes.string.isRequired,
  clientPhone: PropTypes.string.isRequired,
  workAddress: PropTypes.string.isRequired,
  phonePhone: PropTypes.string.isRequired,
};

export default ContactsPanelDisplay;

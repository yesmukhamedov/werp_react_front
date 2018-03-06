import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const labels = {
  dom: 'Адрес домашний',
  drugoi: 'Адрес для клиента',
  rabota: 'Адрес рабочий',
};

const ContactsPanelDisplay = (props) => {
  const { contactDetails } = props;
  console.log('CPD', props);
  return (
    <div style={{ width: '600px' }}>
      <h3>Контактные данные</h3>
      <Form>
        {
          contactDetails &&
          contactDetails.map(contact => (
            <Form.Group>
              <Form.Field
                label={labels[contact.type]}
                control="input"
                value={contact.address}
                width="6"
              />
              <Form.Field
                label="Телефон"
                control="input"
                defaultValue={contact.phoneNumbers.join('  ')}
                width="10"
              />
            </Form.Group>
          ))
        }

        {/* // <Form.Group>
        //   <Form.Field
        //     label="Адрес для клиента"
        //     control="input"
        //     defaultValue={props.clientAddress}
        //     width="11"
        //   />
        //   <Form.Field
        //     label="Телефон"
        //     control="input"
        //     defaultValue={props.clientPhone}
        //     width="5"
        //   />
        // </Form.Group>
        // <Form.Group>
        //   <Form.Field
        //     label="Адрес рабочий"
        //     control="input"
        //     defaultValue={props.workAddress}
        //     width="11"
        //   />
        //   <Form.Field
        //     label="Телефон"
        //     control="input"
        //     defaultValue={props.phonePhone}
        //     width="5"
        //   />
        // </Form.Group> */}
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

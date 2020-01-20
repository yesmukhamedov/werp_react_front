import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Icon, Button, Form, TextArea } from 'semantic-ui-react';

import { f4DeletePhone, f4FetchPhone, fetchPhoneHistory } from '../f4_action';

function PhoneF4DeleteModal(props) {
  const emptyData = {
    description: '',
  };
  const [data, setData] = useState({ ...emptyData });
  const [errors, setErrors] = useState([]);

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  const {
    intl: { messages },
    selectedPhone,
  } = props;

  const onInputChange = event => setData({ description: event.target.value });

  const handleSubmit = () => {
    let errors = [];
    errors = validate();

    const id = selectedPhone.id;
    const typeId = selectedPhone.typeId;
    const phone = selectedPhone.phone;
    const customerId = selectedPhone.customerId;
    const description = data.description;
    if (errors === null || errors === undefined || errors.length === 0) {
      props.f4DeletePhone(
        {
          id,
          typeId,
          phone,
          customerId,
          description,
        },
        () => {
          props.f4FetchPhone();
          props.fetchPhoneHistory();
        },
      );
      setErrors(errors);
      props.onCloseDeletePhoneF4(false);
    }
  };

  const validate = () => {
    const errors = [];
    const { description } = data;
    if (
      description === '' ||
      description === undefined ||
      description === null
    ) {
      errors.push(errorTable[`20${language}`]);
      return errors;
    }
    return errors;
  };
  const close = () => {
    props.onCloseDeletePhoneF4(false);
  };
  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="delete" size="big" />
        {messages['Crm.ToDelete']}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <TextArea
            placeholder={messages['phone_delete_description']}
            onChange={event => onInputChange(event)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon
          labelPosition="left"
          color="teal"
          size="small"
          onClick={close}
        >
          <Icon name="left chevron" />
          {messages['back']}
        </Button>
        <Button
          icon
          labelPosition="left"
          primary
          size="small"
          onClick={handleSubmit}
        >
          <Icon name="save" /> {messages['save']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  f4DeletePhone,
  f4FetchPhone,
  fetchPhoneHistory,
})(injectIntl(PhoneF4DeleteModal));

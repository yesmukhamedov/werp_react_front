import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Icon, Button, Form, TextArea } from 'semantic-ui-react';
import { postToCancelPlan } from '../smopccocAction';

function CancelPlanModal(props) {
  const emptyData = {
    description: '',
  };
  const [data, setData] = useState({ ...emptyData });
  const [errors, setErrors] = useState({});

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  const {
    intl: { messages },
    planId,
  } = props;

  const onInputChange = event => setData({ description: event.target.value });

  const handleSubmit = () => {
    let errors = validate();

    if (errors === null || errors === undefined || errors.length === 0) {
      props.postToCancelPlan({
        cancelReasonText: data.description,
        id: planId,
      });
      setErrors({ ...errors });
      close();
    }
  };

  const validate = () => {
    const errors = {};
    const { description } = data;
    if (
      description === '' ||
      description === undefined ||
      description === null
    ) {
      errors.description = true;
    }
    return errors;
  };
  const close = () => {
    props.onClosePlanModal(false);
  };

  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="delete" size="big" />
        {messages['cancel']}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <TextArea
            placeholder={messages['phone_delete_description']}
            onChange={event => onInputChange(event)}
            error={errors.description ? true : false}
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
  postToCancelPlan,
})(injectIntl(CancelPlanModal));

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Icon, Button, Form, TextArea } from 'semantic-ui-react';
import { postToCancelPlanVC } from '../smopspAction';

function CancelPlanModalVC(props) {
  const emptyData = {
    description: '',
  };
  const [data, setData] = useState({ ...emptyData });
  const [errors, setErrors] = useState({});

  const {
    intl: { messages },
    planId,
    handleClickApply,
  } = props;

  const onInputChange = event => setData({ description: event.target.value });

  const handleSubmit = () => {
    let errs = validate();
    if (Object.keys(errs).length === 0) {
      props.postToCancelPlanVC(
        {
          cancelReasonText: data.description,
          id: planId,
        },
        () => handleClickApply(),
      );
      setData({ description: '' });
      close();
    }
    setErrors({ ...errs });
  };

  const validate = () => {
    const err = {};
    const { description } = data;
    if (
      description === '' ||
      description === undefined ||
      description === null
    ) {
      err.description = true;
    }
    return err;
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
          <Form.Field error={errors.description ? true : false}>
            <TextArea
              placeholder={messages['description']}
              onChange={event => onInputChange(event)}
            />
          </Form.Field>
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
          <Icon name="save" /> {messages['execute']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  postToCancelPlanVC,
})(injectIntl(CancelPlanModalVC));

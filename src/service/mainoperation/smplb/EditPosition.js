import React, { Fragment, useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Button,
  Icon,
  Modal,
  Form,
  Select,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
const EditPosition = props => {
  const {
    companyPosition,
    intl: { messages },
    open,
    cancel,
  } = props;

  const [addInfo, setAddInfo] = useState({
    bukrs: '',
    position: '',
  });

  const onChange = (text, value) => {
    if (text === 'bukrs') {
      setAddInfo({ ...addInfo, bukrs: value });
    }

    if (text === 'position') {
      setAddInfo({ ...addInfo, position: value });
    }
  };

  const onCancel = () => {
    cancel();
    setAddInfo({
      bukrs: '',
      position: '',
    });
  };

  return (
    <Modal open={open}>
      <Header content={messages['toAdd']} textAlign="center" />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              selection
              label={messages['bukrs']}
              control={Select}
              options={companyPosition}
              onChange={(e, { value }) => onChange('bukrs', value)}
              placeholder={messages['bukrs']}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onCancel}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green">
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    companyPosition: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps)(injectIntl(EditPosition));

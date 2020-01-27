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
import { doGet } from '../../../utils/apiActions';

const AddPosition = props => {
  const {
    companyPosition,
    intl: { messages },
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [position, setPosition] = useState([]);

  const [addInfo, setAddInfo] = useState({
    bukrs: '',
    position: '',
  });

  useEffect(() => {
    doGet(`reference/positions`).then(res => {
      const loaded = res.data.map(p => ({
        key: p.position_id,
        text: p.text,
        value: p.position_id,
      }));
      setPosition(loaded);
    });
  }, []);

  const onChange = (text, value) => {
    if (text === 'bukrs') {
      setAddInfo({ ...addInfo, bukrs: value });
    }

    if (text === 'position') {
      setAddInfo({ ...addInfo, position: value });
    }
  };

  return (
    <Modal
      trigger={
        <Button color="teal" floated="right" onClick={() => setModalOpen(true)}>
          {messages['toAdd']}
        </Button>
      }
      open={modalOpen}
    >
      <Header content={messages['toAdd']} textAlign="center" />
      <Modal.Content>
        <Form>
          <Form.Field
            selection
            label={messages['bukrs']}
            control={Select}
            options={companyPosition}
            onChange={(e, { value }) => onChange('bukrs', value)}
            placeholder={messages['bukrs']}
            required
          />
          <Form.Field
            selection
            label={messages['Table.Position']}
            control={Select}
            options={position}
            onChange={(e, { value }) => onChange('position', value)}
            placeholder={messages['Table.Position']}
            required
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" inverted onClick={() => setModalOpen(false)}>
          <Icon name="remove" /> {messages['cancel']}
        </Button>
        <Button color="green" inverted>
          <Icon name="checkmark" /> {messages['BTN__ADD']}
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

export default connect(mapStateToProps)(injectIntl(AddPosition));

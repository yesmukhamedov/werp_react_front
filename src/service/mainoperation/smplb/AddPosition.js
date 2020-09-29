import React, { useState, useEffect } from 'react';
import { Header, Button, Icon, Modal, Form, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { doGet } from '../../../utils/apiActions';
import { fetchSmplbPost, fetchSmplb } from '../../serviceAction';

const AddPosition = props => {
  const {
    companyPosition,
    intl: { messages },
    params,
    fetchSmplbPost,
    fetchSmplb,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [position, setPosition] = useState([]);
  const [firstDropdownError, setFirstDropdownError] = useState(false);
  const [secondDropdownError, setSecondDropdownError] = useState(false);
  const [addPositionError, setAddPositionError] = useState(false);

  const [addInfo, setAddInfo] = useState({
    bukrs: '',
    positionId: '',
  });

  useEffect(() => {
    doGet(`reference/positions`).then(res => {
      const positions = res.data.map(p => ({
        key: p.position_id,
        text: p.text,
        value: p.position_id,
      }));
      const sortPositions = positions.sort((a, b) =>
        a.text.localeCompare(b.text),
      );
      setPosition(sortPositions);
    });
  }, []);

  const onChange = (text, value) => {
    if (text === 'bukrs') {
      setAddInfo({ ...addInfo, bukrs: value });
      setFirstDropdownError(true);
    }

    if (text === 'position') {
      setAddInfo({ ...addInfo, positionId: parseInt(value) });
      setSecondDropdownError(true);
    }
  };

  const onAddPosition = () => {
    setAddPositionError(true);
    if (firstDropdownError && secondDropdownError) {
      fetchSmplbPost(addInfo, () => {
        fetchSmplb(params);
        setModalOpen(false);
      });
    } else {
      setModalOpen(true);
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
            error={addPositionError && !firstDropdownError ? true : false}
          />
          <Form.Field
            selection
            label={messages['Table.Position']}
            control={Select}
            options={position}
            onChange={(e, { value }) => onChange('position', value)}
            placeholder={messages['Table.Position']}
            required
            error={addPositionError && !secondDropdownError ? true : false}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" inverted onClick={() => setModalOpen(false)}>
          <Icon name="remove" /> {messages['cancel']}
        </Button>
        <Button color="green" inverted onClick={onAddPosition}>
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

export default connect(mapStateToProps, {
  fetchSmplbPost,
  fetchSmplb,
})(injectIntl(AddPosition));

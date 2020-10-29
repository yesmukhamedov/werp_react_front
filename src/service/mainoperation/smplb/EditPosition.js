import React, { useState, useEffect } from 'react';
import { Header, Button, Icon, Modal, Form, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { doGet } from '../../../utils/apiActions';
import { fetchSmplb, fetchSmplbPut } from '../../serviceAction';

const EditPosition = props => {
  const {
    companyPosition,
    intl: { messages },
    open,
    cancel,
    edit_id,
    fetchSmplbPut,
    params,
    fetchSmplb,
  } = props;
  const [position, setPosition] = useState([]);
  const [editPositionError, setEditPositionError] = useState(false);

  const [editInfo, setEditInfo] = useState({
    id: '',
    bukrs: '',
    positionId: '',
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

  useEffect(() => {
    if (edit_id !== null) {
      doGet(`service/smplb/${edit_id}`).then(res => {
        const data = res.data.data;
        setEditInfo({
          bukrs: data.bukrs,
          positionId: data.positionId,
          id: parseInt(data.id),
        });
      });
    }
  }, [edit_id]);

  const onChange = (text, value) => {
    if (text === 'bukrs') {
      setEditInfo({ ...editInfo, bukrs: value });
    }

    if (text === 'position') {
      setEditInfo({ ...editInfo, positionId: parseInt(value) });
    }
  };

  const onCancel = () => {
    cancel();
    setEditPositionError(false);
  };

  const onSaveEdit = () => {
    setEditPositionError(true);
    if (editInfo.bukrs !== '' && editInfo.positionId !== '') {
      fetchSmplbPut(editInfo, () => {
        fetchSmplb(params);
        onCancel();
      });
    }
  };

  return (
    <Modal open={open}>
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
            value={editInfo.bukrs}
            error={editPositionError && editInfo.bukrs === '' ? true : false}
          />
          <Form.Field
            selection
            label={messages['Table.Position']}
            control={Select}
            options={position}
            onChange={(e, { value }) => onChange('position', value)}
            placeholder={messages['Table.Position']}
            required
            value={editInfo.positionId}
            error={
              editPositionError && editInfo.positionId === '' ? true : false
            }
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" inverted onClick={onCancel}>
          <Icon name="remove" /> {messages['cancel']}
        </Button>
        <Button color="green" inverted onClick={onSaveEdit}>
          <Icon name="checkmark" /> {messages['save']}
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
  fetchSmplbPut,
  fetchSmplb,
})(injectIntl(EditPosition));

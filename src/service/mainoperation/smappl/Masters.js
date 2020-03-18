import React, { useState, Fragment } from 'react';
import { Button, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { fetchEditApp, fetchAppList } from '../../serviceAction';
import { connect } from 'react-redux';

const Masters = props => {
  const {
    intl: { messages },
    masterList,
    master,
    id,
    request,
    fetchEditApp,
    fetchAppList,
    searchParams,
  } = props;

  const [onModalOpen, setOnModalOpen] = useState(false);
  const [editMaster, setEditMaster] = useState();
  const [error, setError] = useState(false);

  const onChangeMaster = (e, { value }) => {
    setEditMaster({ ...editMaster, masterId: value });
  };

  const onClickMaster = () => {
    setEditMaster(request);
    setOnModalOpen(true);
  };

  const onCancel = () => {
    setEditMaster();
    setOnModalOpen(false);
    setError(false);
  };

  const onSave = () => {
    if (editMaster.masterId !== null) {
      fetchEditApp(editMaster, () => {
        fetchAppList(searchParams);
      });
      setOnModalOpen(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Fragment>
      <Modal
        trigger={
          <h5 style={{ color: 'brown' }}>
            <span className="pseudolink" onClick={onClickMaster}>
              {master !== null
                ? messages['change_master']
                : messages['Masters']}
            </span>
          </h5>
        }
        open={onModalOpen}
      >
        <Header
          content={
            master !== null ? messages['change_master'] : messages['Masters']
          }
        />
        <Modal.Content>
          <Dropdown
            defaultValue={id}
            selection
            options={masterList}
            placeholder={messages['Masters']}
            onChange={onChangeMaster}
            error={error}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={onCancel}>
            <Icon name="remove" /> {messages['cancel']}
          </Button>
          <Button color="green" onClick={onSave}>
            <Icon name="checkmark" /> {messages['save']}
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  fetchEditApp,
  fetchAppList,
})(injectIntl(Masters));

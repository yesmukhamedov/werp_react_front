import React, { useState, useEffect, Fragment } from 'react';
import { Button, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { fetchEditApp, fetchAppList } from '../../serviceAction';
import { connect } from 'react-redux';

const Masters = props => {
  const {
    intl: { messages },
    master,
    id,
    request,
    fetchEditApp,
    fetchAppList,
    searchParams,
    appMasterList,
  } = props;

  const [onModalOpen, setOnModalOpen] = useState(false);
  const [editMaster, setEditMaster] = useState();
  const [error, setError] = useState(false);

  const [masterList, setMasterList] = useState([]);

  console.log(searchParams);
  useEffect(() => {
    if (appMasterList !== undefined) {
      let masters = appMasterList.map(item => {
        return {
          key: item.staffId,
          text: item.fullFIO,
          value: item.staffId,
        };
      });
      setMasterList(masters);
    }
  }, [appMasterList]);

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
              <Icon size="large" name="edit" />
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
  return {
    appMasterList: state.serviceReducer.appMasterList,
  };
};

export default connect(mapStateToProps, {
  fetchEditApp,
  fetchAppList,
})(injectIntl(Masters));

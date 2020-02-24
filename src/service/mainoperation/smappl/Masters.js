import React, { useState, Fragment } from 'react';
import { Button, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const Masters = props => {
  const {
    intl: { messages },
    masterList,
    master,
    id,
  } = props;

  return (
    <Fragment>
      <Modal
        trigger={
          <h4>
            {master !== null ? messages['change_master'] : messages['Masters']}
          </h4>
        }
        closeIcon
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
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red">
            <Icon name="remove" /> {messages['cancel']}
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> {messages['save']}
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default injectIntl(Masters);

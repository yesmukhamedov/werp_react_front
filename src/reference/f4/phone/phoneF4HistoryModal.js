import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Icon, Table, Button } from 'semantic-ui-react';

import { f4FetchPhoneHistory } from '../f4_action';
const language = localStorage.getItem('language');

function PhoneF4HistoryModal(props) {
  const {
    intl: { messages },
    phoneListType = [],
    customerId,
    phoneHistory = [],
    lang,
  } = props;

  useEffect(() => {
    props.f4FetchPhoneHistory();
  }, []);

  const phone = phoneHistory.map((phone, key) => {
    if (!phoneHistory) {
      return [];
    }

    const pl = phoneListType.map(type => {
      if (phone.typeId === type.id && phone.customerId === customerId) {
        return (
          <Table.Row key={key}>
            <Table.Cell>
              <label>{type[`name${lang}`]}</label>
            </Table.Cell>
            <Table.Cell>
              <label>{phone.phone}</label>
            </Table.Cell>
            <Table.Cell>
              <label>{phone.revsttmp}</label>
            </Table.Cell>
          </Table.Row>
        );
      }
    });

    return pl;
  });

  const close = () => {
    props.onCloseHistoryPhoneF4(false);
  };
  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="history" size="big" />
        {messages['history']}
      </Modal.Header>
      <Modal.Content>
        <Table striped selectable>
          <Table.Body>{phone}</Table.Body>
        </Table>
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
      </Modal.Actions>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    phoneHistory: state.f4.phoneHistory.data,
  };
}

export default connect(mapStateToProps, {
  f4FetchPhoneHistory,
})(injectIntl(PhoneF4HistoryModal));

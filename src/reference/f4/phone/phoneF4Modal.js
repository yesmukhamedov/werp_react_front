import React, { useState, useEffect } from 'react';
import { Modal, Icon, Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { fetchPhoneType } from '../../../service/serviceAction';

import PhoneF4HistoryModal from './phoneF4HistoryModal';
import PhoneF4CreateModal from './phoneF4CreateModal';

function PhoneF4Modal(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phoneF4HistoryModalOpen, setPhoneF4HistoryModalOpen] = useState(false);
  const [phoneF4CreateModalOpen, setPhoneF4CreateModalOpen] = useState(false);

  const {
    intl: { messages },
    phoneList = [],
    phoneListType = [],
    customerId,
  } = props;

  useEffect(() => {
    props.fetchPhoneType();
  }, []);

  const phone = phoneList.map((phone, key) => {
    if (!phoneList) {
      return [];
    }
    const pl = phoneListType.map(type => {
      if (phone.type === type.id && phone.status === 'CREATED') {
        return (
          <Table.Row key={key}>
            <Table.Cell>
              <label>{type.nameRu}</label>
            </Table.Cell>
            <Table.Cell>
              <label>{phone.phone}</label>
            </Table.Cell>
          </Table.Row>
        );
      }
    });

    return pl;
  });

  const label = (
    <Table.Row>
      <Table.Cell></Table.Cell>
      <Table.Cell textAlign="center">
        <label>У этого пользователя нету номера. Добавьте номер!</label>
      </Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  );

  const close = () => {
    props.onClosePhoneF4(false);
  };
  return (
    <div>
      <PhoneF4HistoryModal
        open={phoneF4HistoryModalOpen}
        phoneList={phoneList}
        phoneListType={phoneListType}
        onCloseHistoryPhoneF4={bool => setPhoneF4HistoryModalOpen(bool)}
      />
      <PhoneF4CreateModal
        open={phoneF4CreateModalOpen}
        phoneList={phoneList}
        phoneListType={phoneListType}
        onCloseCreatePhoneF4={bool => setPhoneF4CreateModalOpen(bool)}
      />
      <Modal
        open={props.open}
        closeOnEscape={false}
        dimmer={'inverted'}
        onClose={close}
      >
        <Modal.Header>
          <Icon name="text telephone" size="big" />
          Контакты
        </Modal.Header>
        <Modal.Content>
          <Table component striped selectable>
            <Table.Body>{phone ? phone : label}</Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button
            size="small"
            icon
            color="teal"
            labelPosition="left"
            onClick={() => {
              setPhoneF4HistoryModalOpen(true);
            }}
          >
            <Icon name="history" />
            History
          </Button>
          <Button
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={() => {
              setPhoneF4CreateModalOpen(true);
            }}
          >
            <Icon name="phone" /> Add Number
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    phoneListType: state.serviceReducer.dynObjectPhoneType.data,
  };
}

export default connect(mapStateToProps, {
  fetchPhoneType,
})(injectIntl(PhoneF4Modal));

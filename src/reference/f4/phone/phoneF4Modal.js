import React, { useState, useEffect } from 'react';
import { Modal, Icon, Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { fetchPhoneType } from '../f4_action';

import PhoneF4HistoryModal from './phoneF4HistoryModal';
import PhoneF4CreateModal from './phoneF4CreateModal';
import PhoneF4UpdateModal from './phoneF4UpdateModal';

function PhoneF4Modal(props) {
  const emptyList = {
    selectedPhone: {},
  };
  const [list, setList] = useState({ ...emptyList });
  const [activeIndex, setActiveIndex] = useState(0);
  const [phoneF4HistoryModalOpen, setPhoneF4HistoryModalOpen] = useState(false);
  const [phoneF4CreateModalOpen, setPhoneF4CreateModalOpen] = useState(false);
  const [phoneF4UpdateModalOpen, setPhoneF4UpdateModalOpen] = useState(false);

  const {
    intl: { messages },
    phoneList = [],
    phoneListType,
    customerId,
  } = props;

  useEffect(() => {
    props.fetchPhoneType();
  }, []);

  const onPhoneSelect = value => {
    setList({ ...list, selectedPhone: value });
  };

  const phone = phoneList.map((phone, key) => {
    if (phone.customerId === customerId) {
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
              <Table.Cell collapsing>
                <Button
                  basic
                  color="blue"
                  icon
                  onClick={() => {
                    onPhoneSelect(phone);
                    setPhoneF4UpdateModalOpen(true);
                  }}
                >
                  <Icon name="pencil" />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        }
      });
      return pl;
    }
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
        customerId={customerId}
        phoneListType={phoneListType}
        onCloseHistoryPhoneF4={bool => setPhoneF4HistoryModalOpen(bool)}
      />
      <PhoneF4CreateModal
        open={phoneF4CreateModalOpen}
        customerId={customerId}
        phoneList={phoneList}
        phoneListType={phoneListType}
        onCloseCreatePhoneF4={bool => setPhoneF4CreateModalOpen(bool)}
      />
      <PhoneF4UpdateModal
        open={phoneF4UpdateModalOpen}
        customerId={customerId}
        phoneList={phoneList}
        phoneListType={phoneListType}
        selectedPhone={list.selectedPhone}
        //onPhoneSelect={(item, phone) => onPhoneSelect(item, phone)}
        onCloseUpdatePhoneF4={bool => setPhoneF4UpdateModalOpen(bool)}
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
          <Table striped selectable>
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

const getPhoneList = ph => {
  const phoneList = ph;
  if (!phoneList) {
    return [];
  }
  let out = ph.map(phone => {
    return {
      key: phone.id,
      text: phone.phone,
      customerId: phone.customerId,
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    phoneListType: state.f4.phoneType.data,
  };
}

export default connect(mapStateToProps, {
  fetchPhoneType,
})(injectIntl(PhoneF4Modal));

import React, { useState, useEffect } from 'react';
import { Modal, Icon, Table, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { fetchPhoneType, f4FetchCountryList } from '../f4_action';

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
    countryList = [],
    customerId,
    selectedBranch,
  } = props;

  useEffect(() => {
    props.fetchPhoneType();
    props.f4FetchCountryList();
  }, []);

  const onPhoneSelect = value => {
    setList({ ...list, selectedPhone: value });
  };

  const phone = phoneList.map((phone, key) => {
    if (phone.customerId === customerId) {
      const pl = phoneListType.map(type => {
        if (phone.type === type.id) {
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
        <Label basic color="red">
          {messages['choose_client']}
        </Label>
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
        country={getCountry(countryList, selectedBranch)}
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
          {messages['contactDetails']}
        </Modal.Header>
        <Modal.Content>
          <Table striped selectable>
            <Table.Body>{customerId ? phone : label}</Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button
            size="small"
            icon
            color="teal"
            labelPosition="left"
            onClick={() => {
              if (!customerId) {
                return;
              }
              setPhoneF4HistoryModalOpen(true);
            }}
          >
            <Icon name="history" />
            {messages['history']}
          </Button>
          <Button
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={() => {
              if (!customerId) {
                return;
              }
              setPhoneF4CreateModalOpen(true);
            }}
          >
            <Icon name="phone" /> {messages['add_number']}
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

const getCountry = (countryList, branch) => {
  let selectedCountry = {};
  for (let i = 0; i < countryList.length; i++) {
    if (countryList[i].countryId === branch.countryid) {
      selectedCountry = countryList[i];
    }
  }
  return selectedCountry;
};

function mapStateToProps(state) {
  return {
    phoneListType: state.f4.phoneType.data,
    countryList: state.f4.countryList,
  };
}

export default connect(mapStateToProps, {
  fetchPhoneType,
  f4FetchCountryList,
})(injectIntl(PhoneF4Modal));

import React, { useState, useEffect } from 'react';
import { Modal, Icon, Button, Dropdown, Input, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MaskedInput from 'react-text-mask';

import phoneMask from '../../../utils/phoneMask';
import { f4PostPhone, f4FetchPhone } from '../f4_action';

function PhoneF4CreateModal(props) {
  const emptyList = {
    typeId: 0,
    phone: '',
    description: 'CREATE NUMBER',
  };
  const [list, setList] = useState({ ...emptyList });
  const {
    intl: { messages },
    phoneListType = [],
    customerId,
    country,
    lang,
  } = props;

  const onInputChange = (o, fieldName) => {
    setList(prev => {
      const varList = { ...prev };
      switch (fieldName) {
        case 'typeList':
          varList.typeId = o.value;
          break;
        case 'phoneNumber':
          varList.phone = o.replace(/\D+/g, '');
          break;
        default:
          varList[fieldName] = o.value;
      }
      return varList;
    });
  };

  const handleSubmit = () => {
    const { typeId, phone, description } = list;
    console.log(typeId, phone, description, customerId);
    if (typeId !== 0 && phone !== '' && customerId !== '') {
      props.f4PostPhone(
        {
          customerId,
          description,
          phone,
          typeId,
        },
        () => props.f4FetchPhone(),
      );
    }
    props.onCloseCreatePhoneF4(false);
  };

  const close = () => {
    props.onCloseCreatePhoneF4(false);
    setList({
      typeId: 0,
      phone: '',
      description: 'CREATE NUMBER',
    });
  };
  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="pencil" size="big" />
        {messages['add_number']}
      </Modal.Header>
      <Modal.Content>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{messages['number_type']}</Table.Cell>
              <Table.Cell>
                <Dropdown
                  selection
                  search
                  options={getTypeList(phoneListType, lang)}
                  value={list.typeId}
                  onChange={(e, o) => onInputChange(o, 'typeList')}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['enter_number']}</Table.Cell>
              <Table.Cell>
                <Input type="number">
                  <MaskedInput
                    mask={phoneMask(country.code)}
                    placeholder={`${country.phoneCode} ${country.telPattern}`}
                    onChange={event => {
                      onInputChange(event.target.value, 'phoneNumber');
                    }}
                  />
                </Input>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
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
          <Icon name="left chevron" /> {messages['back']}
        </Button>
        <Button
          icon
          labelPosition="left"
          primary
          size="small"
          onClick={handleSubmit}
        >
          <Icon name="save" /> {messages['save']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const getTypeList = (lt, lang) => {
  const phoneListType = lt;
  if (!phoneListType) {
    return [];
  }
  let out = lt.map(e => {
    return {
      key: e.id,
      text: e[`name${lang}`],
      value: e.id,
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  f4PostPhone,
  f4FetchPhone,
})(injectIntl(PhoneF4CreateModal));

import React, { useState, useEffect } from 'react';
import { Modal, Icon, Button, Dropdown, Input, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { postPhone } from '../f4_action';

function PhoneF4CreateModal(props) {
  const emptyList = {
    type: 0,
    phone: '',
    status: 'CREATED',
    description: '',
  };
  const [list, setList] = useState({ ...emptyList });
  const { phoneListType = [], customerId } = props;

  const onInputChange = (o, fieldName) => {
    setList(prev => {
      const varList = { ...prev };
      switch (fieldName) {
        case 'typeList':
          varList.type = o.value;
          break;
        case 'phoneNumber':
          varList.phone = o.value;
          break;
        default:
          varList[fieldName] = o.value;
      }
      return varList;
    });
  };

  const handleSubmit = () => {
    const { type, phone, status, description } = list;
    if (type !== 0 && phone !== '' && customerId !== '') {
      props.postPhone({
        type,
        phone,
        status,
        description,
        customerId,
      });
    }
    props.onCloseCreatePhoneF4(false);
  };

  const close = () => {
    props.onCloseCreatePhoneF4(false);
    setList({
      type: '',
      phone: '',
      status: 'CREATED',
      description: '',
    });
  };

  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="pencil" size="big" />
        Добавить номер
      </Modal.Header>
      <Modal.Content>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Choose type of the number</Table.Cell>
              <Table.Cell>
                <Dropdown
                  selection
                  search
                  options={getTypeList(phoneListType)}
                  value={list.type}
                  onChange={(e, o) => onInputChange(o, 'typeList')}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Enter the number</Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="Введите номер"
                  type="number"
                  onChange={(e, o) => onInputChange(o, 'phoneNumber')}
                />
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
          <Icon name="left chevron" /> Back
        </Button>
        <Button
          icon
          labelPosition="left"
          primary
          size="small"
          onClick={handleSubmit}
        >
          <Icon name="save" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const getTypeList = lt => {
  const phoneListType = lt;
  if (!phoneListType) {
    return [];
  }
  let out = lt.map(e => {
    return {
      key: e.id,
      text: e.nameRu,
      value: e.id,
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  postPhone,
})(injectIntl(PhoneF4CreateModal));

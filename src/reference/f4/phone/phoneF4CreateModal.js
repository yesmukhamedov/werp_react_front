import React, { useState } from 'react';
import { Modal, Icon, Button, Dropdown, Input, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

function PhoneF4CreateModal(props) {
  const emptyList = {
    typeList: '',
  };
  const [list, setList] = useState({ ...emptyList });
  const { phoneListType = [] } = props;

  const onInputChange = (o, fieldName) => {
    setList(prev => {
      const varList = { ...prev };
      switch (fieldName) {
        case 'typeList':
          varList.typeList = o.value;
          break;
        default:
          varList[fieldName] = o.value;
      }
      return varList;
    });
  };

  const close = () => {
    props.onCloseCreatePhoneF4(false);
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
                  value={list.typeList}
                  onChange={(e, o) => onInputChange(o, 'typeList')}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Enter the number</Table.Cell>
              <Table.Cell>
                <Input placeholder="Введите номер" />
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
        <Button icon labelPosition="left" primary size="small">
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
      value: e.nameRu,
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(PhoneF4CreateModal));

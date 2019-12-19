import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Icon, Table, Button } from 'semantic-ui-react';

function PhoneF4HistoryModal(props) {
  const { phoneList = [], phoneListType = [] } = props;

  const phone = phoneList.map((phone, key) => {
    if (!phoneList) {
      return [];
    }
    const pl = phoneListType.map(type => {
      if (
        phone.type === type.id &&
        (phone.status === 'UPDATED' || phone.status === 'DELETED')
      ) {
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
        <label>Ничего не добавлено в историю :( </label>
      </Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  );

  const close = () => {
    props.onCloseHistoryPhoneF4(false);
  };
  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="history" size="big" />
        История
      </Modal.Header>
      <Modal.Content>
        <Table component striped selectable>
          <Table.Body>{phone ? phone : label}</Table.Body>
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
          Back
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(PhoneF4HistoryModal));

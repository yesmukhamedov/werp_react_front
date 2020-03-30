import React from 'react';
import { Button, Header, Icon, Modal, Table, Input } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const EmployeeModal = props => {
  const {
    intl: { messages },
  } = props;
  return (
    <Modal trigger={<Button>Show Modal</Button>} closeIcon>
      <Header textAlign="center" content="Archive Old Messages" />{' '}
      {/*  name of employee  */}
      <Modal.Content>
        <Table singleline>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{messages['bukrs']}</Table.Cell>
              <Table.Cell>
                <Input readOnly />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['position']}</Table.Cell>
              <Table.Cell>
                <Input readOnly />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red">
          <Icon name="remove" /> No
        </Button>
        <Button color="green">
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default injectIntl(EmployeeModal);

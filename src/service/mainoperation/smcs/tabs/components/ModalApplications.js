import React from 'react';
import { Table, Modal, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../../utils/DropdownClearable';

const ModalApplications = props => {
  const {
    open,
    closeModal,
    applications = [],
    onClose,
    masterOptions = [],
    operatorOptions = [],
    onChangeMasterApp,
    clearApplicationsMaster,
    onChangeOperatorApp,
    clearApplicationsOperator,
  } = props;
  return (
    <Modal open={open} closeIcon onClose={onClose} size="large">
      <Header content="Выберите доступные заявки" />
      <Modal.Content>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>CN</Table.HeaderCell>
              <Table.HeaderCell width={4}>ФИО клиента</Table.HeaderCell>
              <Table.HeaderCell width={4}>Мастер</Table.HeaderCell>
              <Table.HeaderCell width={4}>Оператор</Table.HeaderCell>
              <Table.HeaderCell width={2}>Вид заявки</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {applications.map(item => (
              <Table.Row key={item.applicationNumber}>
                <Table.Cell>{item.contractNumber}</Table.Cell>
                <Table.Cell>{item.customerFIO}</Table.Cell>
                <Table.Cell>
                  <DropdownClearable
                    fluid
                    selection
                    options={masterOptions}
                    value={item.masterId ? item.masterId : ''}
                    onChange={(e, { value }) => onChangeMasterApp(item, value)}
                    handleClear={() => clearApplicationsMaster(item)}
                    allSelect={false}
                  />
                </Table.Cell>
                <Table.Cell>
                  <DropdownClearable
                    fluid
                    selection
                    options={operatorOptions}
                    value={item.operatorId ? item.operatorId : ''}
                    onChange={(e, { value }) =>
                      onChangeOperatorApp(item, value)
                    }
                    handleClear={() => clearApplicationsOperator(item)}
                    allSelect={false}
                  />
                </Table.Cell>
                <Table.Cell>{item.applicationTypeName}</Table.Cell>
                <Table.Cell>
                  <Link
                    target="_blank"
                    to={`../mainoperation/smcs?applicationNumber=${item.applicationNumber}`}
                    onClick={onClose}
                  >
                    <Button color="green" fluid size="mini">
                      Перейти
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={closeModal}>
          Отмена
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalApplications;

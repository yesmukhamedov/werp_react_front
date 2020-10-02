import React, { useState, useEffect } from 'react';

import {
  Modal,
  Header,
  Button,
  Icon,
  Table,
  Input,
  Popup,
  Label,
  Divider,
} from 'semantic-ui-react';
import { moneyFormat } from '../../../utils/helpers';

const EditModalSmsetplp = props => {
  const { data = {}, open, onChangeEditModal } = props;
  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => onChangeEditModal('onCloseModal')}
    >
      <Header>
        <h3>{`Страна: ${data.countryName}, Компания: ${data.bukrsName}, Филиал: ${data.branchName} `}</h3>
      </Header>
      <Modal.Content>
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell rowSpan="4">Система по очистке воды</Table.Cell>
              <Table.Cell>Замена картриджей</Table.Cell>
              <Table.Cell>
                Текущий план
                <Popup
                  trigger={<Icon circular color="brown" name="question" />}
                >
                  <Popup.Content>
                    <div>
                      Текущий план база по количеству:{' '}
                      {moneyFormat(data.filterCurrentDatabasePlanCount)}
                    </div>
                    <Divider />
                    <div>
                      Текущий план база:{' '}
                      {moneyFormat(data.filterCurrentDatabasePlanSum)}
                    </div>
                  </Popup.Content>
                </Popup>
              </Table.Cell>
              <Table.Cell width={5}>
                <Input
                  type="number"
                  fluid
                  value={data.filterCurrentPlanSum}
                  onChange={event =>
                    onChangeEditModal(
                      'changeFilterCurrentPlanSum',
                      event.target.value,
                    )
                  }
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Замена картриджей</Table.Cell>
              <Table.Cell>
                Просроченный план
                <Popup
                  trigger={<Icon circular color="brown" name="question" />}
                >
                  <Popup.Content>
                    <div>
                      Просроченный план по количеству:{' '}
                      {moneyFormat(data.filterOverDueDatabasePlanCount)}
                    </div>
                    <Divider />
                    <div>
                      Просроченный план база:{' '}
                      {moneyFormat(data.filterOverDueDatabasePlanSum)}
                    </div>
                  </Popup.Content>
                </Popup>
              </Table.Cell>
              <Table.Cell width={5}>
                <Input
                  type="number"
                  fluid
                  value={data.filterOverDuePlanSum}
                  onChange={event =>
                    onChangeEditModal(
                      'changeFilterOverDuePlanSum',
                      event.target.value,
                    )
                  }
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Сервис пакет</Table.Cell>
              <Table.Cell>План</Table.Cell>
              <Table.Cell width={5}>
                <Input
                  type="number"
                  fluid
                  value={data.filterServicePacketPlanSum}
                  onChange={event =>
                    onChangeEditModal(
                      'changeFilterServicePacketPlanSum',
                      event.target.value,
                    )
                  }
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Продажа запчастей</Table.Cell>
              <Table.Cell>План</Table.Cell>
              <Table.Cell width={5}>
                <Input
                  type="number"
                  fluid
                  value={data.filterPartsPlanSum}
                  onChange={event =>
                    onChangeEditModal(
                      'changeFilterPartsPlanSum',
                      event.target.value,
                    )
                  }
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell rowSpan="3">Уборочная система</Table.Cell>
              <Table.Cell>Сервис пакет</Table.Cell>
              <Table.Cell>
                План
                <Popup
                  trigger={<Icon circular color="brown" name="question" />}
                >
                  <Popup.Content>
                    <div>
                      Текущий план база по количеству:
                      {moneyFormat(
                        data.filterVCServicePacketCurrentDatabasePlanCount,
                      )}
                    </div>
                    <Divider />
                    <div>
                      Текущий план база:{' '}
                      {moneyFormat(
                        data.filterVCServicePacketCurrentDatabasePlanSum,
                      )}
                    </div>
                    <Divider />
                    <div>
                      Просроченный план база по количеству:{' '}
                      {moneyFormat(
                        data.filterVCServicePacketOverDueDatabasePlanCount,
                      )}
                    </div>
                    <Divider />
                    <div>
                      Просроченный план база:
                      {moneyFormat(
                        data.filterVCServicePacketOverDueDatabasePlanSum,
                      )}
                    </div>
                  </Popup.Content>
                </Popup>
              </Table.Cell>
              <Table.Cell width={5}>
                <Input
                  type="number"
                  fluid
                  value={data.filterVCServicePacketPlanSum}
                  onChange={event =>
                    onChangeEditModal(
                      'changeFilterVCServicePacketPlanSum',
                      event.target.value,
                    )
                  }
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Продажа запчастей</Table.Cell>
              <Table.Cell>План</Table.Cell>
              <Table.Cell width={5}>
                <Input
                  type="number"
                  fluid
                  value={data.filterVCPartsPlanSum}
                  onChange={event =>
                    onChangeEditModal(
                      'changeFilterVCPartsPlanSum',
                      event.target.value,
                    )
                  }
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => onChangeEditModal('onCloseModal')}>
          <Icon name="remove" /> Отменить
        </Button>
        <Button color="green" onClick={() => onChangeEditModal('onSaveModal')}>
          <Icon name="checkmark" /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditModalSmsetplp;

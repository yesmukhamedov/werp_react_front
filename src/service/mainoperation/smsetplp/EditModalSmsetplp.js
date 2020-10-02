import React, { useState, useEffect } from 'react';

import { Modal, Header, Button, Icon, Table, Input } from 'semantic-ui-react';

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
              <Table.Cell>Текущий план</Table.Cell>
              <Table.Cell width={5}>
                <Input
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
              <Table.Cell>Просроченный план</Table.Cell>
              <Table.Cell width={5}>
                <Input
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
              <Table.Cell>План</Table.Cell>
              <Table.Cell width={5}>
                <Input
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

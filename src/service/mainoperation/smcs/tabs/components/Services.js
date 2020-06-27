import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Dropdown,
  Table,
  Input,
} from 'semantic-ui-react';

const Services = props => {
  const {
    data = [],
    addServices,
    handleRemoveService,
    servicesOptions = [],
    selectServices,
    editStatus,
    total,
  } = props;

  const servicesData = data.filter(el => el.ss == 22);

  return (
    <Segment>
      <h4>Услуги</h4>
      <Divider />

      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">№</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Наименование услуг
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Сумма</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Валюта</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {servicesData.map((item, index) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Input readOnly fluid value={index + 1} />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  placeholder="Выбрать услуги"
                  fluid
                  selection
                  value={item.serviceTypeId ? item.serviceTypeId : ''}
                  options={servicesOptions}
                  onChange={(e, value) => selectServices(item.id, value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  readOnly
                  fluid
                  value={item.sum != null ? item.sum : ''}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  readOnly
                  fluid
                  value={item.currencyName ? item.currencyName : ''}
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="mini"
                  color="red"
                  onClick={() => handleRemoveService(item)}
                >
                  Удалить
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Segment>Общая сумма: {total}</Segment>
      {data.length >= 4 ? (
        ''
      ) : (
        // <Button
        //   onClick={(e, value) => onChangeServices(e, 2, 'addServices')}
        //   icon
        //   labelPosition="left"
        //   color="green"
        //   size="small"
        //   disabled={editStatus}
        // >
        //   <Icon name="plus" size="small" /> Добавить услугу
        // </Button>
        <Button
          onClick={addServices}
          icon
          labelPosition="left"
          color="green"
          size="small"
          disabled={editStatus}
        >
          <Icon name="plus" size="small" /> Добавить услугу
        </Button>
      )}
    </Segment>
  );
};

export default Services;

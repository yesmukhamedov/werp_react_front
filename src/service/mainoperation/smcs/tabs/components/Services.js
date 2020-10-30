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
import { moneyFormat } from '../../../../../utils/helpers';

const Services = props => {
  const {
    data = [],
    addServices,
    handleRemoveService,
    servicesOptions = [],
    selectServices,
    onChangeSumm,
    editStatus,
    currency,
  } = props;

  const servicesData = data.filter(el => el.ss == 22);
  const totalServices = data.reduce((total, item) => total + item.sum, 0);

  return (
    <Segment>
      <h4>Услуги</h4>
      <Divider />

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>Наименование услуг</Table.HeaderCell>
            <Table.HeaderCell>Сумма</Table.HeaderCell>
            <Table.HeaderCell>Валюта</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {servicesData.map((item, index) => (
            <Table.Row key={item.id}>
              <Table.Cell width={1}>
                <p>{index + 1}</p>
              </Table.Cell>
              <Table.Cell width={5}>
                <Dropdown
                  placeholder="Выбрать услуги"
                  fluid
                  selection
                  value={item.serviceTypeId ? item.serviceTypeId : ''}
                  options={servicesOptions}
                  onChange={(e, value) => selectServices(item.id, value)}
                />
              </Table.Cell>
              <Table.Cell width={2}>
                <Input
                  type="number"
                  readOnly={item.serviceTypeId == 8 ? false : true}
                  fluid
                  value={item.sum != null ? item.sum : ''}
                  onChange={(e, value) =>
                    onChangeSumm(item.serviceTypeId, e.target.value)
                  }
                />
              </Table.Cell>
              <Table.Cell width={2}>
                <Input
                  readOnly
                  fluid
                  value={item.currencyName ? item.currencyName : ''}
                />
              </Table.Cell>
              <Table.Cell width={2}>
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
      {data.length > 0 ? (
        <Segment>
          Общая сумма: {moneyFormat(totalServices)} {currency}
        </Segment>
      ) : (
        ''
      )}
      {data.length >= 4 ? (
        ''
      ) : (
        <Button
          onClick={addServices}
          icon
          labelPosition="left"
          color="green"
          size="small"
          disabled={!editStatus}
        >
          <Icon name="plus" size="small" /> Добавить услугу
        </Button>
      )}
    </Segment>
  );
};

export default Services;

import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
  Table,
} from 'semantic-ui-react';
import { moneyFormat } from '../../../../../utils/helpers';

const SaleOfSparePart = props => {
  const { data = [], onChangeSparePart, editStatus, currency } = props;

  const totalSparePart = data.reduce((total, item) => total + item.sum, 0);

  return (
    <Segment>
      <h5>Продажа запчастей</h5>
      <Divider />

      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} textAlign="center">
              №
            </Table.HeaderCell>
            <Table.HeaderCell width={5} textAlign="center">
              Наименование
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Количество
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Сумма
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Валюта
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Гарантия
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <p>{index + 1}</p>
              </Table.Cell>
              <Table.Cell>
                <Input readOnly fluid value={item.matnrName} />
              </Table.Cell>
              <Table.Cell>
                <Input
                  fluid
                  value={item.quantity}
                  type="number"
                  onChange={(e, value) =>
                    onChangeSparePart(e, 'quantitySparePart', item)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  readOnly
                  fluid
                  value={item.sum != null ? moneyFormat(item.sum) : ''}
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
                <Checkbox
                  checked={item.warranty ? item.warranty : false}
                  label="Гарантия"
                  onChange={(e, value) =>
                    onChangeSparePart(item, 'warrantySparePart', value)
                  }
                />
              </Table.Cell>

              <Table.Cell>
                <Button
                  size="mini"
                  color="red"
                  onClick={() => onChangeSparePart(item, 'deleteSparePart')}
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
          Общая сумма: {moneyFormat(totalSparePart)} {currency}
        </Segment>
      ) : (
        ''
      )}
      <Button
        icon
        labelPosition="left"
        color="green"
        size="small"
        onClick={item => onChangeSparePart(item, 'addSparePartBtn')}
        disabled={!editStatus}
      >
        <Icon name="plus" size="small" />
        Добавить запчасти
      </Button>
    </Segment>
  );
};

export default SaleOfSparePart;

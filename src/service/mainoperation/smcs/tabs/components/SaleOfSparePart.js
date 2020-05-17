import React from 'react';
import {
  Button,
  Table,
  Dropdown,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
} from 'semantic-ui-react';

const SaleOfSparePart = props => {
  const { data = [], addSparePartBtn } = props;

  return (
    <Segment>
      <h5>Продажа запчастей</h5>
      <Divider />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>Наименование</Table.HeaderCell>
            <Table.HeaderCell>Количество</Table.HeaderCell>
            <Table.HeaderCell>Сумма</Table.HeaderCell>
            <Table.HeaderCell>Валюта</Table.HeaderCell>
            <Table.HeaderCell>Гарантия</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {data.map((item, index) => (
          <Table.Body key={index}>
            <Table.Row key={index}>
              <Table.Cell width={1}>{index + 1}</Table.Cell>
              <Table.Cell width={5}>{item.matnrName}</Table.Cell>
              <Table.Cell width={2}>
                <Input
                  style={{ padding: '0' }}
                  value={item.quantity}
                  type="number"
                  label={{ content: 'шт' }}
                  labelPosition="right"
                  fluid
                  //   onChange={e => changeSparePartCount(e, item)}
                />
              </Table.Cell>
              <Table.Cell width={2}>{item.sum}</Table.Cell>
              <Table.Cell width={2}>{item.currencyName}</Table.Cell>
              <Table.Cell width={2}>
                <Checkbox
                  checked={item.warranty}
                  label="Гарантия"
                  //   onChange={() => changeWarrantySparePart(item)}
                />
              </Table.Cell>
              <Table.Cell width={3}>
                <Button
                  color="red"
                  // onClick={() => removeSparePartItem(item)}
                >
                  Удалить
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>

      <Button
        // disabled={editStatus}
        icon
        labelPosition="left"
        color="green"
        size="small"
        onClick={addSparePartBtn}
      >
        <Icon name="plus" size="small" />
        Добавить запчасти
      </Button>
    </Segment>
  );
};

export default SaleOfSparePart;

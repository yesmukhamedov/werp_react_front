import React from 'react';
import { Input, Dropdown, Button, Icon, Table } from 'semantic-ui-react';

const SparePartListItem = props => {
  const {
    uuid,
    operTypeId,
    description,
    price,
    currency,
    quantity,
    totalPrice,
    code,
  } = props.data;
  return (
    <Table.Row>
      <Table.Cell>{props.idx + 1}</Table.Cell>
      <Table.Cell>
        <Dropdown
          fluid
          selection
          value={operTypeId}
          options={[
            {
              text: 'Продажа запчастей',
              value: 1,
            },
            {
              text: 'Услуга',
              value: 2,
            },
          ]}
          onChange={(e, data) =>
            props.handleCellChange(props.idx, 'operTypeId', data.value)
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Button
          disabled={operTypeId !== 1}
          icon
          onClick={() => props.handleOpen(uuid)}
        >
          <Icon name="external square" />
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Input fluid value={code} />
      </Table.Cell>
      <Table.Cell>
        <Input
          fluid
          value={description}
          onChange={(e, data) =>
            props.handleCellChange(props.idx, 'description', data.value)
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={price}
          fluid
          label={{
            basic: true,
            content: currency,
          }}
          labelPosition="right"
          type="number"
          onChange={(e, data) =>
            props.handleCellChange(props.idx, 'price', data.value)
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={quantity}
          fluid
          label={{
            basic: true,
            content: 'шт',
          }}
          type="number"
          min="1"
          onChange={(e, data) =>
            props.handleCellChange(props.idx, 'quantity', data.value)
          }
          labelPosition="right"
        />
      </Table.Cell>
      <Table.Cell>
        <Input value={totalPrice} fluid />
      </Table.Cell>
      <Table.Cell>
        <Button icon onClick={() => props.handleRemove(uuid)}>
          <Icon name="remove" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default SparePartListItem;

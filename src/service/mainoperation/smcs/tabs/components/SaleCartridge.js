import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
  Dropdown,
  Table,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../../../utils/helpers';

const SaleCartridge = props => {
  const { data = [], onChangeCartridge, editStatus, currency } = props;

  const totalCartridge = data.reduce((total, item) => total + item.sum, 0);

  const fnoOptions = [
    {
      key: 1,
      text: 1,
      value: 1,
    },
    {
      key: 2,
      text: 2,
      value: 2,
    },
    {
      key: 3,
      text: 3,
      value: 3,
    },
    {
      key: 4,
      text: 4,
      value: 4,
    },
    {
      key: 5,
      text: 5,
      value: 5,
    },
  ];

  const columns = [
    {
      Header: '№',
      accessor: 'matnrCode',
      Cell: row => {
        return <div>{row.index + 1}</div>;
      },
      width: 50,
    },
    {
      Header: 'Наименование',
      accessor: 'matnrName',
      width: 500,
    },
    {
      Header: 'F№',
      accessor: 'fno',
      Cell: ({ original }) => (
        <Dropdown
          fluid
          selection
          value={original.fno}
          onChange={(e, value) => onChangeCartridge(value, 'fnoEdit', original)}
          options={fnoOptions}
        />
      ),
    },
    {
      Header: 'Количество',
      accessor: 'quantity',
      Cell: ({ original }) => (
        <Input
          readOnly
          size="mini"
          style={{ padding: '0' }}
          value={original.quantity}
          type="number"
          label={{ content: 'шт' }}
          labelPosition="right"
          fluid
          onChange={item =>
            onChangeCartridge(item, 'quantityCartridge', original)
          }
        />
      ),
    },
    {
      Header: 'Сумма',
      accessor: 'sum',
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
    },
    {
      Header: 'Гарантия',
      accessor: 'warranty',
      Cell: ({ original }) => (
        <Checkbox
          // checked={original.warranty}
          label="Гарантия"
          //   onChange={() => warrantySparePart(item)}
        />
      ),
    },
    {
      Header: '',
      accessor: 'delete',
      Cell: ({ original }) => (
        <Button
          size="mini"
          color="red"
          onClick={() => onChangeCartridge(original, 'deleteCartridge')}
        >
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <Segment>
      <h4>Продажа картриджей</h4>
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
            <Table.HeaderCell width={1} textAlign="center">
              f№
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Количество
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Сумма
            </Table.HeaderCell>
            <Table.HeaderCell width={1} textAlign="center">
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
                <Input readOnly fluid value={index + 1} />
              </Table.Cell>
              <Table.Cell>
                <Input readOnly fluid value={item.matnrName} />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  fluid
                  selection
                  value={item.fno}
                  options={fnoOptions}
                  onChange={(e, value) =>
                    onChangeCartridge(value, 'fnoEdit', item.id)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  fluid
                  style={{ padding: '0' }}
                  value={item.quantity}
                  type="number"
                  label={{ content: 'шт' }}
                  labelPosition="right"
                  onChange={(e, value) =>
                    onChangeCartridge(e, 'quantityCartridge', item)
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
                    onChangeCartridge(value, 'warrantyCartridge', item.id)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="mini"
                  color="red"
                  onClick={(e, value) =>
                    onChangeCartridge(value, 'deleteCartridge', item.id)
                  }
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
          Общая сумма: {totalCartridge} {currency}
        </Segment>
      ) : (
        ''
      )}

      <Button
        onClick={item => onChangeCartridge(item, 'addCartridgeBtn')}
        icon
        labelPosition="left"
        color="green"
        size="small"
        disabled={editStatus}
      >
        <Icon name="plus" size="small" /> Добавить картриджей
      </Button>
    </Segment>
    // <Segment>

    //   <Divider />
    //   <ReactTableWrapper
    //     data={data}
    //     columns={columns}
    //     // className="-striped -highlight"
    //     pageSize={data.length > 10 ? 10 : data.length}
    //   />
    //   <Divider />

    //   <Button
    //     // disabled={editStatus}
    //     icon
    //     labelPosition="left"
    //     color="green"
    //     size="small"
    //     onClick={item => onChangeCartridge(item, 'addCartridgeBtn')}
    //     disabled={editStatus}
    //   >
    //     <Icon name="plus" size="small" />
    //     Добавить картриджей
    //   </Button>
    // </Segment>
  );
};

export default SaleCartridge;

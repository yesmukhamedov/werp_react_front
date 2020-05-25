import React from 'react';
import { Button, Table, Icon, Input, Dropdown } from 'semantic-ui-react';

const BasicInfoWithoutContract = props => {
  const { data = {} } = props;

  return (
    <Table collapsing className="borderLess">
      <Table.Body>
        <Table.Row>
          <Table.Cell>Номер заявки</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              fluid
              readOnly
              value={
                data.applicationNumber === null ? '' : data.applicationNumber
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Компания</Table.Cell>
          <Table.Cell>
            <Input type="text" fluid readOnly value={data.bukrsName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Филиал</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.branchName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Клиент</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.customerFullName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={4}>Заводской номер</Table.Cell>
          <Table.Cell width={12}>
            <Input fluid type="text" value={data.tovarSn} readOnly />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Категория</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.categoryName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Продукт</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.tovarName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>CN</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.contractNumber} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Адрес</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.address} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Дата покупки</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.contractDate} />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Мастер</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.masterFullName} />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Оператор</Table.Cell>
          <Table.Cell>
            <Input
              fluid
              readOnly
              value={data.operatorFullName ? data.operatorFullName : ''}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Дата сервиса</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.serviceDate} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Срок гарантии</Table.Cell>
          <Table.Cell className="tableRow">
            <Input readOnly value={data.warrantyPeriodDate} />
            <Input
              readOnly
              value={
                data.warrantyPeriodInMonth === 0
                  ? ''
                  : data.warrantyPeriodInMonth
              }
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BasicInfoWithoutContract;

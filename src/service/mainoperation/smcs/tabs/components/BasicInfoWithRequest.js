import React from 'react';
import { Table, Input } from 'semantic-ui-react';
import moment from 'moment';

const BasicInfoWithoutContract = props => {
  const { data = {} } = props;

  return (
    <Table>
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
            <Input
              fluid
              readOnly
              value={data.customerFullName ? data.customerFullName : ''}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={4}>Заводской номер</Table.Cell>
          <Table.Cell width={12}>
            <Input
              fluid
              type="text"
              value={data.tovarSn ? data.tovarSn : ''}
              readOnly
            />
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
            <Input
              fluid
              readOnly
              value={data.contractNumber ? data.contractNumber : ''}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Адрес</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.address ? data.address : ''} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Дата покупки</Table.Cell>
          <Table.Cell>
            <Input
              fluid
              readOnly
              value={
                data.contractDate
                  ? moment(data.contractDate).format('DD-MM-YYYY')
                  : ''
              }
            />
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
            <Input
              fluid
              readOnly
              value={
                data.serviceDate
                  ? moment(data.serviceDate).format('DD-MM-YYYY')
                  : ''
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Срок гарантии</Table.Cell>
          <Table.Cell>
            <Input
              readOnly
              value={
                data.warrantyPeriodDate
                  ? moment(data.warrantyPeriodDate).format('DD-MM-YYYY')
                  : ''
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Срок гарантии в месяц</Table.Cell>
          <Table.Cell>
            <Input
              readOnly
              value={
                data.warrantyPeriodInMonth ? data.warrantyPeriodInMonth : ''
              }
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BasicInfoWithoutContract;

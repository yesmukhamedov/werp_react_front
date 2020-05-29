import React from 'react';
import { Button, Table, Icon, Input, Dropdown } from 'semantic-ui-react';

const BasicInfoWithoutContract = props => {
  const {
    data = {},
    operatorOptions,
    onBasicInfoInputChange,
    companyOptions,
    branchOptions,
    categoryOptions,
    tovarOptions,
    masterOptions,
  } = props;

  const optionsExample = [
    { key: 1, text: 'name 1', value: 1 },
    { key: 2, text: 'name 2', value: 2 },
  ];

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
            <Dropdown
              fluid
              selection
              options={companyOptions}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectCompany')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Филиал</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={branchOptions}
              value={data.branchId}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectBranch')
              }
            />
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
            <Input fluid readOnly value={data.customerFullName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Категория</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={categoryOptions}
              value={data.categoryId}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectCategory')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Продукт</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={tovarOptions}
              value={data.tovarId}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectTovar')
              }
            />
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
            <Dropdown
              fluid
              selection
              value={data.masterId}
              options={masterOptions}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectMaster')
              }
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Оператор</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={operatorOptions}
              value={data.operatorId}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectOperator')
              }
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

import React from 'react';
import {
  Button,
  Table,
  Icon,
  Input,
  Dropdown,
  Segment,
  Form,
} from 'semantic-ui-react';
import DropdownClearable from '../../../../../utils/DropdownClearable';

const BasicInfoWithoutRequest = props => {
  const {
    data = {},
    operatorOptions = [],
    masterOptions = [],
    onBasicInfoInputChange,
  } = props;

  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={5}>Номер заявки</Table.Cell>
          <Table.Cell width={11}>
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
          <Table.Cell>
            <Form.Field required>
              <label>Заводской номер</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <Input
              fluid
              type="text"
              value={data.tovarSn}
              placeholder="Введите заводской номер"
              onChange={item =>
                onBasicInfoInputChange(item, 'inputChangeTovarSN')
              }
              action={
                <Button
                  icon="search"
                  content="Поиск"
                  primary
                  onClick={item =>
                    onBasicInfoInputChange(item, 'searchTovarSN')
                  }
                />
              }
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
          <Table.Cell>
            <Form.Field required>
              <label>Мастер</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              options={masterOptions}
              value={data.masterId ? data.masterId : ''}
              placeholder="Мастер"
              onChange={(e, item) =>
                onBasicInfoInputChange(item, 'changeMaster')
              }
              handleClear={(e, item) =>
                onBasicInfoInputChange(item, 'clearMaster')
              }
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <Form.Field required>
              <label>Оператор</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              options={operatorOptions}
              value={data.operatorId ? data.operatorId : ''}
              placeholder="Оператор"
              onChange={(e, item) =>
                onBasicInfoInputChange(item, 'changeOperator')
              }
              handleClear={(e, item) =>
                onBasicInfoInputChange(item, 'clearOperator')
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
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Срок гарантии в месяц</Table.Cell>
          <Table.Cell className="tableRow">
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

export default BasicInfoWithoutRequest;

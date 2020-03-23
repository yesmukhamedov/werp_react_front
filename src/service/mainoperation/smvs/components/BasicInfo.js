import React from 'react';
import { Segment, Button, Table, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BasicInfo = props => {
  return (
    <Segment>
      <Table collapsing className="borderLess">
        <Table.Body>
          <Table.Row>
            <Table.Cell>№ Сервиса</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="number"
                action={<Button icon="search" content="Поиск" primary />}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Статус сервиса</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>№ Заявки</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Компания</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Филиал</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Клиент</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={4}>Заводской номер</Table.Cell>
            <Table.Cell width={12}>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Категория товара</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Продукт</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>CN</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Адрес</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Дата покупки</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Мастер</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Оператор</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Дата сервиса</Table.Cell>
            <Table.Cell>
              <Input fluid disabled />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Срок гарантии</Table.Cell>
            <Table.Cell className="tableRow">
              <DatePicker />
              <Input />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default BasicInfo;

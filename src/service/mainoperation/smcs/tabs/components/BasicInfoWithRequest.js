import React from 'react';
import { Table, Input, Form, TextArea } from 'semantic-ui-react';
import moment from 'moment';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../../../utils/helpers';
import DatePicker from 'react-datepicker';
import DropdownClearable from '../../../../../utils/DropdownClearable';

const BasicInfoWithoutContract = props => {
  const { data = {}, onBasicInfoInputChange, operatorOptions = [] } = props;
  const lang = localStorage.getItem('language');

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
                  ? moment(data.contractDate).format('DD.MM.YYYY')
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
            <DropdownClearable
              allSelect={false}
              value={data.operatorId ? data.operatorId : ''}
              options={operatorOptions}
              onChange={(e, { value }) =>
                onBasicInfoInputChange(value, 'selectOperator')
              }
              handleClear={(e, value) =>
                onBasicInfoInputChange(value, 'clearOperator')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Form.Field>
              <label>Дата сервиса</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DatePicker
              autoComplete="off"
              dateFormat="DD.MM.YYYY"
              selected={
                data.serviceDate ? stringYYYYMMDDToMoment(data.serviceDate) : ''
              }
              dropdownMode="select"
              locale={lang}
              onChange={date =>
                onBasicInfoInputChange(
                  momentToStringYYYYMMDD(date),
                  'changeServiceDate',
                )
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
                  ? moment(data.warrantyPeriodDate).format('DD.MM.YYYY')
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
        <Table.Row>
          <Table.Cell>
            <Form.Field>
              <label>Примечание</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell className="tableRow">
            <TextArea
              placeholder="Примечание"
              value={data.info ? data.info : ''}
              onChange={(e, o) => onBasicInfoInputChange(o, 'infoChange')}
              style={{ minHeight: 100 }}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BasicInfoWithoutContract;

import React from 'react';
import {
  Button,
  Table,
  Input,
  Form,
  TextArea,
  Icon,
  Popup,
} from 'semantic-ui-react';
import DropdownClearable from '../../../../../utils/DropdownClearable';

import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../../../utils/helpers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../../style.css';

const BasicInfoWithoutRequest = props => {
  const {
    data = {},
    operatorOptions = [],
    masterOptions = [],
    onBasicInfoInputChange,
  } = props;
  const lang = localStorage.getItem('language');
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
            <Input
              type="text"
              fluid
              readOnly
              value={data.bukrsName ? data.bukrsName : ''}
            />
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
          <Table.Cell className="flexRow">
            <Form.Field>
              <label>CN</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <Input
              fluid
              type="text"
              value={data.contractNumber}
              placeholder="Введите CN"
              onChange={item => onBasicInfoInputChange(item, 'inputChangeCN')}
              action
              actionPosition="left"
            >
              <Popup
                content="История клиента"
                trigger={
                  <Link
                    target="_blank"
                    className="ui icon button primary"
                    to={`/service/mainoperation/smcuspor?contractNumber=${data.contractNumber}`}
                  >
                    <Icon name="address card" size="small" />
                  </Link>
                }
              />
              <input />
              <Button
                icon="search"
                content="Поиск"
                primary
                onClick={item => onBasicInfoInputChange(item, 'searchSN')}
              />
            </Input>
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
            <Form.Field>
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
          <Table.Cell className="tableRow">
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
          <Table.Cell className="tableRow">
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

export default BasicInfoWithoutRequest;

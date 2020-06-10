import React from 'react';
import { Segment, Button, Table, Input, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BasicInfo = props => {
  const {
    data = {},
    searchByServiceNumber,
    onChangeBasicInfo,
    serviceNumber,
    editStatus,
  } = props;

  const positions = data.positions;
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
                value={
                  serviceNumber === null || serviceNumber === undefined
                    ? ''
                    : serviceNumber
                }
                onChange={e =>
                  onChangeBasicInfo(e.target.value, 'changeServiceNumber')
                }
                action={
                  <Button
                    onClick={e => onChangeBasicInfo(e, 'searchByServiceNumber')}
                    icon="search"
                    content="Поиск"
                    primary
                  />
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Статус сервиса</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.serviceStatusName === null ||
                  data.serviceStatusName === undefined
                    ? ''
                    : data.serviceStatusName
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>№ Заявки</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.applicationNumber === null ||
                  data.applicationNumber === undefined
                    ? ''
                    : data.applicationNumber
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Компания</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.bukrsName === null || data.bukrsName === undefined
                    ? ''
                    : data.bukrsName
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Филиал</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.branchName === null || data.branchName === undefined
                    ? ''
                    : data.branchName
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Клиент</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.customerFullName === null ||
                  data.customerFullName === undefined
                    ? ''
                    : data.customerFullName
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={4}>Заводской номер</Table.Cell>
            <Table.Cell width={12}>
              <Input
                fluid
                readOnly
                value={
                  data.tovarSn === null || data.tovarSn === undefined
                    ? ''
                    : data.tovarSn
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Категория товара</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.categoryName === null || data.categoryName === undefined
                    ? ''
                    : data.categoryName
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Продукт</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.tovarName === null || data.tovarName === undefined
                    ? ''
                    : data.tovarName
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>CN</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.contractNumber === null ||
                  data.contractNumber === undefined
                    ? ''
                    : data.contractNumber
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Адрес</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.address === null || data.address === undefined
                    ? ''
                    : data.address
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Дата покупки</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.contractDate === null || data.contractDate === undefined
                    ? ''
                    : data.contractDate
                }
              />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Мастер</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.masterFullName === null ||
                  data.masterFullName === undefined
                    ? ''
                    : data.masterFullName
                }
              />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Оператор</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.operatorFullName === null ||
                  data.operatorFullName === undefined
                    ? ''
                    : data.operatorFullName
                }
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
                  data.serviceDate === null || data.serviceDate === undefined
                    ? ''
                    : data.serviceDate
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Срок гарантии</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.warrantyPeriodDate === null ||
                  data.warrantyPeriodDate === undefined
                    ? ''
                    : data.warrantyPeriodDate
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Гарантийный срок в месяце</Table.Cell>
            <Table.Cell>
              <Input
                fluid
                readOnly
                value={
                  data.warrantyPeriodInMonth === null ||
                  data.warrantyPeriodInMonth === undefined
                    ? ''
                    : data.warrantyPeriodInMonth
                }
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default BasicInfo;

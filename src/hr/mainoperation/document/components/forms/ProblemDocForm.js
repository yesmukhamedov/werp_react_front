import React from 'react';
import {
  Segment,
  Grid,
  Label,
  List,
  Select,
  Form,
  Table,
  Button,
} from 'semantic-ui-react';
import {
  formatDMYMS,
  formatDMY,
  moneyFormat,
} from '../../../../../utils/helpers';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('moment/locale/ru');

export default function ProblemDocForm(props) {
  const document = Object.assign({}, props.document);
  const bukrsOptions = props.bukrsOptions || [];
  const branchOptions = props.branchOptions || [];
  const items = document.items || [];
  const departmentList = props.departmentList || [];
  const positionList = props.positionList || [];
  const managerOptions = props.managerOptions || [];
  const directorOptions = props.directorOptions || [];
  const businessAreaOptions = props.businessAreaOptions || [];

  return (
    <div>
      <Segment raised>
        <Label color="blue" ribbon>
          Информация о документе
        </Label>
        <Form>
          <Form.Group widths="equal">
            <div className="field">
              <label>Компания</label>
              <select
                onChange={e =>
                  props.handleDocumentChange('bukrs', e.target.value)
                }
                value={document.bukrs || ''}
              >
                <option value="">Не выбрано</option>
                {bukrsOptions.map(bukrs => (
                  <option key={bukrs.key} value={bukrs.key}>
                    {bukrs.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Филиал</label>
              <select
                onChange={e =>
                  props.handleDocumentChange('branchId', e.target.value)
                }
                value={document.branchId || ''}
              >
                <option value="">Не выбрано</option>
                {branchOptions.map(branch => (
                  <option key={branch.key} value={branch.key}>
                    {branch.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Департамент</label>
              <select
                onChange={e =>
                  props.handleDocumentChange('departmentId', e.target.value)
                }
                value={document.departmentId || ''}
              >
                <option value="">Не выбрано</option>
                {departmentList.map(dep => (
                  <option key={dep.dep_id} value={dep.dep_id}>
                    {dep.name_ru}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Директор</label>
              <select
                onChange={e =>
                  props.handleDocumentChange('directorId', e.target.value)
                }
                value={document.directorId || ''}
              >
                <option value="">Не выбрано</option>
                {directorOptions.map(director => (
                  <option key={director.key} value={director.value}>
                    {director.text}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field label="Номер документа" control="input" disabled />
            <Form.Field
              label="Тип документа"
              control="input"
              disabled
              value={document.typeName || ''}
            />
            <Form.Field
              label="Ответственный"
              control="input"
              disabled
              value={document.responsibleName || ''}
            />
            <Form.Field
              label="Дата создания"
              control="input"
              disabled
              value={formatDMYMS(document.createdAt)}
            />
            <Form.Field
              label="Статус"
              control="input"
              disabled
              value={document.statusName || ''}
            />
            <Form.Field
              label="Составил"
              control="input"
              disabled
              value={document.creatorName || ''}
            />
          </Form.Group>
        </Form>
      </Segment>
      <Segment raised>
        <Label color="blue" ribbon>
          Данные документа
        </Label>

        <Button
          disabled={
            document.bukrs === undefined ||
            document.bukrs === null ||
            document.bukrs.length === 0
          }
          primary
          onClick={props.addItem}
          floated="right"
        >
          Добавить
        </Button>
        <br style={{ clear: 'both' }} />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>№</Table.HeaderCell>
              <Table.HeaderCell>
                Сотрудник снимается с должности
              </Table.HeaderCell>
              <Table.HeaderCell>Дата увольнения</Table.HeaderCell>
              <Table.HeaderCell>Примечание</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item, idx) => (
              <Table.Row key={item.staffId}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{item.staffName}</Table.Cell>
                <Table.Cell>
                  {
                    <DatePicker
                      locale="ru"
                      label=""
                      autoComplete="off"
                      placeholderText="Дата увольнения"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="DD.MM.YYYY"
                      selected={item.endDate ? moment(item.endDate) : null}
                      onChange={v => props.handleItemChange(idx, 'endDate', v)}
                    />
                  }
                </Table.Cell>
                <Table.Cell>
                  <textarea
                    className="ui fluid"
                    onChange={e =>
                      props.handleItemChange(idx, 'note', e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => props.removeItem(idx)} icon="trash" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
}

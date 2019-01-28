import React from 'react';
import { Segment, Label, Table } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
require('moment/locale/ru');

export default function ProblemDocItemForm(props) {
  const items = props['items'] || [];
  const problemOptions = props.problemOptions || [];

  return (
    <Segment raised>
      <Label color="blue" ribbon>
        Данные документа
      </Label>
      <br style={{ clear: 'both' }} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>Сотрудник снимается с должности</Table.HeaderCell>
            <Table.HeaderCell>Дата увольнения</Table.HeaderCell>
            <Table.HeaderCell>Тип проблемы</Table.HeaderCell>
            <Table.HeaderCell>Примечание</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, idx) => (
            <Table.Row key={item.staffId}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>
                {item.staffName}
                {item['currentSalary']
                  ? '(' + item['currentSalary']['positionName'] + ')'
                  : ''}
              </Table.Cell>
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
                <div className="field">
                  <select
                    onChange={e =>
                      props.handleItemChange(idx, 'problemId', e.target.value)
                    }
                    value={item.problemId || ''}
                  >
                    <option value="">Не выбрано</option>
                    {problemOptions.map(p => (
                      <option key={p.key} value={p.value}>
                        {p.text}
                      </option>
                    ))}
                  </select>
                </div>
              </Table.Cell>
              <Table.Cell>
                <textarea
                  className="ui fluid"
                  onChange={e =>
                    props.handleItemChange(idx, 'note', e.target.value)
                  }
                />
              </Table.Cell>
              <Table.Cell />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
}

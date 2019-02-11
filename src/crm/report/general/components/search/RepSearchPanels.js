import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

require('moment/locale/ru');

/**
 * Поисковая панель
 *
 */

// Отчет Демо/Продажа
export function RepSearch894(props) {
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Select
          name="bukrs"
          options={props.companyOptions}
          placeholder="Компания"
          onChange={props.handleChange}
        />
        <Form.Button label={' '} onClick={props.fetchItems}>
          Сформировать
        </Form.Button>
      </Form.Group>
    </Form>
  );
}

export function RepSearch935(props) {
  return (
    <Form>
      <Form.Group widths="equal">
        {renderBukrsSelect(props)}
        {renderBranchSelect(props, false)}
      </Form.Group>
      <Form.Group>
        <Form.Button onClick={props.fetchItems}>Сформировать</Form.Button>
      </Form.Group>
    </Form>
  );
}

// Ежедневный демо-отчет для директоров
export function RepSearch740(props) {
  return (
    <Form>
      <Form.Group widths="equal">
        {renderBukrsSelect(props)}
        {renderBranchSelect(props, false)}

        <Form.Select
          name="managerId"
          label="Менеджер"
          options={props.managerOptions}
          placeholder="Менеджер"
          onChange={props.handleChange}
        />

        <Form.Field>
          <label>Дата С</label>
          <DatePicker
            autoComplete="off"
            label=""
            placeholderText="Дата"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="DD.MM.YYYY"
            selected={props.dateTo ? moment(props.dateTo) : null}
            onChange={v => props.handleDate(v, 'dateTo')}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Button onClick={props.fetchItems}>Сформировать</Form.Button>
      </Form.Group>
    </Form>
  );
}

// Отчет Демо/Рекомендация
export function RepSearch934(props) {
  return RepSearch894(props);
}

//
export function RepSearch914(props) {
  return (
    <Form>
      <Form.Group widths="equal">
        {renderBukrsSelect(props)}
        {renderBranchSelect(props, false)}
      </Form.Group>
      <Form.Group>
        <Form.Button onClick={props.fetchItems}>Сформировать</Form.Button>
      </Form.Group>
    </Form>
  );
}

function renderBranchSelect(props, multiple) {
  return (
    <Form.Select
      name="branchId"
      search
      multiple={multiple}
      label="Филиал"
      options={props.branchOptions}
      placeholder="Филиал"
      onChange={props.handleChange}
    />
  );
}

function renderBusinessAreaSelect(props) {
  return (
    <Form.Select
      name="businessAreaId"
      label="Бизнес сфера"
      options={props.businessAreaOptions}
      placeholder="Бизнес сфера"
      onChange={props.handleChange}
    />
  );
}

function renderBukrsSelect(props) {
  return (
    <Form.Select
      name="bukrs"
      label="Компания"
      options={props.companyOptions}
      placeholder="Компания"
      onChange={props.handleChange}
    />
  );
}

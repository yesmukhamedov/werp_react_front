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

// Отчет о принятии на работу
export function RepSearch954(props) {
  return (
    <Form>
      <Form.Group widths="equal">
        {renderBukrsSelect(props)}
        {renderMultipleBranchSelect(props)}
        <Form.Select
          name="departmentId"
          search
          label="Департамент"
          selectOnBlur={false}
          options={props.departmentOptions}
          placeholder="Департамент"
          onChange={props.handleChange}
        />

        <Form.Select
          name="positionIds"
          search
          multiple
          label="Должность"
          selectOnBlur={false}
          options={props.positionOptions}
          placeholder="Должность"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group>
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
            selected={props.dateFrom ? moment(props.dateFrom) : null}
            onChange={v => props.handleDate(v, 'dateFrom')}
          />
        </Form.Field>

        <Form.Field>
          <label>Дата По</label>
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

        <Form.Field>
          <label>&nbsp;</label>
          <Form.Button onClick={props.fetchItems}>Сформировать</Form.Button>
        </Form.Field>
      </Form.Group>
    </Form>
  );
}

// function renderBranchSelect(props, multiple) {
//   return (
//     <Form.Select
//       name="branchId"
//       search
//       multiple={multiple}
//       label="Филиал"
//       options={props.branchOptions}
//       placeholder="Филиал"
//       onChange={props.handleChange}
//     />
//   );
// }

function renderMultipleBranchSelect(props) {
  return (
    <Form.Select
      name={props['fieldName'] || 'branchIds'}
      search
      multiple
      label={props['fieldLabel'] || 'Филиал'}
      options={props.branchOptions}
      placeholder={props['fieldPlaceholder'] || 'Филиал'}
      onChange={props.handleChange}
    />
  );
}

// function renderBusinessAreaSelect(props) {
//   return (
//     <Form.Select
//       name="businessAreaId"
//       label="Бизнес сфера"
//       options={props.businessAreaOptions}
//       placeholder="Бизнес сфера"
//       onChange={props.handleChange}
//     />
//   );
// }

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

function renderSelect(props) {
  return (
    <Form.Select
      name={props['fieldName'] || 'unknown'}
      search={props['search'] || true}
      multiple={props['multiple'] ? true : false}
      label={props['fieldLabel'] || 'Unknown'}
      selectOnBlur={false}
      options={props.options || []}
      placeholder={props['fieldPlaceholder'] || '...'}
      onChange={props.handleChange}
    />
  );
}

//TS Filters
export function RepSearch1256(props) {
  return (
    <Form>
      <Form.Group widths="equal">
        {renderSelect({
          fieldName: 'bukrs',
          fieldLabel: 'Компания',
          options: props['companyOptions'],
          multiple: false,
          handleChange: props.handleChange,
        })}
        {renderSelect({
          fieldName: 'recBranchIds',
          fieldLabel: 'Филиал рекомендателя',
          options: props['branchOptions'],
          multiple: true,
          handleChange: props.handleChange,
        })}
        {renderSelect({
          fieldName: 'recPositionIds',
          fieldLabel: 'Должность рекомендателя',
          options: props['positionOptions'],
          multiple: true,
          handleChange: props.handleChange,
        })}
      </Form.Group>
      <Form.Group>
        {renderSelect({
          fieldName: 'appBranchIds',
          fieldLabel: 'Филиал претендента',
          options: props['branchOptions'],
          multiple: true,
          handleChange: props.handleChange,
        })}
        {renderSelect({
          fieldName: 'appPositionIds',
          fieldLabel: 'Должность претендента',
          options: props['positionOptions'],
          multiple: true,
          handleChange: props.handleChange,
        })}

        <Form.Field>
          <label>Дата TS С</label>
          <DatePicker
            autoComplete="off"
            label=""
            placeholderText="Дата"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="DD.MM.YYYY"
            selected={props.dateFrom ? moment(props.dateFrom) : null}
            onChange={v => props.handleDate(v, 'dateFrom')}
          />
        </Form.Field>

        <Form.Field>
          <label>Дата TS По</label>
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

        <Form.Field>
          <label>&nbsp;</label>
          <Form.Button onClick={props.fetchItems}>Сформировать</Form.Button>
        </Form.Field>
      </Form.Group>
    </Form>
  );
}

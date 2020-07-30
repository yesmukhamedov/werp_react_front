import React from 'react';
// import { DatePickerFormField } from '../../../../../utils/formFields';
// import { Field } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Form, Input } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

export default function ExperienceForm(props) {
  const { model, index } = props;
  const locale = props.locale || 'ru';
  return (
    <Form.Group widths="equal">
      <Form.Field required>
        <label>Название Организации</label>
        <Input
          value={model.workPlace || ''}
          onChange={e => props.handleChange('workPlace', e.target.value, index)}
        />
      </Form.Field>

      <Form.Field required>
        <label>Должность</label>
        <Input
          value={model.position || ''}
          onChange={e => props.handleChange('position', e.target.value, index)}
        />
      </Form.Field>

      <Form.Field required>
        <label>Дата С</label>
        <DatePicker
          locale={locale}
          label=""
          autoComplete="off"
          placeholderText={'Дата С'}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="DD.MM.YYYY"
          selected={model.fromDate ? moment(model.fromDate) : null}
          onChange={v => props.handleChange('fromDate', v, index)}
        />
      </Form.Field>

      <Form.Field required>
        <label>Дата По</label>
        <DatePicker
          locale={locale}
          label=""
          autoComplete="off"
          placeholderText={'Дата По'}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="DD.MM.YYYY"
          selected={model.toDate ? moment(model.toDate) : null}
          onChange={v => props.handleChange('toDate', v, index)}
        />
      </Form.Field>
    </Form.Group>
  );
}

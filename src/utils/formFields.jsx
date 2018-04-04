import React from 'react';
import { Form, TextArea, Dropdown, Input, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export const DropdownFormField = (props) => {
  const {
    label,
    input,
    opts,
    disabled,
    required,
    meta: { touched, error },
  } = props;
  // {console.log(touched, error)}
  return (
    <Form.Field error={touched && error} required={required}>
      <label>{label}</label>
      
      <Dropdown
        disabled={disabled}
        selection
        options={opts}
        {...input}
        value={input.value}
        onChange={(param, data) => input.onChange(data.value)}
        placeholder={label}
      />
      {touched &&
        error && (
          <Label basic color="red" pointing>
            {error}
          </Label>
        )
      }
    </Form.Field>
  );
};

export const TextAreaFormField = (props) => {
  const {
    label,
    input,
    readOnly,
    meta: { touched, error },
  } = props;
  return (
    <Form.Field error={touched && error}>
      <label>{label}</label>
      <TextArea
        {...input}
        readOnly={readOnly}
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={label}
      />
      {touched &&
        error && (
          <Label basic color="red" pointing>
            {error}
          </Label>
        )
      }
    </Form.Field>
  );
};

export const TextInputFormField = (props) => {
  const {
    label,
    input,
    readOnly,
    meta: { touched, error },
  } = props;
  return (
    <Form.Field error={touched && error}>
      <label>{label}</label>
      <Input
        {...input}
        readOnly={readOnly}
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={label}
      />
      {touched &&
        (error &&
          <Label basic color="red" pointing>
            {error}
          </Label>
        )
      }
    </Form.Field>
  );
};

export const DatePickerFormField = (props) => {
  const {
    label,
    input,
    required,
    meta: { touched, error },
  } = props;
  return (
    <Form.Field error={touched && error} required={required}>
      <label>{label}</label>
      <DatePicker
        {...input}
        showYearDropdown
        dateFormat="YYYY-MM-DD"
        selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
      />
      {touched &&
        (error &&
          <Label basic color="red" pointing>
            {error}
          </Label>
        )
      }
    </Form.Field>
  );
};

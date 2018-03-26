import React from 'react';
import { Form, TextArea, Dropdown, Input, Label } from 'semantic-ui-react';

export const DropdownFormField = (props) => {
  const {
    label,
    input,
    opts,
    disabled,
    meta: { touched, error },
  } = props;
  // {console.log(touched, error)}
  return (
    <Form.Field error={touched && error}>
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

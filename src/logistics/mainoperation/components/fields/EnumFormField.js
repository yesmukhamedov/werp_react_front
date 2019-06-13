import React from 'react';
import { Form } from 'semantic-ui-react';

const EnumFormField = props => {
  const { options, fieldName, label, error, value, multiple, search } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      <Form.Select
        name={fieldName}
        multiple={multiple}
        search={search}
        selected={value}
        value={value}
        onChange={(e, d) => props.handleChange(d)}
        options={options || []}
        error={error ? true : false}
      />
      <div style={{ color: 'red', fontSize: '11px', marginTop: '-10px' }}>
        {error}
      </div>
    </Form.Field>
  );
};
export default EnumFormField;

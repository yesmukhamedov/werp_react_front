import React from 'react'
import {Form } from 'semantic-ui-react'

const EnumFormField = (props) => {
    const {options, fieldName,label,error,value, multiple,search} = props;

        return <Form.Field>
                <label>{label}</label>
                <Form.Select name={fieldName}
                multiple={multiple}
                 search={search}
                defaultValue={value} onChange={(e,d) => props.handleChange(d)}
                options={options} error={error} />
            </Form.Field>
}
export default EnumFormField;
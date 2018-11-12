import React from 'react';
import { Form, Select, Button } from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

const AssigneeGroupPane = props => (
  <Form success>
    <Form.Select
      options={genderOptions}
      label="Groups"
      placeholder="Select group from the list"
    />
    <Button>Add group</Button>
  </Form>
);

export default AssigneeGroupPane;

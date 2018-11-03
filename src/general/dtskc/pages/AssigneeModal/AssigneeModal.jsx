import React from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  TextArea,
  Button,
  Divider,
} from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

const AssigneeModal = (props) => {
  const { modalOpen, toggleAssigneeModal } = props;
  return (
    <Modal open={modalOpen} onClose={() => toggleAssigneeModal(modalOpen)}>
      <Modal.Header>Select assignees</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={Select}
                options={genderOptions}
                label={{
                  children: 'Groups',
                  htmlFor: 'form-select-control-group',
                }}
                placeholder="Select Groups"
                //   search
                //   searchInput={{ id: 'form-select-control-group' }}
              />
            </Form.Group>
            <Divider horizontal>DIVIDER</Divider>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-assignee"
                control={Select}
                options={{}}
                label={{
                  children: 'assignees',
                  htmlFor: 'form-select-control-assignee',
                }}
                placeholder="Select assignee"
                search
                searchInput={{ id: 'form-select-control-assignee' }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-branch"
                control={Select}
                label="Branch"
                placeholder="Branch"
              />
              <Form.Field
                id="form-input-control-department"
                control={Select}
                label="Department"
                placeholder="Department"
              />
              <Form.Field
                id="form-input-control-assignee-manager"
                control={Input}
                label="Assignee Manager"
                placeholder="Assignee Manager"
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default AssigneeModal;

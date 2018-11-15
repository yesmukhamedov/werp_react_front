import React, { Component } from 'react';
import { debounce } from 'lodash';
import {
  Modal,
  Form,
  Input,
  Select,
  TextArea,
  Button,
  Divider,
  Search,
  Tab,
  Label,
} from 'semantic-ui-react';
import AssigneeGroupPane from './AssigneeGroupPane';
import AssigneeOtherPane from './AssigneeOtherPaneComponent';
import AssigneeSearchPane from './AssigneeSearchPaneComponent';


const panes = [
  {
    menuItem: 'Добавить по группе',
    render: props => (
      <Tab.Pane attached={false}>
        <AssigneeGroupPane {...props} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Добавить по исполнителю',
    render: props => (
      <Tab.Pane attached={false}>
        <AssigneeSearchPane {...props} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Добавить по филиалу (филиал-отдел-менеджер исполнителя)',
    render: props => (
      <Tab.Pane attached={false}>
        <AssigneeOtherPane {...props} />
      </Tab.Pane>
    ),
  },
];

class AssigneeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      assigneesList: [],
      selectedAssignee: '',
    };
  }

  render() {
    const { modalOpen, toggleAssigneeModal } = this.props;
    return (
      <Modal open={modalOpen} onClose={() => toggleAssigneeModal(modalOpen)}>
        <Modal.Header>Select assignees</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Tab menu={{ attached: false }} panes={panes} {...this.props} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AssigneeModal;

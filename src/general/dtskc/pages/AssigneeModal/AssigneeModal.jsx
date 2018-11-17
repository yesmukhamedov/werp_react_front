import React, { Component } from 'react';
import { Modal, Tab } from 'semantic-ui-react';
import AssigneeGroupPaneComponent from './AssigneeGroupPaneComponent';
import AssigneeOtherPaneComponent from './AssigneeOtherPaneComponent';
import AssigneeSearchPaneComponent from './AssigneeSearchPaneComponent';

const panes = [
  {
    menuItem: 'Добавить по группе',
    render: props => (
      <Tab.Pane attached={false}>
        <AssigneeGroupPaneComponent {...props} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Добавить по исполнителю',
    render: props => (
      <Tab.Pane attached={false}>
        <AssigneeSearchPaneComponent {...props} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Добавить по филиалу (филиал-отдел-менеджер исполнителя)',
    render: props => (
      <Tab.Pane attached={false}>
        <AssigneeOtherPaneComponent {...props} />
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

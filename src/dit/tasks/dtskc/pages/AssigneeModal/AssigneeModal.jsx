import React, { Component } from 'react';
import { Modal, Tab } from 'semantic-ui-react';

import AssigneeGroupPaneComponent from './AssigneeGroupPaneComponent';
import AssigneeOtherPaneComponent from './AssigneeOtherPaneComponent';
import AssigneeSearchPaneComponent from './AssigneeSearchPaneComponent';

const panes = (props) => {
  const { messages } = props;
  return [
    {
      menuItem: messages.H__ADD_ASSIGNEE_GROUP,
      render: props => (
        <Tab.Pane attached={false}>
          <AssigneeGroupPaneComponent {...props} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: messages.H__ADD_ASSIGNEE_BY_SEARCH,
      render: props => (
        <Tab.Pane attached={false}>
          <AssigneeSearchPaneComponent {...props} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: messages.H__ADD_ASSIGNEE_BY_SELECT,
      render: props => (
        <Tab.Pane attached={false}>
          <AssigneeOtherPaneComponent {...props} />
        </Tab.Pane>
      ),
    },
  ];
};

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
    const { modalOpen, toggleAssigneeModal, messages } = this.props;
    return (
      <Modal open={modalOpen} onClose={() => toggleAssigneeModal(modalOpen)}>
        <Modal.Header>{messages.H__SELECT_ASSIGNEE}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Tab
              menu={{ attached: false }}
              panes={panes(this.props)}
              {...this.props}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AssigneeModal;

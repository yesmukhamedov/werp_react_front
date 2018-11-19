import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import hash from 'object-hash';
import { GET } from '../../../../utils/helpers';
import { ROOT_URL } from '../../../../utils/constants';

class AssigneeGroupPaneComponent extends Component {
  state = {
    selectedGroup: '',
    recipientList: [],
  }

  fetchGroupsMembers = (groupId) => {
    const groupMembersUrl = `${ROOT_URL}/api/mgru?groupId=${groupId}`;
    const { groupOpts } = this.props;
    const req = GET(groupMembersUrl);
    req
      .then(({ data }) => {
        const recipientList = data.map(el => {
          const { branch, department, supervisor, user, messageGroup } = el;
          return {
            branch: {
              id: branch.id,
            },
            department: {
              id: department.id,
            },
            assignee: {
              id: user && user.id,
            },
            assigneesManager: {
              id: supervisor.id,
            },
          };
        });
        this.setState({
          recipientList,
          groupDetail: groupOpts[this.state.selectedGroup],
        });
      })
      .catch( err => console.log(err));
  }

  handleChange = (_, { name, value }) => { 
    this.setState({ [name]: value });
    this.fetchGroupsMembers(value);
  }

  handleSubmit = () => {
    const { addAssigneeGroup, toggleAssigneeModal: hideModal } = this.props;
    const { groupDetail, recipientList } = this.state;
    const assigneeGroup = { groupDetail, recipientList }
    addAssigneeGroup({ id: hash(assigneeGroup), ...assigneeGroup });
    hideModal();
  }

  renderGroupMembers = () => (
    <Segment>
      <ul>
        {this.state.recipientList.map(member => <li>{JSON.stringify(member)}</li>)}
      </ul>
    </Segment>
  );

  render() {
    const { groupOpts } = this.props;
    return (
      <Form success>
        <Form.Select
          options={groupOpts}
          label="Groups"
          name="selectedGroup"
          placeholder="Select group from the list"
          onChange={this.handleChange}
          required
        />
        {this.renderGroupMembers()}
        <Button onClick={this.handleSubmit}>
          Add group
        </Button>
      </Form>
    );
  }
}

export default AssigneeGroupPaneComponent;

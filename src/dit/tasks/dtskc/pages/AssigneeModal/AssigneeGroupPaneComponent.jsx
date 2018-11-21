import React, { Component } from 'react';
import { Form, Button, Segment, Label, List } from 'semantic-ui-react';
import hash from 'object-hash';
import _ from 'lodash';
import WarnSegment from './WarnSegment';
import { GET, constructFullName } from '../../../../../utils/helpers';
import { ROOT_URL } from '../../../../../utils/constants';

class AssigneeGroupPaneComponent extends Component {
  state = {
    selectedGroup: '',
    recipientList: [],
  };

  fetchGroupsMembers = groupId => {
    const groupMembersUrl = `${ROOT_URL}/api/mgru?groupId=${groupId}`;
    const { groupOpts, lang, selectedCompany } = this.props;
    const req = GET(groupMembersUrl);
    req
      .then(({ data }) => {
        const filteredData = _.filter(
          data,
          el => !el.user || el.user.bukrs === selectedCompany,
        );
        const recipientList = filteredData.map(el => {
          const { branch, department, supervisor, user } = el;
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
            meta: {
              branch: branch.value,
              department: department[lang],
              supervisor: supervisor && constructFullName(supervisor),
              user: user && constructFullName(user),
              bukrs: user && user,
            },
          };
        });

        this.setState({
          recipientList,
          groupDetail: groupOpts[this.state.selectedGroup],
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = (_, { name, value }) => {
    this.setState({ [name]: value });
    this.fetchGroupsMembers(value);
  };

  handleSubmit = () => {
    const { addAssigneeGroup, toggleAssigneeModal: hideModal } = this.props;
    const { groupDetail, recipientList } = this.state;
    const assigneeGroup = { groupDetail, recipientList };
    addAssigneeGroup({ id: hash(assigneeGroup), ...assigneeGroup });
    hideModal();
  };

  renderGroupMembers = () => (
    <Segment>
      <List divided selection>
        {this.state.recipientList.map(member => {
          const { id, meta } = member;
          return (
            <List.Item key={id}>
              <List.Content>
                <List.Header>{meta.user}</List.Header>
                <Label color="yellow" horizontal>
                  {meta.branch}
                </Label>
                <Label color="blue" horizontal>
                  {meta.department}
                </Label>
                - {meta.supervisor}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </Segment>
  );

  renderForm() {
    const { groupOpts, messages } = this.props;
    return (
      <Form success>
        <Form.Select
          options={groupOpts}
          label={messages.L__GROUP}
          name={messages.TX__SELECT_GROUP}
          placeholder={messages.TX__SELECT_GROUP}
          onChange={this.handleChange}
          required
        />
        {this.renderGroupMembers()}
        <Button onClick={this.handleSubmit}>{messages.BTN__ADD}</Button>
      </Form>
    );
  }

  render() {
    const { selectedCompany, messages } = this.props;
    return selectedCompany ? (
      this.renderForm()
    ) : (
      <WarnSegment message={messages.TX__WARN_SELECT_COMPANY} />
    );
  }
}

export default AssigneeGroupPaneComponent;

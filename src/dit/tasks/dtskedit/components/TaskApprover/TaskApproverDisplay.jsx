import React, { Component } from 'react';
//import jwt from 'jwt-simple';
import {
  Form,
  Grid,
  Header,
  Button,
  Segment,
  Checkbox,
} from 'semantic-ui-react';
import { constructFullName } from '../../../../../utils/helpers';
//import { TOKEN_PASSWORD } from '../../../../../utils/constants';

class TaskApproverDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDocStatus: '',
      approvedAuthor: false,
      rejectedAuthor: false,
      approvedAssignee: false,
      rejectedAsesignee: false,
    };

    this.handleApprove = this.handleApprove.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  componentWillMount() {
    const { id, authorsManager, recipient } = this.props;
    if (id) {
      this.props.fetchTaskDocStatus(id, authorsManager, recipient);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.taskDocStatus !== this.state.taskDocStatus) {
      this.setState({
        authorDocStatus: nextProps.taskDocStatus,
        approvedAuthor: nextProps.taskDocStatus.authorsManager === 2,
        rejectedAuthor: nextProps.taskDocStatus.authorsManager === 3,
        approvedAssignee: nextProps.taskDocStatus.assigneesManager === 2,
        rejectedAsesignee: nextProps.taskDocStatus.assigneesManager === 3,
      });
    }
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      //const payload = jwt.decode(token, TOKEN_PASSWORD);
      const userId = localStorage.getItem('userId');
      return userId;
    }
  }

  getTaskDoc() {
    const { bukrs, recipient, id, author } = this.props;
    const task = {
      bukrs,
      branchId: recipient.branch.id,
      contextId: id,
      responsibleId: author.id,
      createdBy: author.id,
    };
    return task;
  }

  handleApprove() {
    const {
      id,
      authorsManager,
      recipient,
      approve,
      fetchTaskDocStatus,
    } = this.props;
    approve(this.getTaskDoc(), () =>
      fetchTaskDocStatus(id, authorsManager, recipient),
    );
  }

  handleReject() {
    const {
      id,
      authorsManager,
      recipient,
      reject,
      fetchTaskDocStatus,
    } = this.props;
    reject(this.getTaskDoc(), () =>
      fetchTaskDocStatus(id, authorsManager, recipient),
    );
  }

  render() {
    const { msg, authorsManager, recipient } = this.props;
    const { formatMessage, messages } = this.props.intl;
    return (
      <Segment.Group>
        <Segment padded color="grey">
          <Form>
            <Grid stackable>
              <Grid.Row columns={2}>
                <Grid.Column>
                  {authorsManager && (
                    <div>
                      <Header as="h3">
                        {authorsManager ? (
                          constructFullName(authorsManager)
                        ) : (
                          <span>&mdash;</span>
                        )}
                        <Header.Subheader>
                          {formatMessage(msg.authorsManager)}
                        </Header.Subheader>
                      </Header>
                      <Button
                        size="tiny"
                        style={{
                          background: 'rgba(84,170,169, 1)',
                          color: 'white',
                        }}
                        onClick={this.handleApprove}
                        disabled={
                          this.getUserId() !== authorsManager.id ||
                          this.state.approvedAuthor
                        }
                      >
                        {messages.BTN_APPROVE}
                      </Button>
                      <Button
                        size="tiny"
                        style={{
                          background: 'rgba(84,170,169, 1)',
                          color: 'white',
                        }}
                        onClick={this.handleReject}
                        disabled={
                          this.getUserId() !== authorsManager.id ||
                          this.state.approvedAuthor
                        }
                      >
                        {messages.BTN_REJECT}
                      </Button>
                      <Checkbox
                        style={{ paddingLeft: '5px', paddingTop: '5px' }}
                        checked={this.state.approvedAuthor}
                        indeterminate={this.state.rejectedAuthor}
                      />
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column>
                  {recipient.assigneesManager && (
                    <div>
                      <Header as="h3">
                        {recipient.assigneesManager ? (
                          recipient.assigneesManager.value
                        ) : (
                          <span>&mdash;</span>
                        )}
                        <Header.Subheader>
                          {formatMessage(msg.assigneesManager)}
                        </Header.Subheader>
                      </Header>
                      <Button
                        size="tiny"
                        style={{
                          background: 'rgba(84,170,169, 1)',
                          color: 'white',
                        }}
                        onClick={this.handleApprove}
                        disabled={
                          this.getUserId() !== recipient.assigneesManager.id ||
                          this.state.approvedAssignee
                        }
                      >
                        {messages.BTN_APPROVE}
                      </Button>
                      <Button
                        size="tiny"
                        style={{
                          background: 'rgba(84,170,169, 1)',
                          color: 'white',
                        }}
                        onClick={this.handleReject}
                        disabled={
                          this.getUserId() !== recipient.assigneesManager.id ||
                          this.state.approvedAssignee
                        }
                      >
                        {messages.BTN_REJECT}
                      </Button>
                      <Checkbox
                        style={{ paddingLeft: '5px', paddingTop: '5px' }}
                        checked={this.state.approvedAssignee}
                        indeterminate={this.state.rejectedAsesignee}
                      />
                    </div>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Segment.Group>
    );
  }
}

export default TaskApproverDisplay;

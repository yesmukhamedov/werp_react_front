import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Grid,
  Icon,
} from 'semantic-ui-react';
import { TaskAdminTableContainer as TaskAdminTable } from './TaskAdminTable';
import { AddTaskAdminModalContainer as AddTaskAdminModal } from './TaskAdminModal';

export default class DtskdepComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    const { fetchTaskAdmins, fetchReferences, lang } = this.props;
    fetchTaskAdmins(lang);
    fetchReferences(lang);
  }

  open() {
    this.setState({ modalOpen: true });
  }

  close() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Container
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2">
                <Icon name="settings" />
                <Header.Content>
                  {messages.L__TASK_ADMINS}
                  <Header.Subheader>
                    {messages.L__TASK_ADMINS_MANAGE}
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <Button
                floated="right"
                onClick={this.open}
                icon="user plus"
                labelPosition="left"
                content={messages.BTN__ADD}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <TaskAdminTable messages={messages}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <AddTaskAdminModal
          open={this.open}
          close={this.close}
          isOpen={this.state.modalOpen}
        />
      </Container>
    );
  }
}

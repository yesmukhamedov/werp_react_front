import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Grid,
  Icon,
} from 'semantic-ui-react';
import MessageGroupTableContainer from './MessageGroupTable/MessageGroupTableContainer';
import AddMessageGroupModalContainer from './MessageGroupModal/AddMessageGroupModalContainer';

export default class MessageGroupDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    const { fetchMessageGroups } = this.props;
    fetchMessageGroups();
  }

  open() {
    this.setState({ modalOpen: true });
  }

  close() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Container
        text
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
                  Группы получателей
                  <Header.Subheader>
                    Управление группой получателей
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <Button
                floated="right"
                onClick={this.open}
                icon="plus"
                labelPosition="left"
                content="Добавить"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <MessageGroupTableContainer />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <AddMessageGroupModalContainer
          open={this.open}
          close={this.close}
          isOpen={this.state.modalOpen}
        />
      </Container>
    );
  }
}

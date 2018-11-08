import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Grid,
  Icon,
} from 'semantic-ui-react';
import MessageGroupUserTableContainer from './MessageGroupUserTable/MessageGroupUserTableContainer';
import AddMessageGroupUserModalContainer from './MessageGroupUserModal/AddMessageGroupUserModalContainer';

export default class MessageGroupUserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalType: '',
      modalData: null, 
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    const { fetchMessageGroupUsers } = this.props;
    fetchMessageGroupUsers();
  }

  open(modalType, modalData) {
    this.setState({ modalOpen: true, modalType, modalData });
  }

  close() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Container
        // text
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
                  Получатели
                  <Header.Subheader>
                    Управление получателями в группе
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <Button
                style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                size="tiny"
                floated="right"
                onClick={() => this.open('add', null)}
                icon="plus"
                labelPosition="left"
                content="Добавить"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <MessageGroupUserTableContainer open={this.open} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <AddMessageGroupUserModalContainer
          close={this.close}
          isOpen={this.state.modalOpen}
          modalType={this.state.modalType}
          modalData={this.state.modalData}
        />
      </Container>
    );
  }
}

import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Grid,
  Icon,
} from 'semantic-ui-react';
import _ from 'lodash';
import MessageGroupUserTableContainer from './MessageGroupUserTable/MessageGroupUserTableContainer';
import MessageGroupUserSearchContainer from './MessageGroupUserSearch/MessageGroupUserSearchContainer';
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
    const { fetchMessageGroupUsers, fetchReferences, lang  } = this.props;
    fetchMessageGroupUsers();
    fetchReferences(lang);
  }

  open(modalType, modalData) {
    this.setState({ modalOpen: true, modalType, modalData });
  }

  close() {
    this.setState({ modalOpen: false });
    // this.props.reset();
  }

  render() {
    return (
      <Container
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Grid stackable>
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
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingBottom: '0.5em'}}>          
            <Grid.Column floated='left' width={8}>
              <MessageGroupUserSearchContainer />
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button
                style={{ marginTop: '1.7em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                floated="right"
                onClick={() => this.open('add', null)}
                icon="plus"
                labelPosition="left"
                content="Добавить"
              />
            </Grid.Column>          
          </Grid.Row>
          <Grid.Row style={{ paddingTop: '0em'}}>
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


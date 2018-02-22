import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/NewIssueAction';
import {
  Container,
  Dimmer,
  Loader,
  Header,
  Segment,
  Table,
  Menu,
  Message,
  Divider,
  Grid,
  Form,
  Label,
} from 'semantic-ui-react';

class NewIssuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: {},
    };
  }

  render() {
    // const { id } = this.props.params;
    const id = parseInt(this.props.match.params.id, 10);
    console.log('SNcontract', id);
    return (
      // <Dimmer active>
      //     <Loader indeterminate>NewIssuePage for {id}</Loader>
      // </Dimmer>
      //   <Container style={{ padding: '2em 0em' }} text>
      //     <Grid columns={2}>
      //       <Grid.Column>
      //         <Header as="h2">New Issue</Header>

      //         <Header as="h4" attached="top" block>
      //           Top Block Header
      //         </Header>
      //         <Segment attached>Segment</Segment>

      //         <Divider section />
      //       </Grid.Column>
      //       <Grid.Column>
      //         <Header as="h4" attached="top" block>
      //           Top Block Header
      //         </Header>
      //         <Segment attached>Segment</Segment>

      //         <Divider section />
      //       </Grid.Column>
      //     </Grid>
      //   </Container> container
      <Container style={{ padding: '2em' }} fluid>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment.Group>
              <Label attached="top">
                <Header as="h5">Данные клиента</Header>
              </Label>

              <Segment>
                <Form>
                  <Form.Field inline>
                    <label>First Name</label>
                    <input placeholder="First Name" />
                  </Form.Field>
                  <Form.Field inline>
                    <label>Last Name</label>
                    <input placeholder="Last Name" />
                  </Form.Field>
                </Form>
              </Segment>
              <Segment >
                <Header as="h5" > Фин.данные</Header>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="First name"
                      placeholder="First name"
                    />
                    <Form.Input
                      fluid
                      label="Last name"
                      placeholder="Last name"
                    />
                  </Form.Group>
                </Form>
              </Segment>
              <Segment>
                <Header as="h5"> Другие покупкиы</Header>
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group>
              <Segment>Top</Segment>
              <Segment.Group>
                <Segment>Nested Top</Segment>
                <Segment>Nested Middle</Segment>
                <Segment>Nested Bottom</Segment>
              </Segment.Group>
              <Segment.Group horizontal>
                <Segment>Top</Segment>
                <Segment>Middle</Segment>
                <Segment>Bottom</Segment>
              </Segment.Group>
              <Segment>Bottom</Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    directories: state.contractList.directories,
  };
}

export default connect(mapStateToProps, actions)(NewIssuePage);

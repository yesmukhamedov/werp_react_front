import React, { Component } from 'react';
import {
  Form,
  Container,
  List,
  Grid,
  Header,
  Button,
  Segment,
  Checkbox,
} from 'semantic-ui-react';
import { constructFullName } from '../../../../../../utils/helpers';

class TaskApproverDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      indeterminate: false
    };

    this.handleApprove = this.handleApprove.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleApprove() {
    // console.log("handleApprove()")
    this.setState({
        checked: true,
        indeterminate: false
    });
  }

  handleReject() {
    // console.log("handleReject()")
    this.setState({
        checked: false,
        indeterminate: true
    });
  }

  render() {
      const { messages, authorsManager, recipient } = this.props;
      const { formatMessage } = this.props.intl;
      return (
        <Segment.Group>
          <Segment padded color="grey">
            <Form>
              <Grid stackable>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Header as="h3">
                      {authorsManager ? (
                        constructFullName(authorsManager)
                       ) : (
                        <span>&mdash;</span>
                      )}
                      <Header.Subheader>
                      {formatMessage(messages.authorsManager)}
                      </Header.Subheader>
                    </Header>
                    <Button size='tiny'
                            style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                            onClick={this.handleApprove}
                            >
                            Одобрить        
                    </Button>
                    <Button size='tiny'
                        style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                        onClick={this.handleReject}
                        >
                        Отклонить        
                    </Button>
                    <Checkbox style={{ paddingLeft: '5px', paddingTop: '5px' }} 
                        checked={this.state.checked} indeterminate={this.state.indeterminate}/>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">
                      {recipient.assigneesManager ? (
                        recipient.assigneesManager.value
                        ) : (
                        <span>&mdash;</span>
                      )}
                      <Header.Subheader>
                      {formatMessage(messages.assigneesManager)}
                      </Header.Subheader>
                    </Header>
                    <Button size='tiny'
                            style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                            onClick={this.handleApprove}
                            >
                            Одобрить        
                    </Button>
                    <Button size='tiny'
                        style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                        onClick={this.handleReject}
                        >
                        Отклонить        
                    </Button>
                    <Checkbox style={{ paddingLeft: '5px', paddingTop: '5px' }} 
                        checked={this.state.checked} indeterminate={this.state.indeterminate}/>
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

/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Form, Input, Comment, Dropdown, List, Grid, Header, Button, Segment, Dimmer, Loader, Label, Icon, TextArea, Radio, Checkbox } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class TaskDetailsComponent extends Component {

  state = { collapsed: true }

  handleCheckbox = (e, { checked }) => this.setState({ collapsed: checked })

  render() {
    const { collapsed } = this.state
    return (
      <Segment padded color='grey'>
         <Checkbox defaultChecked label='Collapse comments' onChange={this.handleCheckbox} />
        <Comment.Group>
          <Header as='h3' dividing>History</Header>
      
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
      
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Elliot Fu</Comment.Author>
              <Comment.Metadata>
                <div>Yesterday at 12:30AM</div>
              </Comment.Metadata>
              <Comment.Text>
                <p>This has been very useful for my research. Thanks as well!</p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            <Comment.Group>
              <Comment>
                <Comment.Content>
                  <Comment.Author as='a'>Jenny Hess</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    Elliot you are always so right :)
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>
      
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>
                Dude, this is awesome. Thanks so much
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
      
          <div id='test'>
          <Comment.Group collapsed={collapsed}>
          <Form reply>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
          </Comment.Group>
          </div>
        </Comment.Group>
      </Segment>
    );
  }
}

export default TaskDetailsComponent;

import React from 'react';
import { Segment, Comment, Form, Button, Message, Header } from 'semantic-ui-react';
import faker from 'faker';

const OutCallDetailsPanelDisplay = props => (
  <Segment raised>
    <Comment.Group>
      <Header as='h3' dividing>Коментарий</Header>
      <Comment>
        {/* <Comment.Avatar as="a" src="/assets/images/avatar/small/joe.jpg" /> */}
        <Comment.Content>
          <Comment.Author>{faker.name.findName()}</Comment.Author>
          <Comment.Metadata>
            <div>{new Date().toDateString()}</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>
              {faker.lorem.sentences(2)}
            </p>
          </Comment.Text>
        </Comment.Content>
      </Comment>

      <Comment>
        {/* <Comment.Avatar as="a" src="/assets/images/avatar/small/christian.jpg" /> */}
        <Comment.Content>
          <Comment.Author>{faker.name.findName()}</Comment.Author>
          <Comment.Metadata>
            <div>{new Date().toDateString()}</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>
              {faker.lorem.sentences(2)}
            </p>
          </Comment.Text>
        </Comment.Content>
      </Comment>

      <Form reply>
        <Form.TextArea />
        <Button content="Добавить" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  </Segment>
);

export default OutCallDetailsPanelDisplay;

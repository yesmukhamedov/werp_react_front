import React from 'react';
import { Segment, Comment, Header } from 'semantic-ui-react';
import { formatDMYMS } from '../../../../../../utils/helpers';


const OutCallDetailsPanelDisplay = (props) => {
  const { comments, messages } = props;
  return (
    <Segment raised>
      <Comment.Group style={{ maxWidth: '100%' }}>
        <Header as="h3" dividing>{messages.H__COMMENTS}</Header>
        {
          comments &&
          comments.map((item, idx) => (
            <Comment key={idx}>
              <Comment.Content>
                <Comment.Author>
                  { item.author && `${item.author.lastName} ${item.author.firstName} ${item.author.patronymic}`}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDMYMS(item.createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{item.text}</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))
        }
      </Comment.Group>
    </Segment>
  );
};

export default OutCallDetailsPanelDisplay;

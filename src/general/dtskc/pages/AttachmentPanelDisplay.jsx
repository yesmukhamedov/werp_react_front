import React from 'react';
import {
  List,
  Container,
  Header,
  Button,
  Menu,
  Segment,
} from 'semantic-ui-react';

const AttachmentPanelDisplay = (props) => {
  const {
    attachment, children, onDelete
  } = props;
  return (
    <Container className="attachment-panel">
      <Menu attached="top">
        <Menu.Item>
          <Header as="h4">Attachment Panel</Header>
        </Menu.Item>
      </Menu>
      <Segment attached="bottom">
        {children}
        {attachment && (
          <List divided verticalAlign="middle">
            {attachment.map((el, idx) => {
              const { fileName, fileDownloadUri } = el;
              return (
                <List.Item key={idx}>
                  <List.Content floated="right">
                    {onDelete && (
                      <Button
                        circular
                        size="mini"
                        icon="delete"
                        onClick={() => onDelete(fileDownloadUri)}
                      />
                    )}
                  </List.Content>
                  <List.Icon name="download" size="big" />
                  <List.Content as="a" target="_blank" href={fileDownloadUri}>
                    {fileName}
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        )}
      </Segment>
    </Container>
  );
};

export default AttachmentPanelDisplay;

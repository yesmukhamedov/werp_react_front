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
  const { attachment, children, onDelete } = props;
  return (
    <Container className="attachment-panel">
      {children}
      <Header as="h5">Прикрепленные файлы</Header>
      {/* <Segment attached="bottom"> */}

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
                <List.Content as="a" target="_blank" href={fileDownloadUri}>
                  <List.Icon name="download" size="large" />
                  {fileName}
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      )}
      {/* </Segment> */}
    </Container>
  );
};

export default AttachmentPanelDisplay;

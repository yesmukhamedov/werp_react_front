import React from 'react';
import { injectIntl } from 'react-intl';
import {
  List,
  Container,
  Header,
  Button,
} from 'semantic-ui-react';
// import { messages } from '../../../locales/defineMessages';

const AttachmentPanelDisplay = (props) => {
  const { attachment, children, onDelete, intl } = props;
  const { messages } = intl;
  return (
    <Container className="attachment-panel">
      {children}
      <Header as="h5">{messages.H__ATTACHED_FILES}</Header>
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
    </Container>
  );
};

export default injectIntl(AttachmentPanelDisplay);

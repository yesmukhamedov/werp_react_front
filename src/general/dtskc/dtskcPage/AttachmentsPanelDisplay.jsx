import React from 'react';
import { Header, List } from 'semantic-ui-react';


const AttachmentPanelDisplay = props => (
  <div className="attachment-panel">
    <Header as="h3">Прикрепленные файлы</Header>
    <List>
      <List.Item>
        <List.Icon name="file" />
        <List.Content>
          <a href='http://www.semantic-ui.com'>semantic-ui manual</a>
        </List.Content>
      </List.Item>
    </List>
  </div>
);

export default AttachmentPanelDisplay;

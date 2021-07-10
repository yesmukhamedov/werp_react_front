import React from 'react';
import 'react-table/react-table.css';
import { Container, Icon, Label } from 'semantic-ui-react';
import '../css/header-page.css';

export default function WspaceHeader(props) {
  const { dealers, currentId } = props;
  if (!dealers) {
    return null;
  }
  return (
    <Container fluid className="header-container">
      {dealers.map(d =>
        d.text.length === 0 ? (
          ''
        ) : (
          <Label
            as="a"
            onClick={() => props.onSelect(d)}
            size={currentId === d.key ? 'large' : 'small'}
            color={currentId === d.key ? 'green' : 'teal'}
            key={d.key}
          >
            <Icon name="user" />
            {d.text}
          </Label>
        ),
      )}
    </Container>
  );
}

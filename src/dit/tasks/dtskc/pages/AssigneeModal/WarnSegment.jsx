import React from 'react';
import { Segment } from 'semantic-ui-react';

export default function WarnSegment(props) {
  return (
    <div>
      <Segment primary>{props.message}</Segment>
    </div>
  );
}

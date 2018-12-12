import React from 'react';
import { Label } from 'semantic-ui-react';

const STATUS_NEW = 0;
const STATUS_PHONED = 1;
const STATUS_DEMO_DONE = 2;

export default function RecoStatusLabel(props) {
  const { statusName, statusId } = props;
  let color = '';
  switch (statusId) {
    case STATUS_NEW:
      color = 'blue';
      break;

    case STATUS_PHONED:
      color = 'green';
      break;

    case STATUS_DEMO_DONE:
      color = 'teal';
      break;

    default:
      color = 'grey';
  }

  return (
    <Label color={color} horizontal>
      {statusName}
    </Label>
  );
}

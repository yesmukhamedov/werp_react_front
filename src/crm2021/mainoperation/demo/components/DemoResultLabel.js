import React from 'react';
import { Label } from 'semantic-ui-react';
import {
  DEMO_RESULT_ARCHIVED,
  DEMO_RESULT_CANCELLED,
  DEMO_RESULT_DONE,
  DEMO_RESULT_MINI_CONTRACT,
  DEMO_RESULT_MOVED,
  DEMO_RESULT_SOLD,
  DEMO_RESULT_SOLD_CANCELLED,
  DEMO_RESULT_UNKNOWN,
} from '../../../crmUtil';

/**
 * Результаты демо
 */

export default function DemoResultLabel(props) {
  const { resultName, result } = props;
  let color = '';
  switch (result) {
    case DEMO_RESULT_UNKNOWN:
      color = 'grey';
      break;

    case DEMO_RESULT_DONE:
      color = 'blue';
      break;

    case DEMO_RESULT_MOVED:
      color = 'orange';
      break;

    case DEMO_RESULT_CANCELLED:
    case DEMO_RESULT_SOLD_CANCELLED:
      color = 'yellow';
      break;

    case DEMO_RESULT_SOLD:
      color = 'green';
      break;

    case DEMO_RESULT_MINI_CONTRACT:
      color = 'teal';
      break;

    case DEMO_RESULT_ARCHIVED:
      color = 'black';
      break;

    default:
      color = 'grey';
  }

  return (
    <Label color={color} horizontal>
      {resultName}
    </Label>
  );
}

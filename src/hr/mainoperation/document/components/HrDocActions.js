import React from 'react';
import { Button } from 'semantic-ui-react';
import { DOC_ACTION_GO_TO_LIST, DOC_ACTION_SAVE } from '../../../hrUtil';

export default function HrDocActions(props) {
  const { items, action } = props;
  const isUpdate = props.isUpdate || false;
  if (!items) {
    return null;
  }
  return (
    <div style={{ float: 'left', clear: 'both' }}>
      {action === 'create' || action === 'update' ? (
        <Button
          primary
          content="Сохранить"
          onClick={() => props.handleAction(DOC_ACTION_SAVE)}
        />
      ) : (
        ''
      )}
      {action === 'view'
        ? items.map(item => (
            <Button
              key={item.actionType}
              content={item.label}
              onClick={() => props.handleAction(item.actionType)}
            />
          ))
        : ''}
    </div>
  );
}

function actionHandler(actionType) {
  switch (actionType) {
    case DOC_ACTION_GO_TO_LIST:
      break;

    default:
      window.alert('Unknown Action');
  }
}

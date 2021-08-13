import React from 'react';
import { Card, Label, Icon, Popup, Dropdown, List } from 'semantic-ui-react';
import {
  renderRecoCategoryBtn,
  renderDemoResultLabel,
  renderRecoStatusLabel,
  RECO_STATUS_NEW,
  // RECO_STATUS_DEMO_DONE,
  RECO_STATUS_PHONED,
  // CALL_RESULT_POSITIVE,
  CALL_RESULT_RECALL,
} from '../../../CrmHelper';

function MiniRecoCard(props) {
  const { item, messages } = props;
  return (
    <Card>
      <Card.Content>
        <Card.Header>{item.clientName}</Card.Header>
        <Card.Meta>
          <span style={{ float: 'right' }}>
            {renderRecoCategoryBtn(item.categoryId, item.categoryName)}
          </span>
        </Card.Meta>
        <Card.Description>
          <span style={{ fontSize: '11px' }}>{item.note}</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{ fontSize: '11px', color: 'black' }}>
        {renderRecoStatusLabel(item.statusId, item.statusName)}
        <br />

        {item.relativeName ? (
          <strong>
            <i>{messages['Form.Reco.Relative']}:</i>
          </strong>
        ) : (
          ''
        )}
        {item.relativeName ? ` ${item.relativeName};` : ''}
        <br />
        {item.district ? (
          <strong>
            <i>{messages['Form.Reco.District']}:</i>
          </strong>
        ) : (
          ''
        )}
        {item.district ? ` ${item.district};` : ''}
        <br />

        {item.note ? (
          <strong>
            <i>{messages['Table.Note']}: </i>
          </strong>
        ) : (
          ''
        )}
      </Card.Content>
      <Card.Content extra>{'???'}</Card.Content>
    </Card>
  );
}

export default MiniRecoCard;

import React from 'react';
import _ from 'lodash';
import { Card, Label, Icon, Popup, Dropdown, List } from 'semantic-ui-react';
import {
  MENU_BY_RECO,
  MENU_BY_DATE,
  RECO_MODAL_ITEMS,
  MENU_MOVED,
} from '../wspaceUtil';
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
import moment from 'moment';
import { formatDMYMS } from '../../../../utils/helpers';

import WspacePhone from './WspacePhone';

export default function WspaceRecoCard(props) {
  const { item, type } = props;
  if (!item) {
    return null;
  }
  switch (type) {
    case MENU_BY_RECO:
      return renderByReco(props);

    case MENU_BY_DATE:
      return renderByDate(props);

    case MENU_MOVED:
      return renderMovedReco(props);

    case RECO_MODAL_ITEMS:
      return renderRecosInModal(props);

    default:
      return null;
  }
}

function renderRecosInModal(props) {
  const { item, messages } = props;
  // console.log('category ID: ',this.props.categoryId)
  switch (item.statusId) {
    case RECO_STATUS_NEW:
      return renderNewReco(item, messages);

    case RECO_STATUS_PHONED:
      return renderPhonedReco(
        item,
        (e, v) => props.recoCardMenuHandle(e, v),
        messages,
      );
  }
  return (
    <Card>
      <Card.Content>
        <Card.Header>{item.clientName}</Card.Header>
        <Card.Meta>
          {item.callDate ? (
            <Popup
              style={{ float: 'left' }}
              trigger={
                <Label color="blue" size="small">
                  {formatDMYMS(item.callDate)}
                </Label>
              }
              content={messages['Crm.RecallDateTime']}
              basic
            />
          ) : (
            ''
          )}

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
      </Card.Content>
      <Card.Content extra />
      <Card.Content extra />
      <Card.Content extra>{item.phones.map(p => renderPhone(p))}</Card.Content>
    </Card>
  );
}

function renderPhonedReco(item, recoCardMenuHandle, messages) {
  let lastNote = '';
  let recallDate = '';
  for (let k in item.calls) {
    k = parseInt(k, 10);
    if (item.calls[k].note) {
      lastNote = item.calls[k].note;
    }

    if (k === 0) {
      if (item.calls[k].resultId === CALL_RESULT_RECALL) {
        recallDate = item.callDate;
      }
    }
  }
  return (
    <Card>
      <Card.Content>
        <Card.Header className="reco-card-header">
          {_.truncate(item.clientName, { length: 20 })}
          <Dropdown icon="bars" className="icon bar">
            <Dropdown.Menu className="right">
              <Dropdown.Item
                onClick={(e, d) => recoCardMenuHandle('view', item.id)}
              >
                <Icon name="eye" />
                {messages['Crm.Open']}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e, d) => recoCardMenuHandle('to_archive', item.id)}
              >
                <Icon name="archive" />
                {messages['Crm.ToArchive']}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Meta>
          <span style={{ float: 'left' }}>
            {recallDate ? (
              <Popup
                trigger={<Label color="blue">{recallDate}</Label>}
                content={messages['Crm.RecallDateTime']}
                basic
              />
            ) : (
              ''
            )}
          </span>

          <span style={{ float: 'right' }}>
            {renderRecoCategoryBtn(item.categoryId, item.categoryName)}
          </span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra style={{ fontSize: '11px', color: 'black' }}>
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
      </Card.Content>
      <Card.Content extra style={{ fontSize: '11px', color: 'black' }}>
        <Popup
          position="right center"
          trigger={renderRecoStatusLabel(item.statusId, item.statusName)}
        >
          <Popup.Content>
            <List celled style={{ fontSize: '11px' }}>
              {item.calls.map(call => (
                <List.Item key={call.id} style={{ marginButtom: '5px' }}>
                  <List.Content>
                    <List.Header>
                      {moment(call.dateTime).format('DD.MM.YYYY HH:mm')} (
                      {call.resultName})
                    </List.Header>
                    <List.Description>
                      {call.note ? <i>Прим:</i> : ''} {call.note}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Popup.Content>
        </Popup>

        {item.relativeName ? (
          <strong>
            <i>{messages['Form.Reco.Relative']}:</i>
          </strong>
        ) : (
          ''
        )}
        {item.relativeName ? ` ${item.relativeName};` : ''}
      </Card.Content>
      <Card.Content extra>{item.phones.map(p => renderPhone(p))}</Card.Content>
    </Card>
  );
}

function renderNewReco(item, messages) {
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
      <Card.Content extra>{item.phones.map(p => renderPhone(p))}</Card.Content>
    </Card>
  );
}

function renderByDate(props) {
  const { item, messages } = props;
  let { calls } = item;
  if (!calls) {
    calls = [];
  }

  let lastNote = item.recoNote;
  if (calls[calls.length - 1] && calls[calls.length - 1].note) {
    lastNote = calls[calls.length - 1].note;
  }
  return (
    <Card>
      <Card.Content>
        <Card.Header className="reco-card-header">
          {_.truncate(item.clientName, { length: 20 })}
          <Dropdown icon="bars" className="icon bar">
            <Dropdown.Menu className="right">
              <Dropdown.Item
                onClick={(e, d) => props.recoCardMenuHandle('view', item.id)}
              >
                <Icon name="eye" />
                {messages['Crm.Open']}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e, d) =>
                  props.recoCardMenuHandle('to_archive', item.id)
                }
              >
                <Icon name="archive" />
                {messages['Crm.ToArchive']}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Meta>
          <Popup
            style={{ float: 'left' }}
            trigger={
              <Label color="blue" size="small">
                <i>{item.callDateTime}</i>
              </Label>
            }
            content={messages['Crm.RecallDateTime']}
            basic
          />

          <span style={{ float: 'right' }}>
            {renderRecoCategoryBtn(item.category, item.categoryName)}
          </span>
        </Card.Meta>
        <Card.Description
          style={{ borderTop: '1px dotted #ddd', marginTop: '15px' }}
        >
          <span style={{ fontSize: '11px' }}>
            <strong>
              <i>{messages['Crm.From']}:</i>
            </strong>{' '}
            {item.recommenderName}
            <br />
            <strong>
              <i>{messages['Table.Note']}:</i>
            </strong>
            {lastNote}
          </span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>{item.phones.map(p => renderPhone(p))}</Card.Content>
    </Card>
  );
}

function renderByReco(props) {
  const { item, messages } = props;
  let { parentReco } = item;
  if (!parentReco) {
    parentReco = {};
  }
  return (
    <Card>
      <Card.Content>
        <Card.Header className="reco-card-header">
          {_.truncate(item.clientName, { length: 20 })}
        </Card.Header>
        <Card.Meta>
          <span style={{ float: 'left' }}>
            <Popup
              trigger={
                <Label>
                  <i>{item.dateTime}</i>
                </Label>
              }
              content={messages['Crm.DemoDateTime']}
              basic
            />
          </span>
          <span style={{ float: 'right' }}>
            {renderRecoCategoryBtn(item.category, item.categoryName)}
          </span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <span style={{ fontSize: '11px', color: 'black' }}>
          <strong>
            <i>{messages['Table.Address']}: </i>
          </strong>
          {_.truncate(item.address, { length: 150 })}
        </span>
      </Card.Content>
      <Card.Content extra>
        {renderDemoResultLabel(item.result, item.resultName)}
        <Label>
          <Icon name="users" /> {item.recoCount}
        </Label>
        <Label as="a" onClick={() => props.openRecoListModal(item)}>
          <Icon name="unhide" /> {messages['Table.RingUp']}
        </Label>
      </Card.Content>
    </Card>
  );
}

function renderMovedReco(props) {
  const { item, messages } = props;
  return (
    <Card>
      <Card.Content>
        <Card.Header className="reco-card-header">
          {_.truncate(item.clientName, { length: 20 })}
          <Dropdown icon="bars" className="icon bar">
            <Dropdown.Menu className="right">
              <Dropdown.Item
                onClick={(e, d) =>
                  props.recoCardMenuHandle('to_archive', item.id)
                }
              >
                <Icon name="archive" />
                {messages['Crm.ToArchive']}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Meta>
          <span style={{ float: 'left' }}>
            {item.callDate ? (
              <Popup
                trigger={<Label color="blue">{item.callDate}</Label>}
                content={messages['Crm.RecallDateTime']}
                basic
              />
            ) : (
              ''
            )}
          </span>
          <span style={{ float: 'right' }}>
            {renderRecoCategoryBtn(item.category, item.categoryName)}
          </span>
        </Card.Meta>
        <Card.Description style={{ marginTop: '45px' }}>
          <span
            style={{
              display: 'block',
              fontSize: '11px',
              borderTop: '1px dotted #ddd',
              marginTop: '3px',
            }}
          >
            <strong>
              <i>{messages['Crm.Demo']}:</i>
            </strong>{' '}
            {item.lastDemoDateTime}
            <br />
            <strong>
              <i>{messages['Crm.From']}:</i>
            </strong>{' '}
            {item.recommenderName}
            <br />
          </span>
        </Card.Description>
        <Card.Description>
          <span style={{ fontSize: '11px' }}>
            <strong>
              <i>{messages['Table.Address']}:</i>
            </strong>
            {_.truncate(item.address, { length: 150 })}
          </span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra />
      <Card.Content extra>{item.phones.map(p => renderPhone(p))}</Card.Content>
    </Card>
  );
}

function renderPhone(phone) {
  return <WspacePhone key={phone.id} phone={phone} />;
}

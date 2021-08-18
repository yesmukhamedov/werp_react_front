import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Label,
  Icon,
  Popup,
  Dropdown,
  List,
  Button,
} from 'semantic-ui-react';
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
import Phone from './Phone';
import '../css/miniCard.css';
import { RECO_CATEGORIES, RECO_STATUS_COLORS } from '../../../crmUtil';

function MiniRecoCard(props) {
  const { item, messages, callResults } = props;

  const renderRecoStatusBtn = (status, statusName) => {
    if (statusName) {
      return (
        <Button
          size="small"
          style={{
            backgroundColor: RECO_STATUS_COLORS[status],
            color: 'white',
            width: '60%',
          }}
        >
          {statusName}
        </Button>
      );
    }
  };

  return (
    <Card style={{ margin: '2%' }}>
      <Card.Content className="miniCardContainer">
        <div className="miniCardHeader">
          {renderRecoStatusBtn(item.status, item.statusName)}
          <span style={{ backgroundColor: 'lightGray' }}>
            {item.responsibleName ? (
              <strong>
                <i>{messages['Table.ResponsibleStaff']}:</i>
              </strong>
            ) : (
              ''
            )}
            {item.responsibleName ? ` ${item.responsibleName}` : ''}
          </span>
        </div>
        <div className="clientName">
          <Link target="_blank" to={`/crm2021/reco/view/${item.id}`}>
            {item.clientName}
          </Link>
        </div>
        <div className="content">
          <span primary style={{ width: '60%', textDecoration: 'underline' }}>
            {item.phones.map(p => (
              <Phone
                // demoPriceOptions={this.state.demoPriceOptions}
                callRefuseOptions={callResults}
                callResultOptions={callResults}
                key={p.id}
                phoneNumber={p.phoneNumber}
                phoneId={p.id}
                context="RECO"
                contextId={item.id}
                // onCallSaved={this.onCallSaved}
                clientName={p.clientName}
              />
            ))}
          </span>
          <span>{renderRecoCategoryBtn(item.category, item.categoryName)}</span>
        </div>
        <div
          className="content"
          style={{ fontSize: '10px', backgroundColor: 'lightgray' }}
        >
          <span style={{ padding: '3%' }}>
            {item.recommenderName ? (
              <strong>
                <i>{messages['Form.RecommenderFullName']}:</i>
              </strong>
            ) : (
              ''
            )}

            <br />
            {item.recommenderName ? ` ${item.recommenderName};` : ''}
          </span>
          <span style={{ padding: '3%' }}>
            {item.createdAt ? <i>{messages['Table.Date']}:</i> : ''}
            <br />
            <strong>{item.createdAt ? ` ${item.createdAt};` : ''}</strong>
          </span>
        </div>
        <div
          className="content"
          style={{
            fontSize: '10px',
            backgroundColor: 'lightgray',
            padding: '3%',
          }}
        >
          <span style={{ fontSize: '11px' }}>{item.note}</span>
        </div>
      </Card.Content>

      {/* <Card.Content extra style={{ fontSize: '11px', color: 'black' }}>
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
      </Card.Content> */}
    </Card>
  );
}

export default MiniRecoCard;

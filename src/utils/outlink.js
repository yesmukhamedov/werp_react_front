import React from 'react';
import { Link } from 'react-router-dom';
import { LEGACY_URL } from '../utils/constants';
import { Icon } from 'semantic-ui-react';

export const LinkToDmsc03 = props => {
  const { snNum } = props;
  // const url = `${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${snNum}`;
  const url = `/marketing/mainoperation/mmcv?contractNumber=${snNum}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {snNum}{' '}
    </a>
  );
};

export const LinkToCustomerHrc03 = props => {
  const { customerId, customerName } = props;
  const url = `${LEGACY_URL}/hr/customer/hrc03.xhtml?customerId=${customerId}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {customerName}{' '}
    </a>
  );
};

export const LinkToStaffCardView = props => {
  const { staffId, staffFio } = props;
  const url = `${LEGACY_URL}/hr/staff/View.xhtml?staffId=${staffId}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {staffFio}{' '}
    </a>
  );
};

export const LinkToStaffCardViewID = props => {
  const { staffId, staffFio } = props;
  const url = `${LEGACY_URL}/hr/staff/View.xhtml?staffId=${staffId}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {staffId}{' '}
    </a>
  );
};

export const LinkToMmcvNewTab = props => {
  const { contractNumber = '', customerFio = '' } = props;
  // const url = `${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${contract_number}`;
  const url = `/marketing/mainoperation/mmcv?contractNumber=${contractNumber}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {contractNumber} {customerFio}
    </a>
  );
};

export const LinkToMatnrHistory = props => {
  const { matnrListId, viewText } = props;
  const url = `${LEGACY_URL}/logistics/werks/matnrHistory.xhtml?matnrListId=${matnrListId}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {matnrListId}{' '}
    </a>
  );
};

export const LinkToFa03AwkeyBukrs = props => {
  const { awkey = '', bukrs = '' } = props;
  let belnr = '',
    gjahr = '';

  if (awkey === null || bukrs === null) return '';

  if (awkey.toString().length === 14) {
    belnr = awkey.toString().slice(0, 10);
    gjahr = awkey.toString().slice(10);
  }

  const url = `/finance/mainoperation/fa03?belnr=${belnr}&bukrs=${bukrs}&gjahr=${gjahr}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {awkey}{' '}
    </a>
  );
};

export const LinkToFa03BelnrBukrsGjahr = props => {
  const { belnr = '', bukrs = '', gjahr = '' } = props;

  const url = `/finance/mainoperation/fa03?belnr=${belnr}&bukrs=${bukrs}&gjahr=${gjahr}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {' '}
      {belnr}{' '}
    </a>
  );
};

export const LinkToMmcv = props => {
  const { contractNumber = '', customerFio = '' } = props;
  // const url = `${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${contract_number}`;
  const url = `/marketing/mainoperation/mmcv?contractNumber=${contractNumber}`;
  return (
    <Link to={url}>
      {' '}
      {contractNumber} {customerFio}
    </Link>
  );
};

export const LinkToEditPrice = props => {
  const { contractNumber = '' } = props;
  // const url = `${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${contract_number}`;
  const url = `${LEGACY_URL}/dms/contract/editpricedmsc.xhtml?contract_number=${contractNumber}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {'Edit Price'}
    </a>
  );
};

export const LinkToMmcef = props => {
  const { contractNumber = '', text } = props;
  const url = `${LEGACY_URL}/dms/contract/dmsc02.xhtml?contract_number=${contractNumber}`;
  // const url = `/marketing/mainoperation/mmcv?contractNumber=${contractNumber}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {text}
    </a>
  );
};

export const LinkToMmcei = props => {
  const { contractNumber = '', text } = props;
  const url = `/marketing/mainoperation/mmcei?contractNumber=${contractNumber}`;
  // const url = `/marketing/mainoperation/mmcv?contractNumber=${contractNumber}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {text}
    </a>
  );
};

export const LinkToMmcecd = props => {
  const { contractNumber = '', text } = props;
  const url = `/marketing/mainoperation/mmcecd?contractNumber=${contractNumber}`;
  // const url = `/marketing/mainoperation/mmcv?contractNumber=${contractNumber}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {text}
    </a>
  );
};

export const LinkToMmceg = props => {
  const { contractNumber = '', text } = props;
  const url = `/marketing/mainoperation/mmceg?contractNumber=${contractNumber}`;
  // const url = `/marketing/mainoperation/mmcv?contractNumber=${contractNumber}`;
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {text}
    </a>
  );
};

export const LinkToSmdisTabSmvod = props => {
  const { clickViewService } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <Icon color="teal" link name="search" onClick={clickViewService} />
    </div>
  );
};

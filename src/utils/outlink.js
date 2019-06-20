import React from 'react';
import { Link } from 'react-router-dom';
import { LEGACY_URL } from '../utils/constants';

export const LinkToDmsc03 = props => {
  const { snNum } = props;
  const url = `${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${snNum}`;
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

import React from 'react';
import { LEGACY_URL } from '../utils/constants';

export const LinkToDmsc03 = props => {
  const { snNum } = props;
  const url = `${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${snNum}`;
  return (
    <a target="_blank" href={url}>
      {' '}
      {snNum}{' '}
    </a>
  );
};

export const LinkToCustomerHrc03 = props => {
  const { customerId, customerName } = props;
  const url = `${LEGACY_URL}/hr/customer/hrc03.xhtml?customerId=${customerId}`;
  return (
    <a target="_blank" href={url}>
      {' '}
      {customerName}{' '}
    </a>
  );
};

export const LinkToStaffCardView = props => {
  const { staffId, staffFio } = props;
  const url = `${LEGACY_URL}/hr/staff/View.xhtml?staffId=${staffId}`;
  return (
    <a target="_blank" href={url}>
      {' '}
      {staffFio}{' '}
    </a>
  );
};

export const LinkToStaffCardViewID = props => {
  const { staffId, staffFio } = props;
  const url = `${LEGACY_URL}/hr/staff/View.xhtml?staffId=${staffId}`;
  return (
    <a target="_blank" href={url}>
      {' '}
      {staffId}{' '}
    </a>
  );
};

export const ContractNumber = props => {
  const { contract_number } = props;
  const url = `${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${contract_number}`;
  return (
    <a target="_blank" href={url}>
      {' '}
      {contract_number}{' '}
    </a>
  );
};

export const CustomerID = props => {
  const { customerId, custFio } = props;
  const url = `${LEGACY_URL}/hr/customer/hrc03.xhtml?customerId=${customerId}`;
  return (
    <a target="_blank" href={url}>
      {' '}
      {custFio}{' '}
    </a>
  );
};

export const LinkToMatnrHistory = props => {
  const { matnrListId, viewText } = props;
  const url = `${LEGACY_URL}/logistics/werks/matnrHistory.xhtml?matnrListId=${matnrListId}`;
  return (
    <a target="_blank" href={url}>
      {' '}
      {matnrListId}{' '}
    </a>
  );
};

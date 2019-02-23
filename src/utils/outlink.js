import React from 'react';

export const LinkToDmsc03 = props => {
  const { url, value } = props;
  return (
    <a target="_blank" href={url}>
      {' '}
      {value}{' '}
    </a>
  );
};

export const LinkToCustomerHrc03 = props => {
  const { url, value } = props;
  return (
    <a target="_blank" href={url}>
      {' '}
      {value}{' '}
    </a>
  );
};

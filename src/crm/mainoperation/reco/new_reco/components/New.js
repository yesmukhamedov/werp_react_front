import React, { useState, useEffect } from 'react';
import ReactTableServerSideWrapper from '../../../../../utils/ReactTableServerSideWrapper';
const New = props => {
  const { messages, language } = props;
  const columns = [
    {
      Header: messages['Table.ClientFullName'],
      accessor: '1',
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['recommender'],
      accessor: '3',
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['Crm.CallDateTime'],
      accessor: '3',
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
  ];
  return (
    <div>
      <ReactTableServerSideWrapper data={[]} columns={columns} />
    </div>
  );
};

export default New;

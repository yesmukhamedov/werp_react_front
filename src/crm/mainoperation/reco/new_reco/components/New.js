import React, { useState, useEffect } from 'react';
import ReactTableServerSideWrapper from '../../../../../utils/ReactTableServerSideWrapper';
const New = props => {
  const { messages, language } = props;
  const columns = [
    {
      Header: 'ФИО клиента',
      accessor: '1',
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Рекомендатель',
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

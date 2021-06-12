import React from 'react';

import { Segment } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

const TabMasterWaterClean = props => {
  const { data = [] } = props;

  const columns = [
    {
      Header: 'Должность',
      accessor: 'maTbpName',
    },
    {
      Header: 'ФИО',
      accessor: 'staffFIO',
    },
    {
      Header: 'Статус',
      accessor: 'maTrackStepName',
      Footer: 'Итого:',
    },
    {
      Header: 'Дата и время',
      accessor: 'lastTimeFormatted',
      Footer: 'Итого:',
    },
  ];

  return (
    <ReactTableWrapper
      columns={columns}
      defaultPageSize={20}
      showPagination
      data={data}
    />
  );
};

export default TabMasterWaterClean;

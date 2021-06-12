import React, { useState, useEffect } from 'react';

import { Segment, Icon, Popup, Button } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import YmapModal from './YmapModal';

const TabDealers = props => {
  const { data = [] } = props;
  const [mapData, setMapData] = useState({});
  const [openModalMap, setOpenModalMap] = useState(false);

  const columns = [
    {
      Header: 'Компания',
      accessor: 'companyName',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Страна',
      accessor: 'countryName',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Филиал',
      accessor: 'branchName',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Должность',
      accessor: 'positionName',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'ФИО',
      accessor: 'staffFIO',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Статус',
      accessor: 'maTrackStepName',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Дата и время',
      accessor: 'lastTimeFormatted',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: 'Карта',
      accessor: 'lastTimeFormatted',

      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          <Popup
            content="Показать на карте"
            trigger={
              <Button
                size="mini"
                circular
                color="blue"
                icon="map marker alternate"
                onClick={() => {
                  setMapData(row.original);
                  setOpenModalMap(true);
                }}
              />
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <YmapModal
        mapData={mapData}
        open={openModalMap}
        onClose={() => setOpenModalMap(false)}
      />
      <ReactTableWrapper
        columns={columns}
        defaultPageSize={20}
        showPagination
        data={data}
      />
    </div>
  );
};

export default TabDealers;

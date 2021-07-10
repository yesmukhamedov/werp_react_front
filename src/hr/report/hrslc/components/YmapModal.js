import React, { useState, useEffect } from 'react';
import { Modal, Header } from 'semantic-ui-react';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';

const YmapModal = props => {
  const { open, onClose = () => {}, mapData = {} } = props;
  console.log('mapData', mapData);
  const [mapState, setMapState] = useState({
    center: [43.22387586, 76.92826238],
    zoom: 8,
  });

  useEffect(() => {
    if (mapData) {
      setMapState({
        ...mapState,
        center: [mapData.latitude, mapData.longitude],
        zoom: 15,
      });
    }
  }, [mapData]);
  const getPointData = index => {
    return {
      balloonContentBody: 'placemark',
      clusterCaption: 'placemark',
    };
  };

  const getPointOptions = () => {
    return {
      preset: 'islands#violetIcon',
    };
  };

  return (
    <Modal
      open={open}
      closeIcon
      onClose={onClose}
      style={{ width: '60%', height: '60%' }}
    >
      <Modal.Content style={{ width: '100%', height: '100%' }}>
        <YMaps style={{ width: '100%', height: '100%' }}>
          <Map state={mapState} style={{ width: '100%', height: '100%' }}>
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false,
              }}
            >
              <Placemark
                geometry={[mapData.latitude, mapData.longitude]}
                properties={getPointData()}
                options={getPointOptions()}
              />
            </Clusterer>
          </Map>
        </YMaps>
      </Modal.Content>
    </Modal>
  );
};

export default YmapModal;

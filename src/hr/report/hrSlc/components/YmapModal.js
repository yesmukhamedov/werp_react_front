import React from 'react';
import { Modal } from 'semantic-ui-react';
import {
  YMaps,
  Map,
  Clusterer,
  Placemark,
  FullscreenControl,
} from 'react-yandex-maps';

const YmapModal = props => {
  const {
    open,
    onClose = () => {},
    data = {},
    handleClickPlacemark = () => {},
    tempAddress,
    mapCenter = [],
  } = props;

  const mapState = {
    center: [43.22387586, 76.92826238],
    zoom: 8,
  };

  const getPointData = data => {
    return {
      balloonContentHeader: data.staffFIO,
      balloonContentBody:
        '</table>' +
        '<tr><td>Страна: </td><td><strong>' +
        data.countryName +
        '</strong><br></td></tr>' +
        '<tr><td>Компания: </td><td><strong>' +
        data.companyName +
        '</strong><br></td></tr>' +
        '<tr><td>Филиал: </td><td><strong>' +
        data.branchName +
        '</strong><br></td></tr>' +
        '<tr><td>Должность: </td><td><strong>' +
        data.positionName +
        '</strong><br></td></tr>' +
        '<tr><td>Статус: </td><td><strong>' +
        data.maTrackStepName +
        '</strong><br></td></tr>' +
        '<tr><td>Адрес: </td><td></td></tr><strong>' +
        tempAddress +
        '</strong></table>',
      clusterCaption: 'placemark <strong>' + data.index + '</strong>',
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
                geometry={[data.latitude, data.longitude]}
                properties={getPointData(data)}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                options={{
                  preset:
                    data.positionId === 3
                      ? 'islands#bluePersonIcon'
                      : data.positionId === 4
                      ? 'islands#bluePersonIcon'
                      : data.positionId === 9
                      ? 'islands#blueMoneyIcon'
                      : data.positionId === 16
                      ? 'islands#oliveRepairShopIcon'
                      : data.positionId === 17
                      ? 'islands#greenRepairShopIcon'
                      : 'islands#blueStarIcon',
                }}
                onClick={() => handleClickPlacemark(data)}
              />
            </Clusterer>
            <FullscreenControl />
          </Map>
        </YMaps>
      </Modal.Content>
    </Modal>
  );
};

export default YmapModal;

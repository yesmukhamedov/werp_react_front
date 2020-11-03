import React, { useState, useEffect } from 'react';
import DropdownClearable from '../../../utils/DropdownClearable';

const YMaps = props => {
  const { ymaps } = window;
  const { mainState = {}, onChangeMap = () => {} } = props;

  const { center, zoom, pointsM = [] } = mainState;

  ymaps.ready(function() {
    var myMap = new ymaps.Map('map', {
        center: center,
        zoom: zoom,
      }),
      clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedBlueClusterIcons',
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: true,
        geoObjectHideIconOnBalloonOpen: true,
      }),
      getPointData = function(staff) {
        console.log('staff', staff);
        return {
          balloonContentHeader: '<h3>' + staff.fullName + '</h3>',
          balloonContentBody:
            //Компания
            '<p>Компания:  <strong>' +
            staff.bukrs +
            '</strong> </p>' +
            //Филиал
            '<p>Филиал:  <strong>' +
            staff.branch +
            '</strong> </p>' +
            //Должность
            '<p>Должность:  <strong>' +
            staff.position +
            '</strong> </p>' +
            //Номер телефона
            '<p>Номер телефона:  <strong>' +
            staff.phone +
            '</strong></p>' +
            //Статус
            '<p>Статус:  <strong>' +
            staff.status +
            '</strong></p>' +
            //Текущий адрес
            '<p>Адрес:  <strong>' +
            staff.address +
            '</strong></p>',

          clusterCaption:
            //Сотрудник
            '<p><strong>' +
            staff.fullName +
            '(' +
            staff.position +
            ')</strong> </p></div>',
        };
      },
      getPointOptions = function() {
        return {
          preset: 'islands#darkBlueDotIcon',
        };
      },
      points = pointsM,
      geoObjects = [];

    for (var i = 0, len = points.length; i < len; i++) {
      geoObjects[i] = new ymaps.Placemark(
        points[i].location,
        getPointData(points[i]),
        getPointOptions(),
      );
    }

    clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: true,
    });

    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);

    myMap.setBounds(clusterer.getBounds(), {
      checkZoomRange: true,
    });
  });

  return <div id="map" style={{ width: '100%', height: '900px' }}></div>;
};

export default YMaps;

import React, { useState, useEffect } from 'react';

const YMaps = props => {
  const { ymaps } = window;
  const {
    mainState = {},
    onChangeMap = () => {},
    pointsM = [],
    reRender,
  } = props;
  const { center, zoom } = mainState;

  let init = ymaps.ready(() => {
    var myMap = new ymaps.Map('map', {
        center: center,
        zoom: zoom,
        controls: [],
      }),
      clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedBlueClusterIcons',
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: true,
        geoObjectHideIconOnBalloonOpen: true,
      }),
      getPointData = function(staff) {
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
      getPointOptions = function(points) {
        if (points.position === 'Дилер') {
          return {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/assets/img/dealerIcon.svg',
            // Размеры метки.
            iconImageSize: [42, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-30, -62],
          };
        } else if (points.position === 'Мастер') {
          return {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/assets/img/masterIcon.svg',
            // Размеры метки.
            iconImageSize: [42, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-30, -62],
          };
        } else {
          return {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/assets/img/staffIcon.svg',
            // Размеры метки.
            iconImageSize: [42, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-30, -62],
          };
        }
      },
      //Метки
      points = pointsM,
      geoObjects = [];

    for (var i = 0, len = points.length; i < len; i++) {
      geoObjects[i] = new ymaps.Placemark(
        points[i].location,
        getPointData(points[i]),
        getPointOptions(points[i]),
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

  useEffect(() => {
    ymaps.ready(init);
    console.log('INIT');
  }, [pointsM]);

  return <div id="map" style={{ width: '100%', height: '900px' }}></div>;
};
export default YMaps;

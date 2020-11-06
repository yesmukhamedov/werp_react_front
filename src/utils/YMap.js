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
      objects = ymaps.geoQuery([...pointsM]).addToMap(myMap),
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
            iconImageOffset: [-20, -45],
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
            iconImageOffset: [-20, -45],
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
            iconImageOffset: [-20, -45],
          };
        }
      },
      //Метки
      points = pointsM,
      polygon = new ymaps.Polygon(
        [
          [
            // Задаем координаты диагональных углов прямоугольника.
            [43.21693568, 76.85038153],
            [43.21700237, 76.85066048],
            [43.21665319, 76.85083751],
            [43.21664142, 76.85052637],
          ],
        ],

        {
          //Свойства
          hintContent:
            'Рабочее время штатные сотрудники головного офиса  должны находиться на этой территории',
          balloonContent: 'Территория головного офиса AURA',
        },
        {
          draggable: true,
          // Опции.
          // Цвет и прозрачность заливки.
          fillColor: '#7df9ff33',
          // Дополнительная прозрачность заливки..
          // Итоговая прозрачность будет не #33(0.2), а 0.1(0.2*0.5).
          // fillOpacity: 0,
          // Цвет обводки.
          strokeColor: '#0000FF',
          // Прозрачность обводки.
          strokeOpacity: 0.5,
          // Ширина линии.
          strokeWidth: 2,
          // Радиус скругления углов.
          // Данная опция принимается только прямоугольником.
          borderRadius: 6,
        },
      ),
      geoObjects = [];
    // Попадание сотрудников на рабочую территорию
    polygon.events.add('drag', function() {
      // Объекты, попадающие в круг, будут становиться красными.
      var objectsInsidePolygon = objects.searchInside(polygon);
      // objectsInsidePolygon.setOptions('preset', 'islands#redIcon');
      console.log('Сотрудник на работе!');
      // Оставшиеся объекты - синими.

      objects
        .remove(objectsInsidePolygon)
        .setOptions('preset', 'islands#blueIcon');
    });
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
    myMap.geoObjects.add(polygon);
    myMap.setBounds(clusterer.getBounds(), {
      checkZoomRange: true,
    });
  });

  useEffect(() => {
    console.log('INIT', init);
  }, [pointsM]);

  return <div id="map" style={{ width: '100%', height: '900px' }}></div>;
};
export default YMaps;

import React, { useState, useEffect } from 'react';

const YMaps = props => {
  const { ymaps } = window;
  const { mainState = {}, onChangeMap = () => {} } = props;

  const { center, zoom, behaviors } = mainState;

  ymaps.ready(function() {
    var myMap = new ymaps.Map('map', {
        center: center,
        zoom: zoom,
        behaviors: behaviors,
      }),
      /**
       * Создадим кластеризатор, вызвав функцию-конструктор.
       * Список всех опций доступен в документации.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
       */
      clusterer = new ymaps.Clusterer({
        /**
         * Через кластеризатор можно указать только стили кластеров,
         * стили для меток нужно назначать каждой метке отдельно.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
         */
        preset: 'islands#invertedBlueClusterIcons',
        /**
         * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
         */
        groupByCoordinates: false,
        /**
         * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
         */
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: true,
        geoObjectHideIconOnBalloonOpen: true,
      }),
      /**
       * Функция возвращает объект, содержащий данные метки.
       * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
       * Поле balloonContentBody - источник данных для контента балуна.
       * Оба поля поддерживают HTML-разметку.
       * Список полей данных, которые используют стандартные макеты содержимого иконки метки
       * и балуна геообъектов, можно посмотреть в документации.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
       */
      getPointData = function(index) {
        return {
          balloonContentHeader:
            '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
          balloonContentBody:
            '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
          balloonContentFooter:
            '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' +
            index +
            '</strong>',
          clusterCaption: 'метка <strong>' + index + '</strong>',
        };
      },
      /**
       * Функция возвращает объект, содержащий опции метки.
       * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
       */
      getPointOptions = function() {
        return {
          preset: 'islands#darkBlueDotIcon',
        };
      },
      points = [
        [55.831903, 37.411961],
        [55.763338, 37.565466],
        [55.763338, 37.565466],
        [55.744522, 37.616378],
        [55.780898, 37.642889],
        [55.793559, 37.435983],
        [55.800584, 37.675638],
        [55.716733, 37.589988],
        [55.775724, 37.56084],
        [55.822144, 37.433781],
        [55.87417, 37.669838],
        [55.71677, 37.482338],
        [55.78085, 37.75021],
        [55.810906, 37.654142],
        [55.865386, 37.713329],
        [55.847121, 37.525797],
        [55.778655, 37.710743],
        [55.623415, 37.717934],
        [55.863193, 37.737],
        [55.86677, 37.760113],
        [55.698261, 37.730838],
        [55.6338, 37.564769],
        [55.639996, 37.5394],
        [55.69023, 37.405853],
        [55.77597, 37.5129],
        [55.775777, 37.44218],
        [55.811814, 37.440448],
        [55.751841, 37.404853],
        [55.627303, 37.728976],
        [55.816515, 37.597163],
        [55.664352, 37.689397],
        [55.679195, 37.600961],
        [55.673873, 37.658425],
        [55.681006, 37.605126],
        [55.876327, 37.431744],
        [55.843363, 37.778445],
        [55.875445, 37.549348],
        [55.662903, 37.702087],
        [55.746099, 37.434113],
        [55.83866, 37.712326],
        [55.774838, 37.415725],
        [55.871539, 37.630223],
        [55.657037, 37.571271],
        [55.691046, 37.711026],
        [55.803972, 37.65961],
        [55.616448, 37.452759],
        [55.781329, 37.442781],
        [55.844708, 37.74887],
        [55.723123, 37.406067],
      ],
      geoObjects = [];

    /**
     * Данные передаются вторым параметром в конструктор метки, опции - третьим.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
    for (var i = 0, len = points.length; i < len; i++) {
      geoObjects[i] = new ymaps.Placemark(
        points[i],
        getPointData(i),
        getPointOptions(),
      );
    }

    /**
     * Можно менять опции кластеризатора после создания.
     */
    clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: true,
    });

    /**
     * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);

    /**
     * Спозиционируем карту так, чтобы на ней были видны все объекты.
     */

    myMap.setBounds(clusterer.getBounds(), {
      checkZoomRange: true,
    });
  });

  return <div id="map" />;
};

export default YMaps;

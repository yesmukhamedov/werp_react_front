import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import './style.css';

import { loadScript } from './helpers';

const YmapTaxiExperience = props => {
  const { changeState } = props;
  const initialState = {
    center: [43.237156, 76.945618],
    from: [43.216839, 76.850567],
    to: [],
    zoom: 11,
    controls: [],
    deliveryTarif: 100,
    minimumCost: 200,
    routeLength: {},
    taxiExpense: 0,
    currency: 'KZT',
    routeTime: '',
  };

  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    changeState(state);
  }, [state]);
  const init = () => {
    // Стоимость за километр.

    const myMap = new window.ymaps.Map('map', {
      center: state.center,
      zoom: state.zoom,
      controls: state.controls,
    });

    // Создадим панель маршрутизации.
    const routePanelControl = new window.ymaps.control.RoutePanel({
      options: {
        // Добавим заголовок панели.
        showHeader: true,
        title: 'Расчёт стоимости на такси',
        maxWidth: 400,
        allowSwitch: true,
      },
    });

    const zoomControl = new window.ymaps.control.ZoomControl({
      options: {
        size: 'small',
        float: 'none',
        position: {
          bottom: 145,
          right: 10,
        },
      },
    });

    // Пользователь сможет построить только автомобильный маршрут.
    routePanelControl.routePanel.options.set({
      types: { auto: true },
    });

    // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
    routePanelControl.routePanel.state.set({
      fromEnabled: false,
      from: state.from,
    });

    myMap.controls.add(routePanelControl).add(zoomControl);

    // Получим ссылку на маршрут.
    routePanelControl.routePanel.getRouteAsync().then(function(route) {
      console.log('route', route);
      // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
      route.model.setParams({ results: 1 }, true);

      // Повесим обработчик на событие построения маршрута.
      route.model.events.add('requestsuccess', function() {
        var activeRoute = route.getActiveRoute();

        if (activeRoute) {
          // Получим протяженность маршрута.
          var length = route.getActiveRoute().properties.get('distance'),
            // Вычислим стоимость доставки.
            price = calculate(Math.round(length.value / 1000)),
            time = route.getActiveRoute().properties.get('duration'),
            // Создадим макет содержимого балуна маршрута.
            balloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
              '<span>Расстояние: ' +
                length.text +
                '.</span><br/>' +
                '<span style="font-weight: bold; font-style: italic">Расход на такси: ' +
                price +
                ' ' +
                state.currency +
                ' </span><br/>' +
                '<span>Время: ' +
                time.text +
                '</span>',
            );
          setState({
            ...state,
            routeLength: length,
            taxiExpense: price,
            routeTime: time.text,
          });
          // Зададим этот макет для содержимого балуна.
          route.options.set('routeBalloonContentLayout', balloonContentLayout);
          // Откроем балун.
          activeRoute.balloon.open();
        }
      });
    });
    // Функция, вычисляющая стоимость доставки.
    const calculate = routeLength => {
      return Math.max(routeLength * state.deliveryTarif, state.minimumCost);
    };
  };
  useEffect(() => {
    loadScript(
      'https://api-maps.yandex.ru/2.1/?apikey=42cf1ae0-38c3-454d-a55d-7d7732c05c71&lang=ru_RU&amp&',
      () => {
        window.ymaps.ready(init);
      },
    );
  }, []);

  return (
    <div className="App" style={{ width: '100%', height: '800px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default YmapTaxiExperience;

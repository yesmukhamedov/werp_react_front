import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { Button, Segment, Sidebar, Popup, Divider } from 'semantic-ui-react';

import VerticalSidebar from './components/VerticalSidebar';
import ReportSlc from './components/ReportSlc';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import {
  fetchStaffHrSlcList,
  clearStaffHrSlcList,
  fetchWorkStatusList,
  clearWorkStatusList,
  fetchBusinessProcessList,
  clearBusinessProcessList,
} from './hrslcAction';
import { pointsYMap } from './components/pointsYMap';

const Hrslc = props => {
  const {
    countryList = [],
    language,
    companyOptions = [],
    staffHrslcList,
    workStatusList,
    businessProcessList,
  } = props;

  const [state, setState] = useState({
    animation: 'slide along',
    direction: 'left',
    dimmed: false,
    visible: true,
  });

  const [reRender, setReRender] = useState(true);

  useEffect(() => {
    props.f4FetchCountryList();
    props.fetchWorkStatusList();
    props.fetchBusinessProcessList();
  }, []);
  const mapCompanyOptions = companyOptions.map(item => {
    return {
      key: item.key,
      text: item.text,
      value: item.text,
    };
  });

  const mapCountryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.country,
    };
  });

  const positionOptions = [
    {
      key: 9,
      text: 'Финансовый агент',
      value: 9,
    },
    {
      key: 4,
      text: 'Дилер',
      value: 4,
    },
    {
      key: 16,
      text: 'Мастер уборочной системы',
      value: 16,
    },
    {
      key: 17,
      text: 'Мастер системы очистки воды',
      value: 17,
    },
  ];

  const [param, setParam] = useState({
    country: null,
    bukrs: null,
    branch: null,
  });

  const filterMapPoints = pointsYMap
    .filter(item =>
      param.country ? item.country == param.country : item.country,
    )
    .filter(item => (param.bukrs ? item.bukrs == param.bukrs : item.bukrs));

  useEffect(() => {
    setReRender(false);
  }, [param]);

  const [mapState, setMapState] = useState({
    center: [43.22387586, 76.92826238],
    zoom: 7,
  });

  const [toggleStatus, setToggleStatus] = useState(true);

  const { animation, dimmed, direction, visible } = state;

  const onChangeVerticalSideBar = (fieldName, value) => {
    switch (fieldName) {
      case 'changeCountry':
        setParam({ ...param, country: value });
        break;
      case 'clearCountry':
        setParam({ ...param, country: null });
        break;
      case 'changeCompany':
        setParam({ ...param, bukrs: value });
        break;
      case 'clearCompany':
        setParam({ ...param, bukrs: null });
        break;
      case 'toggleFilter':
        setToggleStatus(!toggleStatus);
        break;
    }
  };

  const getPointData = index => {
    return {
      balloonContentBody: 'placemark <strong>balloon ' + index + '</strong>',
      clusterCaption: 'placemark <strong>' + index + '</strong>',
    };
  };

  const getPointOptions = () => {
    return {
      preset: 'islands#violetIcon',
    };
  };

  return (
    <Container
      style={{ display: 'flex' }}
      fluid
      style={{ width: '100%', height: '100%' }}
    >
      <Sidebar.Pushable
        as={Segment}
        style={{ overflow: 'hidden' }}
        style={{ width: '100%', height: '100%' }}
      >
        <VerticalSidebar
          animation={animation}
          direction={direction}
          visible={visible}
          param={param}
          companyOptions={mapCompanyOptions}
          countryOptions={mapCountryOptions}
          onChangeVerticalSideBar={onChangeVerticalSideBar}
          toggleStatus={toggleStatus}
          positionOptions={positionOptions}
        />
        <Divider vertical>And</Divider>
        <Sidebar.Pusher
          dimmed={dimmed && visible}
          style={{ width: '100%', height: '100%' }}
        >
          <Segment
            style={{
              height: '100%',
              width: '100%',
              padding: '1px',
            }}
          >
            <Popup
              content={state.visible ? 'Скрыть фильтр' : 'Показать фильтр'}
              trigger={
                <Button
                  style={{ position: 'absolute', zIndex: '1000' }}
                  onClick={() => setState({ ...state, visible: !visible })}
                  circular
                  color="teal"
                  icon="filter"
                />
              }
            />
            {toggleStatus ? (
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
                    {pointsYMap.map((coordinates, index) => (
                      <Placemark
                        key={index}
                        geometry={coordinates.location}
                        properties={getPointData(index)}
                        options={getPointOptions()}
                      />
                    ))}
                  </Clusterer>
                </Map>
              </YMaps>
            ) : (
              <ReportSlc filterMapPoints={filterMapPoints} />
            )}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    //
    staffHrslcList: state.hrslcReducer.staffHrslcList,
    workStatusList: state.hrslcReducer.workStatusList,
    businessProcessList: state.hrslcReducer.businessProcessList,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  //
  fetchStaffHrSlcList,
  clearStaffHrSlcList,
  fetchWorkStatusList,
  clearWorkStatusList,
  fetchBusinessProcessList,
  clearBusinessProcessList,
})(injectIntl(Hrslc));

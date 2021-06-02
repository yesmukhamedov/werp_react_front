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
  fetchHrslcList,
  clearHrslcList,
  fetchStaffList,
  clearStaffList,
  fetchWorkStatusList,
  clearWorkStatusList,
  fetchBusinessProcessList,
  clearBusinessProcessList,
} from './hrslcAction';
import { pointsYMap } from './components/pointsYMap';
import { Grid } from 'semantic-ui-react';

const Hrslc = props => {
  const {
    countryList = [],
    language,
    companyOptions = [],
    branchOptionsAll = {},
    hrslcList = [],
    staffHrslcList = [],
    workStatusList = [],
    businessProcessList = [],
  } = props;

  const [state, setState] = useState({
    animation: 'slide along',
    direction: 'left',
    dimmed: false,
    visible: true,
  });

  const [param, setParam] = useState({
    countryId: null,
    bukrs: null,
    branchId: null,
    positionId: null,
    staffId: null,
  });

  useEffect(() => {
    if (param.countryId && param.bukrs && param.branchId && param.positionId) {
      props.fetchStaffList({
        countryId: param.countryId,
        bukrs: param.bukrs,
        branchId: param.branchId,
        positionId: param.positionId,
      });
    } else if (param.countryId && param.bukrs && param.branchId) {
      props.fetchStaffList({
        countryId: param.countryId,
        bukrs: param.bukrs,
        branchId: param.branchId,
      });
    } else if (param.bukrs && param.branchId && param.positionId) {
      props.fetchStaffList({
        bukrs: param.bukrs,
        branchId: param.branchId,
        positionId: param.positionId,
      });
    } else if (param.bukrs && param.branchId) {
      props.fetchStaffList({
        bukrs: param.bukrs,
        branchId: param.branchId,
      });
    } else {
      props.clearStaffList();
    }
  }, [param.countryId, param.bukrs, param.branchId, param.positionId]);

  useEffect(() => {
    props.f4FetchCountryList();
    props.fetchWorkStatusList();
    props.fetchBusinessProcessList();
  }, []);

  const mapCompanyOptions = companyOptions.map(item => {
    return {
      key: item.key,
      text: item.text,
      value: item.value,
    };
  });

  const mapCountryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
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

  const filterMapPoints = pointsYMap
    .filter(item =>
      param.country ? item.country == param.country : item.country,
    )
    .filter(item => (param.bukrs ? item.bukrs == param.bukrs : item.bukrs));

  const [mapState, setMapState] = useState({
    center: [43.22387586, 76.92826238],
    zoom: 7,
  });

  const [toggleStatus, setToggleStatus] = useState(false);

  const { animation, dimmed, direction, visible } = state;

  const onChangeVerticalSideBar = (fieldName, value) => {
    switch (fieldName) {
      //Страна --
      case 'changeCountry':
        setParam({ ...param, countryId: value });
        break;
      case 'clearCountry':
        setParam({ ...param, countryId: null });
        break;
      //Компания --
      case 'changeCompany':
        setParam({ ...param, bukrs: value, branchId: null });
        break;
      case 'clearCompany':
        setParam({ ...param, bukrs: null, branchId: null });
        break;
      //Филиал --
      case 'changeBranch':
        setParam({ ...param, branchId: value });
        break;
      case 'clearBranch':
        setParam({ ...param, branchId: null });
        break;
      //Должность --
      case 'changePosition':
        setParam({ ...param, positionId: value });
        break;
      case 'clearPosition':
        setParam({ ...param, positionId: null });
        break;
      //Сотрудник --
      case 'changeStaff':
        setParam({ ...param, staffId: value });
        break;
      case 'clearStaff':
        setParam({ ...param, staffId: null });
        break;
      //--
      case 'toggleFilter':
        setToggleStatus(!toggleStatus);
        break;
      case 'buttonSearch':
        console.log('buttonSearch');
        props.fetchHrslcList(param);

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
      <Sidebar.Pushable as={Segment} style={{ width: '100%', height: '100%' }}>
        <VerticalSidebar
          animation={animation}
          direction={direction}
          visible={visible}
          param={param}
          companyOptions={mapCompanyOptions}
          countryOptions={mapCountryOptions}
          branchOptions={branchOptionsAll[param.bukrs]}
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
                    {hrslcList.map((item, index) => (
                      <Placemark
                        key={index}
                        geometry={[item.latitude, item.longitude]}
                        properties={getPointData(index)}
                        options={getPointOptions()}
                      />
                    ))}
                  </Clusterer>
                </Map>
              </YMaps>
            ) : (
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column width={13}>
                    <ReportSlc
                      data={hrslcList}
                      filterMapPoints={filterMapPoints}
                    />
                  </Grid.Column>
                  <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
              </Grid>
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
    branchOptionsAll: state.userInfo.branchOptionsAll,
    //

    hrslcList: state.hrslcReducer.hrslcList,
    staffHrslcList: state.hrslcReducer.staffHrslcList,
    workStatusList: state.hrslcReducer.workStatusList,
    businessProcessList: state.hrslcReducer.businessProcessList,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  //
  fetchHrslcList,
  clearHrslcList,
  fetchStaffList,
  clearStaffList,
  fetchWorkStatusList,
  clearWorkStatusList,
  fetchBusinessProcessList,
  clearBusinessProcessList,
})(injectIntl(Hrslc));

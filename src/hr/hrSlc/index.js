import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { Button, Segment, Sidebar, Popup, Divider } from 'semantic-ui-react';
import YMaps from '../../utils/YMap';
import VerticalSidebar from './components/VerticalSidebar';
import ReportSlc from './components/ReportSlc';

import { f4FetchCountryList } from '../../reference/f4/f4_action';
import { pointsYMap } from './components/pointsYMap';

const Hrslc = props => {
  const { countryList = [], language, companyOptions = [] } = props;

  const [state, setState] = useState({
    animation: 'slide along',
    direction: 'left',
    dimmed: false,
    visible: true,
  });

  const [reRender, setReRender] = useState(true);
  console.log('reRender', reRender);
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

  useEffect(() => {
    props.f4FetchCountryList();
  }, []);

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

  return (
    <Container
      style={{ display: 'flex' }}
      fluid
      style={{
        height: '100%',
      }}
    >
      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
        <VerticalSidebar
          animation={animation}
          direction={direction}
          visible={visible}
          param={param}
          companyOptions={mapCompanyOptions}
          countryOptions={mapCountryOptions}
          onChangeVerticalSideBar={onChangeVerticalSideBar}
          toggleStatus={toggleStatus}
        />
        <Divider vertical>And</Divider>
        <Sidebar.Pusher dimmed={dimmed && visible}>
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
              <YMaps
                reRender={reRender}
                pointsM={filterMapPoints}
                mainState={mapState}
                style={{ positions: 'absolute' }}
              />
            ) : (
              <ReportSlc
                style={{ positions: 'relative', height: '100%' }}
                filterMapPoints={filterMapPoints}
              />
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
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
})(injectIntl(Hrslc));

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchHrSlc, clearHrSlc } from './hrslcAction';
import './hrSlc.css';
import YMaps from './components/YMap';
import { Segment, Container, Tab } from 'semantic-ui-react';

const HrSlc = props => {
  const [state, setState] = useState({
    center: [43.237156, 76.945618],
    zoom: 12,
    behaviors: ['default', 'scrollZoom'],
  });

  const onChangeMap = (fieldName, value) => {
    switch (fieldName) {
      case '':
        break;
    }
  };

  const panes = [
    {
      menuItem: 'Отчет',
      render: () => (
        <Tab.Pane>
          <YMaps mainState={state} />
        </Tab.Pane>
      ),
    },
    { menuItem: 'Карта', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];

  return (
    <Container fluid style={{ position: 'absolute', height: '100%' }}>
      <Tab panes={panes} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    hrslcData: state.hrslcReducer.hrslcData,
  };
}

export default connect(mapStateToProps, {
  fetchHrSlc,
  clearHrSlc,
})(injectIntl(HrSlc));

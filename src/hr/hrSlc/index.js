import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchHrSlc, clearHrSlc } from './hrslcAction';
import {
  Segment,
  Grid,
  Button,
  Transition,
  Sidebar,
  Menu,
  Header,
  Icon,
  Ref,
  Image,
  Checkbox,
  Container,
} from 'semantic-ui-react';

const HrSlc = props => {
  const [visible, setVisible] = React.useState(false);
  const { ymaps } = window;
  console.log('ymaps', ymaps);
  const [mapLoading, setMapLoading] = useState(false);

  return (
    <Container>
      <Segment>YANDEX MAPS</Segment>
      <Segment>Map</Segment>
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

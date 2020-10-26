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
} from 'semantic-ui-react';
import { YMaps, Map } from 'react-yandex-maps';

const HrSlc = props => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Grid columns={1} style={{ height: '100%' }}>
      <Grid.Column style={{ height: '100%' }}>
        <Sidebar.Pushable as={Segment.Group} raised>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => setVisible(false)}
            vertical
            // target={segmentRef}
            visible={visible}
            width="thin"
          >
            <Menu.Item as="a">Home</Menu.Item>
            <Menu.Item as="a">Games</Menu.Item>
            <Menu.Item as="a">Channels</Menu.Item>
          </Sidebar>

          <Segment>
            <Header as="h3">
              Application Content
              <Checkbox
                checked={visible}
                label={{ children: <code>visible</code> }}
                onChange={(e, data) => setVisible(data.checked)}
              />
            </Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
            <Header as="h3">Application Content</Header>
          </Segment>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
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

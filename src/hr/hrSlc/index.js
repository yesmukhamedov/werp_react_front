import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import {
  Button,
  Grid,
  Header,
  Segment,
  Sidebar,
  Form,
} from 'semantic-ui-react';
import YMaps from '../../utils/YMap';

import { pointsYMap } from './components/pointsYMap';

import DropdownClearable from '../../utils/DropdownClearable';
const HorizontalSidebar = ({ animation, direction, visible }) => {
  const handleSubmit = () => {
    console.log('handleSubmit');
  };
  return (
    <Sidebar
      as={Segment}
      animation={animation}
      direction={direction}
      visible={visible}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Field>
            <label></label>
            <DropdownClearable
              selection
              options={[]}
              value={''}
              placeholder="Компания"
              onChange={(e, { value }) => console.log('onChange')}
              handleClear={() => console.log('handleClear')}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Grid textAlign="center">
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header as="h3">New Content Awaits</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Button color="red">Button</Button>
          </Grid.Column>
          <Grid.Column>
            <Button color="teal">Button</Button>
          </Grid.Column>
          <Grid.Column>
            <Button color="green">Button</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Sidebar>
  );
};

const Hrslc = props => {
  const [state, setState] = useState({
    animation: 'overlay',
    direction: 'top',
    dimmed: false,
    visible: false,
  });

  const [mapState, setMapState] = useState({
    center: [43.22387586, 76.92826238],
    zoom: 8,
    pointsM: pointsYMap,
  });

  console.log('STATE', state);

  const { animation, dimmed, direction, visible } = state;
  const vertical = direction === 'bottom' || direction === 'top';

  return (
    <Container fluid style={{ height: '100%' }}>
      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
        <Button
          icon="filter"
          style={{ position: 'absolute', zIndex: '1000' }}
          color="blue"
          onClick={() => setState({ ...state, visible: !visible })}
        />
        {vertical && (
          <HorizontalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}

        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment
            style={{ positions: 'relative', height: '100%', width: '100%' }}
          >
            <YMaps mainState={mapState} style={{ positions: 'absolute' }} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(Hrslc));

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchCollectMonies } from './foacAction';
import { Segment, Container, Button } from 'semantic-ui-react';
import Table from './components/Table';
import './style.css';

const Foac = props => {
  const {
    intl: { messages },
    collectMoniesList = [],
  } = props;
  console.log('collectMoniesList', collectMoniesList);
  useEffect(() => {
    props.fetchCollectMonies({ bukrs: '1000' });
  }, []);
  return (
    <Container
      fluid
      style={{
        marginTop: '1em',
        marginBottom: '1em',
        paddingLeft: '1em',
        paddingRight: '1em',
      }}
    >
      <Segment className="space-between">
        <h5>Утверждение взноса</h5>
        <Button color="green">Добавить</Button>
      </Segment>
      <Table messages={messages} data={collectMoniesList} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    collectMoniesList: state.foacReducer.collectMoniesList,
  };
}

export default connect(mapStateToProps, {
  fetchCollectMonies,
})(injectIntl(Foac));

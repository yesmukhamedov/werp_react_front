import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment } from 'semantic-ui-react';
import TableSmvod from './tables/TableSmvod';
import { fetchSmvodList } from '../smdisAction';
const Smvod = props => {
  const { smvod = {}, clickSmvodRow } = props;

  return (
    <Container fluid>
      <TableSmvod
        data={smvod.listData}
        footerData={smvod.listSum}
        clickSmvodRow={clickSmvodRow}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    smvod: state.smdisReducer.smvod,
  };
}

export default connect(mapStateToProps, {
  fetchSmvodList,
})(injectIntl(Smvod));

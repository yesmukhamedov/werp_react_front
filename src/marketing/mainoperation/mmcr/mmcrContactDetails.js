//Contract contact details
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Table, Icon, Label } from 'semantic-ui-react';

const MmcrContactDetails = props => {
  const {
    addrHome = {},
    addrWork = {},
    addrService = {},
    contract = {},
    intl: { messages },
  } = props;
  return (
    <div>
      <Table collapsing className="borderLess">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{messages['addrType']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['address']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['telDom']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['telMob1']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['telMob2']}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['addressHome']}</Table.Cell>
            <Table.Cell>
              <span>{addrHome.address}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrHome.telDom}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrHome.telMob1}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrHome.telMob2}</span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['addressWork']}</Table.Cell>
            <Table.Cell>
              <span>{addrWork.address}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrWork.telDom}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrWork.telMob1}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrWork.telMob2}</span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['addressService']}</Table.Cell>
            <Table.Cell>
              <span>{addrService.address}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrService.telDom}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrService.telMob1}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrService.telMob2}</span>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
    // </Segment>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
  };
}

export default connect(
  mapStateToProps,
  {},
)(injectIntl(MmcrContactDetails));

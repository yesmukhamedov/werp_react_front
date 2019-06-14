import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { fetchDynObjMarketing } from '../../marketingAction';
import { Segment, Table, Input, Label, List } from 'semantic-ui-react';

const McrExtraInfo = props => {
  const {
    contract = {},
    language,
    intl: { messages },
  } = props;

  return (
    <div>
      <Segment>
        <Label color="orange" ribbon>
          {messages['extraInfo']}
        </Label>

        <List verticalAlign="middle" celled size={'large'}>
          <List.Item>
            <List.Content>
              <List.Header as="a">info 1</List.Header>
              <List.Description>{contract.info}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="a">info 2</List.Header>
              <List.Description>{contract.info2}</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </div>
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
)(injectIntl(McrExtraInfo));

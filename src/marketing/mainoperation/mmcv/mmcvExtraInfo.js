import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Label, List } from 'semantic-ui-react';

const MmcvExtraInfo = props => {
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
              <List.Description>
                {contract.info ? contract.info : messages['empty']}
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="a">info 2</List.Header>
              <List.Description>
                {contract.info2 ? contract.info2 : messages['empty']}
              </List.Description>
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
)(injectIntl(MmcvExtraInfo));

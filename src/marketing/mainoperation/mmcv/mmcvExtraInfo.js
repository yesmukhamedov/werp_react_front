import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Label, List } from 'semantic-ui-react';
import { LinkToMmcei } from '../../../utils/outlink';
import ContractDescription from './../contractAdditionaComponents/contractDescription';

const MmcvExtraInfo = props => {
  const {
    contract = {},
    contractDescriptionList = [],
    intl: { messages },
  } = props;

  return (
    <div>
      <Segment>
        <Label color="orange" ribbon>
          {messages['extraInfo']}
        </Label>
        <LinkToMmcei
          text={messages['toEdit']}
          contractNumber={contract.contractNumber}
        />

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

        <ContractDescription
          contractDescriptionList={contractDescriptionList}
          tcode="MMCV"
        />
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

export default connect(mapStateToProps, {})(injectIntl(MmcvExtraInfo));

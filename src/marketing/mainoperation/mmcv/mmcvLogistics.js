import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Table, Input, Label, List } from 'semantic-ui-react';
import { LinkToMmceg } from '../../../utils/outlink';

const MmcvLogistics = props => {
  const {
    contract = {},
    contractPromoList = [],
    intl: { messages },
  } = props;

  return (
    <div>
      <LinkToMmceg
        text={messages['toEdit']}
        contractNumber={contract.contractNumber}
      />
      <Table collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['dateOfIssue']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.matnrReleaseDate} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.tovarSerial} />
            </Table.Cell>
          </Table.Row>
          {contract.tradeIn !== undefined &&
            contract.tradeIn !== null &&
            contract.tradeIn > 0 && (
              <Table.Row>
                <Table.Cell>
                  Trade-in {messages['productSerialNumber']}
                </Table.Cell>
                <Table.Cell>
                  <Input value={contract.tradeInTovarSerial} maxLength="18" />
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table>

      <Segment>
        <Label color="blue" ribbon>
          {messages['promotion']}
        </Label>

        <List verticalAlign="middle" celled size={'small'}>
          {contractPromoList.map(item => {
            return (
              <List.Item key={item.id}>
                <List.Content>
                  <List.Header as="a">{item.name}</List.Header>
                  <List.Description>
                    {item.fromDealer} {item.fdCurrency}
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
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
)(injectIntl(MmcvLogistics));

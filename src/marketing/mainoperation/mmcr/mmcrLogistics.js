import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Table, Input, Label, List } from 'semantic-ui-react';

const MmcrLogistics = props => {
  const {
    contract = {},
    tradeIn = 0,
    contractPromoList = [],
    intl: { messages },
  } = props;

  const getTradeIn = id => {
    if (!id) return '';
    else if (id === 0) return '';
    else if (id === 1) return 'Trade-in 1';
    else if (id === 2) return 'Trade-in 2';
    else if (id === 3) return 'Trade-in 3';
  };

  return (
    <div>
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
          <Table.Row>
            <Table.Cell>Trade-in</Table.Cell>
            <Table.Cell>
              <Input value={getTradeIn(contract.tradeIn)} />
            </Table.Cell>
          </Table.Row>
          {tradeIn !== undefined && tradeIn !== null && tradeIn > 0 && (
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
)(injectIntl(MmcrLogistics));

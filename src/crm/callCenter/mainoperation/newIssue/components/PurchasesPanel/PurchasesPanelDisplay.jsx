import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Label, List, Table, Header, Button } from 'semantic-ui-react';
import { LEGACY_URL } from '../../../../../../utils/constants';


const PurchasesPanelDisplay = (props) => {
  const { otherPurchases, cancelledAt, messages } = props;
  return (
    <Segment raised>
      <Label color="olive" ribbon>
        {messages.L__PURCHASES}
      </Label>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as="h4">{messages.L__PRODUCTS}</Header>
            <Table celled structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{messages.TBL_H__CONTRACT_NUMBER}</Table.HeaderCell>
                  <Table.HeaderCell>{messages.TBL_H__PRODUCT}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {otherPurchases &&
                  otherPurchases.map((item, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>
                        <a target='_blank' href={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_id=` + item.contractNumber}>
								          <Button>{item.contractNumber}</Button>
                        </a>
                      </Table.Cell>
                      <Table.Cell>{item.productName}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__RETURN_DATE}:
                </List.Header>
                {cancelledAt || <span>&mdash;</span>}
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

PurchasesPanelDisplay.propTypes = {
  otherPurchases: PropTypes.array,
  cancelledAt: PropTypes.string.isRequired,
};

export default PurchasesPanelDisplay;

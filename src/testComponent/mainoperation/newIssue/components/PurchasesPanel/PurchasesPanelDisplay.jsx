import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Segment, Label, Form, Table, Header } from 'semantic-ui-react';
import { LEGACY_URL } from '../../../../../utils/constants';


const PurchasesPanelDisplay = (props) => {
  const { otherPurchases, cancelledAt } = props;
  return (
    <Segment raised>
      <Label color="olive" ribbon>
        Другие покупки
      </Label>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as="h4">Продукты</Header>
            <Table celled structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell># Договора</Table.HeaderCell>
                  <Table.HeaderCell>Продукт</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {otherPurchases &&
                  otherPurchases.map((item, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>
                        <Link target='_blank' to={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_id=` + item.contractNumber}>
                          {item.contractNumber}
                        </Link>                        
                      </Table.Cell>
                      <Table.Cell>{item.productName}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field
                label="Дата возврата"
                control="input"
                value={cancelledAt}
                width="6"
              />
            </Form>
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

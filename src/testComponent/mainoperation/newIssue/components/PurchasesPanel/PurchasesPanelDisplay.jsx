import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Label, Form, Table, Header } from 'semantic-ui-react';

const PurchasesPanelDisplay = props => (
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
              <Table.Row>
                <Table.Cell>1123123</Table.Cell>
                <Table.Cell>Cebilon</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>2341234</Table.Cell>
                <Table.Cell>Roboclean</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Field
              label="Дата возврата"
              control="input"
              defaultValue={props.returnDate}
              width="6"
            />
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

PurchasesPanelDisplay.propTypes = {
  returnDate: PropTypes.string.isRequired,
};

export default PurchasesPanelDisplay;

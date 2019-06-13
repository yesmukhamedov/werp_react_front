import React, { Component } from 'react';
import { Grid, Input, Form } from 'semantic-ui-react';

class SearchByNum extends Component {
  constructor(props) {
    super();
    this.state = {
      modalOpen: false,
      row: '',
      roleNameShow: false,
      roleName: '',
      accessTypes: [],
    };
  }

  render() {
    const { messages, inputChange } = this.props;

    return (
      <Form>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Form.Field
                onChange={(e, o) => inputChange('contract_number', o)}
                control={Input}
                label={messages['L__CONTRACT_NUMBER']}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Form.Field
                onChange={(e, o) => inputChange('tovarSerial', o)}
                control={Input}
                label={' Товар SN (Заводской номер) '}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Field
                onChange={(e, o) => inputChange('old_sn', o)}
                control={Input}
                label={' Старый SN Договора '}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default SearchByNum;

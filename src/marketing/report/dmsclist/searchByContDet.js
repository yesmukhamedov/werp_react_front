import React, { Component } from 'react';
import { Grid, Modal, Icon, Header, Input, Form } from 'semantic-ui-react';

class SearchByContDet extends Component {
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
                onChange={(e, o) => inputChange('address', o)}
                control={Input}
                label={messages['Form.Address']}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Form.Field
                onChange={(e, o) => inputChange('phone', o)}
                control={Input}
                label={messages['Form.PhoneNumber']}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default SearchByContDet;

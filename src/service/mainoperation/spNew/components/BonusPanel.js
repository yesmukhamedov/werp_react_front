import React, { Component } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';

export default class BonusPanel extends Component {
  render() {
    const { masterBonus, operatorBonus, totalSum } = this.props;
    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Segment padded>
              <Form>
                <Form.Input
                  label="Сумма к оплате"
                  placeholder="Сумма к оплате"
                  // onChange={(e, {value}) => this.props.inputChange(value, 'totalSum')}
                  value={totalSum}
                />
                <Form.Input
                  label="Премия Мастера"
                  placeholder="Премия Мастера"
                  onChange={(e, { value }) =>
                    this.props.inputChange(value, 'masterBonus')
                  }
                  value={masterBonus}
                />
                <Form.Input
                  label="Премия оператора"
                  placeholder="Премия оператора"
                  onChange={(e, { value }) =>
                    this.props.inputChange(value, 'operatorBonus')
                  }
                  value={operatorBonus}
                />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

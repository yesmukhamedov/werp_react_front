import React from 'react';
import { Header, Segment, Form, Grid, Dropdown } from 'semantic-ui-react';

export default function DefSearch(props) {
  const getCompanyOptions = () => {
    const { companyOptions } = props;
    if (!companyOptions) {
      return [];
    }
    let out = companyOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  };

  const { messages, branchOptions, searchPms } = props;

  return (
    <Form>
      <Segment clearing>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h1">{messages['contract_lst']}</Header>
            </Grid.Column>
            <Grid.Column width={3}>
              <Dropdown
                fluid
                selection
                search
                value={searchPms.bukrs}
                options={getCompanyOptions()}
                onChange={(e, o) => props.inputChange('bukrs', o)}
                placeholder={messages['bukrs']}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Dropdown
                fluid
                selection
                search
                value={searchPms.branchId}
                options={searchPms.bukrs ? branchOptions[searchPms.bukrs] : []}
                onChange={(e, o) => props.inputChange('branchId', o)}
                placeholder={messages['L__BRANCH']}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  );
}

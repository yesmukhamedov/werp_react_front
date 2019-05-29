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

  const getBranchOptions = () => {
    const { branchOptions } = props;
    if (!branchOptions) {
      return [];
    }
    let out = branchOptions.map(c => {
      return {
        key: parseInt(c.branch_id, 10),
        text: `${c.text45}`,
        value: parseInt(c.branch_id, 10),
      };
    });
    return out;
  };

  const { messages } = props;
  const { bukrs, branchId } = props.searchPms;
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
                value={bukrs}
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
                value={branchId}
                options={getBranchOptions()}
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

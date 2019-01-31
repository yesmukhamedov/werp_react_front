import React, { Component } from 'react';
import {
  Label,
  Form,
  Dropdown,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

export default class AesForm extends Component {
  render() {
    const {
      countryOpts,
      companyOpts,
      depOptns,
      branchOptns,
      compbranchOpts,
      messages,
      inputChange,
      loadCCBranch,
      osList,
      listType1,
      listType2,
      listType3,
      listDetail,
      listRoom,
      listStatus,
      queryParams,
    } = this.props;

    return (
      <Form>
        <Segment padded size="small">
          <Label attached="top">
            <Header as="h3">{messages['asset_mant']}</Header>
          </Label>
          <Grid columns={6}>
            <Label color="teal" ribbon>
              <Header as="h5" inverted color="black">
                {messages['sel_options']}
              </Header>
            </Label>
            <Grid.Row>
              <Grid.Column>
                <Form.Field required>
                  <label>{messages['bukrs']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.bukrs}
                    options={companyOpts}
                    onChange={(e, { value }) => {
                      inputChange(value, 'bukrs');
                      loadCCBranch(value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label>{messages['country']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.country_id}
                    options={countryOpts}
                    onChange={(e, { value }) => {
                      inputChange(value, 'country_id');
                      loadCCBranch(value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label>{messages['brnch']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.branch_id}
                    options={branchOptns}
                    onChange={(e, { value }) => {
                      inputChange(value, 'branch_id');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['compbr_code']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.compbr_code}
                    options={compbranchOpts}
                    onChange={(e, { value }) => {
                      inputChange(value, 'compbr_code');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['dep']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.dep_id}
                    options={depOptns}
                    onChange={(e, { value }) => {
                      inputChange(value, 'dep_id');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['rnum']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.room_name}
                    options={listRoom}
                    onChange={(e, { value }) => {
                      inputChange(value, 'room_name');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {
            //***************sub grid ***************************** */
          }
          <Grid columns={6}>
            <Label color="teal" ribbon>
              <Header as="h5" inverted color="black">
                {messages['nomination']}
              </Header>
            </Label>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['os_name']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.os_name}
                    options={osList}
                    onChange={(e, { value }) => {
                      inputChange(value, 'os_name');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['type1']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.type1_name}
                    options={listType1}
                    onChange={(e, { value }) => {
                      inputChange(value, 'type1_name');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['type2']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.type2_name}
                    options={listType2}
                    onChange={(e, { value }) => {
                      inputChange(value, 'type2_name');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['type3']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.type3_name}
                    options={listType3}
                    onChange={(e, { value }) => {
                      inputChange(value, 'type3_name');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['os_det']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.detail_name}
                    options={listDetail}
                    onChange={(e, { value }) => {
                      inputChange(value, 'detail_name');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['state1']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    value={queryParams.status_name}
                    options={listStatus}
                    onChange={(e, { value }) => {
                      inputChange(value, 'status_name');
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <br />
        </Segment>
      </Form>
    );
  }
}

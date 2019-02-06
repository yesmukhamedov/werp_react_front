import React from 'react';
import {
  Label,
  Form,
  Dropdown,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

export default function AesForm(props) {
  return (
    <Form>
      <Segment padded size="small">
        <Label attached="top">
          <Header as="h3">{props.messages['asset_mant']}</Header>
        </Label>
        <Grid columns={6}>
          <Label color="teal" ribbon>
            <Header as="h5" inverted color="black">
              {props.messages['sel_options']}
            </Header>
          </Label>
          <Grid.Row>
            <Grid.Column>
              <Form.Field required>
                <label>{props.messages['bukrs']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.bukrs}
                  options={props.companyOpts}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'bukrs');
                    props.loadCCBranch(value);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field required>
                <label>{props.messages['country']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.country_id}
                  options={props.countryOpts}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'country_id');
                    props.loadCCBranch(value);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field required>
                <label>{props.messages['brnch']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.branch_id}
                  options={props.branchOptns}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'branch_id');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['compbr_code']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.compbr_code}
                  options={props.compbranchOpts}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'compbr_code');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['dep']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.dep_id}
                  options={props.depOptns}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'dep_id');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['rnum']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.room_name}
                  options={props.listRoom}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'room_name');
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
              {props.messages['nomination']}
            </Header>
          </Label>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['os_name']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.os_name}
                  options={props.osList}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'os_name');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['type1']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.type1_name}
                  options={props.listType1}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'type1_name');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['type2']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.type2_name}
                  options={props.listType2}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'type2_name');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['type3']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.type3_name}
                  options={props.listType3}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'type3_name');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['os_det']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.detail_name}
                  options={props.listDetail}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'detail_name');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['state1']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={props.queryParams.status_name}
                  options={props.listStatus}
                  onChange={(e, { value }) => {
                    props.inputChange(value, 'status_name');
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

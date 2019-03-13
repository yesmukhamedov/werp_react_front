import React from 'react';
import {
  Label,
  Form,
  Dropdown,
  Grid,
  Header,
  Segment,
  Input,
} from 'semantic-ui-react';

export default function IndexForm(props) {
  return (
    <Segment padded size="small">
      <Label attached="top">
        <Header as="h3">{props.messages['report']}</Header>
      </Label>
      <Grid>
        <Label color="teal" ribbon>
          <Header as="h5" inverted color="black">
            {props.messages['sel_options']}
          </Header>
        </Label>
        <Grid.Row columns={7}>
          <Grid.Column>
            <Form.Field>
              <label>{props.messages['bukrs']}</label>
              <Dropdown
                fluid
                search
                selection
                value={props.queryParams.bukrs}
                options={props.companyOptions}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'bukrs');
                  props.loadCCBranch(value);
                }}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>{props.messages['country']}</label>
              <Dropdown
                fluid
                search
                selection
                value={props.queryParams.country_id}
                options={props.countryOptions}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'country_id');
                  props.loadCCBranch(value);
                }}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>{props.messages['brnch']}</label>
              <Dropdown
                fluid
                search
                selection
                value={props.queryParams.branch_id}
                options={props.branchOptions}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'branch_id');
                  props.loadCompBr(value);
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
              <label>{props.messages['Task.State']}</label>
              <Dropdown
                fluid
                search
                selection
                value={props.queryParams.status_id}
                options={props.listStatus.map(ls => {
                  return { key: ls.key, text: ls.text, value: ls.key };
                })}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'status_id');
                }}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>{props.messages['waers']}</label>
              <Dropdown
                fluid
                selection
                value={props.queryParams.country_id}
                options={props.countryOptions.map(co => {
                  return {
                    key: co.key,
                    text: co.currency,
                    value: co.currency,
                  };
                })}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'currency');
                }}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>{props.messages['amount']} </label>
              <Form.Field
                onChange={(e, o) => props.inputChange(o, 'price')}
                control={Input}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// second row */}
        <Label color="teal" ribbon>
          <Header as="h5" inverted color="black">
            {props.messages['fixed_assets']}
          </Header>
        </Label>
        <Grid.Row columns={7}>
          <Grid.Column>
            <Form.Field>
              <label>{props.messages['os_name']}</label>
              <Dropdown
                fluid
                search
                selection
                value={props.queryParams.os_id}
                options={props.listOs}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'os_id');
                  props.findType1(value);
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
                value={props.queryParams.type1_id}
                options={props.listType1.map(t1 => {
                  return { key: t1.key, text: t1.text, value: t1.key };
                })}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'type1_id');
                  props.findType2(value);
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
                value={props.queryParams.type2_id}
                options={props.listType2.map(t2 => {
                  return { key: t2.key, text: t2.text, value: t2.key };
                })}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'type2_id');
                  props.findType3(value);
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
                value={props.queryParams.type3_id}
                options={props.listType3.map(t3 => {
                  return { key: t3.key, text: t3.text, value: t3.key };
                })}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'type3_id');
                  props.findDetail(value);
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
                value={props.queryParams.detail_id}
                options={props.listDetail.map(ld => {
                  return { key: ld.key, text: ld.text, value: ld.key };
                })}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'detail_id');
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
                value={props.queryParams.room_id}
                options={props.listRooms.map(rl => {
                  return { key: rl.key, text: rl.text, value: rl.key };
                })}
                onChange={(e, { value }) => {
                  props.inputChange(value, 'room_id');
                }}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Form.Input
                value={props.queryParams.quantity || ''}
                onChange={(e, o) => props.inputChange(o, 'quantity')}
                required
                label={props.messages['count']}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

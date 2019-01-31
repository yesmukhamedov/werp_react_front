import React, { Component } from 'react';
import {
  Label,
  Form,
  Dropdown,
  Grid,
  Header,
  Segment,
  Input,
  Table,
  Button,
  Icon,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class ReportForm extends Component {
  render() {
    const {
      companyOptions,
      countryOptions,
      branchOptions,
      depOptns,
      loadCompBr,
      loadCCBranch,
      listOs,
      listType1,
      listType2,
      listType3,
      listDetail,
      listRooms,
      listStatus,
      queryParams,
      inputChange,
      messages,
    } = this.props;
    return (
      <Segment padded size="small">
        <Label attached="top">
          <Header as="h3">{messages['report']}</Header>
        </Label>
        <Grid>
          <Label color="teal" ribbon>
            <Header as="h5" inverted color="black">
              {messages['sel_options']}
            </Header>
          </Label>
          <Grid.Row columns={7}>
            <Grid.Column>
              <Form.Field>
                <label>{messages['bukrs']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={queryParams.bukrs}
                  options={companyOptions}
                  onChange={(e, { value }) => {
                    inputChange(value, 'bukrs');
                    loadCCBranch(value);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{messages['country']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={queryParams.country_id}
                  options={countryOptions}
                  onChange={(e, { value }) => {
                    inputChange(value, 'country_id');
                    loadCCBranch(value);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{messages['brnch']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={queryParams.branch_id}
                  options={branchOptions}
                  onChange={(e, { value }) => {
                    inputChange(value, 'branch_id');
                    loadCompBr(value);
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
                <label>{messages['state1']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={queryParams.status_id}
                  options={listStatus.map(ls => {
                    return { key: ls.key, text: ls.text, value: ls.key };
                  })}
                  onChange={(e, { value }) => {
                    inputChange(value, 'status_id');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{messages['waers']}</label>
                <Dropdown
                  fluid
                  selection
                  value={queryParams.country_id}
                  options={countryOptions.map(co => {
                    return {
                      key: co.key,
                      text: co.currency,
                      value: co.currency,
                    };
                  })}
                  onChange={(e, { value }) => {
                    inputChange(value, 'currency');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{messages['amount']} </label>
                <Form.Field
                  onChange={(e, o) => inputChange(o, 'price')}
                  control={Input}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// second row */}
          <Label color="teal" ribbon>
            <Header as="h5" inverted color="black">
              {messages['fixed_assets']}
            </Header>
          </Label>
          <Grid.Row columns={7}>
            <Grid.Column>
              <Form.Field>
                <label>{messages['os_name']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  value={queryParams.os_id}
                  options={listOs}
                  onChange={(e, { value }) => {
                    inputChange(value, 'os_id');
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
                  value={queryParams.type1_id}
                  options={listType1.map(t1 => {
                    return { key: t1.key, text: t1.text, value: t1.key };
                  })}
                  onChange={(e, { value }) => {
                    inputChange(value, 'type1_id');
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
                  value={queryParams.type2_id}
                  options={listType2.map(t2 => {
                    return { key: t2.key, text: t2.text, value: t2.key };
                  })}
                  onChange={(e, { value }) => {
                    inputChange(value, 'type2_id');
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
                  value={queryParams.type3_id}
                  options={listType3.map(t3 => {
                    return { key: t3.key, text: t3.text, value: t3.key };
                  })}
                  onChange={(e, { value }) => {
                    inputChange(value, 'type3_id');
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
                  value={queryParams.detail_id}
                  options={listDetail.map(ld => {
                    return { key: ld.key, text: ld.text, value: ld.key };
                  })}
                  onChange={(e, { value }) => {
                    inputChange(value, 'detail_id');
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
                  value={queryParams.room_id}
                  options={listRooms.map(rl => {
                    return { key: rl.key, text: rl.text, value: rl.key };
                  })}
                  onChange={(e, { value }) => {
                    inputChange(value, 'room_id');
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <Form.Input
                  value={queryParams.quantity || ''}
                  onChange={(e, o) => inputChange(o, 'quantity')}
                  required
                  label={messages['count']}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default ReportForm;

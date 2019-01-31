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

export default class ApprForm extends Component {
  render() {
    const {
      companyOpts,
      countryOpts,
      branchOptns,
      depOptns,
      messages,
      loadCCBranch,
      loadDepartments,
      queryParams,
      inputChange,
      listAes,
      osList,
      listType1,
      listType2,
      listType3,
      listDetail,
      listRooms,
      listStatus,
    } = this.props;
    return (
      <Form>
        <Segment padded size="small">
          <Label attached="top">
            <Header as="h3">{messages['midify_assets']}</Header>
          </Label>
          <Grid columns={7}>
            <Label color="teal" ribbon>
              <Header as="h5" inverted color="black">
                {messages['sel_options']}
              </Header>
            </Label>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
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
                <Form.Field>
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
                  <label>{messages['Form.DateFrom']}</label>
                  <DatePicker
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="DD.MM.YYYY"
                    selected={
                      queryParams.dateFrom ? moment(queryParams.dateFrom) : null
                    }
                    onChange={v => inputChange(v, 'dateFrom')}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{messages['Form.DateTo']}</label>
                  <DatePicker
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="DD.MM.YYYY"
                    selected={
                      queryParams.dateTo ? moment(queryParams.dateTo) : null
                    }
                    onChange={v => inputChange(v, 'dateTo')}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/************************************************************************************************OS NAMES */}
          <Grid columns={8}>
            <Label color="teal" ribbon>
              <Header as="h5" inverted color="black">
                {messages['fixed_assets']}
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
                    value={queryParams.os_id}
                    options={osList.map(os => {
                      return { key: os.key, text: os.text, value: os.key };
                    })}
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
                  <Form.Field
                    onChange={(e, o) => inputChange(o, 'price')}
                    control={Input}
                    label={messages['amount']}
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
                    options={countryOpts.map(co => {
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
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment padded size="small">
          <Table color={'grey'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Icon name="calendar" />
                  {messages['buying_date_from']}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="calendar" />
                  {messages['buying_date_to']}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {messages['inventory_code']}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={3}>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    dateFormat="DD.MM.YYYY"
                    selected={
                      queryParams.btFrom ? moment(queryParams.btFrom) : null
                    }
                    locale="ru"
                    onChange={v => inputChange(v, 'btFrom')}
                  />
                </Table.Cell>
                <Table.Cell width={3}>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    dateFormat="DD.MM.YYYY"
                    selected={
                      queryParams.btTo ? moment(queryParams.btTo) : null
                    }
                    locale="ru"
                    onChange={v => inputChange(v, 'btTo')}
                  />
                </Table.Cell>
                <Table.Cell width={10}>
                  {listAes.map((code, i) => (
                    <strong key={i}>
                      {code.country_id}-{code.dep_id}-{code.os_code}-
                      {code.type1_code}-{code.type2_code}-{code.type3_code}-
                      {code.detail_code}-{code.room_code}-{code.status_code}
                      <br />
                    </strong>
                  ))}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </Form>
    );
  }
}

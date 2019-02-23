import React from 'react';
import {
  Label,
  Form,
  Dropdown,
  Grid,
  Header,
  Segment,
  Input,
  Table,
  Icon,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default function IndexForm(props) {
  return (
    <Form>
      <Segment padded size="small">
        <Label attached="top">
          <Header as="h3">{props.messages['midify_assets']}</Header>
        </Label>
        <Grid columns={7}>
          <Label color="teal" ribbon>
            <Header as="h5" inverted color="black">
              {props.messages['sel_options']}
            </Header>
          </Label>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
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
              <Form.Field>
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
                <label>{props.messages['Form.DateFrom']}</label>
                <DatePicker
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="DD.MM.YYYY"
                  selected={
                    props.queryParams.dateFrom
                      ? moment(props.queryParams.dateFrom)
                      : null
                  }
                  onChange={v => props.inputChange(v, 'dateFrom')}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>{props.messages['Form.DateTo']}</label>
                <DatePicker
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="DD.MM.YYYY"
                  selected={
                    props.queryParams.dateTo
                      ? moment(props.queryParams.dateTo)
                      : null
                  }
                  onChange={v => props.inputChange(v, 'dateTo')}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/************************************************************************************************OS NAMES */}
        <Grid columns={8}>
          <Label color="teal" ribbon>
            <Header as="h5" inverted color="black">
              {props.messages['fixed_assets']}
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
                  value={props.queryParams.os_id}
                  options={props.osList.map(os => {
                    return { key: os.key, text: os.text, value: os.key };
                  })}
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
                <label>{props.messages['state1']}</label>
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
                <Form.Field
                  onChange={(e, o) => props.inputChange(o, 'price')}
                  control={Input}
                  label={props.messages['amount']}
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
                  options={props.countryOpts.map(co => {
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
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment padded size="small">
        <Table color={'grey'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon name="calendar" />
                {props.messages['buying_date_from']}
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon name="calendar" />
                {props.messages['buying_date_to']}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {props.messages['inventory_code']}
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
                    props.queryParams.btFrom
                      ? moment(props.queryParams.btFrom)
                      : null
                  }
                  locale="ru"
                  onChange={v => props.inputChange(v, 'btFrom')}
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
                    props.queryParams.btTo
                      ? moment(props.queryParams.btTo)
                      : null
                  }
                  locale="ru"
                  onChange={v => props.inputChange(v, 'btTo')}
                />
              </Table.Cell>
              <Table.Cell width={10}>
                {props.listAes.map((code, i) => (
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

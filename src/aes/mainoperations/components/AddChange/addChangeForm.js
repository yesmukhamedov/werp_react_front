import React, { Component } from 'react';
import {
  Container,
  Label,
  Form,
  Dropdown,
  Grid,
  Header,
  Segment,
  Input,
  Table,
  Modal,
  Button,
  Icon,
} from 'semantic-ui-react';
import AddOwner from './addOwner';
import AddExaminer1 from './addExaminer1';
import AddExaminer2 from './addExaminer2';
import AddExaminer3 from './addExaminer3';
import DatePicker from 'react-datepicker';
import Preview from './preview';
import OutputErrors from '../../../../general/error/outputErrors';

class AddChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comp: '',
      open: false,
    };

    this.se0 = this.se0.bind(this);
    this.se1 = this.se1.bind(this);
    this.se2 = this.se2.bind(this);
    this.se3 = this.se3.bind(this);
    this.clichAChange = this.clichAChange.bind(this);
  }

  show = dimmer => () => {
    this.setState({
      ...this.state,
      comp: dimmer,
      open: true,
    });
  };
  close = () => {
    this.setState({ open: false });
  };

  se0(se0) {
    let queryParams = this.props.queryParams;
    queryParams.se0_id = se0.staffId;
    (queryParams.se0_name = se0.fio),
      this.setState({ ...this.state, queryParams: queryParams });
  }

  se1(se1) {
    let queryParams = this.props.queryParams;
    queryParams.se1_id = se1.staffId;
    queryParams.se1_name = se1.fio;
    this.setState({ ...this.state, queryParams: queryParams });
  }

  se2(se2) {
    let queryParams = this.props.queryParams;
    queryParams.se2_id = se2.staffId;
    (queryParams.se2_name = se2.fio),
      this.setState({ ...this.state, queryParams: queryParams });
  }

  se3(se3) {
    let queryParams = this.props.queryParams;
    queryParams.se3_id = se3.staffId;
    (queryParams.se3_name = se3.fio),
      this.setState({ ...this.state, queryParams: queryParams });
  }
  clichAChange() {
    this.props.clichAChange();
  }
  render() {
    const {
      companyOpts,
      countryOpts,
      branchOptns,
      depOptns,
      compbranch,
      messages,
      osList,
      listType1,
      listType2,
      listType3,
      listDetail,
      listRoom,
      listStatus,
      loadCCBranch,
      loadCompBr,
      queryParams,
      inputChange,
    } = this.props;
    const isEnabledSe2 = queryParams.se1_name !== null;
    const isEnabledSe3 = queryParams.se1_name && queryParams.se2_name != null;

    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '4em',
          paddingRight: '4em',
        }}
      >
        <Form>
          <Segment padded size="small">
            <Label attached="top">
              <Header as="h3">{messages['add_assets']}</Header>
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
                        loadCompBr(value);
                      }}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field required>
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
                      options={listRoom}
                      onChange={(e, { value }) => {
                        inputChange(value, 'room_id');
                      }}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label>{messages['os_name']}</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      value={queryParams.os_id}
                      options={osList}
                      onChange={(e, { value }) => {
                        inputChange(value, 'os_id');
                      }}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/************************************************************************************************OS NAMES */}
            <Grid columns={8}>
              <Label color="teal" ribbon>
                <Header as="h5" inverted color="black">
                  Основные средства
                </Header>
              </Label>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <label>{messages['type1']}</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      value={queryParams.type1_id}
                      options={listType1}
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
                      options={listType2}
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
                      options={listType3}
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
                      options={listDetail}
                      onChange={(e, { value }) => {
                        inputChange(value, 'detail_id');
                      }}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field required>
                    <label>{messages['state1']}</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      value={queryParams.status_id}
                      options={listStatus}
                      onChange={(e, { value }) => {
                        inputChange(value, 'status_id');
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
                <Grid.Column>
                  <Form.Field>
                    <Form.Input
                      value={queryParams.price || ''}
                      onChange={(e, o) => inputChange(o, 'price')}
                      required
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
                      value={queryParams.currency}
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
            <OutputErrors errors={this.props.errors} />
          </Segment>
          {/**************************************************************************sub segment */}
          <Segment padded size="small">
            <Label color="blue" ribbon>
              {messages['position']}
            </Label>
            <Table color={'grey'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{messages['owner']}</Table.HeaderCell>
                  <Table.HeaderCell>{messages['examiner']}</Table.HeaderCell>
                  <Table.HeaderCell>{messages['examiner2']}</Table.HeaderCell>
                  <Table.HeaderCell>{messages['examiner3']}</Table.HeaderCell>
                  <Table.HeaderCell>
                    <Icon name="calendar" />
                    {messages['buying_date']}
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={3}>
                    <span>
                      <Button icon="external" onClick={this.show('owner')} />
                      {queryParams.se0_name}
                    </span>
                  </Table.Cell>
                  <Table.Cell width={3}>
                    <span>
                      <Button
                        icon="external"
                        onClick={this.show('examiner1')}
                      />
                      {queryParams.se1_name}
                    </span>
                  </Table.Cell>
                  <Table.Cell width={3}>
                    <span>
                      <Button
                        icon="external"
                        disabled={!isEnabledSe2}
                        onClick={this.show('examiner2')}
                      />
                      {queryParams.se2_name}
                    </span>
                  </Table.Cell>
                  <Table.Cell width={3}>
                    <span>
                      <Button
                        icon="external"
                        disabled={!isEnabledSe3}
                        onClick={this.show('examiner3')}
                      />
                      {queryParams.se3_name}
                    </span>
                  </Table.Cell>
                  <Table.Cell width={2}>
                    <DatePicker
                      className="date-100-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={queryParams.buying_time}
                      locale="ru"
                      onChange={(e, o) => {
                        inputChange(e, 'buying_time');
                      }}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell width={2}>
                    <span />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Modal open={this.state.open} onClose={this.close} size="large">
              <Modal.Header>
                {(this.state.comp == 'owner' && messages['owner']) ||
                  (this.state.comp == 'examiner1' && messages['examiner']) ||
                  (this.state.comp == 'examiner2' && messages['examiner2']) ||
                  (this.state.comp == 'examiner3' && messages['examiner3'])}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  {(this.state.comp == 'owner' && (
                    <AddOwner
                      messages={messages}
                      open={true}
                      handleClose={this.close}
                      se0={this.se0}
                      staffList={this.props.staffList}
                    />
                  )) ||
                    (this.state.comp == 'examiner1' && (
                      <AddExaminer1
                        messages={messages}
                        handleClose={this.close}
                        se1={this.se1}
                        companyOpts={this.props.companyOpts}
                      />
                    )) ||
                    (this.state.comp == 'examiner2' && (
                      <AddExaminer2
                        messages={messages}
                        handleClose={this.close}
                        se2={this.se2}
                        companyOpts={this.props.companyOpts}
                      />
                    )) ||
                    (this.state.comp == 'examiner3' && (
                      <AddExaminer3
                        messages={messages}
                        handleClose={this.close}
                        se3={this.se3}
                        companyOpts={this.props.companyOpts}
                      />
                    ))}
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={this.close}>
                  {messages['cancel']}
                </Button>
              </Modal.Actions>
            </Modal>
          </Segment>
          <Table striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell active width={3}>
                  <strong>{messages['inventory_code']}</strong>
                </Table.Cell>
                <Table.Cell width={7}>
                  {queryParams.country_id}-
                  {compbranch.map((code, i) => (
                    <span key={i}>{code.compbr_code}</span>
                  ))}
                  -{queryParams.dep_code}-{queryParams.room_code}-
                  {queryParams.os_code}-{queryParams.type1_code}-
                  {queryParams.type2_code}-{queryParams.type3_code}-
                  {queryParams.detail_code}-{queryParams.status_code}
                </Table.Cell>
                <Table.Cell width={6}>
                  <Button
                    floated="right"
                    onClick={this.clichAChange}
                    color="teal"
                  >
                    {messages['send_for_appr']}
                  </Button>
                  <Preview
                    messages={messages}
                    queryParams={queryParams}
                    compbranch={compbranch}
                    modal={this.state.open}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Form>
      </Container>
    );
  }
}
export default AddChangeForm;

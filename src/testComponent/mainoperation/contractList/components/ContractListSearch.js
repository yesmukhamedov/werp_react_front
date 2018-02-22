import React, { Component } from 'react';
import {
  Form,
  Dropdown,
  Grid,
  Segment,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class ContractListSearch extends Component {
  render() {
    const {
      companyOpts,
      branchOpts,
      stateOpts,
      selectedCompany,
      selectedBranch,
      selectedState,
      inputChange,
      startDate,
      endDate,
      handleSearch,
    } = this.props;
    return (
      <Form onSubmit={handleSearch}>
        <Segment padded size="small">
          <Grid stackable>
                <Grid.Column width={3}>
                    <Form.Field>
                        <label>Компания</label>
                        <Dropdown
                            placeholder="компания"
                            fluid
                            selection
                            options={companyOpts}
                            value={selectedCompany}
                            onChange={(e, { value }) => inputChange(value, 'selectedCompany')}
                          />
                      </Form.Field>
                  </Grid.Column>
                <Grid.Column width={3}>
                    <Form.Field>
                        <label>Филиал</label>
                        <Dropdown
                            placeholder="филиал"
                            fluid
                            selection
                            options={branchOpts}
                            value={selectedBranch}
                            onChange={(e, { value }) => inputChange(value, 'selectedBranch')}
                          />
                      </Form.Field>
                  </Grid.Column>
                <Grid.Column width={3}>
                    <Form.Field>
                        <label>Состояние</label>
                        <Dropdown
                            placeholder="состояние"
                            fluid
                            selection
                            value={selectedState}
                            options={stateOpts}
                            onChange={(e, { value }) => inputChange(value, 'selectedState')}
                          />
                      </Form.Field>
                  </Grid.Column>
                <Grid.Column width={2}>
                    <Form.Field>
                        <label>с</label>
                        <DatePicker
                            dateFormat="DD.MM.YYYY"
                                        // dateFormat='LL'
                            selected={startDate}
                                        // locale='en'
                            onChange={date => inputChange(date, 'startDate')}
                          />
                      </Form.Field>
                  </Grid.Column>
                <Grid.Column width={2}>
                    <Form.Field>
                        <label>до</label>
                        <DatePicker
                            dateFormat="DD.MM.YYYY"
                                        // dateFormat='LL'
                            selected={endDate}
                                        // locale='ru'
                            onChange={date => inputChange(date, 'endDate')}
                          />
                      </Form.Field>
                  </Grid.Column>
                <Grid.Column width={2}>
                    <Form.Button content="Поиск" style={{ marginTop: '1.6em' }} />
                  </Grid.Column>
              </Grid>
        </Segment>
      </Form>
    );
  }
}

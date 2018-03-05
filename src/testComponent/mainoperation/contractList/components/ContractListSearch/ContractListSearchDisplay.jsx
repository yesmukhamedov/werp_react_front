import React from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ContractListSearchDisplay = (props) => {
  if (props.directories) {
    return (
      <Form onSubmit={props.handleSearch}>
        <Segment padded size="small">
          <Grid stackable>
            <Grid.Column width={3}>
              <Form.Field>
                <label>Компания</label>
                <Dropdown
                  placeholder="компания"
                  fluid
                  selection
                  options={props.companyOptions}
                  value={props.selectedCompany}
                  onChange={(e, { value }) =>
                    props.inputChange(value, 'selectedCompany')
                  }
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
                  options={props.selectedCompany ? props.branchOptions[props.selectedCompany] : []}
                  value={props.selectedBranch}
                  onChange={(e, { value }) =>
                    props.inputChange(value, 'selectedBranch')
                  }
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
                  value={props.selectedState}
                  options={props.directories.stateOptions}
                  onChange={(e, { value }) =>
                    props.inputChange(value, 'selectedState')
                  }
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={2}>
              <Form.Field>
                <label>с</label>
                <DatePicker
                  dateFormat="DD.MM.YYYY"
                  // dateFormat='LL'
                  selected={props.startDate}
                  // locale='en'
                  onChange={date => props.inputChange(date, 'startDate')}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={2}>
              <Form.Field>
                <label>до</label>
                <DatePicker
                  dateFormat="DD.MM.YYYY"
                  // dateFormat='LL'
                  selected={props.endDate}
                  // locale='ru'
                  onChange={date => props.inputChange(date, 'endDate')}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={2}>
              <Form.Button
                content="Поиск"
                style={
                  { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    );
  }
  return (
    <Dimmer active>
      <Loader indeterminate>Fetching directories...</Loader>
    </Dimmer>
  );
};

ContractListSearchDisplay.propTypes = {
  selectedCompany: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedBranch: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedState: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  inputChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  directories: PropTypes.object,
  companyOptions: PropTypes.arrayOf(PropTypes.object),
  branchOptions: PropTypes.object,
};

export default ContractListSearchDisplay;

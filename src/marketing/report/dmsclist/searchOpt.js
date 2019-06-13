import React, { Component } from 'react';
import { Grid, Dropdown, Button, Icon, Input, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class SearchOpt extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      row: '',
    };
  }

  clearRow() {
    this.setState({ ...this.state, row: '' });
  }

  modalOpen() {
    this.setState({ ...this.state, modalOpen: true });
  }

  searchCustomer = (searchForm, page = 0) => {
    this.props.fByLazyCustomer(searchForm, page);
  };

  modalClose = () => {
    this.setState({ ...this.state, modalOpen: false });
  };

  selCustomerRow = row => {
    this.props.selectCustRow(row);
    this.setState({ ...this.state, row, modalOpen: false });
  };

  render() {
    const {
      dealers,
      demosec,
      collectors,
      searchPms,
      messages,
      inputChange,
      contstatus,
      contlaststate,
    } = this.props;

    return (
      <div>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Form.Field>
                  <label>{messages['L__DEALER']}</label>
                  <Dropdown
                    fluid
                    selection
                    search
                    options={this.getDealerOptions(dealers)}
                    onChange={(e, o) => inputChange('dealerId', o)}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Field>
                  <label>{messages['Crm.DemoSecretary']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={this.getDsecrets(demosec)}
                    onChange={(e, o) => inputChange('demoSecId', o)}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Field>
                  <label>{messages['collector']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={this.getCollectors(collectors)}
                    onChange={(e, o) => inputChange('collId', o)}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>{messages['Form.DateFrom']}</label>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    selected={
                      searchPms.dateFrom ? moment(searchPms.dateFrom) : null
                    }
                    locale="ru"
                    // onChange={(e, o) => { inputChange('dateFrom',e); }}
                    onChange={v => inputChange('dateFrom', v)}
                    dateFormat="DD.MM.YYYY"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            {
              //*************************************** SECOND ROW ***************************** */
            }
            <Grid.Row>
              <Grid.Column width={5}>
                <Form.Field required>
                  <label>{messages['Form.Client']}</label>
                  <Button
                    style={{ width: '10%' }}
                    onClick={this.clearRow.bind(this)}
                    icon
                  >
                    <Icon name="trash" />
                  </Button>
                  <Input
                    style={{ width: '75%' }}
                    value={this.state.row === '' ? '' : this.state.row.fullFIO}
                    readOnly
                  />
                  <Button
                    style={{ width: '10%' }}
                    onClick={this.modalOpen.bind(this)}
                    icon
                  >
                    <Icon name="search" />
                  </Button>
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['fin_status']}</label>
                  <Dropdown
                    fluid
                    selection
                    search
                    options={this.getContractStatus(contstatus)}
                    onChange={(e, o) => inputChange('contract_status_id', o)}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['phys_status']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={this.getContractLastState(contlaststate)}
                    onChange={(e, o) => inputChange('contract_status_id', o)}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['phys_status']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={this.getPaymentShedule()}
                    onChange={(e, o) => inputChange('paySchedule', o)}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column width={2}>
                <Form.Field>
                  <label>{messages['Form.DateTo']}</label>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    selected={
                      searchPms.dateTo ? moment(searchPms.dateTo) : null
                    }
                    locale="ru"
                    onChange={(e, o) => {
                      inputChange('dateTo', e);
                    }}
                    dateFormat="DD.MM.YYYY"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }

  getDealerOptions = dealers => {
    if (!dealers) {
      return [];
    }
    let out = dealers.map(c => {
      return {
        key: parseInt(c.dealerId, 10),
        text: `${c.diler}`,
        value: parseInt(c.dealerId, 10),
      };
    });
    return out;
  };

  getDsecrets = demosec => {
    if (!demosec) {
      return [];
    }
    let out = demosec.map(c => {
      return {
        key: parseInt(c.demoSecId, 10),
        text: `${c.demoSecName}`,
        value: parseInt(c.demoSecId, 10),
      };
    });
    return out;
  };

  getCollectors = collectors => {
    if (!collectors) {
      return [];
    }

    let out = collectors.map(c => {
      return {
        key: parseInt(c.collId, 10),
        text: `${c.collName}`,
        value: parseInt(c.collId, 10),
      };
    });
    return out;
  };
  /*************************************************** SECOND ROW */
  getContractStatus = contstatus => {
    if (!contstatus) {
      return [];
    }

    let out = contstatus.map(c => {
      return {
        key: parseInt(c.contract_status_id, 10),
        text: `${c.name}`,
        value: parseInt(c.contract_status_id, 10),
      };
    });
    return out;
  };

  getContractLastState = contlaststate => {
    if (!contlaststate) {
      return [];
    }

    let out = contlaststate.map(c => {
      return {
        key: parseInt(c.id, 10),
        text: `${c.ru}`,
        value: parseInt(c.id, 10),
      };
    });
    return out;
  };

  getPaymentShedule = () => {
    let out = [
      { key: 0, text: 'Наличными', value: 0 },
      { key: 1, text: 'В рассрочку', value: 1 },
    ];
    return out;
  };
}

export default SearchOpt;

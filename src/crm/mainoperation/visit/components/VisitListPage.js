import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Divider,
  Menu,
  Table,
  Icon,
  Header,
  Button,
  Form,
  Input,
  Segment,
  Grid,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import { ROOT_URL } from '../../../../utils/constants';

const currentDate = new Date();
class VisitListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      branchOptions: [],
      managerOptions: [],
      dealerOptions: [],
      resultOptions: [],
      btnLoading: false,
      queryParams: {
        bukrs: '',
        branchIds: [],
        managerId: 0,
        dealerId: 0,
        resultIds: [],
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.getLoadedManagers = this.getLoadedManagers.bind(this);
  }

  getLoadedManagers(branchId) {
    axios
      .get(`${ROOT_URL}/api/hr/pyramid/managers/by-branch/${branchId}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          year: this.state.queryParams.year,
          month: this.state.queryParams.month,
        },
      })
      .then(response => {
        const result = Object.keys(response.data).map(key => ({
          key,
          text: response.data[key],
          value: key,
        }));

        this.setState({
          ...this.state,
          managerOptions: result,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDropdownChange(e, o) {
    const { name, value } = o;
    let { queryParams, managerOptions } = this.state;
    switch (name) {
      case 'bukrs':
        queryParams[name] = value;
        queryParams.branchIds = [];
        break;

      case 'branch':
        queryParams.branchIds = value;

        if (value.length == 1) {
          const r = this.getLoadedManagers(value);
        } else {
          managerOptions = [];
        }
        break;

      case 'resultIds':
        queryParams[name] = value;
        break;

      case 'year':
      case 'month':
        queryParams[name] = value;
        if (!queryParams.branchIds || queryParams.branchIds.length != 1) {
          managerOptions = [];
        } else {
          const r = this.getLoadedManagers(queryParams.branchIds[0]);
        }
        break;

      default:
        queryParams[name] = value;
        break;
    }

    this.setState({
      ...this.state,
      queryParams,
      managerOptions,
    });
  }

  loadItems() {
    this.setState({
      ...this.state,
      btnLoading: true,
    });
    const { queryParams } = this.state;
    const sendingParams = {};
    Object.keys(queryParams).map(key => {
      const val = queryParams[key];
      switch (key) {
        case 'branchIds':
        case 'resultIds':
          sendingParams[key] = val.join(',');
          break;
        default:
          sendingParams[key] = val;
      }
    });

    axios
      .get(`${ROOT_URL}/api/crm/demo`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: sendingParams,
      })
      .then(response => {
        this.setState({
          ...this.state,
          items: response.data,
          btnLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          btnLoading: false,
        });
      });
  }

  componentWillMount() {
    axios
      .get(`${ROOT_URL}/api/hr/pyramid/crm/group-dealers`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(response => {
        const loaded = response.data.map(item => ({
          key: item.staffId,
          text: item.fullName,
          value: item.staffId,
        }));

        loaded.unshift({
          key: 0,
          text: 'Не выбрано',
          value: 0,
        });

        this.setState({
          ...this.state,
          dealerOptions: loaded,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(fieldName, o) {
    const { demo, errors } = this.state;

    switch (fieldName) {
      case 'dateTime':
        if (o) {
          demo[fieldName] = o._i;
        } else {
          demo[fieldName] = null;
        }

        break;
      case 'locationId':
      case 'clientName':
      case 'address':
      case 'resultId':
      case 'reasonId':
      case 'dealerId':
      case 'note':
        demo[fieldName] = o.value;
        if (fieldName == 'resultId') {
          demo.reasonId = 0;
        }
        break;
    }

    this.setState({
      ...this.state,
      demo,
      errors,
    });
  }

  renderSearchPanel() {
    return (
      <div>
        <Header as="h4" attached="top">
          Расширенный поиск
        </Header>
        <Segment attached>
          <Form>
            <Form.Field>
              <Form.Select
                name="visitorId"
                label="Посетитель"
                fluid
                selection
                options={this.state.dealerOptions}
                placeholder="Посетитель"
                onChange={this.handleDropdown}
              />
            </Form.Field>
            <Form.Field>
              <label>Дата визита С:</label>
              <DatePicker
                autoComplete="off"
                label=""
                placeholderText="Дата визита С"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="DD.MM.YYYY"
                onChange={v => this.handleChange('dateFrom', v)}
              />
            </Form.Field>

            <Form.Field>
              <label>Дата визита По:</label>
              <DatePicker
                autoComplete="off"
                label=""
                placeholderText="Дата визита По"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="DD.MM.YYYY"
                onChange={v => this.handleChange('dateTo', v)}
              />
            </Form.Field>

            <Button
              loading={this.state.btnLoading}
              onClick={this.loadItems}
              type="submit"
            >
              Сформировать
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }

  renderDataTable() {
    return (
      <ReactTable
        data={this.state.items}
        columns={[
          {
            Header: 'Номер №',
            accessor: 'id',
            Footer: (
              <span>
                <strong>Количество: </strong>
                {this.state.items.length}
              </span>
            ),
          },
          {
            Header: 'Филиал',
            accessor: 'branchName',
          },
          {
            Header: 'Посетитель',
            accessor: 'visitorName',
          },
          {
            Header: 'Дата посещения',
            accessor: 'date',
          },
        ]}
        className="-striped -highlight"
      />
    );
  }

  render() {
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Header as="h2" block>
          Список визитов
        </Header>
        <Divider />
        <Grid>
          <Grid.Column floated="left" width={4}>
            {this.renderSearchPanel()}
          </Grid.Column>

          <Grid.Column floated="left" width={12}>
            {this.renderDataTable()}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default VisitListPage;

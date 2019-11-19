import React, { Component } from 'react';
import { doGet } from '../../../../utils/apiActions';
import {
  Container,
  Divider,
  Header,
  Button,
  Form,
  Segment,
  Grid,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import { ROOT_URL } from '../../../../utils/constants';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4';
import BranchF4 from '../../../../reference/f4/branch/BranchF4';
import YearF4 from '../../../../reference/f4/date/YearF4';
import MonthF4 from '../../../../reference/f4/date/MonthF4';

const currentDate = new Date();
class DemoListPage extends Component {
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
    doGet(`hr/pyramid/managers/by-branch/${branchId}`, {
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

    doGet(`crm/demo`, {
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
    doGet(`crm/demo/results`)
      .then(response => {
        const loaded = Object.keys(response.data).map(key => ({
          key,
          text: response.data[key],
          value: key,
        }));
        this.setState({
          ...this.state,
          resultOptions: loaded,
        });
      })
      .catch(error => {
        console.log(error);
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
            <BukrsF4 handleChange={this.handleDropdownChange} />
            <BranchF4
              search
              multiple
              handleChange={this.handleDropdownChange}
              bukrs={this.state.queryParams.bukrs}
            />
            <Form.Field>
              <Form.Select
                name="managerId"
                label="Менеджер"
                options={this.state.managerOptions}
                placeholder="Менеджер"
                onChange={this.handleDropdown}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                name="dealerId"
                label="Дилер"
                fluid
                selection
                options={this.state.dealerOptions}
                placeholder="Дилер"
                onChange={this.handleDropdown}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                name="resultIds"
                label="Результат"
                fluid
                multiple
                selection
                options={this.state.resultOptions}
                placeholder="Результат"
                onChange={this.handleDropdown}
              />
            </Form.Field>
            <YearF4 handleChange={this.handleDropdownChange} />
            <MonthF4 handleChange={this.handleDropdownChange} />

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
            Header: 'Дилер',
            accessor: 'staffName',
          },
          {
            Header: 'Дата-время',
            accessor: 'dateTime',
          },
          {
            Header: 'Результат',
            accessor: 'resultName',
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
          Список демонстрации
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

export default DemoListPage;

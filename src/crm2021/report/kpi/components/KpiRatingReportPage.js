import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Container,
  Header,
  Segment,
  Form,
  Divider,
  Tab,
  Loader,
} from 'semantic-ui-react';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4';
import BranchF4 from '../../../../reference/f4/branch/BranchF4';
import YearF4 from '../../../../reference/f4/date/YearF4';
import MonthF4 from '../../../../reference/f4/date/MonthF4';
import { doGet } from '../../../../utils/apiActions';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../../../../general/userInfo/userInfo_action';

const currentDate = new Date();

const DEALER_POSITION_ID = 4;
const STAZHER_DEALER_POSITION_ID = 67;
const MANAGER_POSITION_ID = 3;
const DIRECTOR_POSITION_ID = 10;

class KpiRatingReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        STAZHER_DEALER_POSITION_ID: [],
        DEALER_POSITION_ID: [],
        MANAGER_POSITION_ID: [],
        DIRECTOR_POSITION_ID: [],
      },
      loading: false,
      bukrs: '',
      branches: [],
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      positionId: STAZHER_DEALER_POSITION_ID,
      loadedMap: {},
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.renderDataTable = this.renderDataTable.bind(this);
  }

  componentWillMount() {
    this.loadItems();
  }

  loadItems() {
    this.setState({
      ...this.state,
      loading: true,
    });
    const { bukrs, branches, positionId, year, month, items } = this.state;
    doGet(`crm2/report/kpi-rating`, {
      bukrs,
      branchIds: branches.join(','),
      year,
      month,
      positionId,
    })
      .then(res => {
        items[positionId] = res.data;
        this.setState({
          ...this.state,
          items,
          loading: false,
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  }

  onTabChange(e, data) {
    let positionId = STAZHER_DEALER_POSITION_ID;
    switch (data.activeIndex) {
      case 1:
        positionId = DEALER_POSITION_ID;
        break;

      case 2:
        positionId = MANAGER_POSITION_ID;
        break;

      case 3:
        positionId = DIRECTOR_POSITION_ID;
        break;

      default: {
      }
    }

    this.setState({ ...this.state, positionId });
  }

  renderDataTable(positionId) {
    const { loading, items } = this.state;
    if (loading) {
      return (
        <div>
          <Loader style={{ marginTop: 100 }} active />
        </div>
      );
    }
    return (
      <div>
        <ReactTable
          data={items[positionId] || []}
          columns={[
            {
              Header: 'Место',
              accessor: 'placeNumber',
              maxWidth: 100,
            },
            {
              Header: 'Компания',
              accessor: 'bukrsName',
              maxWidth: 150,
            },
            {
              Header: 'Филиал',
              accessor: 'branchName',
              maxWidth: 250,
            },
            {
              Header: 'Сотрудник',
              accessor: 'staffName',
            },
            {
              Header: 'Набранный бал',
              id: 'totalAverageScore',
              accessor: 'totalAverageScore',
              maxWidth: 150,
            },
          ]}
          indexKey="indexKey"
          defaultPageSize={50}
          className="-striped -highlight"
        />
      </div>
    );
  }

  submitSearch() {
    this.loadItems();
  }

  handleDropdownChange(e, result) {
    const { value, name } = result;
    let { bukrs, branches, month, year } = this.state;
    if (name === 'bukrs') {
      bukrs = value;
    } else if (name === 'branch') {
      branches = value;
    } else if (name === 'month') {
      month = value;
    } else if (name === 'year') {
      year = value;
    }
    this.setState({
      ...this.state,
      bukrs,
      branches,
      year,
      month,
    });
  }

  renderSearchForm() {
    return (
      <Form>
        <Form.Group widths="equal">
          <BukrsF4 handleChange={this.handleDropdownChange} />
          <BranchF4
            value={this.state.branches}
            search
            multiple
            handleChange={this.handleDropdownChange}
            bukrs={this.state.bukrs}
          />
          <YearF4 handleChange={this.handleDropdownChange} />
          <MonthF4 handleChange={this.handleDropdownChange} />
        </Form.Group>
        <Form.Button onClick={this.loadItems}>Сформировать</Form.Button>
      </Form>
    );
  }

  render() {
    const panes = [
      {
        menuItem: 'Стажеры',
        render: () => this.renderDataTable(STAZHER_DEALER_POSITION_ID),
      },
      {
        menuItem: 'Дилеры',
        render: () => this.renderDataTable(DEALER_POSITION_ID),
      },
      {
        menuItem: 'Менеджеры',
        render: () => this.renderDataTable(MANAGER_POSITION_ID),
      },
      {
        menuItem: 'Директоры',
        render: () => this.renderDataTable(DIRECTOR_POSITION_ID),
      },
    ];
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
        <div>
          <Header as="h2" attached="top">
            Рейтинг сотрудников отдела маркетинга
          </Header>
          {this.renderSearchForm()}
          <Divider clearing />
          <Segment attached>
            <Tab
              onTabChange={this.onTabChange}
              menu={{ secondary: true, pointing: true }}
              panes={panes}
            />
          </Segment>
        </div>
      </Container>
    );
  }

  roundedValue(v) {
    return Math.round(v * 100) / 100;
  }
}

export default KpiRatingReportPage;

// function mapStateToProps(state) {
//   return {
//     userInfo: state.userInfo.branchOptionsMarketing
//   };
// }

// export default connect(mapStateToProps, {
//   fetchUserInfo
// })(KpiRatingReportPage);

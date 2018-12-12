import React, { Component } from 'react';
import axios from 'axios';
import { BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid } from 'recharts';
import {
  Container,
  Header,
  Segment,
  Grid,
  Divider,
  Breadcrumb,
  Loader,
  Button,
  Icon,
  Table,
  Form,
  Label,
} from 'semantic-ui-react';
import KpiCard from './KpiCard';
import { ROOT_URL } from '../../../../utils/constants';
import CustomizedAxisTick from './CustomizedAxisTick';
import MonthF4 from '../../../../reference/f4/date/MonthF4';
import YearF4 from '../../../../reference/f4/date/YearF4';

const bukrsMap = {};
const branchesMap = {};
class KpiReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: 0,
      renderType: 'block',
      items: [],
      chartData: [],
      context: '',
      contextId: 0,
      loading: false,
      bukrs: '',
      branchId: 0,
      managerId: 0,
      averageScore: 0,
      breadcrumbs: [],
      year: 0,
      month: 0,
    };

    this.loadItems = this.loadItems.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.changeRenderType = this.changeRenderType.bind(this);
    this.renderSearchPanel = this.renderSearchPanel.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleError(e) {
    console.log(e);
  }

  loadBranches(bukrs) {
    if (branchesMap[bukrs]) {
      return;
    }
    axios
      .get(`${ROOT_URL}/api/reference/branches/${bukrs}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        branchesMap[bukrs] = {};
        for (let i = 0; i < res.data.length; i++) {
          branchesMap[bukrs][res.data[i].branch_id] = res.data[i].text45;
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  }

  componentWillMount() {
    axios
      .get(`${ROOT_URL}/api/reference/companies`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          bukrsMap[res.data[i].id] = res.data[i].name;
        }
      })
      .catch(e => {
        this.setState({
          ...this.state,
          loading: false,
        });
      });

    this.loadItems('', 0);
  }

  loadItems(context, contextId, bukrs, branchId) {
    let { currentBukrsName, currentBranchName } = this.state;
    this.setState({
      ...this.state,
      loading: true,
    });
    axios
      .get(`${ROOT_URL}/api/crm/report/kpi-current`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          context,
          contextId,
          year: this.state.year,
          month: this.state.month,
          bukrs: bukrs || null,
          branchId: branchId || null,
        },
      })
      .then(res => {
        if (context === 'branch') {
          this.loadBranches(contextId);
          currentBukrsName = bukrsMap[contextId];
        } else if (context === 'group') {
          currentBranchName = branchesMap;
        }
        this.setState({
          ...this.state,
          items: res.data.items,
          averageScore: res.data.averageScore,
          loading: false,
          context: res.data.context,
          contextId: res.data.contextId,
          currentBukrsName,
          currentBranchName,
          breadcrumbs: res.data.breadcrumbs,
          userPosition: res.data.userPosition,
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

  handleDropdownChange(e, data) {
    let { month, year } = this.state;
    const { name } = data;
    switch (name) {
      case 'year':
        year = data.value;
        break;

      case 'month':
        month = data.value;
        break;

      default: {
      }
    }

    this.setState({ ...this.state, year, month });
  }

  renderSearchPanel() {
    return (
      <div>
        <Form>
          <Form.Group>
            <YearF4 handleChange={this.handleDropdownChange} />
            <MonthF4 handleChange={this.handleDropdownChange} />
            <div className="field">
              <label>&nbsp;</label>
              <Button
                onClick={() =>
                  this.loadItems(this.state.context, this.state.contextId)
                }
              >
                Сформировать
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }

  renderHeader() {
    const { averageScore } = this.state;
    let scoreColor = '';
    if (averageScore < 60) {
      scoreColor = 'red';
    } else if (averageScore >= 60 && averageScore <= 80) {
      scoreColor = 'olive';
    } else if (averageScore > 80) {
      scoreColor = 'green';
    }
    return (
      <Segment clearing>
        {this.renderSearchPanel()}
        <br />
        <Header as="h3" block floated="left">
          <Breadcrumb size="big">
            {this.state.breadcrumbs.map((item, idx) => {
              if (item.clickable) {
                return (
                  <span key={idx}>
                    <Breadcrumb.Section
                      onClick={e => this.loadItems(item.name, item.id)}
                      link
                    >
                      {item.title}
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                  </span>
                );
              }
              if (item.active) {
                return (
                  <Breadcrumb.Section key={idx} active>
                    {item.title}
                  </Breadcrumb.Section>
                );
              }
              return (
                <span key={idx}>
                  <Breadcrumb.Section>{item.title}</Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right chevron" />
                </span>
              );
            })}
          </Breadcrumb>
        </Header>

        <Button circular floated="right" color={scoreColor}>
          {this.state.averageScore}
        </Button>

        <Button
          onClick={() => this.changeRenderType('chart')}
          icon
          floated="right"
          active={this.state.renderType === 'chart'}
          size={this.state.renderType === 'chart' ? 'medium' : 'tiny'}
        >
          <Icon name="bar chart" />
        </Button>
        <Button
          onClick={() => this.changeRenderType('list')}
          icon
          floated="right"
          active={this.state.renderType === 'list'}
          size={this.state.renderType === 'list' ? 'medium' : 'tiny'}
        >
          <Icon name="list layout" />
        </Button>
        <Button
          onClick={() => this.changeRenderType('block')}
          icon
          floated="right"
          active={this.state.renderType === 'block'}
          size={this.state.renderType === 'block' ? 'medium' : 'tiny'}
        >
          <Icon name="block layout" />
        </Button>
      </Segment>
    );
  }

  changeRenderType(renderType) {
    this.setState({
      ...this.state,
      renderType,
    });
  }

  roundedValue(v) {
    return Math.round(v * 100) / 100;
  }

  renderAsList() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.HeaderCell>Набранный балл</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.items.map((item, idx) => (
            <Table.Row key={item.id}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell
                negative={item.totalAverageScore < 60}
                positive={item.totalAverageScore > 80}
                warning={
                  item.totalAverageScore >= 60 && item.totalAverageScore <= 80
                }
              >
                {item.totalAverageScore}
              </Table.Cell>
              <Table.Cell>
                {item.detailable ? (
                  <Button
                    onClick={e =>
                      this.loadItems(
                        item.detailContext,
                        item.id,
                        item.bukrs,
                        item.branchId,
                      )
                    }
                  >
                    Деталь
                  </Button>
                ) : (
                  ''
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  renderAsChart() {
    const chartData = [];
    for (const k in this.state.items) {
      // if(this.state.items[k]['totalAverageScore'] > 0){
      chartData.push({
        name: this.state.items[k].name,
        score: this.state.items[k].totalAverageScore,
      });
      // }
    }

    return (
      <BarChart
        width={900}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 150,
        }}
      >
        <XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick />} />
        <YAxis dataKey="score" />
        <CartesianGrid strokeDasharray="1" />
        <Tooltip />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    );
  }

  renderData() {
    if (this.state.renderType === 'list') {
      return this.renderAsList();
    } else if (this.state.renderType === 'chart') {
      return this.renderAsChart();
    }
    return this.state.items.map(item => (
      <KpiCard
        key={item.id}
        cardData={item}
        context={this.state.context}
        loadItems={this.loadItems}
      />
    ));
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
        <div>
          <Header as="h2" attached="top">
            Текущий KPI сотрудников отдела маркетинга
          </Header>
          {this.renderHeader()}
          <Divider clearing />
          <Segment attached>
            <Grid columns={2}>
              <Loader active={this.state.loading} />
              {this.renderData()}
            </Grid>
          </Segment>
        </div>
      </Container>
    );
  }
}

export default KpiReportPage;

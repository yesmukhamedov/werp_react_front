import React, { Component } from 'react';
import {
  Tab,
  Table,
  Button,
  Icon,
  Form,
  Input,
  Card,
  Header,
  Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchDemoRecommender } from '../actions/crmReportAction';
import { fetchDemoChildRecos } from '../../../mainoperation/demo/actions/demoAction';
import { fetchVisitChildRecos } from '../../../mainoperation/visit/actions/visitAction';
import { notify } from '../../../../general/notification/notification_action';

class CrmRepRecommenderSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoId: 0,
      searching: false,
      recommender: {},
    };
  }

  handleChange = e => {
    const { value } = e.target;

    this.setState({
      ...this.state,
      demoId: value,
    });
  };

  fetchRecommender = () => {
    this.setState({
      ...this.state,
      searching: true,
    });
    this.props
      .fetchDemoRecommender(this.state.demoId)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          recommender: data,
          searching: false,
        });

        if (data.context === 'visit') {
          this.props.fetchVisitChildRecos(data.demoId);
        } else {
          this.props.fetchDemoChildRecos(data.demoId);
        }
      })
      .catch(e => {
        if (e.response && e.response.data && e.response.data.message) {
          this.props.notify('error', e.response.data.message, 'Ошибка');
        }

        this.setState({
          ...this.state,
          searching: false,
        });
      });
  };

  renderSearchPanel = () => {
    const { searching } = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              onChange={this.handleChange}
              name="demoId"
              focus
              placeholder="№ демонстрации..."
              type={'number'}
            />
          </Form.Field>
          <Form.Button
            loading={searching}
            label={' '}
            onClick={this.fetchRecommender}
          >
            Найти
          </Form.Button>
        </Form.Group>
      </Form>
    );
  };

  renderRecommenderData = () => {
    const { recommender } = this.state;
    const phones = recommender.phones || [];
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Инфо о рекомендателя</Card.Header>
        </Card.Content>
        <Card.Content>
          <Table celled striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    № {recommender.context === 'visit' ? 'визит' : 'демо'}
                  </Header>
                </Table.Cell>
                <Table.Cell>{recommender.demoId}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">ФИО рекомендателя</Header>
                </Table.Cell>
                <Table.Cell>{recommender.clientName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">Тел. номера</Header>
                </Table.Cell>
                <Table.Cell>
                  {phones.map(p => {
                    return <p key={p}>{p}</p>;
                  })}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">Адрес</Header>
                </Table.Cell>
                <Table.Cell>{recommender.address}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    {recommender.context === 'visit'
                      ? 'Дата визита'
                      : 'Дата показа демо'}
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  {recommender.context === 'visit'
                    ? recommender.visitDate
                    : recommender.demoDateTime}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">Результат демо</Header>
                </Table.Cell>
                <Table.Cell>{recommender.demoResultName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">SN</Header>
                </Table.Cell>
                <Table.Cell>{recommender.sn}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">Дата продажи</Header>
                </Table.Cell>
                <Table.Cell>{recommender.saleDate}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">Дата-время создания</Header>
                </Table.Cell>
                <Table.Cell>{recommender.createdAt}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    );
  };

  renderRecoRow = (item, idx, firstCreatedAt) => {
    return (
      <Table.Row key={item.id}>
        <Table.Cell>{idx + 1}</Table.Cell>
        <Table.Cell>{item.clientName}</Table.Cell>
        <Table.Cell>{item.statusName}</Table.Cell>
        <Table.Cell
          style={{
            backgroundColor: firstCreatedAt === item.createdAt ? '' : '#ddd',
          }}
        >
          {item.createdAt}
          <br />
          {item.updatedAt}
        </Table.Cell>
        <Table.Cell>
          <ul>
            {item.childDemos.map(cd => {
              return (
                <li
                  key={cd.id}
                  style={
                    parseInt(cd.id) === parseInt(this.state.demoId)
                      ? { backgroundColor: 'yellow' }
                      : {}
                  }
                >
                  {cd.id} - {cd.resultName}
                </li>
              );
            })}
          </ul>
        </Table.Cell>
      </Table.Row>
    );
  };

  renderChildRecos = () => {
    let recos = this.props.demoChildRecos || [];
    if (this.state.recommender.context === 'visit') {
      recos = this.props.visitChildRecos || [];
    }
    let firstCreatedAt = null;
    let dateColorMap = {};
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Рекомендации</Card.Header>
        </Card.Content>
        <Card.Content>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>ФИО клиента</Table.HeaderCell>
                <Table.HeaderCell>Статус</Table.HeaderCell>
                <Table.HeaderCell>Дата созд/ред.</Table.HeaderCell>
                <Table.HeaderCell>Демо</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {recos.map((item, idx) => {
                if (!firstCreatedAt) {
                  firstCreatedAt = item.createdAt;
                }
                return this.renderRecoRow(item, idx, firstCreatedAt);
              })}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    );
  };

  render() {
    return (
      <div>
        {this.renderSearchPanel()}
        <hr />

        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              {this.renderRecommenderData({})}
            </Grid.Column>

            <Grid.Column width={10}>{this.renderChildRecos()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    meta: state.crmReportReducer.meta,
    demoChildRecos: state.crmDemo.childRecos,
    visitChildRecos: state.crmVisit.childRecos,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDemoRecommender,
    fetchDemoChildRecos,
    fetchVisitChildRecos,
    notify,
  },
)(CrmRepRecommenderSearchPage);

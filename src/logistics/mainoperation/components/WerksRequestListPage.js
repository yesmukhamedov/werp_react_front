import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Segment,
  Divider,
  Loader,
  Icon,
  Form,
  Button,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import { fetchWerksRequestsIn } from '../actions/logisticsActions';
import { formatDMYMS } from '../../../utils/helpers';
import BukrsF4 from '../../../reference/f4/bukrs/BukrsF4';
import BranchF4 from '../../../reference/f4/branch/BranchF4';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  WERKS_REQUEST_STATUS_NEW,
  WERKS_REQUEST_STATUS_CLOSED,
} from '../../logUtil';
require('moment/locale/ru');

const TYPE_IN = 'in';
//const TYPE_OUT = 'out';

class WerksRequestListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      queryParams: {
        page: 0,
      },
    };

    this.loadItems = this.loadItems.bind(this);
    this.renderDataTable = this.renderDataTable.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.loadItems(WERKS_REQUEST_STATUS_NEW);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      type: this.props.match.params.type,
    });
  }

  loadItems(statusId) {
    this.props.fetchWerksRequestsIn(this.state.queryParams);
  }

  onTabChange = (e, data) => {
    if (data.activeIndex === 0) {
      this.loadItems(WERKS_REQUEST_STATUS_NEW);
    } else {
      this.loadItems(WERKS_REQUEST_STATUS_CLOSED);
    }
  };

  getDocViewLink() {
    return '';
  }

  handleChangeDate(fieldName, v) {
    let queryParams = Object.assign({}, this.state.queryParams);
    queryParams[fieldName] = v;
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  handleChange(e, o) {
    let queryParams = Object.assign({}, this.state.queryParams);
    const { name, value } = o;

    queryParams[name] = value;
    console.log(queryParams);
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  renderDataTable() {
    const { items } = this.props;

    return (
      <div>
        {this.props.pageLoading ? (
          <Loader active inline="centered" />
        ) : (
          <ReactTable
            data={items || []}
            columns={[
              {
                Header: '№',
                accessor: 'id',
                maxWidth: 100,
              },
              {
                Header: 'Документ',
                accessor: 'displayName',
                maxWidth: 200,
                Cell: props => {
                  return 'Внутренние документы';
                },
              },
              {
                Header: 'Филиал ',
                accessor: 'branchName',
                maxWidth: 250,
              },
              {
                Header: 'Филиал исполнитель',
                accessor: 'resBranchName',
                maxWidth: 250,
              },
              {
                Header: 'Автор',
                accessor: 'creatorName',
                maxWidth: 250,
              },
              {
                Header: 'Дата создания',
                accessor: 'createdAt',
                Cell: props => {
                  const { createdAt } = props.original;
                  return formatDMYMS(createdAt);
                },
              },
              {
                Header: '',
                accessor: 'contextId',
                filterable: false,
                Cell: props => {
                  return (
                    <Link
                      target={'_blank'}
                      className={'ui icon button mini'}
                      to={'/logistics/werks/requests/view/' + props.original.id}
                    >
                      Просмотр
                    </Link>
                  );
                },
              },
            ]}
            indexKey="indexKey"
            defaultPageSize={50}
            className="-striped -highlight"
          />
        )}
      </div>
    );
  }

  renderSearchPanel() {
    let queryParams = Object.assign({}, this.state.queryParams);
    return (
      <div>
        <Header as="h4" attached="top">
          Панель поиска
        </Header>
        <Segment attached>
          <Form>
            <Form.Group widths="equal">
              <BukrsF4 handleChange={this.handleChange} />
              <BranchF4
                search
                multiple={false}
                handleChange={this.handleChange}
                bukrs={queryParams['bukrs'] || ''}
              />
              <Form.Field>
                <label>Дата с</label>
                <DatePicker
                  locale={'ru'}
                  autoComplete="off"
                  label=""
                  placeholderText={'Дата с'}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="DD.MM.YYYY"
                  selected={
                    queryParams['dateFrom']
                      ? moment(queryParams['dateFrom'])
                      : null
                  }
                  onChange={v => this.handleChangeDate('dateFrom', v)}
                />
              </Form.Field>

              <Form.Field>
                <label>Дата по</label>
                <DatePicker
                  locale={'ru'}
                  label=""
                  autoComplete="off"
                  placeholderText="Дата по"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="DD.MM.YYYY"
                  selected={
                    queryParams['dateTo'] ? moment(queryParams['dateTo']) : null
                  }
                  onChange={v => this.handleChangeDate('dateTo', v)}
                />
              </Form.Field>
            </Form.Group>

            <Button
              loading={this.state.btnLoading}
              onClick={() => this.loadItems(WERKS_REQUEST_STATUS_NEW)}
              type="submit"
            >
              Сформировать
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }

  render() {
    // let panes = [
    //   { menuItem: 'Новые', render: () => this.renderDataTable() },
    //   { menuItem: 'Закрытые', render: this.renderDataTable },
    // ];

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
        <Segment clearing>
          <Header as="h2" floated="left">
            Внутренние заявки /{' '}
            {this.state.type === TYPE_IN ? 'Входящие' : 'Исходящие'}
          </Header>
          <Link
            className={'ui icon button primary right floated'}
            to={`/logistics/werks/requests/create`}
          >
            <Icon name="plus" /> Добавить
          </Link>
        </Segment>
        <Divider clearing />
        <Segment attached>{this.renderSearchPanel()}</Segment>
        <Segment attached>{this.renderDataTable()}</Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.logisticsReducer.werksRequests,
  };
}

export default connect(mapStateToProps, {
  fetchWerksRequestsIn,
})(WerksRequestListPage);

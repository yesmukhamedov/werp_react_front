import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Container,
  Segment,
  Form,
  Table,
  Loader,
} from 'semantic-ui-react';
import LazyPagination from '../../../../general/pagination/LazyPagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DemoResultLabel from './DemoResultLabel';
import {
  fetchDemoArchive,
  fetchDemoResults,
  fetchGroupDealers,
} from '../actions/demoAction';
import { connect } from 'react-redux';
import { demoResultOptions } from '../../../crmUtil';
import { injectIntl } from 'react-intl';
//import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4';

class DemoArchivePage extends Component {
  constructor(props) {
    super(props);
    this.loadedSuccess = true;
    this.state = {
      callResultOptions: [],
      callRefuseOptions: [],
      results: [],
      searchModel: {
        id: 0,
        clientName: '',
        dealerId: 0,
        appointedBy: 0,
        resultId: '',
        dateFrom: null,
        dateTo: null,
        saleDateFr: null,
        saleDateTo: null,
        address: '',
      },
      loading: false,
    };

    this.renderTable = this.renderTable.bind(this);
    this.onPaginationItemClick = this.onPaginationItemClick.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  loadItems(page) {
    let { searchModel } = this.state;
    console.log('demo archive page props: ', this.props);
    let temp = [];
    temp.push('page=' + page);
    temp.push('perPage=' + this.props.meta.size);
    for (let key in searchModel) {
      if (searchModel.hasOwnProperty(key)) {
        if (
          key === 'dateFrom' ||
          key === 'dateTo' ||
          key === 'saleDateFr' ||
          key === 'saleDateTo'
        ) {
          if (searchModel[key]) {
            temp.push(key + '=' + searchModel[key]);
          }
        } else {
          temp.push(key + '=' + encodeURIComponent(searchModel[key]));
        }
      }
    }
    let q = temp.join('&');
    this.props.fetchDemoArchive(q);
  }

  componentWillMount() {
    this.loadItems(0);

    this.props.fetchDemoResults();
    this.props.fetchGroupDealers();
  }

  onPaginationItemClick(page) {
    this.loadItems(page);
  }

  handleChange(fieldName, o) {
    let searchModel = Object.assign({}, this.state.searchModel);
    let { value } = o;
    searchModel[fieldName] = value;

    if ('bukrs' === fieldName) {
      searchModel['branchIds'] = [];
    }
    this.setState({ ...this.state, searchModel: searchModel });
  }

  handleChangeDate(field, m) {
    let { searchModel } = this.state;
    if (m) {
      searchModel[field] = m.format('YYYY-MM-DD');
    } else {
      searchModel[field] = null;
    }

    this.setState({ ...this.state, searchModel: searchModel });
  }

  getBranchOptions = bukrs => {
    if (!bukrs) {
      return [];
    }

    return this.props.branchOptions[bukrs] || [];
  };

  renderSearchForm(messages) {
    const { companyOptions } = this.props;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            name="bukrs"
            label={messages['Form.Company']}
            options={companyOptions}
            placeholder={messages['Form.Company']}
            onChange={(e, v) => this.handleChange('bukrs', v)}
          />

          <Form.Select
            name="branch"
            multiple={true}
            search={true}
            selection
            value={this.state.searchModel.branchIds || []}
            label={messages['brnch']}
            options={this.getBranchOptions(this.state.searchModel.bukrs)}
            placeholder={messages['brnch']}
            onChange={(e, v) => this.handleChange('branchIds', v)}
          />
          <Form.Select
            fluid
            label={messages['Form.Dealer']}
            options={this.props.dealers}
            placeholder={messages['Form.Dealer']}
            onChange={(e, v) => this.handleChange('dealerId', v)}
          />

          <Form.Select
            fluid
            label={messages['Form.Result']}
            options={demoResultOptions(this.props.demoResults)}
            placeholder={messages['Form.Result']}
            onChange={(e, v) => this.handleChange('resultId', v)}
          />

          <Form.Input
            fluid
            label={messages['Form.ClientFullName']}
            placeholder={messages['Form.ClientFullName']}
            onChange={(e, v) => this.handleChange('clientName', v)}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['Form.DemoDateFrom']}</label>
            <DatePicker
              autoComplete="off"
              label=""
              placeholderText={messages['Form.DemoDateFrom']}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="DD.MM.YYYY"
              selected={
                this.state.searchModel.dateFrom
                  ? moment(this.state.searchModel.dateFrom)
                  : null
              }
              onChange={v => this.handleChangeDate('dateFrom', v)}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['Form.DemoDateTo']}</label>
            <DatePicker
              autoComplete="off"
              label=""
              placeholderText={messages['Form.DemoDateTo']}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="DD.MM.YYYY"
              selected={
                this.state.searchModel.dateTo
                  ? moment(this.state.searchModel.dateTo)
                  : null
              }
              onChange={v => this.handleChangeDate('dateTo', v)}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['Form.SaleDateFrom']}</label>
            <DatePicker
              autoComplete="off"
              label=""
              placeholderText={messages['Form.SaleDateFrom']}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="DD.MM.YYYY"
              selected={
                this.state.searchModel.saleDateFr
                  ? moment(this.state.searchModel.saleDateFr)
                  : null
              }
              onChange={v => this.handleChangeDate('saleDateFr', v)}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['Form.SaleDateTo']}</label>
            <DatePicker
              autoComplete="off"
              label=""
              placeholderText={messages['Form.SaleDateTo']}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="DD.MM.YYYY"
              selected={
                this.state.searchModel.saleDateTo
                  ? moment(this.state.searchModel.saleDateTo)
                  : null
              }
              onChange={v => this.handleChangeDate('saleDateTo', v)}
            />
          </Form.Field>
          <Form.Input
            fluid
            label={messages['Form.Address']}
            placeholder={messages['Form.Address']}
            onChange={(e, v) => this.handleChange('address', v)}
          />
          <Form.Field>
            <label>&nbsp;</label>
            <Form.Button onClick={() => this.loadItems(0)}>
              {messages['Form.Form']}
            </Form.Button>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }

  renderTableBody(messages) {
    if (this.props.items === undefined || this.props.items.length === 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan={8}>Нет данных</Table.Cell>
        </Table.Row>
      );
    }
    return this.props.items.map((item, idx) => {
      return (
        <Table.Row key={idx}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.branchName}</Table.Cell>
          <Table.Cell>{item.clientName}</Table.Cell>
          <Table.Cell>{item.dealerName}</Table.Cell>
          <Table.Cell>{item.appointer}</Table.Cell>
          <Table.Cell>
            <DemoResultLabel
              resultId={item.resultId}
              resultName={item.resultName}
            />
          </Table.Cell>
          <Table.Cell>{item.dateTime}</Table.Cell>
          <Table.Cell>
            <Link
              target={'_blank'}
              className={'ui icon button mini'}
              to={`/crm2021/demo/view/` + item.id}
            >
              {messages['Table.View']}
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderTable(messages) {
    if (this.props.loader.active) {
      return <Loader active={true} />;
    }
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Branch']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Client']}</Table.HeaderCell>
            <Table.HeaderCell>
              {messages['Table.ResponsibleStaff']}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {messages['Table.AppointerStaff']}
            </Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Result']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.DateTime']}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderTableBody(messages)}</Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="2">
              {messages['overallSum']}: {this.props.totalElements}
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="6">
              <LazyPagination
                onItemClick={this.onPaginationItemClick}
                totalRows={this.props.totalElements}
                currentPage={this.props.number}
                perPage={this.props.size}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  render() {
    const { messages } = this.props.intl;
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
            {messages['Crm.DemoArchiveTitle']}
          </Header>
        </Segment>
        <Segment clearing>{this.renderSearchForm(messages)}</Segment>
        {this.renderTable(messages)}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.crmDemo2021.items,
    loader: state.loader,
    meta: state.crmDemo2021.meta,
    dealers: state.crmDemo2021.dealers,
    demoResults: state.crmDemo2021.demoResults,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

export default connect(mapStateToProps, {
  fetchDemoArchive,
  fetchDemoResults,
  fetchGroupDealers,
})(injectIntl(DemoArchivePage));

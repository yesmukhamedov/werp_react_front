import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Segment,
  Divider,
  Tab,
  Loader,
  Icon,
  Form,
  Input,
  Button,
  Label,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import {
  fetchInvoices,
  fetchInvoicesByStatus,
  setInvoicePage,
} from '../actions/logisticsActions';
import { formatDMYMS } from '../../../utils/helpers';
import BukrsF4 from '../../../reference/f4/bukrs/BukrsF4';
import BranchF4 from '../../../reference/f4/branch/BranchF4';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  WERKS_REQUEST_STATUS_NEW,
  WERKS_REQUEST_STATUS_CLOSED,
  Doctype,
  getUriByDoctype,
  getDoctypeByUri,
} from '../../logUtil';
import { injectIntl } from 'react-intl';

require('moment/locale/ru');

const STATUS_NEW = 1;
const STATUS_DONE = 2;
const STATUS_DELETED = 6;

class InvoiceListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctype: null,
      currentStatus: STATUS_NEW,
      queryParams: {
        page: 0,
      },
    };

    this.loadItems = this.loadItems.bind(this);
    this.renderDataTable = this.renderDataTable.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      doctype: 'LGI_POSTING_TRADE_IN', //getDoctypeByUri(this.props.match.params.doctype),
    });
  }

  loadItems() {
    let params = Object.assign({}, this.state.queryParams);
    params['doctype'] = this.state.doctype;
    this.props.fetchInvoicesByStatus(this.state.currentStatus, params);
  }

  onTabChange(e, data) {
    let status = STATUS_NEW;
    if (data.activeIndex === 1) {
      status = STATUS_DONE;
    } else if (data.activeIndex === 2) {
      status = STATUS_DELETED;
    }

    this.setState({
      ...this.state,
      currentStatus: status,
    });
  }

  getDocViewLink() {
    return '';
  }

  handleChangeDate(fieldName, v) {
    let queryParams = Object.assign({}, this.state.queryParams);
    if (v && v != null) {
      queryParams[fieldName] = v.format('YYYY-MM-DD');
    } else {
      queryParams[fieldName] = null;
    }

    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  handleChange(e, o) {
    let queryParams = Object.assign({}, this.state.queryParams);
    const { name, value } = o;

    queryParams[name] = value;
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  renderDataTable() {
    const { messages } = this.props.intl;
    const { pageByStatus } = this.props;
    const page = pageByStatus[this.state.currentStatus] || {};
    let items = page['content'] || [];
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
                Header: messages['receiver_whouse'],
                accessor: 'toWerksName',
              },
              {
                Header: 'Контрагент',
                accessor: 'customerName',
              },
              {
                Header: 'Дата документа',
                accessor: 'invoiceDate',
              },
              {
                Header: 'Статус',
                accessor: 'statusName',
              },
              {
                Header: 'Дата создания',
                accessor: 'createdAt',
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
                      to={
                        '/logistics/invoices/postings-trade-in/view/' +
                        props.original.id
                      }
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

  renderSearchPanel(messages) {
    let queryParams = Object.assign({}, this.state.queryParams);
    const { companyOptions, branchOptions } = this.props;
    return (
      <div>
        <Header as="h4" attached="top">
          Панель поиска
        </Header>
        <Segment attached>
          <Form>
            <Form.Group widths="equal">
              <Form.Select
                name="bukrs"
                label={messages['L__COMPANY']}
                options={companyOptions || []}
                placeholder={messages['L__COMPANY']}
                onChange={this.handleChange}
              />
              <Form.Select
                value={queryParams['branchId'] || ''}
                name="branchId"
                multiple={false}
                search
                selection
                label={messages['L__BRANCH']}
                options={branchOptions[queryParams['bukrs']] || []}
                placeholder={messages['L__BRANCH']}
                onChange={this.handleChange}
              />

              <Form.Field>
                <label>{messages['Form.DateFrom']}</label>
                <DatePicker
                  locale={'ru'}
                  autoComplete="off"
                  label=""
                  placeholderText={messages['Form.DateFrom']}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="DD.MM.YYYY"
                  selected={
                    queryParams['fromDate']
                      ? moment(queryParams['fromDate'])
                      : null
                  }
                  onChange={v => this.handleChangeDate('fromDate', v)}
                />
              </Form.Field>

              <Form.Field>
                <label>{messages['Form.DateTo']}</label>
                <DatePicker
                  locale={'ru'}
                  label=""
                  autoComplete="off"
                  placeholderText={messages['Form.DateTo']}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="DD.MM.YYYY"
                  selected={
                    queryParams['toDate'] ? moment(queryParams['toDate']) : null
                  }
                  onChange={v => this.handleChangeDate('toDate', v)}
                />
              </Form.Field>
            </Form.Group>

            <Button
              loading={this.state.btnLoading}
              onClick={() => this.loadItems()}
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
    const { messages } = this.props.intl;
    const { doctype } = this.state;

    const panes = [
      { menuItem: messages['new_items'], render: this.renderDataTable },
      { menuItem: messages['closed_items'], render: this.renderDataTable },
      { menuItem: messages['deleted_items'], render: this.renderDataTable },
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
        <Segment clearing>
          <Header as="h2" floated="left">
            {messages[doctype]}
          </Header>
          {doctype ? (
            <Link
              className={'ui icon button primary right floated'}
              to={`/logistics/invoices/` + getUriByDoctype(doctype) + `/create`}
            >
              <Icon name="plus" /> Добавить
            </Link>
          ) : (
            ''
          )}
        </Segment>
        <Divider clearing />
        <Segment attached>{this.renderSearchPanel(messages)}</Segment>
        <Tab
          onTabChange={this.onTabChange}
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />

        {/*<Segment attached>{this.renderDataTable()}</Segment>*/}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.logisticsReducer.invoicePage,
    pageByStatus: state.logisticsReducer.invoicePageByStatus,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchInvoices,
    setInvoicePage,
    fetchInvoicesByStatus,
  },
)(injectIntl(InvoiceListPage));

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Tab,
  Header,
  Container,
  Icon,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Phone from './Phone';
//import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchRecoCurrentData,
  fetchCallResults,
  fetchRecoStatuses,
  // saveReco,
} from '../actions/recoAction';
import { fetchReasons } from '../../demo/actions/demoAction';
import { getRecoCategoriesOptionsByLanguage } from '../../../crmUtil';
import { injectIntl } from 'react-intl';
import { fetchDemoPrices } from '../../../../reference/mainoperation/actions/referenceAction';
import { Button } from 'react-yandex-maps';
import { modifyLoader } from '../../../../general/loader/loader_action';

class RecoCurrentPage extends Component {
  constructor(props) {
    super(props);
    this.loadedSuccess = true;
    this.state = {
      // callResultOptions: [],
      // callRefuseOptions: [],
      // usedItems: [],
      // newItems: [],
      // doneItems: [],
      // movedItems: [],
      demoPriceOptions: [],
      loaderOn: true,
    };

    this.renderTabUsed = this.renderTabUsed.bind(this);
    this.renderTabNew = this.renderTabNew.bind(this);
    this.renderTabDemoDone = this.renderTabDemoDone.bind(this);
    this.renderTableMoved = this.renderTableMoved.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.onCallSaved = this.onCallSaved.bind(this);
  }

  loadItems() {}

  componentWillMount() {
    this.props.fetchRecoCurrentData('used');
    this.props.fetchRecoCurrentData('new');
    this.props.fetchRecoCurrentData('demo-done');
    this.props.fetchRecoCurrentData('moved');
    this.props.fetchReasons();
    this.props.fetchCallResults();
    this.props.fetchRecoStatuses();
  }

  componentDidMount() {
    this.props.fetchDemoPrices({ 'dto-type': 'options' }).then(({ data }) => {
      this.setState({
        ...this.state,
        demoPriceOptions: data,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.usedItems !== prevProps.usedItems) {
      this.setState({
        ...this.state,
        loaderOn: false,
      });
    }
  }

  renderPhoneCall(e, d) {
    console.log(e);
    console.log(d);
  }

  onCallSaved() {
    this.loadItems();
  }

  renderPhoneNumbers(recoId, phones, clientName) {
    return (
      <div>
        {phones.map(p => (
          <Phone
            demoPriceOptions={this.state.demoPriceOptions}
            callRefuseOptions={this.props.callResults}
            callResultOptions={this.props.callResults}
            key={p.id}
            phoneNumber={p.phoneNumber}
            phoneId={p.id}
            context="RECO"
            contextId={recoId}
            onCallSaved={this.onCallSaved}
            clientName={clientName}
          />
        ))}
      </div>
    );
  }

  renderTable(items) {
    const { messages, locale } = this.props.intl;
    let statusOptions = [];
    if (this.props.statuses) {
      statusOptions = this.props.statuses.map(o => (
        <option value={o.text} key={o.value}>
          {o.text}
        </option>
      ));
    }

    const categoryOptions = getRecoCategoriesOptionsByLanguage(locale).map(
      o => (
        <option value={o.text} key={o.value}>
          {o.text}
        </option>
      ),
    );
    return (
      <div>
        <Loader active={this.state.loaderOn} />
        <ReactTable
          defaultFilterMethod={(filter, row) => {
            const colName =
              filter.id === 'phoneNumbers' ? 'phonesAsStr' : filter.id;

            if (
              filter.value &&
              filter.value.length > 0 &&
              row[colName] &&
              row[colName]
            ) {
              return row[colName]
                .toLowerCase()
                .includes(filter.value.toLowerCase());
            }
          }}
          data={items}
          columns={[
            {
              Header: 'ФИО',
              accessor: 'clientName',
            },
            {
              Header: '',
              accessor: 'phonesAsStr',
              show: false,
            },
            {
              Header: messages.L__RECOMMENDER,
              accessor: 'recommenderName',
            },
            {
              Header: messages['Crm.CallDateTime'],
              id: 'callDateDiv',
              accessor: row => this.renderDocDate(row),
              filterMethod: (filter, row) => {
                if (row[filter.id] && typeof row[filter.id] === 'string') {
                  return row[filter.id].includes(filter.value);
                }

                return false;
              },
            },
            {
              Header: messages['Form.PhoneNumber'],
              id: 'phoneNumbers',
              accessor: row =>
                this.renderPhoneNumbers(row.id, row.phones, row.clientName),
            },
            {
              Header: messages['Table.ResponsibleStaff'],
              accessor: 'responsibleName',
            },
            {
              Header: messages['Table.Note'],
              accessor: 'note',
            },
            {
              Header: messages['Table.Category'],
              accessor: 'categoryName',
              filterMethod: (filter, row) => {
                if (filter.value === '0') {
                  return true;
                }
                return (
                  row[filter.id].toLowerCase() === filter.value.toLowerCase()
                );
              },
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: '100%' }}
                  value={filter ? filter.value : 0}
                >
                  <option value={0}>{messages.all}</option>
                  {categoryOptions}
                </select>
              ),
            },
            {
              Header: messages['Form.Status'],
              accessor: 'statusName',
              filterMethod: (filter, row) => {
                if (filter.value === '0') {
                  return true;
                }
                return String(row[filter.id]) === filter.value;
              },
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: '100%' }}
                  value={filter ? filter.value : 0}
                >
                  <option value={0}>{messages.all}</option>
                  {statusOptions}
                </select>
              ),
            },
            {
              Header: '',
              accessor: 'id',
              filterable: false,
              Cell: ({ value }) => (
                <Link
                  target="_blank"
                  className="ui icon button mini"
                  to={`/crm2021/reco/view/${value}`}
                >
                  {messages['Table.View']}
                </Link>
              ),
            },
          ]}
          previousText={messages.previousText}
          nextText={messages.nextText}
          defaultPageSize={50}
          filterable
          className="-striped -highlight"
        />
      </div>
    );
  }

  renderDocDate(row) {
    if (row.callDate) {
      return row.callDate;
      // const now = moment();
      {
        const docDate = row.callDate;
      }
      {
        /*if (now.isAfter(docDate)) {*/
      }
      {
        /*return <Label color="red">{docDate.format('DD.MM.YYYY HH:mm')}</Label>;*/
      }
      {
        /*} else if (now.format('DD.MM.YYYY') === docDate.format('DD.MM.YYYY')) {*/
      }
      {
        /*return (*/
      }
      {
        /*<Label color="orange">{docDate.format('DD.MM.YYYY HH:mm')}</Label>*/
      }
      {
        /*);*/
      }
      {
        /*}*/
      }

      {
        /*return <Label color="teal">{docDate.format('DD.MM.YYYY HH:mm')}</Label>;*/
      }
    }
    return '';
  }

  renderTabDemoDone() {
    return this.renderTable(this.props.doneItems);
  }

  renderTabNew() {
    return this.renderTable(this.props.newItems);
  }

  renderTabUsed() {
    return this.renderTable(this.props.usedItems);
  }

  renderTableMoved() {
    return this.renderTable(this.props.movedItems);
  }

  render() {
    const { messages } = this.props.intl;
    // console.log('message geldi', this.props.messages)
    const panes = [
      { menuItem: messages['Crm.Used'], render: this.renderTabUsed },
      { menuItem: messages['Crm.New'], render: this.renderTabNew },
      { menuItem: messages['Crm.DemoDone'], render: this.renderTabDemoDone },
      { menuItem: messages['Crm.Moved'], render: this.renderTableMoved },
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
            {messages['Crm.CurrentRecommendations']}
          </Header>
          <Link
            className="ui icon button primary right floated"
            to="/crm2021/reco/create"
          >
            <Icon name="plus" /> {messages['Crm.Wspace.CreateFromArchive']}
          </Link>
        </Segment>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    newItems: state.crmReco2021.newItems,
    doneItems: state.crmReco2021.doneItems,
    usedItems: state.crmReco2021.usedItems,
    movedItems: state.crmReco2021.movedItems,
    reasons: state.crmReco2021.reasons,
    callResults: state.crmReco2021.callResults,
    statuses: state.crmReco2021.statuses,
    saveCrmResponse: state.crmReco2021.saveCrmResponse,
    activeLoader: state.loader.active,
  };
}

export default connect(mapStateToProps, {
  fetchRecoCurrentData,
  fetchReasons,
  fetchCallResults,
  fetchRecoStatuses,
  fetchDemoPrices,
  modifyLoader,
  // saveReco,
})(injectIntl(RecoCurrentPage));

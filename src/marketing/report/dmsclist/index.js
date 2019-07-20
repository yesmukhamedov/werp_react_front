import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchDmsclstDefOpts,
  getDmsclst,
  getDmsclstSecOpts,
} from '../../marketingAction';
import { Container, Segment, Tab, Table, Header } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import List from './list';
import SearchByContDet from './searchByContDet';
import SearchOpt from './searchOpt';
import SearchByNum from './searchByNum';
import { moneyFormat } from '../../../utils/helpers';
import moment from 'moment';

class Dmsclists extends Component {
  constructor() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    super();
    this.state = {
      searchPms: {
        brIds: [],
        cont_st_ids: [],
        dateFrom: moment(firstDay),
        dateTo: moment(lastDay),
      },
      srchModal: false,
    };
  }

  componentWillMount() {
    this.props.fetchDmsclstDefOpts();
  }

  //Customer options
  selectedCustomer(customer) {
    let searchPms = Object.assign({}, this.state.searchPms);
    searchPms['customer_id'] = customer.id;
    searchPms['fullFIO'] = customer.fullFIO;
    this.setState({ ...this.state, searchPms, srchModal: false });
  }

  /**************   CUSTOMER SEARCH FUNCT */
  callModalOpen = () => {
    this.setState(prev => {
      return {
        ...prev,
        srchModal: true,
      };
    });
  };
  cancelForm = () => {
    this.setState(prev => {
      return {
        ...prev,
        srchModal: false,
      };
    });
  };

  //searchOpts
  inputChange = (fieldName, o) => {
    let searchPms = Object.assign({}, this.state.searchPms);

    switch (fieldName) {
      case 'bukrs':
        searchPms['bukrs'] = o.value;
        break;
      case 'branchIds':
        searchPms.brIds = o.value;
        break;
      case 'dealerId':
        searchPms['dealerId'] = o.value;
        break;
      case 'demoSecId':
        searchPms['demoSecId'] = o.value;
        break;
      case 'collId':
        searchPms['collId'] = o.value;
        break;
      case 'dateFrom':
        searchPms.dateFrom = o;
        break;
      case 'dateTo':
        searchPms.dateTo = o;
        break;
      case 'contract_status_id':
        searchPms.cont_st_ids = o.value;
        break;
      case 'physCond':
        searchPms['physCond'] = o.value;
        break;
      case 'paySchedule':
        searchPms['paySchedule'] = o.value;
        break;
      case 'customer_id':
        searchPms['customer_id'] = o.value;
        break;
      default:
        searchPms[fieldName] = o.value;
    }
    this.setState({ ...this.state, searchPms });
  };

  handleClear = fieldName => {
    let searchPms = Object.assign({}, this.state.searchPms);
    switch (fieldName) {
      case 'demoSecId':
        searchPms['demoSecId'] = '';
        break;
      case 'dealerId':
        searchPms['dealerId'] = '';
        break;
      case 'physCond':
        searchPms['physCond'] = '';
        break;
      case 'paySchedule':
        searchPms['paySchedule'] = '';
        break;
      case 'customer_id':
        searchPms['customer_id'] = '';
        break;
      default:
        searchPms[fieldName] = '';
    }
    this.setState({ ...this.state, searchPms });
  };

  searchContract() {
    let searchPms = Object.assign({}, this.state.searchPms);
    searchPms.dateFrom = searchPms.dateFrom.format('YYYY-MM-DD');
    searchPms.dateTo = searchPms.dateTo.format('YYYY-MM-DD');
    const params = {};
    for (const k in searchPms) {
      if (k === 'brIds') {
        if (typeof searchPms[k] !== 'undefined' && searchPms[k].length > 0) {
          params[k] = searchPms[k].join();
        }
      } else if (k === 'cont_st_ids') {
        if (typeof searchPms[k] !== 'undefined' && searchPms[k].length > 0) {
          params[k] = searchPms[k].join();
        }
      } else {
        params[k] = searchPms[k];
      }
    }
    this.props.getDmsclst(params);
  }

  searContrSecOpts(SearchOptions) {
    this.props.getDmsclstSecOpts(SearchOptions);
  }

  render() {
    const { messages } = this.props.intl;
    const { dynObjDmsc } = this.props;
    return (
      <div>
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
            <Header as="h1">{messages['contract_lst']}</Header>
          </Segment>
          <Tab
            menu={{ attached: false, pointing: true }}
            panes={this.panes(messages)}
          />
          <List
            messages={messages}
            dmsclists={dynObjDmsc.dmsclists}
            {...this.state}
          />
          <br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{messages['overallSum']}</Table.HeaderCell>
                <Table.HeaderCell>{messages['price']}</Table.HeaderCell>
                <Table.HeaderCell>{messages['TBL_H__PAID']}</Table.HeaderCell>
                <Table.HeaderCell>{messages['remainder']}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {dynObjDmsc.totalRows === undefined ||
                  dynObjDmsc.totalRows == 0
                    ? ''
                    : moneyFormat(dynObjDmsc.totalRows[0])}
                </Table.Cell>
                <Table.Cell>
                  {dynObjDmsc.totalRows === undefined ||
                  dynObjDmsc.totalRows == 0
                    ? ''
                    : moneyFormat(dynObjDmsc.totalRows[1])}
                </Table.Cell>
                <Table.Cell>
                  {dynObjDmsc.totalRows === undefined ||
                  dynObjDmsc.totalRows == 0
                    ? ''
                    : moneyFormat(dynObjDmsc.totalRows[2])}
                </Table.Cell>
                <Table.Cell>
                  {dynObjDmsc.totalRows === undefined ||
                  dynObjDmsc.totalRows == 0
                    ? ''
                    : moneyFormat(dynObjDmsc.totalRows[3])}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }

  panes = props => {
    const messages = props;
    return [
      {
        menuItem: 'Параметры поиска',
        render: props => (
          <Tab.Pane attached={false}>
            <SearchOpt
              messages={messages}
              selectedCustomer={this.selectedCustomer.bind(this)}
              inputChange={this.inputChange.bind(this)}
              handleClear={this.handleClear.bind(this)}
              callModalOpen={this.callModalOpen.bind(this)}
              cancelForm={this.cancelForm.bind(this)}
              searchContract={this.searchContract.bind(this)}
              {...this.props}
              {...this.state}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'поиск по номеру',
        render: props => (
          <Tab.Pane attached={false}>
            <SearchByNum
              messages={messages}
              searContrSecOpts={this.searContrSecOpts.bind(this)}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'поиск по контактным данным',
        render: props => (
          <Tab.Pane attached={false}>
            <SearchByContDet
              messages={messages}
              searContrSecOpts={this.searContrSecOpts.bind(this)}
            />
          </Tab.Pane>
        ),
      },
    ];
  };
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    lazyitems: state.marketing.lazyitems,
    lazymeta: state.marketing.lazymeta,
    contstatus: state.marketing.contstatus,
    contlaststate: state.marketing.contlaststate,
    dynObjDmsc: state.marketing.dynObjDmsc,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDmsclstDefOpts,
    getDmsclst,
    getDmsclstSecOpts,
  },
)(injectIntl(Dmsclists));

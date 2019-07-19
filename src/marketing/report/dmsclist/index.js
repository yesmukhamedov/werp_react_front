import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import {
  getContByOpts,
  searContrSecOpts,
  getDefSearchOpts,
  getDmscLstCustrs,
} from '../../marketingAction';
import { Container, Segment, Tab, Table, Header } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import List from './list';
import SearchByContDet from './searchByContDet';
import SearchOpt from './searchOpt';
import SearchByNum from './searchByNum';
import { moneyFormat } from '../../../utils/helpers';

class Dmsclists extends Component {
  constructor() {
    super();
    this.state = {
      searchPms: {
        brIds: [],
        page: 0,
      },
      srchModal: false,
      pageCount: 0,
    };
  }

  componentWillMount() {
    this.props.f4FetchCountryList();
    this.props.getDefSearchOpts();
  }

  //Customer options
  searchCustomer(cust) {
    this.props.getDmscLstCustrs(cust);
  }

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
        searchPms['dateFrom'] = o.format('YYYY-MM-DD');
        break;
      case 'dateTo':
        searchPms['dateTo'] = o.format('YYYY-MM-DD');
        break;
      case 'contract_status_id':
        searchPms['contract_status_id'] = o.value;
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
      case 'contract_status_id':
        searchPms['contract_status_id'] = '';
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
    searchPms['page'] = 0;
    const params = {};
    for (const k in searchPms) {
      if (k === 'brIds') {
        if (typeof searchPms[k] !== 'undefined' && searchPms[k].length > 0) {
          params[k] = searchPms[k].join();
        }
      } else {
        params[k] = searchPms[k];
      }
    }
    this.props.getContByOpts(params);
  }

  searContrSecOpts(SearchOptions) {
    this.props.searContrSecOpts(SearchOptions);
  }

  fetchPage(p) {
    let searchPms = Object.assign({}, this.state.searchPms);
    this.setState(state => {
      return { pageCount: p };
    });

    let len = 20;
    let length = this.props.dynObjDmsc.dmsclists.length;
    let pageSize = (p + 1) * len;
    if (pageSize > length && p > 99) {
      searchPms['page'] = this.state.searchPms.page + 1;
      this.setState({ ...this.state, searchPms, pageCount: 0 });
      const params = {};
      for (const k in searchPms) {
        if (k === 'brIds') {
          if (typeof searchPms[k] !== 'undefined' && searchPms[k].length > 0) {
            params[k] = searchPms[k].join();
          }
        } else {
          params[k] = searchPms[k];
        }
      }
      this.props.getContByOpts(params);
    }
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
            fetchPage={this.fetchPage.bind(this)}
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
              searchCustomer={this.searchCustomer.bind(this)}
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
    countryList: state.f4.countryList,
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
    f4FetchCountryList,
    f4FetchWerksBranchList,
    getContByOpts,
    searContrSecOpts,
    getDefSearchOpts,
    getDmscLstCustrs,
  },
)(injectIntl(Dmsclists));

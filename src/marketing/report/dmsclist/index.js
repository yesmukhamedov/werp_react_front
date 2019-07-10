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
      searchPms: { page: 0 },
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

  searchContract(searPms) {
    const params = {};
    for (const k in searPms) {
      if (k === 'brIds') {
        if (typeof searPms[k] !== 'undefined' && searPms[k].length > 0) {
          params[k] = searPms[k].join();
        }
      } else {
        params[k] = searPms[k];
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
    if (pageSize > length) {
      searchPms['page'] = this.state.searchPms.page + 1;
      this.setState({ ...this.state, searchPms, pageCount: 0 });
      this.props.getContByOpts(searchPms);
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
              searchContract={this.searchContract.bind(this)}
              {...this.props}
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

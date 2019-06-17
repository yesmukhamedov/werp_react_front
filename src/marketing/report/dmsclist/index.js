import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { getContByOpts, getByDefSearchOpts } from '../../marketingAction';
import { Container, Segment, Tab, Button, Menu } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import DefSearch from './defSearch';
import List from './list';
import SearchByContDet from './searchByContDet';
import SearchOpt from './searchOpt';
import SearchByNum from './searchByNum';

class ListContracts extends Component {
  constructor() {
    super();
    this.state = {
      searchPms: {
        bukrs: '',
      },
      row: '',
      activeIndex: 1,
    };
    this.selectCustRow = this.selectCustRow.bind(this);
  }

  componentWillMount() {
    this.props.f4FetchCountryList();
  }

  selectCustRow = row => {
    const searchPms = Object.assign({}, this.state.searchPms);
    searchPms['customer_id'] = row.id;
    this.setState({ ...this.state, searchPms });
  };

  inputChange(fieldName, o) {
    const searchPms = Object.assign({}, this.state.searchPms);
    switch (fieldName) {
      case 'bukrs':
        searchPms.bukrs = o.value;
        break;
      case 'branchId':
        searchPms['branchId'] = o.value;
        this.props.getByDefSearchOpts(o.value);
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
      case 'contract_number':
        searchPms.contract_number = o.value;
      case 'old_sn':
        searchPms['old_sn'] = o.value;
        break;
      case 'phone':
        searchPms['phone'] = o.value;
        break;
      case 'address':
        searchPms['address'] = o.value;
        break;
      case 'contract_status_id':
        searchPms['contract_status_id'] = o.value;
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
  }

  searchContract() {
    this.props.getContByOpts(this.state.searchPms);
  }

  render() {
    const { messages } = this.props.intl;
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
          <DefSearch
            searchPms={this.state.searchPms}
            inputChange={this.inputChange.bind(this)}
            messages={messages}
            companyOptions={this.props.companyOptions}
            branchOptions={this.props.branchOptions}
          />
          <Segment clearing>
            <Tab
              menu={{ attached: false, pointing: true }}
              panes={this.panes(messages)}
            />
            <br />
            <Button
              color="teal"
              floated="right"
              onClick={() => this.searchContract()}
            >
              {messages['search']}
            </Button>
          </Segment>
          <List
            messages={messages}
            dmsclists={this.props.dynObjDmsc.dmsclists}
          />
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
              inputChange={this.inputChange.bind(this)}
              searchPms={this.state.searchPms}
              {...this.props}
              selectCustRow={this.selectCustRow}
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
              {...props}
              inputChange={this.inputChange.bind(this)}
              searchPms={this.state.searchPms}
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
              {...props}
              inputChange={this.inputChange.bind(this)}
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
    getByDefSearchOpts,
  },
)(injectIntl(ListContracts));

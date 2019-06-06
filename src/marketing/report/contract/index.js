import React, { Component } from 'react';
import { connect } from 'react-redux';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import {
  fetchBrchesByBukrs,
  fetchAllCont,
  fetchDeContr,
  fByLazyCustomer,
} from '../../marketingAction';
import { Container, Segment, Tab, Button, Menu } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import DefSearch from './defSearch';
import List from './list';
import SearchByContDet from './searchByContDet';
import SearchOpt from './searchOpt';
import SearchByNum from './searchByNum';
import { messages } from '../../../locales/defineMessages';
import { excelDownload } from '../../../utils/helpers';

class ListContracts extends Component {
  constructor() {
    super();
    this.state = {
      searchPms: {},
      row: '',
      activeIndex: 1,
    };
    this.selectCustRow = this.selectCustRow.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
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
        searchPms['bukrs'] = o.value;
        this.props.fetchBrchesByBukrs(o.value);
        break;
      case 'branchId':
        searchPms['branchId'] = o.value;
        this.props.fetchDeContr(o.value);
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

  searchBukrBr() {
    this.props.fetchAllCont(this.state.searchPms);
  }

  exportExcel() {
    const { formatMessage } = this.props.intl;
    let excelHeaders = [];
    excelHeaders.push(formatMessage(messages.branch));
    excelHeaders.push(formatMessage(messages.contractNumber));
    excelHeaders.push(formatMessage(messages.contractDate));
    excelHeaders.push('Ф.И.О. клиента');
    excelHeaders.push(formatMessage(messages.snNum));
    excelHeaders.push(formatMessage(messages.status));
    excelHeaders.push('Физ.статус');
    excelHeaders.push(formatMessage(messages.dealer));
    excelHeaders.push('Взносщик');
    excelHeaders.push('Вид');
    excelHeaders.push(formatMessage(messages.price));
    excelHeaders.push(formatMessage(messages.paid));
    excelHeaders.push(formatMessage(messages.remainder));
    excelHeaders.push(formatMessage(messages.extraInfo));
    excelDownload(
      '/api/marketing/contract/list/downloadExcel',
      'mcontrrep.xls',
      'outputTable',
      this.props.contlist,
      excelHeaders,
    );
  }

  render() {
    const { messages } = this.props.intl;
    const { activeIndex } = this.state;
    const { contlist } = this.props;
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
              onClick={() => this.searchBukrBr()}
            >
              {messages['search']}
            </Button>
          </Segment>
          <Segment className={activeIndex === 1 ? 'show' : 'hide'}>
            <Menu stackable size="small">
              <Menu.Item>
                <img
                  className="clickableItem"
                  src="/assets/img/xlsx_export_icon.png"
                  onClick={() => this.exportExcel()}
                />
              </Menu.Item>
            </Menu>
          </Segment>
          <List messages={messages} contlist={this.props.contlist} />
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
    branchOptions: state.markReducer.bukrsBranches,
    contlist: state.markReducer.contlist,
    dealers: state.markReducer.dealers,
    demosec: state.markReducer.demosec,
    collectors: state.markReducer.collectors,
    lazyitems: state.markReducer.lazyitems,
    lazymeta: state.markReducer.lazymeta,
    contstatus: state.markReducer.contstatus,
    contlaststate: state.markReducer.contlaststate,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchCountryList,
    fetchBrchesByBukrs,
    fetchAllCont,
    fetchDeContr,
    fByLazyCustomer,
  },
)(injectIntl(ListContracts));

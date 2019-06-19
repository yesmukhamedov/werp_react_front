import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { getByDefSearchOpts, getContByOpts } from '../../marketingAction';
import { Container, Segment, Tab, Button, Menu } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import DefSearch from './../dmsclist/defSearch';
import List from './../dmsclist/list';
import SearchByContDet from './../dmsclist/searchByContDet';
import SearchOpt from './../dmsclist/searchOpt';
import SearchByNum from './../dmsclist/searchByNum';
import { excelDownload } from '../../../utils/helpers';

class DmscListExcel extends Component {
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

  exportExcel(messages) {
    let excelHeaders = [];
    excelHeaders.push(messages['L__BRANCH']);
    excelHeaders.push(messages['L__CONTRACT_NUMBER']);
    excelHeaders.push(messages['L__CONTRACT_DATE']);
    excelHeaders.push(messages['L__CLIENT_FULLNAME']);
    excelHeaders.push(messages['snNum']);
    excelHeaders.push(messages['L__STATUS']);
    excelHeaders.push(messages['phys_status']);
    excelHeaders.push(messages['L__DEALER']);
    excelHeaders.push(messages['collector']);
    excelHeaders.push(messages['kind']);
    excelHeaders.push(messages['price']);
    excelHeaders.push(messages['paid']);
    excelHeaders.push(messages['remainder']);
    excelHeaders.push(messages['extraInfo']);

    excelDownload(
      '/api/marketing/report/dmsclistexcel',
      'mcontrrep.xls',
      'outputTable',
      this.props.dynObjDmsc.dmsclists,
      excelHeaders,
    );
  }

  render() {
    const { messages } = this.props.intl;
    const { activeIndex } = this.state;
    const isEnabled =
      this.state.searchPms.branchId === undefined ||
      this.state.searchPms.branchId === null;
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
              disabled={isEnabled}
              onClick={() => this.searchContract()}
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
                  onClick={() => this.exportExcel(messages)}
                />
              </Menu.Item>
            </Menu>
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
)(injectIntl(DmscListExcel));
